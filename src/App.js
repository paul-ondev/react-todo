import React, { useState, useEffect } from "react";
import { Route, useHistory, useLocation } from 'react-router-dom';
import {AddList, List, Tasks} from '../src/components';

import axios from 'axios';

import listIcon from "./assets/img/listIcon.svg";


function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();
  //looks like a bug with routing
  let location = useLocation();

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

  const onEditTask = (listId, taskObj) => {
    let newText = window.prompt("Редактируйте название задачи", taskObj.text);
    if(!newText) {
      return;
    }
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = item.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    axios
      .patch('http://localhost:3001/tasks/' + taskObj.id, { text: newText })
      .catch(() => {alert("Не удалось изменить текст задачи")})
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      const newList = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios
        .delete('http://localhost:3001/tasks/' + taskId)
        .catch(() => {
          alert("Не удалось удалить задачу")
        })
    }
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map( item => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  useEffect(() => {
    let listId = history.location.pathname.split('lists/')[1];
    if (lists){
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, history.location.pathname]);

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          ItemClick={item => {
            history.push(`/`)
          }}
          items={[
            {
              icon: listIcon,
              name: "Все задачи",
              active: history.location.pathname === '/',
            },
          ]}
        />
        { lists ? 
          (<List
          items={lists}
          activeItem={activeItem}
          ItemClick={item => {
            history.push(`/lists/${item.id}`)
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
          <Route exact path='/' >
            {lists && 
              lists.map(list => (
                <Tasks
                  key={list.id}
                  list={list} 
                  onAddTask={onAddTask} 
                  onEditTitle={onEditListTitle} 
                  withoutEmpty
                />
            ))}
          </Route>
          <Route path="/lists/:id">
            { lists && activeItem && (
              <Tasks 
                list={activeItem} 
                onAddTask={onAddTask} 
                onEditTitle={onEditListTitle}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
              />)
            }
          </Route>
            
        
      </div>
    </div>
  );
}

export default App;
