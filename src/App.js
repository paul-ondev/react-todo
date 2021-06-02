import React from "react";
import List from "./components/List/index";
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
              color: "light-green",
              name: "Книги",
            },
            {
              color: "grey",
              name: "Личное",
            },
          ]}
        />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
