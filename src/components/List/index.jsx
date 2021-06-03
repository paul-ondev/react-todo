import React from 'react';
import classNames from 'classnames';

import './List.scss';

function List({ items, isRemovable, isAddList }) {
    return (
      <ul className='list' >
        {items.map((item, index) => (
          <li key={index} className={classNames(item.className, {'active': item.active})}>
            <i> {item.icon ? <img src={item.icon} alt="List icon" /> : 
              <i className={`badge badge--${item.color}`} />}
              
            </i>
            <span>{item.name}</span>
          </li>
        ))}

        
      </ul>)
}

export default List;