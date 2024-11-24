export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export const adjustNoteHeight = (textAreaRef) => {
  const textarea = textAreaRef.current;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
};
