import React, { useContext } from "react";
import { Layout } from "antd";

import CardItem from "./Card/index";
import { NotesContext } from "../../contexts/NotesContext";

const ListItem = () => {
  const { Sider } = Layout;
  const { totalResult } = useContext(NotesContext);

  return (
    <Sider width={300} theme="light" style={{ padding: 10 }}>
      <div className="list-items" style={{overflow: 'scroll', height: "90vh"}}>
        {Array.isArray(totalResult) &&
          totalResult.length > 0 &&
          totalResult.map((item) => {
            return <CardItem key={item.id} {...item} />;
          })}
      </div>
    </Sider>
  );
};

export default ListItem;
