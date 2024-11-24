import React from "react";

function NoteCard({ note }) {
  const body = JSON.parse(note.body);
  const colors = JSON.parse(note.colors);
  const postion = JSON.parse(note.position);

  return (
    <div
      className="rounded-2xl p-5 w-96 absolute"
      style={{
        backgroundColor: colors.colorBody,
        color: colors.colorText,
        left: `${postion.x}px`,
        top: `${postion.y}px`,
      }}
    >
      <textarea
        id="body"
        name="body"
        className="bg-inherit focus:outline-none resize-none text-xl w-full"
      >
        {body}
      </textarea>
    </div>
  );
}

export default NoteCard;
