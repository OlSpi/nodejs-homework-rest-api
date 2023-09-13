const Contact = require("../models/contacts");

const getAllContactsService = async () => {
  return await Contact.find().exec();
};

const getOneContactService = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new Error("Not found");
  }

  return contact;
};

const createContactService = async (body) => {
  return await Contact.create(body);
};

const updateContactService = async (contactId, body) => {
  const updateContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!updateContact) {
    throw new Error("Not found");
  }

  return updateContact;
};

const deleteContactService = async (contactId) => {
  const deleteContact = await Contact.findByIdAndRemove(contactId);
  if (!deleteContact) {
    throw new Error("Not found");
  }

  return deleteContact;
};

const updateStatusContactServices = async (contactId, body) => {
  const updatedStatus = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: body.favorite },
    { new: true }
  );

  if (!updatedStatus) {
    throw new Error("Not found");
  }

  return updatedStatus;
};

module.exports = {
  getAllContactsService,
  getOneContactService,
  createContactService,
  updateContactService,
  deleteContactService,
  updateStatusContactServices,
};
