import React from 'react';
import "./Tasks.scss";
import penIcon from '../../assets/img/pen.svg';

const Tasks = () => {
    return (
        <div className="tasks">
          <h2 className="tasks__title">Фронтенд <img src={penIcon} alt="Edit title" /></h2>
          <div className="tasks__items">
              <div className="tasks__items-row">
                <div className="checkbox">
                    <input type="checkbox" name="" id="check" />
                    <label htmlFor="check">
                      <svg 
                      width="11" 
                      height="8" 
                      viewBox="0 0 11 8" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" 
                      stroke="#000" 
                      stroke-width="1.5" 
                      stroke-linecap="round" 
                      stroke-linejoin="round"/>
                      </svg>
                    </label>
                    
                </div>
                <input type="text" value="Изучить паттерны проектирования" />             
              </div>
              
          </div>
        </div>
    );
}

export default Tasks;
