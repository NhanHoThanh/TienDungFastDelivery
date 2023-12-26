const express = require("express");
const updateUser = require("../database/Database");

const updateUserInfo = (name, infoType, newInfo) => {
  return new Promise((resolve, reject) => {
    updateUser(name, infoType, newInfo, (err, results) => {
      if (err) {
        console.error("Error updating user info: ", err);
        reject(err);
      } else {
        console.log("User info updated: ", results);
        resolve(results);
      }
    });
  });
};

//updateUserInfo("user1", "firstname", "fromservice");

module.exports = { updateUserInfo };
