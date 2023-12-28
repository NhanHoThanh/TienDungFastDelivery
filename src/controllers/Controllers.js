const session = require("express-session");
const { updateUserInfo, updateUserPassword } = require("../services/Service");

const checkSession = (req, res) => {
  if (req.session.User) {
    res.send("Session is valid");
  } else {
    res.send("Session is not valid");
  }
};

const setSession = (req, res) => {
  const { authorization, phone_number } = req.body;

  req.session.User = {
    // username: "user1",
    authorization: authorization,
    phoneNumber: phone_number,
  };

  req.session.save((err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save session" });
    }

    return res.status(200).json({ status: "success" });
  });
};

const countSession = (req, res) => {
  const count = Object.keys(req.session.User).length;
  return res.status(200).json({ count: count });
};

const destroySession = (req, res) => {
  if (req.session.User) {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error: ", err);
        res.status(500).send("Fail to destroy session!");
      } else {
        res.status(200).send("Session has been destroyed successfully!");
      }
    });
  }
};

const updateUser = (req, res) => {
  //this need to be put in ultils
  if (!req.session.User) {
    return res.status(200).send("No session");
  }

  const infoType = req.query.update;
  if (!infoType) {
    return;
  }

  const infoTypes = infoType.split("+"); // Array type

  if (infoType != "password") {
    const { username: name, newInfo: newInfo } = req.body;
    if (!name || !infoType || !newInfo) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    try {
      updateUserInfo(name, infoType, newInfo);
      return res.status(200).send("User info has been updated");
    } catch (err) {
      console.log("Error: ", err);
      return res.status(500).send("Failed to update user info");
    }
  }
  if (infoType == "password") {
    const {
      username: name,
      old_password: oldPassword,
      new_password: newPassword,
    } = req.body;
    if (!name || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    try {
      updateUserPassword(name, oldPassword, newPassword);
      return res.status(200).send("User password has been updated");
    } catch (err) {
      console.log("Error: ", err);
      return res.status(500).send("Failed to update user password");
    }
  }
};

module.exports = {
  checkSession,
  setSession,
  countSession,
  destroySession,
  updateUser,
};
