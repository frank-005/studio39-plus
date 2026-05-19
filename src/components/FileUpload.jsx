import { useEffect, useRef, useState } from 'react';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 12 * 1024 * 1024; // 12 MB
const MAX_FILES = 5;

function createUploadItem(file) {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}`,
    file,
    preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    progress: 0,
    status: 'uploading'
  };
}

function FileUpload({ files = [], onFilesChange }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadItems, setUploadItems] = useState([]);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (files.length === 0) {
      setUploadItems([]);
      setError('');
    }
  }, [files]);

  useEffect(() => {
    return () => {
      uploadItems.forEach((item) => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, [uploadItems]);

  const updateProgress = (itemId) => {
    setTimeout(() => {
      setUploadItems((current) =>
        current.map((item) =>
          item.id === itemId ? { ...item, progress: 100, status: 'uploaded' } : item
        )
      );
    }, 20);
  };

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `Unsupported file type: ${file.name}`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name} exceeds the 12 MB file limit.`;
    }
    return null;
  };

  const handleFiles = (incomingFiles) => {
    const next = [...files];
    const newUploads = [];
    let message = '';

    Array.from(incomingFiles).forEach((file) => {
      if (next.length >= MAX_FILES) {
        message = `Please upload up to ${MAX_FILES} files.`;
        return;
      }

      const validation = validateFile(file);
      if (validation) {
        message = validation;
        return;
      }

      next.push(file);
      newUploads.push(createUploadItem(file));
    });

    if (message) {
      setError(message);
      return;
    }

    onFilesChange(next);
    setUploadItems((current) => [...current, ...newUploads]);
    newUploads.forEach((item) => updateProgress(item.id));
    setError('');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleInputChange = (event) => {
    handleFiles(event.target.files);
  };

  const removeFile = (index) => {
    const next = files.filter((_, indexToRemove) => indexToRemove !== index);
    onFilesChange(next);
    setUploadItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div
        className={`group rounded-[28px] border border-dashed border-mist bg-ivory/90 p-8 transition duration-300 ${
          dragActive ? 'border-sage bg-sand/70' : 'hover:border-sage hover:bg-sand/60'
        } dark:border-neutral-700 dark:bg-charcoal/80 dark:hover:border-sage dark:hover:bg-charcoal/90`}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="hidden"
          onChange={handleInputChange}
        />
        <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full border border-mist bg-white/80 p-4 text-sage shadow-soft dark:border-neutral-700 dark:bg-neutral-950/80 dark:text-sand">
            <span className="text-2xl">⤓</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">Drag & drop reference files here, or browse your device.</p>
            <p className="mt-3 text-sm leading-7 text-charcoal/70 dark:text-sand">Share sketches, inspiration imagery, PDFs, or project information.</p>
          </div>
          <button type="button" onClick={openFileDialog} className="rounded-full border border-charcoal bg-charcoal px-5 py-3 text-sm uppercase tracking-[0.35em] text-ivory transition hover:bg-[#3a372f] dark:border-sand dark:bg-sand dark:text-charcoal dark:hover:bg-[#d5cabc]">
            Browse files
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p>}

      {files.length > 0 && (
        <div className="space-y-4 rounded-[28px] border border-mist bg-ivory/80 p-6 dark:border-neutral-700 dark:bg-charcoal/80">
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.35em] text-charcoal/70 dark:text-sand">
            <span>Uploaded reference files</span>
            <span>{files.length}/{MAX_FILES}</span>
          </div>
          <div className="space-y-3">
            {uploadItems.map((item, index) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-3xl border border-mist bg-white/80 p-4 transition dark:border-neutral-700 dark:bg-charcoal/90">
                <div className="flex items-center gap-4">
                  {item.preview ? (
                    <img src={item.preview} alt={item.file.name} className="h-16 w-16 rounded-3xl object-cover" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sage/10 text-xl text-charcoal/70 dark:bg-sand/10 dark:text-sand">
                      PDF
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-charcoal dark:text-ivory">{item.file.name}</p>
                    <p className="text-sm text-charcoal/60 dark:text-sand">{Math.round(item.file.size / 1024)} KB</p>
                  </div>
                  <button type="button" onClick={() => removeFile(index)} className="text-sm uppercase tracking-[0.35em] text-charcoal/70 transition hover:text-charcoal dark:text-sand dark:hover:text-ivory">
                    Remove
                  </button>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-mist dark:bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-sage transition-all duration-500 ease-out"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
