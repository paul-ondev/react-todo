import React, { useState } from 'react';
import axios from 'axios';

import addIcon from '../../assets/img/add.svg';

const AddTaskForm = ({ list, onAddTask }) => {

    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const toggleVisibleForm = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false,

        };
        axios
            .post('http://localhost:3001/tasks', obj)
            .then(({ data }) => {
                console.log(data);
                onAddTask(list.id, data);
                toggleVisibleForm();
            })
    }
    return (
        <div className="tasks__form">
            {!visibleForm ? (<div onClick={toggleVisibleForm} className="tasks__form-new">
                <img src={addIcon} alt="Add Icon" />
                <span>Новая задача</span>
            </div>) : (<div className="tasks__form-block">
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="field" type="text" placeholder="Текст задачи" />
                <button onClick={addTask} className="button">
                    Добавить задачу
                </button>
                <button onClick={toggleVisibleForm} className="button button--grey">
                    Отмена
                </button>
            </div>)}


        </div>
    );
}

export default AddTaskForm;
