"use client";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";
import type { Property } from "@/lib/properties";

export default function BookingWidget({ property }: { property: Property }) {
  const router = useRouter();
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const [start, end] = range;

  const excludeDates = useMemo(
    () => property.blockedDates.map((d) => new Date(d + "T00:00:00")),
    [property.blockedDates]
  );

  const nights =
    start && end
      ? Math.max(
          0,
          Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
        )
      : 0;
  const subtotal = nights * property.nightlyRate;
  const total = subtotal ? subtotal + property.cleaningFee : 0;

  const submit = () => {
    if (!start || !end) return;
    const params = new URLSearchParams({
      property: property.slug,
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    });
    router.push(`/book?${params.toString()}`);
  };

  return (
    <div className="bg-cream border border-sage/40 rounded-xl p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="font-display text-3xl text-deep">
            ${property.nightlyRate}
          </span>
          <span className="text-deep/60"> / night</span>
        </div>
        <div className="text-xs text-sage uppercase tracking-wider">
          No fees
        </div>
      </div>

      <div className="mt-5">
        <DatePicker
          selected={start}
          onChange={(r) => setRange(r as [Date | null, Date | null])}
          startDate={start}
          endDate={end}
          selectsRange
          inline
          minDate={new Date()}
          excludeDates={excludeDates}
          monthsShown={1}
        />
      </div>

      {nights > 0 && (
        <div className="mt-5 text-sm text-deep space-y-1">
          <div className="flex justify-between">
            <span>
              ${property.nightlyRate} × {nights} night{nights > 1 ? "s" : ""}
            </span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>${property.cleaningFee}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t border-sage/30 mt-2">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}

      <button
        onClick={submit}
        disabled={!start || !end || nights === 0}
        className="mt-5 w-full bg-ridge text-cream py-3 rounded-md font-semibold hover:bg-deep transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Request to book
      </button>
      <p className="mt-3 text-xs text-deep/60 text-center">
        We confirm within 2 hours. No account needed.
      </p>
    </div>
  );
}
