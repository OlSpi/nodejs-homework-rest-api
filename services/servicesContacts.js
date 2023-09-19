const Contact = require("../models/contacts");

const getAllContactsService = async (ownerId) => {
  return await Contact.find({ owner: ownerId }).exec();
};

const getOneContactService = async (contactId, ownerId) => {
  const contact = await Contact.findById(contactId);

  if (!contact || contact.owner.toString() !== ownerId) {
    throw new Error("Not found");
  }

  return contact;
};

const createContactService = async (body, ownerId) => {
  return await Contact.create({ ...body, owner: ownerId });
};

const updateContactService = async (contactId, ownerId, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!updatedContact || updatedContact.owner.toString() !== ownerId) {
    throw new Error("Not found");
  }

  return updatedContact;
};

const deleteContactService = async (contactId, ownerId) => {
  const deletedContact = await Contact.findByIdAndRemove(contactId);

  if (!deletedContact || deletedContact.owner.toString() !== ownerId) {
    throw new Error("Not found");
  }

  return deletedContact;
};

const updateStatusContactServices = async (contactId, ownerId, body) => {
  const updatedStatus = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: body.favorite },
    { new: true }
  );

  if (!updatedStatus || updatedStatus.owner.toString() !== ownerId) {
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
