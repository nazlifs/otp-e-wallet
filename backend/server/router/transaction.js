import express from "express";
import userService from "../../domain/service/users.js";
import transactionService from "../../domain/service/transaction.js";
import { generateOTP } from "../../util/otp_code.js";
import { sendMail } from "../../util/send_mail.js";
import jwt from "jsonwebtoken";
import { sendStatus } from "../../util/send_status.js";

const router = express.Router();

const authenticateToken = (req, res, next) => {
  // TAMBAHAN
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}; // TAMBAHAN

router.get("/users/:id/transactions", async function (req, res) {
  // TAMBAHAN
  try {
    const id = req.params.id;
    const data = await transactionService.getTransactionsByUserId(Number(id));
    res.json({ data });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post(
  "/users/:id/transactions",
  express.json(),
  express.urlencoded({ extended: true }),
  // authenticateToken, // TAMBAHAN
  async function (req, res) {
    try {
      const id = req.params.id;
      const request = {
        from_user_id: Number(id),
        to_user_id: req.body.user_id,
        nominal: req.body.nominal,
        otp_code: generateOTP(),
      };

      const userFrom = await userService.getUserById(request.from_user_id);
      if (userFrom == null) {
        res.status(400).json({
          messages: {
            id: "invalid user id",
          },
        });
        return;
      }

      const userTo = await userService.getUserById(request.to_user_id);
      if (userTo == null) {
        res.status(400).json({
          messages: {
            user_id: "invalid user id",
          },
        });
        return;
      }

      if (userFrom.balance < request.nominal) {
        res.status(400).json({
          messages: {
            nominal: "nominal is greater than balance",
          },
        });
      }

      const transaction = await transactionService.createTransaction(request);

      userFrom.balance = userFrom.balance - transaction.nominal;
      await userService.updateUser(userFrom);

      await sendMail(userFrom.email, transaction.otp_code);

      res.status(201).json({
        data: transaction,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

router.patch(
  "/secure-otp",
  express.json(),
  express.urlencoded({ extended: true }),
  // authenticateToken,
  async function (req, res) {
    try {
      const request = req.body;

      const transaction = await transactionService.getTransactionsById(
        Number(request.transaction_id)
      );

      if (transaction.status != "PENDING") {
        res.status(403).json({
          messages: {
            transaction_id: "transaction already closed",
          },
        });
        return;
      }

      if (transaction == null) {
        res.status(400).json({
          messages: {
            transaction_id: "invalid transaction",
          },
        });
        return;
      }

      if (transaction.otp_code != request.otp_code) {
        const user = await userService.getUserById(transaction.user_id);
        user.balance = parseInt(transaction.nominal) + parseInt(user.balance);
        await userService.updateUser(user);
        await transactionService.expireTransaction(transaction.id);

        res.status(400).json({
          message: {
            otp_code: "invalid otp code",
          },
        });
        return;
      }

      const user = await userService.getUserById(transaction.user_id);
      const toUser = await userService.getUserById(transaction.to_user_id);
      toUser.balance = parseInt(toUser.balance) + parseInt(transaction.nominal);
      console.log(transaction);
      await userService.updateUser(toUser);
      await transactionService.verifyTransaction(transaction.id);
      await sendStatus(user.email, toUser.name, transaction.nominal);

      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export default router;
