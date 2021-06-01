import React from 'react';

import listIcon from 'src/assets/img/listIcon.svg';

function List() {
    return (
  <ul className="todo__list">
    <li>
      <i>
        <img src={listIcon} alt="List icon" />
      </i>
      <span>Все задачи</span>
    </li>
  </ul>)
}

export default List;