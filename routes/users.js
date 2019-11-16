const express = require('express');
const router = express.Router();

const Users = require('../models/Users');

router.post("/signup", async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({
      payload: `Expected valid values for user [username]`,
      err: true
    })
  }

  try {
    let user = {
      username,
    };

    let registeredUser = await Users.createUser(user);
    res.status(201).json({
      payload: {
        user: registeredUser,
        msg: "User created",
      },
      err: false
    })
  } catch (err) {
    if (typeof err === "string") {
      res.status(409).json({
        payload: {
          msg: err
        },
        err: true
      })
    } else {
      next(err);
    }
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.getAll();
    res.json({
      payload: users,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.get('/:username', async (req, res, next) => {
  let { username } = req.params
  try {
    const user = await Users.getUserByUsername(username);
    if (!user) { return next(user) }
    res.json({
      payload: user,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
