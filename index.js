const express = require("express");
const path = require("path");
require("dotenv").config();

const app = new express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/files", require("./src/routes/file.route"));
app.use("/files", express.static(path.join(__dirname, "storage", "files")));

app.listen(PORT, async () => {
  console.log(`Connected to DB & server running on port: ${PORT}`);
});

//Undefined Route Implement
app.use("*", (req, res) => {
  res
    .status(404)
    .json({ msg: `Not Found page, homeURL: http://localhost:${PORT}/files` });
});
