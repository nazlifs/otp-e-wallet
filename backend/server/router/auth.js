import express from "express";
import userService from "../../domain/service/users.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// router.post("/login", async function (_, res) {
//   try {
//     const email = process.env.DEFAULT_EMAIL;
//     const user = await userService.getUserByEmail(email);
//     if (user == null) {
//       res.status(404).json({
//         email: "invalid email",
//       });
//       return;
//     }

//     return res.json({
//       data: user,
//     });
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

// signUp
router.post(
  "/signup",
  express.json(),
  express.urlencoded({ extended: true }),
  async function (req, res) {
    try {
      const { email, name, password } = req.body;

      const user = await userService.createUser({
        email,
        name,
        password,
        balance: 0, // Default balance
      });

      res.status(201).json({ data: user });
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

//login
router.post(
  "/login",
  express.json(),
  express.urlencoded({ extended: true }),
  async function (req, res) {
    try {
      const { email, password } = req.body;
      console.log({ email });
      const user = await userService.getUserByEmail(email);

      if (!user) {
        res.status(401).json({ message: "Invalid email" });
        return;
      }

      if (user.password !== password) {
        res.status(401).json({ message: "invalid password" });
        return;
      }

      res.json({ data: user });
    } catch (error) {
      console.error("error saat membuat user:", error);
      res.sendStatus(500);
    }
  }
);

export default router;
