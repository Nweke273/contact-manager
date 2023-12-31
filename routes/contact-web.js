const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  createContact,
} = require("../controllers/ContactController");
const { use } = require("./user-web");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
