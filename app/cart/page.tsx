export default function Page() {
  return (
    <div className="p-10 space-y-4">
      <h1 className="text-3xl font-heading text-primary">Lycia Theme Test</h1>

      <p className="text-body text-secondary">
        colors test
      </p>

      <button className="px-4 py-2 bg-primary text-white rounded">
        Primary Button
      </button>

      <div className="p-4 bg-accent text-black rounded">
        Accent Box
      </div>

      <div className="p-4 bg-warning text-black rounded">
        Warning Box
      </div>
    </div>
  );
}
