"use client";

import { createClient } from "@/lib/supabase/client";

export function LoginHero() {
  async function handleLogin() {
    const supabase = createClient();

    const redirectUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${redirectUrl}/auth/callback`,
      },
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-3xl font-bold">Smart Bookmarks</h1>
        <p className="text-gray-600">
          Save, organize, and access your favorite links from anywhere. Syncs in
          real-time across all your devices.
        </p>

        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-black px-4 py-3 text-white hover:bg-gray-800 cursor-pointer"
        >
          Continue with Google
        </button>
        <p>Your bookmarks are private and only visible to you.</p>
      </div>
    </main>
  );
}
