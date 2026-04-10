import Link from "next/link";
import type { Property } from "@/lib/properties";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-cream border border-sage/30 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition">
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${property.heroImage})` }}
      />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-2xl text-deep">{property.name}</h3>
        <div className="mt-1 text-sm text-deep/70">
          {property.beds} bed · {property.baths} bath · sleeps {property.sleeps}
        </div>
        <p className="mt-3 text-deep/80 text-sm flex-1">
          {property.shortDescription}
        </p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="font-display text-2xl text-deep">
              ${property.nightlyRate}
            </span>
            <span className="text-deep/60 text-sm"> / night</span>
            <div className="text-xs text-peach mt-0.5">
              No service fees — you save ~14% vs. Airbnb
            </div>
          </div>
          <Link
            href={`/properties/${property.slug}`}
            className="bg-ridge text-cream px-4 py-2 rounded-md font-medium hover:bg-deep transition text-sm"
          >
            View property
          </Link>
        </div>
      </div>
    </div>
  );
}
