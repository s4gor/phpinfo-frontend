import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { e?: string };
}) {
  const err =
    searchParams.e === "invalid"
      ? "That link is invalid or expired. Request a new one."
      : searchParams.e === "missing"
        ? "Token missing."
        : null;
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-sm font-bold text-violet-600">phpinfo() WP · Admin</span>
          <h1 className="mt-2 text-2xl font-semibold text-zinc-900">Sign in</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Enter your admin email to receive a one-time sign-in link.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          {err ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {err}
            </div>
          ) : null}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
