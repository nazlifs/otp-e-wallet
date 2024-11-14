import transactionRepository from "../repository/transaction.js";

async function getTransactionsByUserId(id) {
  try {
    return transactionRepository.getTransactionsByUserId(id);
  } catch (error) {
    throw error;
  }
}

async function getTransactionsById(id) {
  try {
    return transactionRepository.getTransactionsById(id);
  } catch (error) {
    throw error;
  }
}

async function createTransaction(entry) {
  try {
    return transactionRepository.createTransaction(entry);
  } catch (error) {
    throw error;
  }
}

async function verifyTransaction(id) {
  try {
    return transactionRepository.verifyTransaction(id);
  } catch (error) {
    throw error;
  }
}

async function expireTransaction(id) {
  try {
    return transactionRepository.expireTransaction(id);
  } catch (error) {
    throw error;
  }
}

const transactionService = {
  getTransactionsByUserId,
  getTransactionsById,
  createTransaction,
  verifyTransaction,
  expireTransaction,
};

export default transactionService;
