const { Router } = require("express");

const {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} = require("../../controllers/controllersContacts");

const router = Router();

router.route("/").get(getAllContacts).post(createContact);
router
  .route("/:id")
  .get(getOneContact)
  .put(updateContact)
  .delete(deleteContact);
router.route("/:id/favorite").patch(updateStatusContact);

module.exports = { contactsRouter: router };
