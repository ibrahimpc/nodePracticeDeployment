const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.MONGODB_URI;

dbConnect()
  .then((res) => console.log("DB CONNECTED"))
  .catch((e) => console.log(e, "DB CONNECT FAILED"));
async function dbConnect() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
