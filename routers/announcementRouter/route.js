const middleware = require("../../middleware");
const router = require("express").Router();
const Announcement = require("../../models/announcementModel");

router.get("/", middleware, async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json({ announcements: announcements, status: 200 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
}
);

router.post("/add", middleware, async (req, res) => {
    try {
        const { title, content } = req.body;
        if (title === "" || content === "") {
        res.status(400).json({ message: "Title and content are required", status: 400 });
        } else {
        const announcement = new Announcement({
            title: title,
            content: content,
        });
        await announcement.save();
        res.status(200).json({ message: "Announcement added", status: 200 });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
});

module.exports = router;
