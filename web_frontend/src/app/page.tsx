export default function Home() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <section className="text-center">
        <h1 className="text-black text-4xl font-light mb-3">
          DigitalT3 Weekly Report Platform
        </h1>
        <p className="text-gray-700 mb-6">
          Frontend is running. Use the links below to verify connectivity.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/healthz"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Health check
          </a>
          <a
            href="/non-existent"
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Trigger 404
          </a>
        </div>
      </section>
    </main>
  );
}
