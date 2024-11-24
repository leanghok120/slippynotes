import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import AddNotes from "./AddNotes";
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
    <div className="h-full flex items-center p-5">
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
      <AddNotes />
    </div>
  );
}

export default Notes;
