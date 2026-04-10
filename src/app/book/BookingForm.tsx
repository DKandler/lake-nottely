"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import emailjs from "@emailjs/browser";
import type { Property } from "@/lib/properties";

const EMAILJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export default function BookingForm({
  property,
  defaultStart,
  defaultEnd,
}: {
  property: Property;
  defaultStart: string;
  defaultEnd: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    start: defaultStart,
    end: defaultEnd,
    message: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // Calculate pricing
      const start = new Date(form.start);
      const end = new Date(form.end);
      const nights = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
      const totalPrice = nights * property.nightlyRate + property.cleaningFee;

      const { error: dbError } = await supabase.from("bookings").insert({
        property_slug: property.slug,
        guest_name: form.name,
        guest_email: form.email,
        guest_phone: form.phone,
        check_in: form.start,
        check_out: form.end,
        nightly_rate: property.nightlyRate,
        cleaning_fee: property.cleaningFee,
        total_price: totalPrice,
        message: form.message || null,
        status: "pending",
      });

      if (dbError) throw dbError;

      // Send email notification to owner (non-blocking — don't fail the booking if email fails)
      if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_KEY) {
        emailjs
          .send(
            EMAILJS_SERVICE,
            EMAILJS_TEMPLATE,
            {
              property_name: property.name,
              guest_name: form.name,
              guest_email: form.email,
              guest_phone: form.phone,
              check_in: form.start,
              check_out: form.end,
              nights: String(nights),
              total_price: String(totalPrice),
              message: form.message || "No message",
            },
            { publicKey: EMAILJS_KEY }
          )
          .catch((err) => console.warn("Email notification failed:", err));
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please text or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-cream border border-sage/40 rounded-xl p-8 text-center">
        <div className="font-display text-3xl text-deep">Request received.</div>
        <p className="mt-3 text-deep/80">
          We&apos;ll confirm <strong>within 2 hours</strong>. Watch your email
          — and check spam just in case.
        </p>
        <div className="mt-6 text-sm text-deep/60">
          {property.name} · {form.start || "—"} → {form.end || "—"}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-cream border border-sage/40 rounded-xl p-6 space-y-4"
    >
      <Field label="Your name">
        <input
          required
          value={form.name}
          onChange={update("name")}
          className="input"
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email">
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            className="input"
          />
        </Field>
        <Field label="Phone">
          <input
            required
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            className="input"
          />
        </Field>
      </div>

      <Field label="Property">
        <input
          value={property.name}
          readOnly
          className="input bg-cream/50 cursor-not-allowed"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Check-in">
          <input
            required
            type="date"
            value={form.start}
            onChange={update("start")}
            className="input"
          />
        </Field>
        <Field label="Check-out">
          <input
            required
            type="date"
            value={form.end}
            onChange={update("end")}
            className="input"
          />
        </Field>
      </div>

      <Field label="Message (optional)">
        <textarea
          rows={4}
          value={form.message}
          onChange={update("message")}
          placeholder="Anything we should know? Number of guests, dogs, arrival time..."
          className="input resize-none"
        />
      </Field>

      {error && <div className="text-sm text-red-700">{error}</div>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-ridge text-cream py-3 rounded-md font-semibold hover:bg-deep transition disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Send request"}
      </button>
      <p className="text-xs text-deep/60 text-center">
        We confirm within 2 hours. No fees, no account.
      </p>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid rgba(124, 157, 150, 0.5);
          border-radius: 6px;
          background: #fff;
          color: #2c3e52;
          font-size: 0.95rem;
          font-family: inherit;
        }
        .input:focus {
          outline: none;
          border-color: #5b7c99;
          box-shadow: 0 0 0 3px rgba(91, 124, 153, 0.15);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-deep mb-1">{label}</div>
      {children}
    </label>
  );
}
