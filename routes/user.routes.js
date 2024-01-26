const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/route-guard.middleware");
const User = require("../models/User.model");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    console.log("Retrieved users ->", users);
    res.json(users);
  } catch (error) {
    next(error);
    res.status(500).send({ error: "Failed to retrieve users" });
  }
});

router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});


router.get("/event/:eventId", async (req, res, next) => {
  const eventid = req.params.eventId;
  console.log('eventId:', eventid);

  try {
    const userList = await User.find({ user: eventid }).populate("user");
    console.log('userList:', userList);

    res.status(200).json(userList);
  } catch (error) {
    next(error);
  }
});

router.get("/dog/:dogId", async (req, res, next) => {
  const { dogId } = req.params;

  try {
    const userList = await User.find({ user: dogId }).populate("dog");

    res.status(200).json(userList);
  } catch (error) {
    next(error);
  }
});

//POST - /users
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

//PUT - /User
router.put("/:userId", isAuthenticated, async (request, response) => {
  console.log(request.body);
  const payload = request.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.userId,
      payload,
      { new: true }
    );
    response.status(200).json(updatedUser);
  } catch (error) {
    next(error);
    response.status(500).json({ message: "Something bad happened" });
  }
});

//  DELETE  /users/:UserId route
router.delete("/:userId", isAuthenticated, async (request, response) => {
  const { userId } = request.params;

  console.log(userId)
  try {
    const userToDelete = await User.findByIdAndDelete(userId);
    response
      .status(204)
      .json({ message: `${userToDelete.title} was remove from the db` });
  } catch (error) {
    next(error);
    response.status(500).json({ message: "Something bad happened" });
  }
});

module.exports = router;
