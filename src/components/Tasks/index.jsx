import React from 'react';
import axios from 'axios';

import AddTaskForm from './AddTaskForm';
import Task from './Task';

import "./Tasks.scss";
import penIcon from '../../assets/img/pen.svg';

const Tasks = ({ list, onEditTitle, onCompleteTask, onAddTask, onRemoveTask, onEditTask, withoutEmpty }) => {

  const editTitle = () => {
    const newTitle = window.prompt("Введите новый заголовок", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:3001/lists/' + list.id, { name: newTitle })
        .catch(() => {
          alert("Не удалось изменить название списка")
        })
    }
  }

  return (
    <div className="tasks">
      <h2 className="tasks__title" style={{ color: list.color.hex }} >{list.name} <img onClick={editTitle} src={penIcon} alt="Edit title" /></h2>

      <div className="tasks__items">

        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks && list.tasks.map(task =>
          <Task key={task.id || task.text} list={list} onComplete={onCompleteTask} onEdit={onEditTask} onRemove={onRemoveTask} {...task} />
        )
        }
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />



      </div>
    </div>
  );
}

export default Tasks;
