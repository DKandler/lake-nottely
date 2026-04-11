import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-sage bg-cream/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            src="/logo.svg"
            alt="Lake Nottely Stays logo"
            width={72}
            height={72}
            className="h-[72px] w-[72px] object-cover rounded-full"
          />
          <span className="font-display text-xl font-bold text-deep">
            Lake Nottely Stays
          </span>
        </Link>
      </div>
    </header>
  );
}
