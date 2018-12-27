import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const TaskItem = (props) => {
  const { item, onDelete, onChange } = props;

  return (
    <li className="tasks__item">
      <div className="tasks__info">
        <div className="tasks__description">
          Description: {item.description}
        </div>
        <div className="tasks__due">
          Due date: {format(item.due, 'DD.MM.YYYY')}
        </div>
      </div>
      <div className="tasks__controls">
        <button
          className="button blue"
          onClick={() => {
            onChange(item)
          }}>
          <span>Change</span>
        </button>

        <button
          className="button orange"
          onClick={() => {
            onDelete(item)
          }}>
          <span>Delete</span>
        </button>
      </div>
    </li>
  )
    ;
};

TaskItem.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskItem;
