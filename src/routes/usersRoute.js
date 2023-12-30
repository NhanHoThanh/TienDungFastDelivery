const express = require("express");
const usersController = require("../controllers/usersController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/check", usersController.checkExistUser);
router.post("/create", usersController.createNewUser);
router.get("/", usersController.getAllUsers);
router.patch("/update", upload.single("image"), usersController.updateUserInfo);
router.get("/search", usersController.getUser);
router.get("/logout");

module.exports = router;
