const middleware = require("../../middleware");
const router = require("express").Router();
const ToDo = require("../../models/todoModel");

router.post("/add", middleware, async (req, res) => {
    try {
        const todo = new ToDo({
            title: req.body.title,
            user: req.body.user,
        });
        await todo.save();
        res.status(200).json({ message: "To do added", status: 200, todo: todo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
}
);

router.get("/", middleware, async (req, res) => {
    try {
        const todos = await ToDo.find();
        res.status(200).json({ todos: todos, status: 200 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
});

router.put("/check", middleware, async (req, res) => {
    try {
        const todo = await ToDo.findById(req.body.id);
        todo.completed = !todo.completed;
        await todo.save();

        res.status(200).json({ message: "To do checked", status: 200 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
});

router.delete("/delete", middleware, async (req, res) => {
    try {
        await ToDo.findByIdAndDelete(req.body.id);

        res.status(200).json({ message: "To do deleted", status: 200 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", status: 500 });
    }
}
);


module.exports = router;