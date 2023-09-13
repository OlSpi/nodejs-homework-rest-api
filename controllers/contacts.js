const {
  getAllContactsService,
  getOneContactService,
  createContactService,
  updateContactService,
  deleteContactService,
  updateStatusContactServices,
} = require("../services/contacts");

const {
  addContactValidationSchema,
  updateContactValidationSchema,
} = require("../utils/validation/contactValidationSchemas");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContactsService();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getOneContactService(id);

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = addContactValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newContact = await createContactService(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = updateContactValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedContact = await updateContactService(id, req.body);

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContactID = await deleteContactService(id);

    res.status(200).json({ message: `Contact ${deletedContactID} deleted` });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    const { error } = updateContactValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedStatus = await updateStatusContactServices(id, {
      favorite,
    });

    res.status(200).json(updatedStatus);
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
  updateStatusContact,
};
