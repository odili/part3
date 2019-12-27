import React from 'react';

const Person = ({ person, deleteContact }) => {
  return (
    <p>
      {`${person.name} ${person.number}`}{' '}
      <button onClick={deleteContact} value={person.id}>
        delete
      </button>
    </p>
  );
};

export default Person;
