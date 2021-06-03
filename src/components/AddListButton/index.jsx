import React from 'react';
import List from '../List'
import addIcon from "src/assets/img/add.svg";

function AddListButton() {
    return(
        <>
        <List
            items={[
            {
                className: "list__add-button",
                icon: addIcon,
                name: "Добавить список",
            },
            ]}
        />
        <div className="add-list-popup">
            <h1>123</h1>
        </div>
    </>
    )
}

export default AddListButton;