import userRepository from "../repository/users.js";

async function getUsers(id) {
  try {
    return userRepository.getUsers(id);
  } catch (error) {
    console.log("failed to get users");
  }
}

async function getUserById(id) {
  try {
    return userRepository.getUserById(id);
  } catch (error) {
    console.log("failed to get user by id");
  }
}

async function getUserByEmail(email) {
  try {
    return userRepository.getUserByEmail(email);
  } catch (error) {
    console.log("failed to get user by email");
  }
}

async function createUser(entry) {
  try {
    return userRepository.createUser(entry);
  } catch (error) {
    console.log("failed to create user");
  }
}

async function updateUser(entry) {
  try {
    return userRepository.updateUser(entry);
  } catch (error) {
    console.log("failed to update user");
  }
}

async function deleteUserById(id) {
  try {
    userRepository.deleteUserById(id);
  } catch (error) {
    throw error;
  }
}

const userService = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUserById,
};

export default userService;
