"use client";
import { useState, useEffect, useCallback } from "react";

export default function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(
    () => setActive((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length]
  );
  const next = useCallback(
    () => setActive((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  return (
    <>
      {/* Airbnb-style grid: 1 large + 4 small */}
      <div className="relative grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-2 rounded-xl overflow-hidden h-[300px] sm:h-[420px]">
        {/* Main image */}
        <button
          onClick={() => { setActive(0); setLightbox(true); }}
          className="sm:col-span-2 sm:row-span-2 bg-cover bg-center relative group"
          style={{ backgroundImage: `url(${images[0]})` }}
          aria-label="View photos"
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
        </button>

        {/* 4 smaller images */}
        {images.slice(1, 5).map((src, i) => (
          <button
            key={src}
            onClick={() => { setActive(i + 1); setLightbox(true); }}
            className="hidden sm:block bg-cover bg-center relative group"
            style={{ backgroundImage: `url(${src})` }}
            aria-label={`Photo ${i + 2}`}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
          </button>
        ))}

        {/* Show all photos button */}
        <button
          onClick={() => { setActive(0); setLightbox(true); }}
          className="absolute bottom-3 right-3 bg-cream/95 text-deep text-xs font-medium px-3 py-1.5 rounded-md border border-deep/20 hover:bg-cream transition z-10"
        >
          Show all {images.length} photos
        </button>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-deep/95 z-50 flex flex-col items-center justify-center">
          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-cream/80 hover:text-cream text-2xl z-50"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-cream/70 text-sm">
            {active + 1} / {images.length}
          </div>

          {/* Main image */}
          <div
            className="w-full max-w-5xl h-[70vh] bg-contain bg-center bg-no-repeat mx-4"
            style={{ backgroundImage: `url(${images[active]})` }}
          />

          {/* Arrow buttons */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-cream/15 hover:bg-cream/30 text-cream w-12 h-12 rounded-full flex items-center justify-center text-2xl transition"
            aria-label="Previous photo"
          >
            &#8249;
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-cream/15 hover:bg-cream/30 text-cream w-12 h-12 rounded-full flex items-center justify-center text-2xl transition"
            aria-label="Next photo"
          >
            &#8250;
          </button>

          {/* Thumbnail strip */}
          <div className="mt-4 flex gap-2 overflow-x-auto max-w-5xl px-4 pb-4">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`shrink-0 w-16 h-12 rounded bg-cover bg-center border-2 transition ${
                  i === active ? "border-peach" : "border-transparent opacity-60 hover:opacity-100"
                }`}
                style={{ backgroundImage: `url(${src})` }}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
