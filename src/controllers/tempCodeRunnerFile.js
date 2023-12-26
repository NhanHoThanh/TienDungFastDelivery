const setSession = (req, res) => {
  req.session.User = {
    username: "user1",
  };
