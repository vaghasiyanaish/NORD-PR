const express = require("express");
const app = express();
const port = 9000;

app.use(express.urlencoded());
app.set("view engine", "ejs");

let tasks = [
    {
        id: "1",
        title: "Eat Breakfast",
        description: "idli , sambhar , chutney",
        priority: "High",
        status: "Pending",
        assignedTo: "Self",
        deadline: "2025-12-010T08:00AM"
    },
    {
        id: "2",
        title: "Go To Tutuion",
        description: "RED & WHITE",
        priority: "Medium",
        status: "In Progress",
        assignedTo: "Self",
        deadline: "2025-10-12T10:00AM"
    },
    {
        id: "3",
        title: "Eat Lunch",
        description: "Eat Rice , dal , rotli ,  bhinda nu shak",
        priority: "High",
        status: "In Progress",
        assignedTo: "Self",
        deadline: "2025-10-12T12:30PM"
    }
];

app.get("/", (req, res) => {
    res.render("index", { tasks });
});

app.post("/addtask", (req, res) => {
    const { id, title, description, priority, status, assignedTo, deadline } = req.body;
    tasks.push({ id, title, description, priority, status, assignedTo, deadline });
    res.redirect("/");
});

app.get("/deletetask/:id", (req, res) => {
    tasks = tasks.filter(task => task.id !== req.params.id);
    res.redirect("/");
});

app.get("/edittask/:id", (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    res.render("edit", { task });
});

app.post("/updatetask/:id", (req, res) => {
    const taskId = req.params.id;
    const { title, description, priority, status, assignedTo, deadline } = req.body;

    tasks = tasks.map(task =>
        task.id === taskId
            ? { id: taskId, title, description, priority, status, assignedTo, deadline }
            : task
    );

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
