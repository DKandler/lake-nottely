"use client";
import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/properties";
import { cloudinaryLoader } from "@/lib/cloudinary";

export default function PropertyCard({ property }: { property: Property }) {
  const isPlaceholder = property.heroImage === "placeholder";
  const photos = property.gallery.slice(0, 3);

  return (
    <div className="bg-cream border border-sage/30 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition">
      {/* Photo grid: 1 large left + up to 2 small right */}
      <Link
        href={`/properties/${property.slug}`}
        className="h-64 relative group"
      >
        {isPlaceholder ? (
          <div className="w-full h-full bg-sage flex items-center justify-center">
            <span className="font-display text-xl text-cream/90">
              Photos coming soon
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-3 grid-rows-2 gap-0.5 h-full">
            <div className="col-span-2 row-span-2 relative overflow-hidden">
              <Image
                loader={cloudinaryLoader}
                src={photos[0]}
                alt={property.name}
                fill
                sizes="(max-width: 768px) 66vw, 33vw"
                className="object-cover"
              />
            </div>
            {photos[1] && (
              <div className="relative overflow-hidden">
                <Image
                  loader={cloudinaryLoader}
                  src={photos[1]}
                  alt={`${property.name} photo 2`}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover"
                />
              </div>
            )}
            {photos[2] && (
              <div className="relative overflow-hidden">
                <Image
                  loader={cloudinaryLoader}
                  src={photos[2]}
                  alt={`${property.name} photo 3`}
                  fill
                  sizes="(max-width: 768px) 33vw, 16vw"
                  className="object-cover"
                />
                {property.gallery.length > 3 && (
                  <span className="absolute bottom-2 right-2 bg-cream/90 text-deep text-xs font-medium px-2 py-1 rounded border border-deep/15 z-10">
                    +{property.gallery.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
      </Link>

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
