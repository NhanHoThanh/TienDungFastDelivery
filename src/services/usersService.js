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
const updateImage = async (phone_number) => {
  await Users.updateAvatar(phone_number);
  return "Avatar updated successfully";
};
module.exports = {
  checkExistUser,
  createNewUser,
  getAllUsers,
  getUser,
  updateUserInfo,
  updateImage,
};
