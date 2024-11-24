import React from "react";
import { Plus } from "lucide-react";
import db from "../appwrite/databases";
import colors from "../assets/colors.json";

export default function AddNotes({ fetchNotes }) {
  const addNote = async () => {
    const payload = {
      body: "",
      position: JSON.stringify({
        x: 10,
        y: 10,
      }),
      colors: JSON.stringify(colors[0]),
    };

    await db.notes.create(payload);
    fetchNotes();
  };

  return (
    <button
      className="bg-gruvbox-gray rounded-full p-2 z-[1000] transition-all hover:scale-110"
      onClick={addNote}
    >
      <Plus />
    </button>
  );
}
