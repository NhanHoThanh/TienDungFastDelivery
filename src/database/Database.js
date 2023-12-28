const db = require("./connection.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function updateUser(name, infoType, newInfo, callback) {
  let query = "";

  switch (infoType) {
    case "firstname":
      query = "UPDATE users SET firstname = ? WHERE username = ?";
      break;
    case "email":
      query = "UPDATE users SET email = ? WHERE username = ?";
      break;
    default:
      return callback(new Error("Invalid information type"));
  }
  db.query(query, [newInfo, name], (error, results) => {
    if (error) {
      console.error("Error executing query: ", error);
      return callback(error);
    }
    console.log("User updated: ", results);
    callback(null, results);
  });
}

function updatePassword(username, oldPassword, newPassword, callback) {
  db.query(
    "SELECT password FROM users WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error("Error executing query: ", error);
        return callback(error);
      }

      bcrypt.compare(oldPassword, results[0].password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords: ", err);
          return callback(err);
        }

        if (!result) {
          return callback(new Error("Old password is incorrect"));
        }

        // If the old password is correct, hash the new password
        bcrypt.hash(newPassword, saltRounds, (err, hash) => {
          if (err) {
            console.error("Error hashing password: ", err);
            return callback(err);
          }

          db.query(
            "UPDATE users SET password = ? WHERE username = ?",
            [hash, username],
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
      });
    }
  );
}

module.exports = { updateUser, updatePassword };
