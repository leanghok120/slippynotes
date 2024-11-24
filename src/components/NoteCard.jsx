import React, { useEffect, useRef, useState } from "react";
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

    setPosition({
      x: cardRef.current.offsetLeft - mouseMoveDir.x,
      y: cardRef.current.offsetTop - mouseMoveDir.y,
    });
  }

  function mouseUp() {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mousedown", mouseDown);
  }

  const textAreaRef = useRef(null);

  function adjustNoteHeight() {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  useEffect(() => {
    adjustNoteHeight();
  }, []);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl w-96 absolute"
      style={{
        backgroundColor: colors.colorBody,
        color: colors.colorText,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="p-2 rounded-tl-2xl rounded-tr-2xl"
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
          onInput={adjustNoteHeight}
        ></textarea>
      </div>
    </div>
  );
}

export default NoteCard;
