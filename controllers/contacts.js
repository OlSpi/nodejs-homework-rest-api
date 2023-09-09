const {
  getAllContactsModels,
  getOneContactModels,
  createContactModels,
  updateContactModels,
  deleteContactModels,
} = require("../models/contacts");

const contactSchema = require("../schemas/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContactsModels();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getOneContactModels(id);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newContact = await createContactModels(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedContact = await updateContactModels(id, req.body);

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContactID = await deleteContactModels(id);

    res.status(200).json({ message: `Contact ${deletedContactID} deleted` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
};
