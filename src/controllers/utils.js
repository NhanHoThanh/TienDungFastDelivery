const session = require("express-session");

const checkSession = (req, res) => {
  if (req.session.user) {
    res.send("Session is valid");
  } else {
    res.send("Session is not valid");
  }
};

const setSession = (req, res) => {
  req.session.User = {
    name: "John Doe",
    age: 20,
  };

  return res.status(200).json({ status: "success" });
};

const countSession = (req, res) => {
  const count = Object.keys(req.sessionStore.sessions).length;
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

module.exports = { checkSession, setSession, countSession, destroySession };
