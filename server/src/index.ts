import express from "express";
import cors from "cors";
import argon2 from "argon2";
import { poll } from "./db";
import { validLoginUser, validSignupUser } from "./utils/validUser";

const PORT = 8000;

const app = express();

// MIDDLEWARE //
app.use(cors());
app.use(express.json()); // req.body

// ROUTES //
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

// create user
app.post("/signup", async (req, res) => {
  try {
    const created_on = new Date();
    const { email, password, username } = req.body;

    const hashPassword = await argon2.hash(password);

    if (!validSignupUser(email, password, username)) {
      return res.status(400).json({ error: "provide valid data" });
    }

    // "INSERT INTO users (username, email, password, created_on) VALUES($1, $2, $3, $4) RETURNING username, email, created_on, last_login, user_id"
    const newUser = await poll.query(
      "INSERT INTO users (username, email, password, created_on) VALUES($1, $2, $3, $4) RETURNING *",
      [username.toLowerCase(), email.toLowerCase(), hashPassword, created_on]
    );

    // TODO: jwt?

    delete newUser.rows[0].password;
    return res.status(200).json(newUser.rows[0]);
  } catch (error) {
    console.error("SIGNUP ERROR: ", error.message);
    return res.json({ error: "user name or email already taken" });
  }
});

// get user if it exists
app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validLoginUser(email, password)) {
      return res.status(400).json({ error: "provide valid data" });
    }

    const loginUser = await poll.query("SELECT * FROM users WHERE email = $1", [
      email.toLowerCase()
    ]);

    // user not found
    if (!loginUser.rows[0]) {
      return res.status(400).json({ error: "user not found" });
    }

    const valid = await argon2.verify(loginUser.rows[0].password, password);

    // passwords entered and in db does not match
    if (!valid) {
      return res.status(400).json({ error: "user not found" });
    }

    // TODO: jwt? express-session?

    delete loginUser.rows[0].password;
    return res.status(200).json(loginUser.rows[0]);
  } catch (error) {
    console.error("LOGIN ERROR: ", error.message);
    return res.json({ error: "user name or email already taken" });
  }
});

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const created_on = new Date();
    const { description, user_id } = req.body;
    const newTodo = await poll.query(
      "INSERT INTO todos (user_id ,description, created_on) VALUES($1, $2, $3) RETURNING *",
      [user_id, description, created_on]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all todo
// app.get("/todos", async (req, res) => {
//   try {
//     const allTodos = await poll.query("SELECT * FROM todo");
//     res.json(allTodos.rows);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await poll.query("SELECT * FROM todo WHERE todo_id  = $1", [
      id
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    await poll.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
      description,
      id
    ]);

    res.json("Todo was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await poll.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    res.json("Todo was deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
