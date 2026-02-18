import type { Bookmark } from "./bookmark-dashboard";

interface Props {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
}

export function BookmarkItem({ bookmark, onDelete }: Props) {
  const hostname = new URL(bookmark.url).hostname.replace("www.", "");

  return (
    <div className="flex items-center justify-between rounded border bg-white p-3">
      <div>
        <p className="font-medium">{bookmark.title}</p>
        <p className="text-sm text-gray-500">{hostname}</p>
      </div>

      <div className="flex gap-2">
        <a
          href={bookmark.url}
          target="_blank"
          className="text-green-600 cursor-pointer"
        >
          Open
        </a>

        <button
          onClick={() => onDelete(bookmark.id)}
          className="text-red-600 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
