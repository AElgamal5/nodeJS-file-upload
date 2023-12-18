const filesPayloadExists = (req, res, next) => {
  if (!req.files) return res.status(400).json({ msg: "Files are required" });

  next();
};

module.exports = filesPayloadExists;
