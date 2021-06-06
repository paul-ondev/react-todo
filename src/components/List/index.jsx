import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import removeIcon from '../../assets/img/remove.svg';

import Badge from '../Badge/index';

import './List.scss';

function List({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) {
  
  const removeList = (item) => {
    if (window.confirm("Удалить этот список?")) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  }

    return (
      <ul onClick={onClick} className='list' >
        {items.map((item, index) => (
          <li onClick={() => onClickItem(item)} className={classNames(item.className, {active: activeItem && activeItem.id === item.id})} key={index}>
            <i> {item.icon ? <img src={item.icon} alt="List icon" /> : 
              <Badge color={item.color.name} />}
              
            </i>
            <span>{item.name}
            {item.tasks && ` (${item.tasks.length})`}</span>
            {isRemovable && <img className='list__remove-icon' onClick={() => removeList(item)} src={removeIcon} alt="Remove icon" />}
          </li>
        ))}

        
      </ul>)
}

export default List;