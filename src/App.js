import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Dexie } from "dexie";
import { useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";

import Sidebar from "./components/Sidebar";
import ListItem from "./components/ListItem";
import Workspace from "./components/Workspace";
import { NotesContext } from "./contexts/NotesContext";
import { useDebounce } from "./hook/useDebounce";
import "./index.css";

// database
const db = new Dexie("notes");
db.version(1).stores({
  notes: "++id,content, date",
});
const { notes } = db;

function App() {
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const allItems = useLiveQuery(() => notes.toArray(), []);
  const navigate = useNavigate();

  // **** CRUD ****
  // callback for add note
  const addNote = () => {
    setSearch("");
    notes
      .add({
        content: "",
        date: new Date(),
      })
      .then((id) => {
        navigate(`/${id}`);
        const data =  notes.get({
          id: id,
        });
        setNote(data);
        setValue(data.content);
      });
  };
  // delete note by id
  const deleteNote = (id) => {
    notes.delete(id);
    
   if(allItems.length > 1) {
     navigate(
         `/${
           allItems[allItems.length - 1].id === id
             ? allItems[allItems.length - 2].id
             : allItems[allItems.length - 1].id
         }`
       )

   }else{
    navigate('/')
    setNote("")
   }
  };
  // get note by id
  useEffect(() => {
    if (+window.location.pathname.replace(/[^0-9]/g, "") !== "") {
      const fetchData = async () => {
        const data = await notes.get({
          id: +window.location.pathname.replace(/[^0-9]/g, ""),
        });
        setNote(data);
        setValue(data.content);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [+window.location.pathname.replace(/[^0-9]/g, "")]);
  // update note by id
  const updateNote = () => {
    notes.update(note?.id, { content: value });
  };

  const changeHandler = (value) => {
    setValue(value);
  };

  //  Hook will return only the last value (which we passed) ...
  // if more than 500ms has passed since last call.
  // Otherwise, it will return the previous value of search.
  //  The goal is to call filter only after the user has stopped
  //  typing so we don't end up calling the filter too often.
  const debounceChange = useDebounce(changeHandler, 500);

  useEffect(() => {
    if (value !== note?.content) {
      updateNote();
    }
    // eslint-disable-next-line
  }, [value]);

  // search
  const searchByContent = async (value) => {
    const notesTotal = await notes
      .toArray()
      .then((result) =>
        result.filter((f) => new RegExp(value).test(f.content))
      );
    setSearchResult(notesTotal);
  };

  const totalResult = search ? searchResult : allItems;

  return (
    <div className="App">
      <NotesContext.Provider
        value={{
          allItems,
          value,
          setValue,
          addNote,
          deleteNote,
          note,
          updateNote,
          debounceChange,
          notes,
          searchByContent,
          totalResult,
          setSearch,
          search,
        }}
      >
        <Layout theme="light">
          <Sidebar />
          <Layout style={{ height: "90vh" }}>
            <ListItem />
            <Workspace />
          </Layout>
        </Layout>
      </NotesContext.Provider>
    </div>
  );
}

export default App;
