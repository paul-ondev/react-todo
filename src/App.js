import React, { useState, useEffect } from "react";
import {AddList, List, Tasks} from '../src/components';

import axios from 'axios';

import listIcon from "./assets/img/listIcon.svg";


function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map( item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map( item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
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
        { lists ? 
          (<List
          items={lists}
          activeItem={activeItem}
          ItemClick={item => {
            setActiveItem(item);
          }}
          onRemove={(id) => {
            const newLists = lists.filter(listItem =>  listItem.id !== id );
            setLists(newLists);
            setActiveItem(null);
          }}
          isRemovable

        />) : ( 'Loading...' )}
        
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        { lists && activeItem && <Tasks list={activeItem} onAddTask={onAddTask} onEditTitle={onEditListTitle} />}
        
      </div>
    </div>
  );
}

export default App;
