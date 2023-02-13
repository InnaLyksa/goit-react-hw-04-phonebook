import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList, ContactForm, Filter } from 'components';
import { Container, SectionHeader, PageHeader } from './App.styled';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

const KEY_CONTACTS = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(
    () => getFromLocalStorage(KEY_CONTACTS) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    saveToLocalStorage(KEY_CONTACTS, contacts);
  }, [contacts]);

  const addContact = (newName, newNumber) => {
    const newContact = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    };

    const { name, number } = newContact;

    if (checkedDublicateName(name)) {
      toast.warn(`${name} is already in contacts`, {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
    } else if (checkedDublicateNumber(number)) {
      toast.warn(`${number} is already in contacts`, {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
    } else {
      setContacts(contacts => [newContact, ...contacts]);
    }
  };

  const checkedDublicateNumber = dublicateNumber =>
    contacts.find(contact => contact.number === dublicateNumber);

  const checkedDublicateName = dublicateName =>
    contacts.find(
      contact => contact.name.toLowerCase() === dublicateName.toLowerCase()
    );

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <PageHeader>Phonebook</PageHeader>
      <ContactForm onSubmit={addContact} />
      <SectionHeader>Contacts</SectionHeader>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={deleteContact}
      />
      <ToastContainer />
    </Container>
  );
}
