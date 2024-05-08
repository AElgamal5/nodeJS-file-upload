const path = require("path");

const fileExtLimiter = (req, res, next) => {
  const allowedExtArray = [
    ...process.env.FILE_ALLOWED_EXT.split(",").map((value) => `.${value}`),
  ];
  const files = req.files;

  if (!files) return next();

  const fileExtensions = [];
  Object.keys(files).forEach((key) => {
    fileExtensions.push(path.extname(files[key].name));
  });

  const allowed = fileExtensions.every((ext) => allowedExtArray.includes(ext));

  if (!allowed)
    return res.status(422).json({
      msg: `Upload failed. Only [${allowedExtArray
        .join(", ")
        .toString()}] files allowed.`,
    });

  next();
};

module.exports = fileExtLimiter;
