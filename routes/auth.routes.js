const User = require("../models/User.model");

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/route-guard.middleware");

router.get("/", (req, res) => {
  res.json("All good in auth");
});

router.post("/signup", async (req, res) => {
  const { firstName, lastName, birthday, email, password, socialMedia, location, civilStatus, events, dogs } = req.body;
  console.log("testing:", req.body)
  try {

    const potentialUser = await User.findOne({ email });

    if (!potentialUser) {
      const salt = bcrypt.genSaltSync(13);
      const passwordHash = bcrypt.hashSync(password, salt);
      try {
        await User.create({ firstName, lastName, email, passwordHash, birthday, socialMedia, location, events, dogs, civilStatus });
        res.status(201).json({ message: "User created" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is an error creating user" });
      }
    } else {
      res.status(400).json({ message: "The email is already in use" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "There was an error while trying to get a user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    const potentialUser = await User.findOne({ email });

    if (potentialUser) {
      const passwordCorrect = bcrypt.compareSync(
        password,
        potentialUser.passwordHash
      );
      if (passwordCorrect) {
        const authToken = jwt.sign(
          { userId: potentialUser._id },
          process.env.TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "6h",
          }
        );
        res.status(200).json({ token: authToken });
      } else {
        console.log("Problem while checking for the password");
        res.status(403).json({ message: "Something went wrong" });
      }
    } else {
      console.log("Problem while checking for the email");
      res.status(403).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/verify", isAuthenticated, async (req, res) => {
  console.log(req.tokenPayload);
  const currentUser = await User.findById(req.tokenPayload.userId);
  res.status(200).json(currentUser);
});

module.exports = router;
