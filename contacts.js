const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join('db', 'contacts.json');

async function listContacts  () {
    try {
        const list = await fs.readFile(contactsPath)
        return JSON.parse(list)
    } catch (error) {
        console.log(error)  
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts()
        const contactById = contacts.find(contact => contactId === contact.id)
        return contactById
    } catch (error) {
        
    }
}

async function removeContact(contactId) {
    try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) return null;

    const deletedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
}


async function addContact(contact) {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            ...contact,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}