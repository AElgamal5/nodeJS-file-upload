const imagesPayloadExists = (req, res, next) => {
  if (!req.files)
    return res
      .status(400)
      .json({ status: "error", msg: "Animals images are required" });

  next();
};

module.exports = imagesPayloadExists;
