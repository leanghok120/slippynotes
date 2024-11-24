import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import db from "../appwrite/databases";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const response = await db.notes.list();
    setNotes(response.documents);
  }

  return (
    <div className="h-full">
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
}

export default Notes;
