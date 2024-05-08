const path = require("path");
const fs = require("fs");

const save = async (req, res) => {
  try {
    const files = req.files;

    //save the files names to save to DB or use it
    let fileNames = [];

    let i = 0;
    Object.keys(files).forEach((key) => {
      //get the file extension
      const ext = path.extname(files[key].name);

      //Modify the file name to avoid repeated file name issues.
      files[key].name = `${+new Date()}_${i}${ext}`;

      fileNames.push(files[key].name);

      const filepath = path.join(
        __dirname,
        "..",
        "..",
        "storage",
        "files",
        files[key].name
      );
      files[key].mv(filepath, (err) => {
        if (err) return res.status(400).json({ status: "error", msg: err });
      });
      i++;
    });

    return res.json({
      status: "success",
      msg: "Files uploaded successfully",
      fileNames,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const download = async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "storage",
      "files",
      fileName
    );

    res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(404).json({ status: "error", msg: "File not found" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const remove = async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "storage",
      "files",
      fileName
    );

    if (!fs.existsSync(filePath))
      return res.status(404).json({ status: "error", msg: "File not found" });

    fs.unlinkSync(filePath, (err) => {
      if (err) return res.status(400).json(err);
      res.json({ status: "success", msg: "File deleted successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = { save, download, remove };
