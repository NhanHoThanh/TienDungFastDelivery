const Users = require("../database/Users.js");
const fs = require("fs");
const path = require("path");

const checkExistUser = async (phoneNumber) => {
  return await Users.checkExistUser(phoneNumber);
};

const createNewUser = async (newUser) => {
  await Users.createNewUser(newUser);
};

const getAllUsers = async () => {
  return await Users.getAllUsers();
};

const getUser = async (fields, values) => {
  return await Users.getUser(fields, values);
};

const updateUserInfo = async (
  fields,
  values,
  conditionFields,
  conditionValues
) => {
  await Users.updateUserInfo(fields, values, conditionFields, conditionValues);
};
const updateImage = (newImagePath, username, callback) => {
  const oldImagePath = path.join(
    __dirname,
    `../../public/images/${username}.jpg`
  );

  fs.unlink(oldImagePath, (err) => {
    if (err) {
      return callback({ message: "Lỗi không xóa avatar cũ" });
    }

    fs.rename(newImagePath, oldImagePath, (err) => {
      if (err) {
        return callback({ message: "Lỗi không cập nhật đc tên avatar" });
      }

      callback(null, "Cập nhật avatar thành công");
    });
  });
};
module.exports = {
  checkExistUser,
  createNewUser,
  getAllUsers,
  getUser,
  updateUserInfo,
  updateImage,
};
