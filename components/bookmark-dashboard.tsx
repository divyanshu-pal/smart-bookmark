"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { BookmarkHeader } from "./bookmark-header";
import { AddBookmarkForm } from "./add-bookmark-form";
import { BookmarkList } from "./bookmark-list";

export interface Bookmark {
  id: string;
  user_id: string;
  url: string;
  title: string;
  created_at: string;
}

interface Props {
  user: User;
  initialBookmarks: Bookmark[];
}

export function BookmarkDashboard({ user, initialBookmarks }: Props) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setBookmarks((prev) => {
            const exists = prev.some((b) => b.id === payload.new.id);
            if (exists) return prev;
            return [payload.new as Bookmark, ...prev];
          });
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, user.id]);

  const handleAdd = useCallback((bookmark: Bookmark) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === bookmark.id);
      if (exists) return prev;
      return [bookmark, ...prev];
    });
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      const { error } = await supabase.from("bookmarks").delete().eq("id", id);
      if (error) {
        const { data } = await supabase
          .from("bookmarks")
          .select("*")
          .order("created_at", { ascending: false });
        if (data) setBookmarks(data);
      }
    },
    [supabase],
  );

  return (
    <div className="min-h-screen bg-white">
      <BookmarkHeader user={user} />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <AddBookmarkForm userId={user.id} onAdd={handleAdd} />
        <BookmarkList bookmarks={bookmarks} onDelete={handleDelete} />
      </main>
    </div>
  );
}
