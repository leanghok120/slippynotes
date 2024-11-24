import React from "react";
import { Plus } from "lucide-react";

export default function AddNotes() {
  return (
    <button className="bg-gruvbox-gray rounded-full p-2 z-[1000] transition-all hover:scale-110">
      <Plus />
    </button>
  );
}
