import type { Bookmark } from "./bookmark-dashboard";
import { BookmarkItem } from "./bookmark-item";

interface Props {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
}

export function BookmarkList({ bookmarks, onDelete }: Props) {
  if (bookmarks.length === 0) {
    return <p className="text-gray-500">No bookmarks yet.</p>;
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
