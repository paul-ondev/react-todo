import React, { useState } from "react";
import List from "./components/List/index";
import AddList from "./components/AddList/index";
import DB from "./assets/db.json";
import listIcon from "./assets/img/listIcon.svg";

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              icon: listIcon,
              name: "Все задачи",
              active: true,
            },
          ]}
        />
        <List
          items={[
            {
              color: "green",
              name: "Покупки",
            },
            {
              color: "blue",
              name: "Фронтенд",
            },
            {
              color: "pink",
              name: "Фильмы и сериалы",
            },
            {
              color: "lime",
              name: "Книги",
            },
            {
              color: "grey",
              name: "Личное",
            },
          ]}
          isRemovable
        />
        <AddList colors={DB.colors} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
