import Link from "next/link";
import type { Property } from "@/lib/properties";

export default function MobileBookingBar({ property }: { property: Property }) {
  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30 bg-cream border border-sage/40 rounded-full shadow-lg px-5 py-3 flex items-center justify-between">
      <div className="text-sm">
        <div className="font-semibold text-deep">
          ${property.nightlyRate}
          <span className="font-normal text-deep/60"> / night</span>
        </div>
        <div className="text-xs text-sage">No fees</div>
      </div>
      <Link
        href={`/book?property=${property.slug}`}
        className="bg-ridge text-cream px-5 py-2 rounded-full font-medium text-sm"
      >
        Request to book
      </Link>
    </div>
  );
}
