import { db } from "./db.js";

async function getTransactionsByUserId(id) {
  try {
    const transactions = await db.transaction.findMany({
      include: {
        user: true,
        to_user: true,
      },
      where: {
        OR: [
          {
            user_id: Number(id),
          },
          {
            to_user_id: Number(id),
          },
        ],
      },
    });

    return transactions;
  } catch (error) {
    console.log(error);
    throw new Error("failed get transactions by user id");
  }
}

async function getTransactionsById(id) {
  try {
    const transactions = await db.transaction.findFirst({
      where: {
        id: id,
      },
    });
    return transactions;
  } catch (error) {
    console.log(error);
    throw new Error("failed get transactions by user id");
  }
}

async function createTransaction(entry) {
  try {
    const transaction = await db.transaction.create({
      data: {
        user_id: entry.from_user_id,
        to_user_id: entry.to_user_id,
        nominal: entry.nominal,
        otp_code: entry.otp_code,
        status: "PENDING",
      },
    });

    return transaction;
  } catch (error) {
    console.log(error);
    throw new Error("failed to create transaction");
  }
}

async function verifyTransaction(id) {
  try {
    const transaction = await db.transaction.update({
      where: {
        id: id,
      },
      data: {
        otp_code: null,
        status: "SUCCESS",
      },
    });

    return transaction;
  } catch (error) {
    console.log(error);
    throw new Error("failed verify transaction");
  }
}

async function expireTransaction(id) {
  try {
    const transaction = await db.transaction.update({
      where: {
        id: id,
      },
      data: {
        otp_code: null,
        status: "FAILED",
        expired_at: null,
      },
    });

    return transaction;
  } catch (error) {
    console.log(error);
    throw new Error("failed verify transaction");
  }
}

const transactionRepository = {
  getTransactionsByUserId,
  getTransactionsById,
  createTransaction,
  verifyTransaction,
  expireTransaction,
};

export default transactionRepository;
