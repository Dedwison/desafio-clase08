const path = require("path");
const express = require("express");
const apiRoutes = require("./routers/index");

const app = express();

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.static(path.resolve(__dirname, "./public")));

//Routes
app.use("/api", apiRoutes);

const serverConneted = app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});

serverConneted.on("error", (error) => {
  console.log(`error: ${error.message}`);
});
