const { Router } = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const router = Router();

const fileController = require("../controllers/file.controller");
const filePayloadExist = require("../middlewares/filePayloadExist");
const fileExtLimiter = require("../middlewares/fileExtLimiter");
const fileSizeLimiter = require("../middlewares/fileSizeLimiter");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});

router.post(
  "/",
  fileUpload({ createParentPath: true }),
  filePayloadExist,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  fileController.save
);

module.exports = router;
