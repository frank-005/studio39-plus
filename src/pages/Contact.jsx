import { useEffect, useState } from 'react';
import { useForm } from '@formspree/react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import { site } from '../data/site';
import { trackContactFormSubmission, trackEmailClick, trackPhoneClick } from '../utils/analytics';
import ContentLink from '../components/ContentLink';

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  projectType: 'Private Residence',
  budget: '',
  timeline: '',
  message: ''
};

const projectTypeGroups = [
  {
    label: 'Residential Architecture',
    options: [
      'Private Residence',
      'Villa / Luxury Residence',
      'Compact Home / Small-Space Living',
      'Apartment Building / High-Rise Residential',
      'Multi-Residential Development',
      'Gated Community / Housing Estate',
      'Affordable Housing Development',
      'Residential Renovation / Extension'
    ]
  },
  {
    label: 'Hospitality & Leisure',
    options: [
      'Hotel / Resort',
      'Safari Lodge / Tented Camp',
      'Boutique Hotel / Guesthouse',
      'Restaurant / Café / Bar',
      'Spa / Wellness Retreat',
      'Leisure / Entertainment Facility'
    ]
  },
  {
    label: 'Commercial & Retail',
    options: [
      'Office Building / Corporate Workspace',
      'Shopping Mall / Retail Centre',
      'Supermarket / Hypermarket',
      'Retail Store / Showroom',
      'Mixed-Use Commercial Development',
      'Business Park',
      'Industrial / Warehouse Facility'
    ]
  },
  {
    label: 'Mixed-Use & Urban Development',
    options: [
      'Mixed-Use Development',
      'High-Rise Mixed-Use Tower',
      'Master Planning / Urban Design',
      'Township / Large-Scale Development',
      'Estate / Precinct Planning',
      'Site Planning / Development Feasibility'
    ]
  },
  {
    label: 'Institutional & Public Buildings',
    options: [
      'School / Educational Facility',
      'University / Campus',
      'Healthcare Facility / Hospital / Clinic',
      'Religious Building',
      'Civic / Government Building',
      'Community / Cultural Facility',
      'Sports / Recreation Facility'
    ]
  },
  {
    label: 'Interior Design & Fit-Out',
    options: [
      'Residential Interior Design',
      'Hospitality Interior Design',
      'Commercial Interior Design',
      'Retail Interior Design / Fit-Out',
      'Office Interior Design / Fit-Out',
      'Interior Renovation / Refurbishment'
    ]
  }
];
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xjgzbjll';

function Contact() {
  const [state, handleFormspreeSubmit] = useForm(FORMSPREE_FORM_ID);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const socialLinks = [
    ['Instagram', site.socialLinks.instagram],
    ['Behance', site.socialLinks.behance],
    ['LinkedIn', site.socialLinks.linkedin]
  ].filter(([, href]) => href);

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
      trackContactFormSubmission();
      setStatusType('success');
      setStatusMessage('Thank you - your inquiry has been submitted successfully. We will reply shortly.');
      setFormData(initialFormState);
      setErrors({});
    } else if (state.errors) {
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
        page="contact"
        title="Contact Studio 39+ | Start a Design Project"
        description="Contact Studio 39+ in Nairobi to discuss an architecture, interior design, renovation, hospitality, or commercial project."
      />
      <section className="content-container space-y-12 py-16 md:py-24">
        <SectionHeading
          as="h1"
          eyebrow="Let's Talk"
          title="Tell Us About Your Project."
          copy="Have a plot, an idea, or simply a feeling about what you want to create? Share a little about your vision — you don't need to have everything figured out. That's what we're here for."
        />
      </section>

      <section className="content-container grid gap-10 pb-16 lg:grid-cols-[1.1fr_.9fr] xl:gap-14">
        <div className="border border-mist bg-sand/70 p-6 shadow-soft dark:border-neutral-700 dark:bg-charcoal sm:p-8 md:p-10">
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
                <input id="location" name="location" value={formData.location} onChange={handleChange} type="text" autoComplete="street-address" placeholder="Karen, Diani, Naivasha, Nanyuki..." className="form-field" aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? 'location-error' : undefined} />
              </Field>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field id="projectType" label="Project Type">
                <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className="form-field">
                  {projectTypeGroups.map(({ label, options }) => (
                    <optgroup key={label} label={label}>
                      {options.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </Field>
              <Field id="budget" label="Budget Range" error={errors.budget}>
                <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="form-field" aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? 'budget-error' : undefined}>
                  <option value="">Select a range</option>
                  <option value="KES 1M - 10M">KES 1M - 10M</option>
                  <option value="KES 10M - 25M">KES 10M - 25M</option>
                  <option value="KES 25M - 50M">KES 25M - 50M</option>
                  <option value="KES 50M - 100M">KES 50M - 100M</option>
                  <option value="To be discussed privately">To be discussed privately</option>
                </select>
              </Field>
            </div>

            <Field id="timeline" label="Timeline" error={errors.timeline}>
              <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} className="form-field" aria-invalid={Boolean(errors.timeline)} aria-describedby={errors.timeline ? 'timeline-error' : undefined}>
                <option value="">Select a timeline</option>
                <option value="Immediate consultation">Immediate consultation</option>
                <option value="Design within 3 months">Design within 3 months</option>
                <option value="Design within 6 months">Design within 6 months</option>
                <option value="Building in 2027">Building in 2027</option>
                <option value="Exploratory / land planning">Exploratory / land planning</option>
              </select>
            </Field>

            <Field id="message" label="Project Brief" error={errors.message}>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" placeholder="Tell us about the site, rooms required, family needs, priorities, and any constraints." className="form-field" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
            </Field>

            {statusMessage && (
              <div role="status" className={`border px-6 py-5 text-sm ${statusType === 'success' ? 'border-sage/30 bg-sage/10 text-charcoal dark:bg-sage/20 dark:text-ivory' : 'border-rose-200/70 bg-rose-100 text-rose-800 dark:border-rose-300/40 dark:bg-rose-900/10 dark:text-rose-200'}`}>
                <p className="max-w-2xl leading-7">{statusMessage}</p>
              </div>
            )}

            <button type="submit" disabled={state.submitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
              {state.submitting ? 'Preparing inquiry...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>

        <aside className="space-y-10 border border-mist bg-sand/70 p-6 shadow-soft dark:border-neutral-700 dark:bg-charcoal sm:p-8 md:p-10">
          <ContactItem label="Email" href={`mailto:${site.email}`} value={site.email} onClick={() => trackEmailClick('contact_sidebar')} />
          <ContactItem label="Phone" href={`tel:${site.phone}`} value={site.displayPhone} onClick={() => trackPhoneClick('contact_sidebar')} />
          {socialLinks.length > 0 ? <div>
            <p className="eyebrow">Follow</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm uppercase tracking-[0.24em] text-charcoal/70 dark:text-sand">
              {socialLinks.map(([label, href]) => (
                <ContentLink key={label} href={href} target="_blank" rel="noreferrer">{label}</ContentLink>
              ))}
            </div>
          </div> : null}
          <div className="border border-mist bg-ivory p-6 text-charcoal/70 dark:border-neutral-800 dark:bg-charcoal dark:text-sand sm:p-8">
            <p className="eyebrow">Location</p>
            <div className="mt-4 space-y-3">
              <p className="text-base font-semibold text-charcoal dark:text-ivory">{site.address.streetAddress}</p>
              <p className="text-sm text-charcoal/70 dark:text-sand">{site.location}</p>
            </div>
            <div className="mt-6 overflow-hidden border border-mist bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950">
              <iframe title={`${site.address.streetAddress}, ${site.location}`} src={`https://maps.google.com/maps?q=${encodeURIComponent(`${site.address.streetAddress} ${site.location}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[260px] w-full min-h-[260px]" />
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
      {error && <p id={`${id}-error`} role="alert" className="mt-3 text-sm text-rose-600 dark:text-rose-300">{error}</p>}
    </div>
  );
}

function ContactItem({ label, href, value, onClick }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <a href={href} onClick={onClick} className="mt-3 block text-lg font-semibold text-charcoal dark:text-ivory">{value}</a>
    </div>
  );
}

export default Contact;
