import { createClient } from "@/lib/supabase/server";
import { BookmarkDashboard } from "@/components/bookmark-dashboard";

export default async function BookmarksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  return <BookmarkDashboard user={user!} initialBookmarks={bookmarks ?? []} />;
}
