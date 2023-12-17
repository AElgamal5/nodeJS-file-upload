const path = require("path");

const imageExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files;
    if (!files) {
      return next();
    }

    const imageExtensions = [];
    Object.keys(files).forEach((key) => {
      imageExtensions.push(path.extname(files[key].name));
    });

    const allowed = imageExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      return res.status(422).json({
        status: "error",
        msg: `Upload failed. Only ${allowedExtArray.toString()} images allowed.`,
      });
    }

    next();
  };
};

module.exports = imageExtLimiter;
