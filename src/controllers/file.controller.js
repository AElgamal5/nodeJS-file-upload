const path = require("path");

const save = async (req, res) => {
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
      if (err) return res.status(500).json({ status: "error", message: err });
    });
    i++;
  });

  return res.json({
    msg: "Files uploaded successfully",
    fileNames,
  });
};

module.exports = { save };
