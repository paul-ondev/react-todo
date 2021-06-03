import React, { useState } from 'react';
import List from '../List';
import './AddList.scss';
import Badge from '../Badge/index';
import addIcon from "../../assets/img/add.svg";
import closeIcon from '../../assets/img/close.svg'

function AddList({ colors }) {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setColor] = useState(colors[0].id);


    return(
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
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
                <img onClick={() => setVisiblePopup(false)} className="add-list__popup-close-btn" src={closeIcon} alt="Close Button"/>
                <input className="field" type="text" placeholder="Название списка" />
                <div className="add-list__popup-colors">
                    
                    {
                        colors.map( color => <Badge onClick={() => setColor(color.id)} key={color.id} color={color.name} className={selectedColor === color.id && "active"}/> )
                    }
                    
                </div>
                <button className="button">Добавить</button>
            </div>)}
        </div>
            
    )
}

export default AddList;