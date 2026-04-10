import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/lib/properties";

export default function Home() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-10 h-0.5 bg-peach rounded-full" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-deep leading-snug">
          Direct from the dock.
        </h1>
        <p className="mt-4 text-lg text-deep/70 max-w-md mx-auto">
          Waterfront cabins on Lake Nottely, Georgia —<br className="hidden sm:inline" />
          booked direct, no fees.
        </p>
        <Link
          href="#properties"
          className="mt-8 inline-block bg-peach text-deep px-6 py-3 rounded-md font-medium hover:bg-peach/80 transition"
        >
          See the cabins
        </Link>
      </section>

      <section className="bg-sage/15 rounded-2xl max-w-5xl mx-auto px-6 py-10 mb-8">
        <div className="grid sm:grid-cols-[1fr_auto] gap-8 items-center">
          <p className="text-deep/85 leading-relaxed">
            Skip the middleman. Book directly with Lake Nottely homeowners
            — no Airbnb fees, no VRBO markup, just the cabin and the owner.
          </p>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="font-display text-2xl text-peach">~14%</div>
              <div className="text-xs text-deep/60 mt-1">saved vs. Airbnb</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl text-deep">Direct</div>
              <div className="text-xs text-deep/60 mt-1">from the owner</div>
            </div>
          </div>
        </div>
      </section>

      <section id="properties" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl text-deep">The cabins</h2>
        <p className="mt-2 text-deep/70 max-w-lg">
          Two homes on the water. Pick the one that fits your week.
        </p>
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {properties.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      </section>
    </>
  );
}
