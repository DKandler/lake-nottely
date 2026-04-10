import BookingForm from "./BookingForm";
import { properties } from "@/lib/properties";

export default function BookPage({
  searchParams,
}: {
  searchParams: { property?: string; start?: string; end?: string };
}) {
  const slug = searchParams.property ?? properties[0].slug;
  const property =
    properties.find((p) => p.slug === slug) ?? properties[0];

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-sm uppercase tracking-wider text-ridge">
        Booking request
      </div>
      <h1 className="font-display text-4xl text-deep mt-1">
        Request {property.name}
      </h1>
      <p className="mt-3 text-deep/70">
        Fill this out and we&apos;ll confirm within 2 hours. No account, no
        service fees.
      </p>

      <div className="mt-8">
        <BookingForm
          property={property}
          defaultStart={searchParams.start ?? ""}
          defaultEnd={searchParams.end ?? ""}
        />
      </div>
    </div>
  );
}
