import React from 'react';

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with:{' '}
      <input type="search" value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
