import React from 'react';

const SuccessNotification = ({ success }) => {
  if (success === null) {
    return null;
  }
  return <div className="success">{success}</div>;
};

export default SuccessNotification;
