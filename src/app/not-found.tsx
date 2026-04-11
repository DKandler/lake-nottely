import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <h1 className="font-display text-5xl text-deep">404</h1>
      <p className="mt-4 text-lg text-deep/70">
        This page doesn&apos;t exist — maybe the URL changed, or you followed an
        old link.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-ridge text-cream px-6 py-3 rounded-md font-medium hover:bg-deep transition"
      >
        Back to the cabins
      </Link>
    </div>
  );
}
