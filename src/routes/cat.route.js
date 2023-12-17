const { Router } = require("express");
const fileUpload = require("express-fileupload");

const router = Router();

const catController = require("../controllers/cat.controller");

router.post("/", fileUpload({ createParentPath: true }), catController.create);

module.exports = router;
