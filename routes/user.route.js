const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

router.get("/users", async (req, res, next) => {
    try {
        const users = await User.find().populate("event");
        console.log("Retrieved users ->", users);
        res.json(users);
    } catch (error) {
        next(error);
        res.status(500).send({ error: "Failed to retrieve users" });
    }
});

router.get("/users/:userId", async (req, res, next) => {
    const { userId } = req.params;

    try {
        const User = await User.findById(userId).populate("event");

        res.status(200).json(User);
    } catch (error) {
        next(error);
    }
});

router.get("/users/event/:eventId", async (req, res, next) => {
    const eventId = req.params.eventId;

    try {
        const UserList = await User.find({ event: eventId }).populate(
            "event"
        );

        res.status(200).json(UserList);
    } catch (error) {
        next(error);
    }
});

router.get("/users/dog/:dogId", async (req, res, next) => {
    const { dogId } = req.params;

    try {
        const UserList = await User.find({ event: dogId }).populate(
            "event"
        );

        res.status(200).json(UserList);
    } catch (error) {
        next(error);
    }
});

//POST - /users
router.post("/users", async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

//PUT - /User
router.put("/users/:userId", async (request, response) => {
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
}
);

//  DELETE  /users/:UserId route
router.delete("/users/:userId",
    async (request, response) => {
        const { userId } = request.params;
        try {
            const userToDelete = await User.findByIdAndDelete(userId);
            response
                .status(204)
                .json({ message: `${userToDelete.title} was remove from the db` });
        } catch (error) {
            next(error);
            response.status(500).json({ message: "Something bad happened" });
        }
    }
);

module.exports = router;
