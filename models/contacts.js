const fs = require("node:fs/promises");

const path = require("node:path");

const { randomUUID } = require("node:crypto");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

const getAllContactsModels = async () => {
  const jsonData = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(jsonData);
};

const getOneContactModels = async (contactId) => {
  const contacts = await getAllContactsModels();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new Error("Not found");
  }

  return contact;
};

const createContactModels = async (body) => {
  const contacts = await getAllContactsModels();
  const newContact = { ...body, id: randomUUID() };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContactModels = async (contactId, body) => {
  const contacts = await getAllContactsModels();
  const contactIndex = contacts.findIndex(({ id }) => contactId === id);
  if (contactIndex === -1) {
    throw new Error("Not found");
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[contactIndex];
};

const deleteContactModels = async (contactId) => {
  const contacts = await getAllContactsModels();
  const contactIndex = contacts.findIndex(({ id }) => contactId === id);
  if (contactIndex === -1) {
    throw new Error("Not found");
  }

  contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contactId;
};

module.exports = {
  getAllContactsModels,
  getOneContactModels,
  createContactModels,
  updateContactModels,
  deleteContactModels,
};
