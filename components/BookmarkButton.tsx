"use client";

import Image from "next/image";
import { useState } from "react";
import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  companionId: string;
  initialIsBookmarked: boolean;
}

export default function BookmarkButton({
  companionId,
  initialIsBookmarked,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const toggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;

    setIsLoading(true);
    const prevBookmarked = isBookmarked;
    // Optimistic update
    setIsBookmarked(!prevBookmarked);

    try {
      if (prevBookmarked) {
        await removeBookmark(companionId, pathname);
      } else {
        await addBookmark(companionId, pathname);
      }
    } catch (error) {
      // Revert if failed
      setIsBookmarked(prevBookmarked);
      console.error("Failed to toggle bookmark:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleBookmark}
      disabled={isLoading}
      className="companion-bookmark hover:scale-105 transition-transform"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Image
        // Assume there is a filled bookmark icon or just use the same with different style if not available
        src={isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
        alt="Bookmark"
        width={12.5}
        height={15}
        className={cn("transition-opacity", isLoading && "opacity-50", isBookmarked && "invert")} // added invert if there's no filled svg
      />
    </button>
  );
}
