import React, { useContext } from "react";
import { Layout } from "antd";
import TextEditor from '../TextEditor/index.jsx'
import { NotesContext } from "../../contexts/NotesContext";

const Workspace = () => {
  const { Content } = Layout;
  const { debounceChange, note} = useContext(NotesContext)
  return <Content style={{height: '80vh'}}><TextEditor debounceChange={debounceChange} value={note?.content} tabIndex={1} /></Content>;
};

export default Workspace;
