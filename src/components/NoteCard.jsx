import React, { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";

function NoteCard({ note }) {
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
  const postion = JSON.parse(note.position);

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
      className="rounded-2xl w-96 absolute"
      style={{
        backgroundColor: colors.colorBody,
        color: colors.colorText,
        left: `${postion.x}px`,
        top: `${postion.y}px`,
      }}
    >
      <div
        className="p-2 rounded-tl-2xl rounded-tr-2xl"
        style={{ backgroundColor: colors.colorHeader }}
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
