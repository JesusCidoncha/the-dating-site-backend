const Dog = require("../models/Dog.model");
const { isAuthenticated } = require("../middleware/route-guard.middleware");
const router = require("express").Router();

// GET all
router.get("/", async (req, res) => {
  try {
    const allDogs = await Dog.find();
    res.status(200).json(allDogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the dogs" });
  }
});

// GET one
router.get("/:dogId", async (req, res) => {
  const { dogId } = req.params;

  try {
    const oneDog = await Dog.findById(dogId);
    res.status(200).json(oneDog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the dog" });
  }
});

// POST one
router.post("/", isAuthenticated, async (req, res) => {
  const payload = req.body;
  const { userId } = req.tokenPayload;
  payload.user = userId;

  try {
    const newDog = await Dog.create(payload);
    res.status(201).json(newDog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while adding the dog" });
  }
});

// PUT one
router.put("/:dogId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const payload = req.body;
  const { dogId } = req.params;

  try {
    const {user} = await Dog.findById(dogId);
    //Convert user id (ObjectId) to a string
    const id = user.toHexString;

    if (id === userId) {
      const updatedDog = await Dog.findByIdAndUpdate(dogId, payload, {
        new: true,
      });
      res.status(200).json(updatedDog);
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while updating the dog" });
  }
});

router.delete("/:dogId", isAuthenticated, async (req, res) => {
  const { userId } = req.tokenPayload;
  const { dogId } = req.params;

  try {
    const {user} = await Dog.findById(dogId);
    console.log("user:",user);
    //  Convert user id (ObjectId) to a string
    const id = user.toHexString()

    if (id === userId) {
      console.log("Deleting");
      await Dog.findByIdAndDelete(dogId);
      res.status(204).json();
    } else {
      res.status(403).json({ message: "you are not the right user" });
    }
  } catch (error) {
    res.status(500).json({ message: "error while deleting the dog" });
  }
});

module.exports = router;
