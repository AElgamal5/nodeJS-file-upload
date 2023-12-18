const express = require("express");
const path = require("path");

const file = require("./src/routes/file.route");

const app = new express();

app.use(express.json());
app.use("/files", file);
app.use("/files", express.static(path.join(__dirname, "storage", "files")));

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Connected to DB & server running on port: ${PORT}`);
});

//Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});
