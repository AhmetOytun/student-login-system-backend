const User = require("../../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../../middleware");

router.post("/login", async (req, res) => {
  try {
    /* check if username and password are empty */
    const { username, password } = req.body;

    if (username === "" || password === "") {
      /* return status 400 if username or password is empty */
      res
        .status(400)
        .json({ message: "Username and password are required", status: 400 });
    } else {
      /* check if username exists */
      const user = await User.findOne({ username: username });
      if (!user) {
        /* return status 400 if username does not exist */
        res
          .status(400)
          .json({ message: "Username does not exist", status: 400 });
      } else {
        /* check if password is correct */
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          /* return status 400 if password is incorrect */
          res
            .status(400)
            .json({ message: "Password is incorrect", status: 400 });
        } else {
          /* create token */
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

          res
            .status(200)
            .json({ message: "Login successful", token: token,role: user.role, status: 200 });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

router.post("/register", async (req, res) => {
  try {
    /* check if username and password are empty */
    const { username, password, role, email } = req.body;

    console.log(username, password, role, email);

    if (username === "" || password === "" || role === "" || email === "") {
      /* return status 400 if username, password, role or email is empty */
      res
        .status(400)
        .json({ message: "Username and password are required", status: 400 });
    } else {
      const user = await User.findOne({ username: username });

      if (user) {
        /* return status 400 if username already exists */
        res
          .status(400)
          .json({ message: "Username already exists", status: 400 });
      } else {
        /* hash password */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        /* create new user */
        const newUser = new User({
          username: username,
          password: hashedPassword,
          email: email,
          role: role,
        });
        newUser.save();

        res
          .status(200)
          .json({ message: "User created successfully", status: 200 });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

router.get("/",middleware, async (req, res) => { 
  try {
    const users = await User.findById(req.decodedToken.id);
    res.status(200).json({ user: users, status: 200 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
}
);

module.exports = router;
