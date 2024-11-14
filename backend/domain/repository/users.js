import { db } from "./db.js";

async function getUsers(id) {
  try {
    const users = await db.user.findMany({
      where: {
        NOT: [
          {
            id: id,
          },
        ],
      },
    });
    return convertUsers(users);
  } catch (error) {
    console.log("error => ", error);
    throw new Error("failed to get users");
  }
}

async function getUserById(id) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    return convertUser(user);
  } catch (error) {
    console.log("error => ", error);
    throw new Error("failed to get user by id");
  }
}

async function getUserByEmail(email) {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    return convertUser(user);
  } catch (error) {
    console.log("error => ", error);
    throw new Error("failed to get user by email");
  }
}

async function createUser(entry) {
  try {
    const user = await db.user.create({
      data: {
        nama: entry.name,
        email: entry.email,
        saldo: entry.balance,
      },
    });
    return convertUser(user);
  } catch (error) {
    console.log("error => ", error);
    throw new Error("failed to create user");
  }
}

async function updateUser(entry) {
  try {
    const user = await db.user.update({
      where: {
        id: entry.id,
      },
      data: {
        nama: entry.name,
        email: entry.email,
        saldo: entry.balance,
      },
    });
    return convertUser(user);
  } catch (error) {
    console.log("error => ", error);
    throw new Error("failed to create user");
  }
}

async function deleteUserById(id) {
  try {
    await db.user.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.log("error => ", error);
    throw new Error("failed to delete user by id");
  }
}

function convertUser(store) {
  if (store == null) return null;

  return {
    id: store.id,
    name: store.nama,
    email: store.email,
    balance: Number(store.saldo),
    created_at: store.created_at,
    updated_at: store.updated_at,
  };
}

function convertUsers(store) {
  const result = [];
  store.forEach(function (user) {
    result.push(convertUser(user));
  });
  return result;
}

const userRepository = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUserById,
};

export default userRepository;
