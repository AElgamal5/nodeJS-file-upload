const path = require("path");
const Cat = require("../models/cat.model");

const create = async (req, res) => {
  const files = req.files;

  let images = [];
  let i = 0;
  Object.keys(files).forEach((key) => {
    const ext = path.extname(files[key].name);
    files[key].name = `${+new Date()}_${i}${ext}`;
    images.push(files[key].name);
    const filepath = path.join(
      __dirname,
      "..",
      "..",
      "storage",
      "images",
      files[key].name
    );
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
    i++;
  });

  return res.json({
    status: "success",
    msg: "Images uploaded successfully",
  });
};

module.exports = { create };
