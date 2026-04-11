export default function Footer() {
  return (
    <footer className="bg-sage mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-4 text-sm text-cream/85">
        <div>
          <div className="font-display text-lg text-cream">Lake Nottely Stays</div>
          <div>Blairsville, Georgia · Direct from the dock.</div>
        </div>
        <div className="sm:text-right">
          <div>&copy; {new Date().getFullYear()} Lake Nottely Stays</div>
          <div>Booked direct. No fees.</div>
        </div>
      </div>
    </footer>
  );
}
