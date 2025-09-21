"use client";

import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { isValidUrl } from "@/lib/utils";
import { ClipboardPaste } from "lucide-react";

export const InputUrl = ({
  url,
  setUrl,
  loading,
}: {
  url: string;
  setUrl: (url: string) => void;
  loading: boolean;
}) => {
  const paste = async () => {
    try {
      const url = await navigator.clipboard.readText();
      if (!isValidUrl(url)) {
        throw new Error("Invalid URL");
      }

      setUrl(url);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Input
          id="url"
          placeholder="Enter or Paste YouTube/Instagram URL here"
          className="font-mono"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={paste}>
          <ClipboardPaste /> Paste
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
