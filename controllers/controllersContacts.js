const {
  getAllContactsService,
  getOneContactService,
  createContactService,
  updateContactService,
  deleteContactService,
  updateStatusContactServices,
} = require("../services/servicesContacts");

const {
  addContactValidationSchema,
  updateContactValidationSchema,
} = require("../utils/validation/contactValidationSchemas");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContactsService(req.user.id);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getOneContactService(id, req.user.id);

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
    const newContact = await createContactService(req.body, req.user.id);
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

    const updatedContact = await updateContactService(
      id,
      req.user.id,
      req.body
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContactID = await deleteContactService(id, req.user.id);

    res.status(200).json({ message: `Contact ${deletedContactID} deleted` });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const userId = req.user.id;

    const { error } = updateContactValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedStatus = await updateStatusContactServices(id, userId, {
      favorite,
    });

    if (!updatedStatus) {
      return res.status(404).json({ message: "Contact not found" });
    }

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
