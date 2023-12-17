const MB = 5; // 5 MB
const IMAGE_SIZE_LIMIT = MB * 1024 * 1024;

const imageSizeLimiter = (req, res, next) => {
  const files = req.files;
  if (!files) {
    return next();
  }

  const imagesOverLimit = [];
  Object.keys(files).forEach((key) => {
    if (files[key].size > IMAGE_SIZE_LIMIT) {
      imagesOverLimit.push(files[key].name);
    }
  });

  if (imagesOverLimit.length) {
    return res
      .status(413)
      .json({ status: "error", msg: "Some files are over limits" });
  }

  next();
};

module.exports = imageSizeLimiter;
