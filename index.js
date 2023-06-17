const { Command } = require('commander');

const contacts = require('./contacts.js')

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            return console.log(allContacts);
        case 'get':
            const currentContact = await contacts.getContactById(id);
            return console.log(currentContact);
        case 'add':
            const newContact = await contacts.addContact({ name, email, phone });
            return console.log(newContact);
        case 'remove':
            const deletingContact = await contacts.removeContact(id);
            return console.log(deletingContact);

        default:
            return Error("Try again.");
    }
}
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');
  
program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);