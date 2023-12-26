// In src/v1/routes/index.js
const express = require("express");
const router = express.Router();
const {
  setSession,
  countSession,
  destroySession,
  updateUser,
  checkSession,
} = require("../../controllers/Controllers");

router.get("/set_session", setSession);
router.get("/check_session", checkSession);
router.get("/count_session", countSession);
router.get("/destroy_session", destroySession);

router.patch("/user", updateUser);

module.exports = router;
