import React, { useEffect, useRef, useState } from "react";
import { adjustNoteHeight, focusCard, setNewOffset } from "../utils.js";
import { Trash2 } from "lucide-react";

function NoteCard({ note }) {
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
  const [position, setPosition] = useState(JSON.parse(note.position));

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
