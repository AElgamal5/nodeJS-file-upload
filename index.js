const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cat = require("./src/routes/cat.route");

const app = new express();

app.use(express.json());
app.use("/v1/apis/cats", cat);
app.use("/images", express.static("./storage/images"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = 5000;
const URI = "mongodb://localhost:27017/animals";
(function start() {
  mongoose
    .connect(URI)
    .then(() => {
      app.listen(PORT, async () => {
        console.log(`Connected to DB & server running on port: ${PORT}`);
      });
    })
    .catch((err) => {
      console.error(
        "Error in database connection",
        "\nRetry to connect in 5 sec"
      );
      console.log(err);
      setTimeout(start, 5000);
    });
})();

//Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});
