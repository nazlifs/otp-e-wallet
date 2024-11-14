import express from "express";
import userService from "../../domain/service/users.js";

const router = express.Router();

router.get("/users", async function (req, res) {
  console.log({ query: req.query });
  const id = req.query.id;
  const users = await userService.getUsers(Number(id));
  res.json({
    data: users,
  });
});

router.get("/users/:id", async function (req, res) {
  const id = req.params.id;
  const user = await userService.getUserById(id);

  if (user == null) {
    res.status(404).json({
      messsage: "user not found",
    });
    return;
  }

  res.json({
    data: user,
  });
});

router.post(
  "/users",
  express.json(),
  express.urlencoded({ extended: true }),
  async function (req, res) {
    const request = req.body;

    const data = await userService.createUser(request);
    res.status(201).json({
      data,
    });
  }
);

router.patch(
  "/users/:id",
  express.json(),
  express.urlencoded({ extended: true }),
  async function (req, res) {
    const id = req.params.id;
    const request = req.body;

    const user = await userService.getUserById(id);

    if (user == null) {
      res.status(404).json({
        messsage: "user not found",
      });
      return;
    }

    const entry = { ...user, ...request };

    const data = await userService.updateUser(entry);
    res.json({
      data,
    });
  }
);

router.delete("/users/:id", async function (req, res) {
  const id = req.params.id;
  const user = await userService.getUserById(id);
  if (user == null) {
    res.status(404).json({
      messsage: "user not found",
    });
    return;
  }

  userService.deleteUserById(id);
  res.sendStatus(204);
});

export default router;
