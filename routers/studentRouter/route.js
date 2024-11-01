const middleware = require("../../middleware");
const User = require("../../models/userModel");
const router = require("express").Router();

router.get("/", middleware, async (req, res) => {
    try {
        const users = await User.find({role: "Student"});
        res.status(200).json({ users: users, status: 200 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
}
);

module.exports = router;