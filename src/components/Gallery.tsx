"use client";
import { useState } from "react";

export default function Gallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div
        className="w-full h-[380px] sm:h-[500px] rounded-xl bg-cover bg-center border border-sage/30"
        style={{ backgroundImage: `url(${images[active]})` }}
      />
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={`h-20 sm:h-24 rounded-md bg-cover bg-center border-2 transition ${
              i === active ? "border-peach" : "border-transparent opacity-80"
            }`}
            style={{ backgroundImage: `url(${src})` }}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
