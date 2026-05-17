import { useEffect, useState } from 'react';
import { useForm } from '@formspree/react';
import SectionHeading from '../components/SectionHeading';
import FileUpload from '../components/FileUpload';

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  projectType: 'Residential',
  budget: '',
  message: ''
};

const projectTypes = [
  'Residential',
  'Commercial',
  'Hospitality',
  'Interior Design',
  'Renovation',
  'Conceptual'
];

// Configure your Formspree form ID in .env as VITE_FORMSPREE_FORM_ID
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xjgzbjll';

function Contact() {
  const [state, handleFormspreeSubmit] = useForm(FORMSPREE_FORM_ID);
  const [formData, setFormData] = useState(initialFormState);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Please provide a phone number.';
    }
    if (!formData.location.trim()) {
      nextErrors.location = 'Please share the project location.';
    }
    if (!formData.budget.trim()) {
      nextErrors.budget = 'Please share an estimated budget.';
    }
    if (!formData.message.trim()) {
      nextErrors.message = 'Tell us a little more about the project.';
    }
    if (files.length === 0) {
      nextErrors.files = 'Add at least one reference file or sketch.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  useEffect(() => {
    if (state.succeeded) {
      setStatusType('success');
      setStatusMessage('Thank you — your inquiry has been submitted successfully. We will reply shortly.');
      setFormData(initialFormState);
      setFiles([]);
      setErrors({});
    } else if (Array.isArray(state.errors) && state.errors.length > 0) {
      setStatusType('error');
      setStatusMessage('There was a problem submitting your inquiry. Please try again later.');
    }
  }, [state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusMessage('');
    setStatusType('');

    if (!validateForm()) {
      return;
    }

    handleFormspreeSubmit(event);
  };

  return (
    <div className="pt-32 pb-28 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36">
      <section className="content-container space-y-16 py-24 md:py-28">
        <SectionHeading
          eyebrow="Contact"
          title="Begin a project conversation with Studio 39+."
          copy="Share the scope of your project and we’ll respond with thoughtful guidance for your architectural or visualization brief."
        />
      </section>

      <section className="content-container grid gap-12 lg:grid-cols-[1.1fr_.9fr] pb-28 xl:gap-14">
        <div className="rounded-[32px] border border-mist bg-sand p-14 shadow-soft dark:border-neutral-700 dark:bg-charcoal md:p-16">
          <form className="space-y-10" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your full name"
                  className="mt-4 w-full rounded-3xl border border-mist bg-ivory px-6 py-4 text-sm text-charcoal outline-none focus:border-charcoal dark:border-neutral-700 dark:bg-charcoal dark:text-ivory dark:focus:border-sand"
                />
                {errors.fullName && <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="hello@domain.com"
                  className="mt-4 w-full rounded-3xl border border-mist bg-ivory px-6 py-4 text-sm text-charcoal outline-none focus:border-charcoal dark:border-neutral-700 dark:bg-charcoal dark:text-ivory dark:focus:border-sand"
                />
                {errors.email && <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{errors.email}</p>}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="phone" className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="+254 700 000 000"
                  className="mt-4 w-full rounded-3xl border border-mist bg-ivory px-6 py-4 text-sm text-charcoal outline-none focus:border-charcoal dark:border-neutral-700 dark:bg-charcoal dark:text-ivory dark:focus:border-sand"
                />
                {errors.phone && <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="location" className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">
                  Project Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  type="text"
                  placeholder="City, region or landmark"
                  className="mt-4 w-full rounded-3xl border border-mist bg-ivory px-6 py-4 text-sm text-charcoal outline-none focus:border-charcoal dark:border-neutral-700 dark:bg-charcoal dark:text-ivory dark:focus:border-sand"
                />
                {errors.location && <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{errors.location}</p>}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="projectType" className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="mt-4 w-full rounded-3xl border border-mist bg-ivory px-6 py-4 text-sm text-charcoal outline-none focus:border-charcoal dark:border-neutral-700 dark:bg-charcoal dark:text-ivory dark:focus:border-sand"
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">
                  Estimated Budget
                </label>
                <input
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. $45k – $80k"
                  className="mt-4 w-full rounded-3xl border border-mist bg-ivory px-6 py-4 text-sm text-charcoal outline-none focus:border-charcoal dark:border-neutral-700 dark:bg-charcoal dark:text-ivory dark:focus:border-sand"
                />
                {errors.budget && <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{errors.budget}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">
                Message / Project Brief
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Tell us about your vision, timeline, and any special priorities."
                className="mt-4 w-full rounded-3xl border border-mist bg-ivory px-6 py-4 text-sm text-charcoal outline-none focus:border-charcoal dark:border-neutral-700 dark:bg-charcoal dark:text-ivory dark:focus:border-sand"
              />
              {errors.message && <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{errors.message}</p>}
            </div>

            <input type="hidden" name="fileNames" value={files.map((file) => file.name).join(', ')} />
            <div>
              <label className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">
                Reference Files
              </label>
              <div className="mt-4">
                <FileUpload files={files} onFilesChange={setFiles} />
                <p className="mt-3 text-xs text-charcoal/60 dark:text-sand/60">File uploads are sent as file names only through this Formspree endpoint. If you need attachment support, upgrade your Formspree plan or use a dedicated upload service.</p>
                {errors.files && <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{errors.files}</p>}
              </div>
            </div>

            {statusMessage && (
              <div className={`mb-6 rounded-[32px] border px-7 py-5 text-sm ${
                statusType === 'success'
                  ? 'border-sage/30 bg-sage/10 text-charcoal dark:border-sage/30 dark:bg-sage/20 dark:text-ivory'
                  : 'border-rose-200/70 bg-rose-100 text-rose-800 dark:border-rose-300/40 dark:bg-rose-900/10 dark:text-rose-200'
              }`}>
                <p className="max-w-2xl leading-7">{statusMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={state.submitting}
              className="inline-flex items-center justify-center rounded-full bg-charcoal px-8 py-4 text-sm uppercase tracking-[0.35em] text-ivory transition hover:bg-[#3a372f] dark:bg-sand dark:text-charcoal dark:hover:bg-[#d5cabc] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state.submitting ? 'Preparing inquiry...' : 'Send inquiry'}
            </button>
          </form>
        </div>

        <div className="space-y-10 rounded-[32px] border border-mist bg-sand p-14 shadow-soft dark:border-neutral-700 dark:bg-charcoal md:p-16">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">Email</p>
            <a href="mailto:studio39ke@gmail.com" className="mt-3 block text-lg font-semibold text-charcoal dark:text-ivory">
              studio39ke@gmail.com
            </a>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">Phone</p>
            <a href="tel:+254703906562" className="mt-3 block text-lg font-semibold text-charcoal dark:text-ivory">
              +254 703 906 562
            </a>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">Follow</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm uppercase tracking-[0.35em] text-charcoal/70 dark:text-sand">
              <a href="#">Instagram</a>
              <a href="#">Behance</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
          <div className="rounded-[24px] border border-mist bg-ivory p-10 text-charcoal/70 dark:border-neutral-800 dark:bg-charcoal dark:text-sand">
            <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">Location</p>
            <div className="mt-4 space-y-3">
              <p className="text-base font-semibold text-charcoal dark:text-ivory">Imaara Mall</p>
              <p className="text-sm text-charcoal/70 dark:text-sand">Nairobi, Kenya</p>
            </div>
            <div className="mt-6 overflow-hidden rounded-[24px] border border-mist bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950">
              <iframe
                title="Imaara Mall, Nairobi, Kenya"
                src="https://maps.google.com/maps?q=Imaara%20Mall%20Nairobi%20Kenya&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[260px] w-full min-h-[260px]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
