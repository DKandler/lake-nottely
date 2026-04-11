import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import BookingWidget from "@/components/BookingWidget";
import MobileBookingBar from "@/components/MobileBookingBar";
import { getProperty, properties } from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-32 lg:pb-16">
        <Gallery images={property.gallery} />

        <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-12">
          <div>
            <div className="text-sm text-ridge uppercase tracking-wider">
              Lake Nottely, Georgia
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-deep mt-1">
              {property.name}
            </h1>
            <div className="mt-2 text-deep/70">
              {property.beds} bed · {property.baths} bath · sleeps{" "}
              {property.sleeps}
            </div>

            <p className="mt-6 text-deep/90 leading-relaxed text-lg">
              {property.longDescription}
            </p>

            <section className="mt-10">
              <h2 className="font-display text-2xl text-deep">Amenities</h2>
              <ul className="mt-4 grid grid-cols-2 gap-y-2 text-deep/80">
                {property.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-peach" />
                    {a}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 bg-cream border border-sage/30 rounded-xl p-6">
              <h2 className="font-display text-2xl text-deep">
                Pricing — no hidden fees
              </h2>
              <div className="mt-4 space-y-2 text-deep">
                <div className="flex justify-between">
                  <span>Nightly rate</span>
                  <span className="font-semibold">${property.nightlyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee (one-time)</span>
                  <span className="font-semibold">${property.cleaningFee}</span>
                </div>
                <div className="flex justify-between text-sage">
                  <span>Service fee</span>
                  <span className="font-semibold">$0</span>
                </div>
              </div>
              <div className="mt-5">
                <div className="text-sm font-semibold text-deep">
                  What&apos;s included
                </div>
                <ul className="mt-2 text-sm text-deep/80 space-y-1">
                  {property.included.map((i) => (
                    <li key={i}>· {i}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-10 border-l-4 border-peach pl-6">
              <div className="text-xs uppercase tracking-wider text-ridge">
                A note from the owner
              </div>
              <p className="mt-2 text-deep/90 italic leading-relaxed">
                {property.ownerNote}
              </p>
            </section>

            <section className="mt-10 lg:hidden">
              <h2 className="font-display text-2xl text-deep mb-4">
                Availability
              </h2>
              <BookingWidget property={property} />
            </section>
          </div>

          {/* Sticky desktop widget */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <BookingWidget property={property} />
            </div>
          </aside>
        </div>
      </div>

      <MobileBookingBar property={property} />
    </>
  );
}
