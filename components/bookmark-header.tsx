"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

interface Props {
  user: User;
}

export function BookmarkHeader({ user }: Props) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="flex flex-col items-center justify-between  bg-white px-6 py-8 gap-8">
      <h1 className="text-lg font-semibold">Smart Bookmarks</h1>

      <div className="flex items-center gap-8">
        <span className="text-sm text-gray-600">{user.email}</span>
        <button onClick={handleLogout} className="text-sm text-red-600">
          Logout
        </button>
      </div>
    </header>
  );
}
