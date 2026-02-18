import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoginHero } from "@/components/login-hero";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/bookmarks");

  return <LoginHero />;
}
