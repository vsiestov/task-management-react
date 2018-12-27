import React from 'react';

const Notification = (props) => {
  const { errors } = props;

  return (
    <div className="notification">
      { errors[0].msg }
    </div>
  )
};

export default Notification;
