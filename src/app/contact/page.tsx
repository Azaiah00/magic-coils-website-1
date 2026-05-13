// READY-TO-PASTE replacement that wires the contact form to Netlify Forms.
// Drafted May 13, 2026 — see Magic_Coils_Dev_Brief_2_Site_Fixes.md section 2.4
//
// Why this is a server component (NO "use client"):
//   Netlify scans the production build HTML at build time for any
//   <form data-netlify="true">. The form must end up in the static
//   output for Netlify to register it. If we made this a client
//   component the form would only render on the client and Netlify
//   would never see it.
//
// ONE-TIME ACTION (Frederick, after first deploy):
//   Netlify dashboard -> Forms tab -> "contact" form ->
//   Notifications -> Add email notification -> info@magiccoils.net
//   That routes every form submission to the inbox automatically.

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Magic Coils",
  description:
    "Reach the Magic Coils team for product questions, wholesale inquiries, press, or anything else. info@magiccoils.net · (843) 344-7131 · Mon–Fri 9 AM – 5 PM ET.",
  alternates: { canonical: "https://magiccoils.net/contact" },
  openGraph: {
    title: "Contact Us | Magic Coils",
    description:
      "Reach the Magic Coils team — product questions, wholesale, press, stylist program.",
    url: "https://magiccoils.net/contact",
    type: "website",
  },
};

type SearchParams = { success?: string };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // After Netlify accepts a form post it redirects to ?success=1, and
  // we switch the page render to the thank-you state below.
  const params = await searchParams;
  const submitted = params?.success === "1";

  return (
    <main className="min-h-screen flex flex-col w-full">
      <Navbar />

      <section className="bg-background py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">
              Contact Us
            </h1>
            <p className="font-sans text-base md:text-lg text-primary/70 max-w-2xl mx-auto leading-relaxed">
              We&apos;re here to help you on your journey to healthy, beautiful hair. Reach out
              with any questions or inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Contact details column */}
            <div className="md:col-span-1">
              <h2 className="font-serif text-xl text-primary mb-6">Get in Touch</h2>

              <div className="space-y-6 text-sm">
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-accent mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+18433447131"
                    className="font-sans text-primary hover:text-accent transition-colors"
                  >
                    (843) 344-7131
                  </a>
                  <p className="font-sans text-xs text-primary/60 mt-1">
                    Mon–Fri, 9 AM – 5 PM ET
                  </p>
                </div>

                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-accent mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:info@magiccoils.net"
                    className="font-sans text-primary hover:text-accent transition-colors"
                  >
                    info@magiccoils.net
                  </a>
                  <p className="font-sans text-xs text-primary/60 mt-1">
                    We aim to respond within 24 hours
                  </p>
                </div>

                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-accent mb-1">
                    Company
                  </p>
                  <p className="font-sans text-primary">Hair For You LLC</p>
                  <p className="font-sans text-xs text-primary/60 mt-1">
                    Magic Coils Professional Hair Products
                  </p>
                </div>
              </div>
            </div>

            {/* Form column. Renders either the form or the success
                state depending on the ?success=1 URL param. */}
            <div className="md:col-span-2">
              {submitted ? <SuccessState /> : <ContactForm />}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactForm() {
  return (
    <form
      // Netlify uses this name as the form identifier in the dashboard.
      name="contact"
      method="POST"
      // After a successful POST, Netlify redirects here. We use ?success=1
      // so the page above re-renders with the SuccessState.
      action="/contact?success=1"
      // The magic flag that tells Netlify to register and intercept this form.
      data-netlify="true"
      // Spam protection — bots fill in the hidden bot-field, real users don't.
      data-netlify-honeypot="bot-field"
      className="space-y-6"
    >
      {/* Required Netlify form-name hidden input — has to be present
          in the rendered HTML or Netlify won't accept the submission. */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot — visually hidden, but bots will still fill it.
          Netlify drops any submission where this isn't empty. */}
      <p className="hidden" aria-hidden="true">
        <label>
          Don&apos;t fill this out if you&apos;re human:{" "}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block font-sans text-xs uppercase tracking-widest text-accent mb-2"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            required
            autoComplete="given-name"
            className="w-full bg-surface border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent focus:bg-white transition-colors duration-300"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block font-sans text-xs uppercase tracking-widest text-accent mb-2"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            required
            autoComplete="family-name"
            className="w-full bg-surface border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent focus:bg-white transition-colors duration-300"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-sans text-xs uppercase tracking-widest text-accent mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          className="w-full bg-surface border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent focus:bg-white transition-colors duration-300"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block font-sans text-xs uppercase tracking-widest text-accent mb-2"
        >
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue="General Inquiry"
          className="w-full bg-surface border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent focus:bg-white transition-colors duration-300"
        >
          <option>General Inquiry</option>
          <option>Order Status</option>
          <option>Returns &amp; Refunds</option>
          <option>Wholesale &amp; Distributor</option>
          <option>Stylist Program (Royal Court)</option>
          <option>Press &amp; Media</option>
          <option>Product Question</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-sans text-xs uppercase tracking-widest text-accent mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full bg-surface border border-surface px-4 py-3 text-sm focus:outline-none focus:border-accent focus:bg-white transition-colors duration-300 resize-y"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-primary text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-accent transition-colors duration-300"
      >
        Send Message
      </button>

      <p className="font-sans text-xs text-primary/50 mt-4">
        By submitting this form, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-accent">
          Privacy Policy
        </Link>
        . We&apos;ll only use your information to respond to your inquiry.
      </p>
    </form>
  );
}

function SuccessState() {
  return (
    <div className="bg-surface border-2 border-accent p-10 md:p-14 text-center">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-accent"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="font-serif text-3xl text-primary mb-3">Message sent.</h2>
      <p className="font-sans text-base text-primary/70 mb-2 max-w-md mx-auto leading-relaxed">
        Thank you for reaching out. Our team will reply within 24 hours to the
        email you provided.
      </p>
      <p className="font-sans text-sm text-primary/50 mb-8">
        Watch your inbox (and your Promotions/Spam tab just in case).
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-accent transition-colors duration-300"
      >
        Back to Magic Coils
      </Link>
    </div>
  );
}
