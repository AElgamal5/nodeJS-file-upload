const { Router } = require("express");
const fileUpload = require("express-fileupload");

const router = Router();

const catController = require("../controllers/cat.controller");
const imagePayloadExist = require("../middlewares/imagePayloadExist");
const imageExtLimiter = require("../middlewares/imageExtLimiter");
const imageSizeLimiter = require("../middlewares/imageSizeLimiter");

router.post(
  "/",
  fileUpload({ createParentPath: true }),
  imagePayloadExist,
  imageExtLimiter([".png", ".jpg", ".jpeg"]),
  imageSizeLimiter,
  catController.create
);

module.exports = router;
