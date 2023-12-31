const express = require("express");
const usersController = require("../controllers/usersController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

/*
Middleware multer lấy bất cứ FILE (vì thế bên FE cần check chỉ cho file ảnh vào) nó bắt được, đặt tên là phone_number.{file extension}, lưu vào folder uploads
Tới đây, đặt trường hợp ta lưu file trực tiếp vào server, thì như vậy là đủ.
Tuy nhiên, vì sau này ta sẽ mở rộng (lưu file trên dịch vụ khác,..), nên cần làm khác 1 chút 
Lưu ý: multer sau khi lưu ảnh vào trong uploads sẽ tạo thêm 1 property trong request là req.file, nhưng ở đây không sử dụng property này
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../uploads");
  },
  filename: (req, file, cb) => {
    const filePath = path.join(
      __dirname,
      "../../uploads",
      req.body.phone_number + path.extname(file.originalname)
    );
    fs.unlink(filePath, (err) => {
      cb(null, req.body.phone_number + path.extname(file.originalname));
    });
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/check", usersController.checkExistUser);
router.post("/create", usersController.createNewUser);
router.get("/", usersController.getAllUsers);
router.patch(
  "/update",
  upload.array("avatar", 1),
  usersController.updateUserInfo
);
router.get("/search", usersController.getUser);
router.get("/logout");

module.exports = router;
