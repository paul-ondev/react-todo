import React, { useState, useEffect } from 'react';
import List from '../List';
import './AddList.scss';
import Badge from '../Badge/index';
import addIcon from "../../assets/img/add.svg";
import closeIcon from '../../assets/img/close.svg'
import axios from 'axios';

function AddList({ colors, onAdd }) {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            setColor(colors[0].id);
        }
        
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        setColor(colors[0].id);
    }

    const addList = () => {
        if (!inputValue) {
            alert('List should has a name');
            return;
        }
        setIsLoading(true);
        axios
        .post('http://localhost:3001/lists', {name: inputValue, colorId: selectedColor, tasks: []})
        .then(({data}) => {
            const color = colors.filter(c => c.id === selectedColor)[0].name;
            const listObj = {...data, color: {name: color}};
            onAdd(listObj);
            onClose();
        })
        .finally(() => {
            setIsLoading(false);
        })
        
    }

    return(
        <div className="add-list">
            <List
                onClick={() => {setVisiblePopup(true)}}
                items={[
                {
                    className: "list__add-button",
                    icon: addIcon,
                    name: "Добавить список",
                },
                ]}
            />
            {visiblePopup && (
            <div className="add-list__popup">
                <img onClick={onClose} className="add-list__popup-close-btn" src={closeIcon} alt="Close Button"/>
                <input onChange={e => setInputValue(e.target.value)} value={inputValue} className="field" type="text" placeholder="Название списка" />
                <div className="add-list__popup-colors">
                    
                    {
                        colors.map( color => <Badge onClick={() => setColor(color.id)} key={color.id} color={color.name} className={selectedColor === color.id && "active"}/> )
                    }
                    
                </div>
                <button onClick={addList}  className="button">
                    {isLoading ? 'Добавление...' : "Добавить" }
                </button>
            </div>)}
        </div>
            
    )
}

export default AddList;