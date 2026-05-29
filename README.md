# Studio 39+

A premium architecture studio website built with React, Vite, Tailwind CSS, and Framer Motion. The design direction is minimal, atmospheric, and editorial.

## Run locally

1. Install dependencies:

   npm install

2. Optional: copy `.env.example` to `.env.local` and add your Google Analytics 4 Measurement ID:

   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

3. Start the development server:

   npm run dev

4. Open the local URL shown in the terminal to preview the site.

## Google Analytics 4

Create a GA4 web data stream in Google Analytics, copy its Measurement ID, and add it to `.env.local` as `VITE_GA_MEASUREMENT_ID`. The gtag script is only loaded when that environment variable exists.

The implementation tracks page views, React route changes, contact form submissions, WhatsApp clicks, email clicks, phone clicks, and contact-form PDF/image upload attempts.

## Project structure

- `src/`
  - `components/` — reusable UI components
  - `layouts/` — shared page layout components
  - `pages/` — route-based page views
  - `data/` — site content, projects, services, workflow
  - `styles/` — Tailwind CSS entrypoint

## Features

- Responsive architecture-inspired layout
- Smooth page transitions with Framer Motion
- Sticky transparent navigation
- Filterable project gallery
- Minimal editorial styling and premium spacing
