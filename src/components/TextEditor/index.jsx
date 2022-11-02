import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ debounceChange, value, disabled}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      buttons: ["bold", "italic", "underline", "link", "table","ul", "ol", "image"],
      height: '92vh',
      disabled: disabled
    }),
    [disabled]
  );

  // console.log(value)
  return (
    <JoditEditor
      ref={editor}
      onChange={debounceChange}
      value={value === "" ? "" : value}
      config={config}
      tabIndex={1}
    />
  );
};

export default TextEditor;
