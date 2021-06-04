import React from 'react';
import classNames from 'classnames';

import removeIcon from '../../assets/img/remove.svg';

import Badge from '../Badge/index';

import './List.scss';

function List({ items, isRemovable, onClick, onRemove }) {
  const removeList = (item) => {
    if (window.confirm("Удалить этот список?")) {
    onRemove(item);
    }
  }
  

    return (
      <ul onClick={onClick} className='list' >
        {items.map((item, index) => (
          <li className={classNames(item.className, {'active': item.active})} key={index}>
            <i> {item.icon ? <img src={item.icon} alt="List icon" /> : 
              <Badge color={item.color} />}
              
            </i>
            <span>{item.name}</span>
            {isRemovable && <img className='list__remove-icon' onClick={() => removeList(item)} src={removeIcon} alt="Remove icon" />}
          </li>
        ))}

        
      </ul>)
}

export default List;