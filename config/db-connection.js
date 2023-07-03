const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    if (connect) {
      console.log("connection establised @", connect.connection.name);
    }
  } catch (error) {
    console.log(
      "Ops! Errror establishing DB Connection. Consider changing your network"
    );
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
