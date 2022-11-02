import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ debounceChange, value }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      buttons: ["bold", "italic", "underline", "link", "table"],
    }),
    []
  );

  return (
    <JoditEditor
      ref={editor}
      onChange={debounceChange}
      value={value}
      config={config}
      tabIndex={1}
    />
  );
};

export default TextEditor;
