import React, { useContext, useEffect } from "react";
import { Layout, Col, Row, Input, Modal } from "antd";

import { NotesContext } from "../../contexts/NotesContext";
import { useDebounce } from "../../hook/useDebounce";
import "./index.css";

const Sidebar = () => {
  const { Header } = Layout;
  const { addNote, deleteNote, searchByContent, setSearch , search} = useContext(NotesContext);

  // confirm for delete note by id 
  const confirm = () => {
    Modal.confirm({
      content: "Вы уверены, удалить эту заметку?",
      okText: "да",
      onOk() {
        return deleteNote(+window.location.pathname.replace(/[^0-9]/g, ""));
      },
      cancelText: "нет",
    });
  };

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  //  Hook will return only the last value (which we passed) ...
  const debounceChange = useDebounce(changeHandler, 500);

  useEffect(() => {
    if (search !== "") {
      searchByContent(search)
    }
    // eslint-disable-next-line
  }, [search]);


  return (
    <Header className="sidebar" theme="light">
      <Row>
        <Col span={4} className="sidebar-item">
          <>
            <button className="btn--trs" onClick={confirm}>
              <img
                className="sidebar-icon"
                src="https://img.icons8.com/sf-ultralight/64/trash.png"
                alt="trash"
              />{" "}
            </button>
          </>
        </Col>
        <Col span={8} className="sidebar-item">
          <button className="btn--trs" onClick={() => addNote()}>
            {" "}
            <img
              className="sidebar-icon"
              src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/external-edit-interface-kiranshastry-lineal-kiranshastry.png"
              alt=""
            />
          </button>
        </Col>
        <Col span={8} className="sidebar-item"></Col>
        <Col span={4} className="sidebar-item">
          <Input
            className="sidebar-search"
            size="large"
            onChange={debounceChange}
            prefix={
              <img
                className="sidebar-icon--medium"
                src="https://img.icons8.com/ios-glyphs/64/search--v1.png"
                alt="search"
              />
            }
          />
        </Col>
      </Row>
    </Header>
  );
};

export default Sidebar;

