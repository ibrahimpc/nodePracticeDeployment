const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

require("./src/config/db");

const appRoutes = require("./src/routes");
app.use("/", appRoutes);
const PORT = 3000;
const IP_ADDRESS = "192.168.1.7";

// app.listen(PORT, IP_ADDRESS, () => {
//     console.log(`Server running on http://${IP_ADDRESS}:${PORT}/`);
// });
//

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
