const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 5000;
let users = require("./users.json");
app.use(express.json());

// middlewere
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  next();
});

// routing
app.get("/", (req, res) => {
  res.json({ message: "Hello from route handler 🚀" });
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;

  const maxId = users.length ? Math.max(...users.map((u) => u.id)) : 0;

  const newUser = {
    id: maxId + 1,
    ...body,
  };

  users.push(newUser);

  fs.writeFile("./users.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving user" });
    }
    return res.status(201).json(newUser);
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
    users[userIndex] = { ...users[userIndex], ...req.body };
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
    return res.json(users[userIndex]);
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletedUser = users.splice(userIndex, 1);
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
    return res.json({ message: "User deleted", user: deletedUser[0] });
  });

app.listen(PORT, () =>
  console.log(`🚀 Server started on http://localhost:${PORT}`)
);
