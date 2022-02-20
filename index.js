const path = require("path");
const express = require("express");
const apiRoutes = require("./routers/index");

const app = express();

const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.static("public"));
app.use("/api", apiRoutes);

//Routes
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

const serverConneted = app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});

serverConneted.on("error", (error) => {
  console.log(`error: ${error.message}`);
});
