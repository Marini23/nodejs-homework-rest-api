import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

export const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === id);
  return contactById || null;
};

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return removeContact;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const isExist = contacts.find(
    (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
  );
  if (isExist) {
    return `${newContact.name} is already in contacts!`;
  }
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

export const updateContact = async (contactId, body) => {};
