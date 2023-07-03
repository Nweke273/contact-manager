const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");

//@desc Get all Contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  if (!contacts) {
    res.status(404);
    throw new Error("No contact found");
  } else {
    res.status(200).json(contacts);
  }
});

//@desc Create Contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(404);
    throw new Error("All fields are required");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  if (!contact) {
    console.log("contact not saved");
  }
  res.status(201).json(contact);
});

//@desc Get Specific Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact does not exist");
  }

  if (req.user.id !== contact.user_id.toString()) {
    res.status(403);
    throw new Error("Sorry, You are not allowed to edit this contact!");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete Contact
//@route POST /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact does not exist");
  }

  await contact.deleteOne();
  res.status(200).json({ Message: "Contact deleted" });
});

module.exports = {
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  createContact,
};
