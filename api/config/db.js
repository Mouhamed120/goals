const mongoose = require("mongoose");
const colors = require("colors");
const getConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      colors.cyan.underline(`MongoDB conenected : ${connect.connection.host}`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getConnection };
