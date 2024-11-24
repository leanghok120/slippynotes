import React, { useEffect, useRef, useState } from "react";
import {
  adjustNoteHeight,
  focusCard,
  parseBody,
  setNewOffset,
} from "../utils.js";
import { Trash2 } from "lucide-react";
import db from "../appwrite/databases.js";

function NoteCard({ note }) {
  const colors = JSON.parse(note.colors);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const body = parseBody(note.body);

  async function savePosition(key, value) {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.log(error);
    }
  }

  const cardRef = useRef(null);
  let mouseStartPos = { x: 0, y: 0 };

  function mouseDown(e) {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseMove(e) {
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPostion = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPostion);
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mousedown", mouseDown);

    const newPostion = setNewOffset(cardRef.current);
    savePosition("position", newPostion);
  }

  const textAreaRef = useRef(null);

  useEffect(() => {
    adjustNoteHeight(textAreaRef);
  }, []);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl w-96 absolute card"
      style={{
        backgroundColor: colors.colorBody,
        color: colors.colorText,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={() => focusCard(cardRef.current)}
    >
      <div
        className="p-2 rounded-tl-2xl rounded-tr-2xl cursor-grab"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={mouseDown}
      >
        <Trash2 />
      </div>
      <div className="p-5">
        <textarea
          ref={textAreaRef}
          id="body"
          name="body"
          className="bg-inherit focus:outline-none resize-none text-xl w-full"
          defaultValue={body}
          onInput={() => {
            adjustNoteHeight(textAreaRef);
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default NoteCard;
