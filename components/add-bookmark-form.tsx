"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Bookmark } from "./bookmark-dashboard";

interface Props {
  userId: string;
  onAdd: (bookmark: Bookmark) => void;
}

export function AddBookmarkForm({ userId, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !url) return;

    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("bookmarks")
      .insert({
        title,
        url,
      })
      .select()
      .single();

    if (error) {
      console.error("Insert failed:", error);
      return;
    }

    if (data) {
      onAdd(data);
    }

    setTitle("");
    setUrl("");
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md mx-auto overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl ring-1 ring-black/5"
    >
      <div className="px-6 pt-6 pb-2">
        <h3 className="text-lg font-semibold text-gray-900">New Bookmark</h3>
        <p className="text-sm text-gray-500">
          Save a new link to your collection.
        </p>
      </div>

      <div className="p-6 space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="title"
            className="block text-xs font-medium tracking-wide text-gray-500 uppercase"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Design Inspiration"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 transition-all duration-200 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="url"
            className="block text-xs font-medium tracking-wide text-gray-500 uppercase"
          >
            URL
          </label>
          <input
            id="url"
            type="text"
            placeholder="https://"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 transition-all duration-200 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="relative w-full py-3.5 font-medium text-white transition-all duration-200 bg-gray-900 rounded-xl hover:bg-black hover:shadow-lg hover:shadow-gray-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Saving...
            </span>
          ) : (
            "Add Bookmark"
          )}
        </button>
      </div>
    </form>
  );
}
