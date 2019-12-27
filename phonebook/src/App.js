import React from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import contactService from './services/persons';
import SuccessNotification from './components/SuccessNotification';
import ErrorNotification from './components/ErrorNotification';

const App = () => {
  const [persons, setPersons] = React.useState([]);
  const [newName, setNewName] = React.useState('');
  const [newNumber, setNewNumber] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [success, setSuccess] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    contactService.getAll().then(initialContacts => {
      setPersons(initialContacts);
    });
  }, []);

  const addContact = e => {
    e.preventDefault();
    if (
      persons
        .map(person => person.name.toLowerCase())
        .includes(newName.toLowerCase())
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number?`
        )
      ) {
        let contact = persons.filter(p => p.name === newName)[0];
        contactService
          .update(contact.id, { ...contact, number: newNumber })
          .then(update => {
            // console.log(update);
            let updated = persons.filter(p => p.id !== update.id);
            setPersons(updated.concat(update));
            setSuccess(`Updated ${update.name}`);
            setTimeout(() => {
              setSuccess(null);
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(
              `${contact.name} has already been deleted from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter(p => p.id !== contact.id));
          });
      }

      return;
    }
    const newContact = { name: newName, number: newNumber };
    contactService
      .create(newContact)
      .then(addedContact => {
        setPersons(persons.concat(addedContact));
        setNewName('');
        setNewNumber('');
        setSuccess(`Added ${addedContact.name}`);
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      })
      .catch(error => {
        const validationError = error.response.data;
        const start = validationError.indexOf('<pre>') + 5;
        const end = validationError.indexOf('.<br>');
        const message = validationError.slice(start, end);
        // console.log(message);
        setErrorMessage(<div>{message}</div>);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const deleteContact = e => {
    // let id = Number(e.target.value);
    const contactToDelete = persons.filter(p => p.id === e.target.value)[0];
    if (window.confirm(`Delete ${contactToDelete.name} ?`)) {
      contactService
        .deleteContact(contactToDelete.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== contactToDelete.id));
          setSuccess(`Deleted ${contactToDelete.name}`);
          setTimeout(() => {
            setSuccess(null);
          }, 5000);
        })
        .catch(error => {
          setErrorMessage(
            `${contactToDelete.name} has already been deleted from the server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter(p => p.id !== contactToDelete.id));
        });
    } else {
      return;
    }
  };
  const filteredContact = search
    ? persons.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification success={success} />
      <ErrorNotification message={errorMessage} />
      <Filter value={search} onChange={handleSearch} />
      <h2>add new</h2>
      <PersonForm
        handleSubmit={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons
        filteredContact={filteredContact}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
