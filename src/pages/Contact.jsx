import { useEffect, useState } from 'react';
import { useForm } from '@formspree/react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import FileUpload from '../components/FileUpload';
import { site } from '../data/site';

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  projectType: 'Residential',
  budget: '',
  timeline: '',
  message: ''
};

const projectTypes = ['Residential Architecture', 'Hospitality Architecture', 'Safari Camp Design', 'Interior Architecture', 'Architectural Visualization', 'Renovation', 'Conceptual'];
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

    if (!formData.fullName.trim()) nextErrors.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) nextErrors.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
    if (!formData.phone.trim()) nextErrors.phone = 'Please provide a phone number.';
    if (!formData.location.trim()) nextErrors.location = 'Please share the project location.';
    if (!formData.budget.trim()) nextErrors.budget = 'Please share an estimated budget.';
    if (!formData.timeline.trim()) nextErrors.timeline = 'Please share the expected timeline.';
    if (!formData.message.trim()) nextErrors.message = 'Tell us a little more about the project.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  useEffect(() => {
    if (state.succeeded) {
      setStatusType('success');
      setStatusMessage('Thank you - your inquiry has been submitted successfully. We will reply shortly.');
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

    if (!validateForm()) return;
    handleFormspreeSubmit(event);
  };

  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-32">
      <SEO
        title="Book an Architecture Consultation in Nairobi"
        description="Contact Studio 39+ to discuss residential architecture, hospitality design, safari lodge concepts, interiors, and architectural visualization in Kenya."
      />
      <section className="content-container space-y-12 py-14 md:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Tell us about your project."
          copy="Begin a conversation with Studio 39+. Share your site, project type, timeline, and visual ambition so we can respond with a considered next step."
        />
      </section>

      <section className="content-container grid gap-10 pb-16 lg:grid-cols-[1.1fr_.9fr] xl:gap-14">
        <div className="border border-mist bg-sand p-6 shadow-soft dark:border-neutral-700 dark:bg-charcoal sm:p-8 md:p-10">
          <form className="space-y-9" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6 md:grid-cols-2">
              <Field id="fullName" label="Full Name" error={errors.fullName}>
                <input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} type="text" autoComplete="name" placeholder="Your full name" className="form-field" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
              </Field>
              <Field id="email" label="Email Address" error={errors.email}>
                <input id="email" name="email" value={formData.email} onChange={handleChange} type="email" autoComplete="email" placeholder="hello@domain.com" className="form-field" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
              </Field>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field id="phone" label="Phone Number" error={errors.phone}>
                <input id="phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" autoComplete="tel" placeholder="+254 700 000 000" className="form-field" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
              </Field>
              <Field id="location" label="Project Location" error={errors.location}>
                <input id="location" name="location" value={formData.location} onChange={handleChange} type="text" autoComplete="street-address" placeholder="City, region or landmark" className="form-field" aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? 'location-error' : undefined} />
              </Field>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field id="projectType" label="Project Type">
                <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className="form-field">
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </Field>
              <Field id="budget" label="Estimated Budget" error={errors.budget}>
                <input id="budget" name="budget" value={formData.budget} onChange={handleChange} type="text" placeholder="e.g. $45k - $80k" className="form-field" aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? 'budget-error' : undefined} />
              </Field>
            </div>

            <Field id="timeline" label="Expected Timeline" error={errors.timeline}>
              <input id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} type="text" placeholder="e.g. Concept in 6 weeks, build in 2027" className="form-field" aria-invalid={Boolean(errors.timeline)} aria-describedby={errors.timeline ? 'timeline-error' : undefined} />
            </Field>

            <Field id="message" label="Message / Project Brief" error={errors.message}>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" placeholder="Tell us about your vision, timeline, and any special priorities." className="form-field" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
            </Field>

            <input type="hidden" name="fileNames" value={files.map((file) => file.name).join(', ')} />
            <div>
              <p className="eyebrow">Reference Files</p>
              <div className="mt-4">
                <FileUpload files={files} onFilesChange={setFiles} />
                <p className="mt-3 text-xs leading-6 text-charcoal/60 dark:text-sand/60">Optional: add sketches, site photos, inspiration imagery, PDFs, or project information. File names are included with the inquiry.</p>
              </div>
            </div>

            {statusMessage && (
              <div role="status" className={`border px-6 py-5 text-sm ${statusType === 'success' ? 'border-sage/30 bg-sage/10 text-charcoal dark:bg-sage/20 dark:text-ivory' : 'border-rose-200/70 bg-rose-100 text-rose-800 dark:border-rose-300/40 dark:bg-rose-900/10 dark:text-rose-200'}`}>
                <p className="max-w-2xl leading-7">{statusMessage}</p>
              </div>
            )}

            <button type="submit" disabled={state.submitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
              {state.submitting ? 'Preparing inquiry...' : 'Begin a conversation'}
            </button>
          </form>
        </div>

        <aside className="space-y-10 border border-mist bg-sand p-6 shadow-soft dark:border-neutral-700 dark:bg-charcoal sm:p-8 md:p-10">
          <ContactItem label="Email" href={`mailto:${site.email}`} value={site.email} />
          <ContactItem label="Phone" href={`tel:${site.phone}`} value={site.displayPhone} />
          <div>
            <p className="eyebrow">Quick Contact</p>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-sand">
              WhatsApp Studio 39+
            </a>
          </div>
          <div>
            <p className="eyebrow">Follow</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm uppercase tracking-[0.24em] text-charcoal/70 dark:text-sand">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.behance.net/" target="_blank" rel="noreferrer">Behance</a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="border border-mist bg-ivory p-6 text-charcoal/70 dark:border-neutral-800 dark:bg-charcoal dark:text-sand sm:p-8">
            <p className="eyebrow">Location</p>
            <div className="mt-4 space-y-3">
              <p className="text-base font-semibold text-charcoal dark:text-ivory">Imaara Mall</p>
              <p className="text-sm text-charcoal/70 dark:text-sand">Nairobi, Kenya</p>
            </div>
            <div className="mt-6 overflow-hidden border border-mist bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950">
              <iframe title="Imaara Mall, Nairobi, Kenya" src="https://maps.google.com/maps?q=Imaara%20Mall%20Nairobi%20Kenya&t=&z=15&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[260px] w-full min-h-[260px]" />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow">{label}</label>
      <div className="mt-4">{children}</div>
      {error && <p id={`${id}-error`} className="mt-3 text-sm text-rose-600 dark:text-rose-300">{error}</p>}
    </div>
  );
}

function ContactItem({ label, href, value }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <a href={href} className="mt-3 block text-lg font-semibold text-charcoal dark:text-ivory">{value}</a>
    </div>
  );
}

export default Contact;
