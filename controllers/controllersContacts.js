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

const controllerWrapper = require("../utils/controllerWrapper");

const getAllContacts = controllerWrapper(async (req, res, next) => {
  const contacts = await getAllContactsService(req.user.id);
  res.json(contacts);
});

const getOneContact = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const contact = await getOneContactService(id, req.user.id);

  res.status(200).json(contact);
});

const createContact = controllerWrapper(async (req, res, next) => {
  const { error } = addContactValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const newContact = await createContactService(req.body, req.user.id);
  res.status(201).json(newContact);
});

const updateContact = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const { error } = updateContactValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const updatedContact = await updateContactService(id, req.user.id, req.body);

  res.status(200).json(updatedContact);
});

const deleteContact = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const deletedContactID = await deleteContactService(id, req.user.id);

  res.status(200).json({ message: `Contact ${deletedContactID} deleted` });
});

const updateStatusContact = controllerWrapper(async (req, res, next) => {
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
});

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
