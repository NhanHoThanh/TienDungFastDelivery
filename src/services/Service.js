const express = require("express");
const { updateUser, updatePassword } = require("../database/Database");

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

const updateUserPassword = (username, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    updatePassword(username, oldPassword, newPassword, (err, results) => {
      if (err) {
        console.error("Error updating user password: ", err);
        reject(err);
      } else {
        console.log("User password updated: ", results);
        resolve(results);
      }
    });
  });
};

module.exports = { updateUserInfo, updateUserPassword };
