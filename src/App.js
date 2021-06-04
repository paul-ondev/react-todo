import React, { useState } from "react";
import List from "./components/List/index";
import AddList from "./components/AddList/index";
import DB from "./assets/db.json";
import listIcon from "./assets/img/listIcon.svg";

function App() {
  const [lists, setLists] = useState(
    DB.lists.map((item) => {
      item.color = DB.colors.filter(
        (color) => color.id === item.colorId
      )[0].name;
      return item;
    })
  );

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };
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
          items={lists}
          isRemovable
          onRemove={(list) => console.log(list)}
        />
        <AddList onAdd={onAddList} colors={DB.colors} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
