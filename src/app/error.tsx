"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <h1 className="font-display text-4xl text-deep">Something went wrong</h1>
      <p className="mt-4 text-lg text-deep/70">
        An unexpected error occurred. Try refreshing, or head back to the
        homepage.
      </p>
      <div className="mt-8 flex gap-4 justify-center">
        <button
          onClick={reset}
          className="bg-ridge text-cream px-6 py-3 rounded-md font-medium hover:bg-deep transition"
        >
          Try again
        </button>
        <a
          href="/"
          className="border border-sage text-deep px-6 py-3 rounded-md font-medium hover:bg-sage/10 transition"
        >
          Back to the cabins
        </a>
      </div>
    </div>
  );
}
