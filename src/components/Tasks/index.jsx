import React from 'react';
import "./Tasks.scss";
import penIcon from '../../assets/img/pen.svg';

const Tasks = ({ list }) => {
 

    return (
        <div className="tasks">
          <h2 className="tasks__title">{list.name} <img src={penIcon} alt="Edit title" /></h2>

          <div className="tasks__items">
              {list.tasks.map( task => 
                  (<div key={task.id} className="tasks__items-row">
                    <div className="checkbox">
                      <input type="checkbox" id={`task-${task.id}`} />
                      <label htmlFor={`task-${task.id}`} >
                        <svg 
                        width="11" 
                        height="8" 
                        viewBox="0 0 11 8" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" 
                        stroke="#000" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                        </svg>
                      </label>
                    
                    </div>
                    <input readOnly type="text" value={task.text} />             
                  </div>)
                )
              }


              
              
          </div>
        </div>
    );
}

export default Tasks;
