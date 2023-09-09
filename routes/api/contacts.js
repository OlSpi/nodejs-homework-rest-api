const { Router } = require("express");

const {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../../controllers/contacts");

const router = Router();

router.route("/").get(getAllContacts).post(createContact);
router
  .route("/:id")
  .get(getOneContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = { contactsRouter: router };
