const session = require("express-session");

const is_session = (req, res) => {
  return req.session.User.username;
};

const setSession = (req, res) => {
  req.session.User = {
    name: "John Doe",
    age: 20,
  };
};

const countSession = (req, res) => {
  const count = Object.keys(req.sessionStore.sessions).length;
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
