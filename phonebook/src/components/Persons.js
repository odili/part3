import React from 'react';
import Person from './Person';

const Persons = ({ filteredContact, deleteContact }) => {
  const numbers = () =>
    filteredContact.map(person => (
      <Person key={person.name} person={person} deleteContact={deleteContact} />
    ));
  return <div>{numbers()}</div>;
};

export default Persons;
