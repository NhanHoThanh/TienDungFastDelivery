const db = require("./connection.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function updateUser(name, infoType, newInfo, callback) {
  let query = "";

  switch (infoType) {
    case "firstname":
      query = "UPDATE users SET firstname = ? WHERE username = ?";
      break;
    case "password":
      bcrypt.hash(newInfo, saltRounds, function (err, hash) {
        if (err) {
          console.error("Error hashing password: ", err);
          return callback(err);
        }
        db.query(
          "UPDATE users SET password = ? WHERE username = ?",
          [hash, name],
          (error, results) => {
            if (error) {
              console.error("Error executing query: ", error);
              return callback(error);
            }
            console.log("User updated: ", results);
            callback(null, results);
          }
        );
      });
      return;
    default:
      return callback(new Error("Invalid information type"));
  }

  if (infoType !== "password") {
    db.query(query, [newInfo, name], (error, results) => {
      if (error) {
        console.error("Error executing query: ", error);
        return callback(error);
      }
      console.log("User updated: ", results);
      callback(null, results);
    });
  }
}

module.exports = updateUser;
