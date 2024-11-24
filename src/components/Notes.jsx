import React from "react";
import NoteCard from "./NoteCard";
import { dummydata as notes } from "../assets/dummydata.js";

function Notes() {
  return (
    <div className="h-full">
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
}

export default Notes;
