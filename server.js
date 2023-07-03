const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const web = require("./routes/contact-web");
const user = require("./routes/user-web");
const establishDbConnection = require("./config/db-connection");

establishDbConnection();
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(errorHandler);
app.use("/api/users", user);
app.use("/api/contacts", web);
app.listen(500, () => {
  console.log(`Server running on port ${port}`);
});
