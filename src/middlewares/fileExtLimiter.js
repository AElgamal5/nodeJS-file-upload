const path = require("path");

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files;
    if (!files) {
      return next();
    }

    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      return res.status(422).json({
        msg: `Upload failed. Only ${allowedExtArray.toString()} files allowed.`,
      });
    }

    next();
  };
};

module.exports = fileExtLimiter;
