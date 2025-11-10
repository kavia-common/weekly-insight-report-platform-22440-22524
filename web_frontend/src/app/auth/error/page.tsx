export default function AuthError() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <section className="card p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-2">Authentication Error</h1>
        <p className="text-sm text-gray-600">
          There was a problem signing you in. Please verify that the redirect URL is allowed
          in Supabase Authentication settings and try again.
        </p>
      </section>
    </main>
  );
}
