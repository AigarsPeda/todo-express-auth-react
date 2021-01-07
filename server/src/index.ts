import argon2 from "argon2";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { verifyToken } from "./auth/verifyToken";
import { poll } from "./db";
import { RequestWithUser } from "./types";
import { validLoginUser, validSignupUser } from "./utils/validUser";
import { Storage } from "@google-cloud/storage";
import path from "path";
import { uploadImage } from "./utils/uploadImage";

const PORT = 8000;
const app = express();
dotenv.config();

const gc = new Storage({
  keyFilename: path.join(__dirname, "../key.json"),
  projectId: "todo-node-1"
});

// gc.getBuckets().then((x) => console.log(x));
const todoAvatars = gc.bucket("todo-avatars");

// MIDDLEWARE //
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

app.use(cors() as any);
app.use(express.json()); // req.body

// ROUTES //
app.get("/", (_req, res) => {
  res.json({ message: "Hello" });
});

// create user
app.post("/signup", async (req, res) => {
  try {
    const created_on = new Date();
    const { email, password, username } = req.body;

    // validating email, password and user name
    if (!validSignupUser(email, password, username)) {
      return res.status(400).json({ error: "provide valid data" });
    }

    // hash password
    const hashPassword = await argon2.hash(password);

    // saving user to db and returning new user
    // without password to return it later
    // with response
    const newUser = await poll.query(
      "INSERT INTO users (username, email, password,created_on) VALUES($1, $2, $3, $4) RETURNING username, email, created_on, last_login, user_id, user_image_url",
      [username.toLowerCase(), email.toLowerCase(), hashPassword, created_on]
    );

    // sign jsonwebtoken to save it in front
    // end identify user later
    const token = jwt.sign({ user: newUser.rows[0] }, process.env.SECRET_KEY!);

    // returning user and token
    return res.status(200).json({
      user: newUser.rows[0],
      token: token
    });
  } catch (error) {
    console.error("SIGNUP ERROR: ", error.message);
    return res.json({ error: "user name or email already taken" });
  }
});

// get user if it exists
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validating email and password
    if (!validLoginUser(email, password)) {
      return res.status(400).json({ error: "provide valid data" });
    }

    // find user id DB with email
    const loginUser = await poll.query(
      "SELECT *  FROM users WHERE email = $1",
      [email.toLowerCase()]
    );

    // user not found
    if (!loginUser.rows[0]) {
      return res.status(400).json({ error: "user not found" });
    }

    // check password
    // compare password entered and what is saved in db
    if (await argon2.verify(loginUser.rows[0].password, password)) {
      // sign jsonwebtoken to save it in front
      // end identify user later
      const token = jwt.sign(
        { user: loginUser.rows[0] },
        process.env.SECRET_KEY!
      );

      // delete password from user so it
      // would not be in response
      delete loginUser.rows[0].password;

      // return token and found user
      return res.status(200).json({
        user: loginUser.rows[0],
        token: token
      });
    } else {
      // password did not match
      return res.status(401).json({ error: "wrong credentials" });
    }
  } catch (error) {
    console.error("LOGIN ERROR: ", error.message);
    return res.status(503).json({ error: "service unavailable" });
  }
});

// upload image
app.post(
  "/user/image",
  verifyToken,
  upload,
  async (req: RequestWithUser, res) => {
    // req.file is available because off multer  middleware
    try {
      if (req.user) {
        const { user } = req.user;
        // const { id } = req.params;

        // try to find and update entry
        // const foundTodo = await poll.query(
        //   "UPDATE todos SET description = $1, tags = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
        //   [description, tags, parseInt(id), user.user_id]
        // );

        // console.log(foundTodo.rows[0]);

        // check if something was updated
        // if (foundTodo.rowCount) {
        //   res.status(200).json(foundTodo.rows[0]);
        // } else {
        //   res.status(401).json({ error: "forbidden" });
        // }
        console.log(req.file);
        if (
          req.file.mimetype === "image/webp" ||
          req.file.mimetype === "image/png" ||
          req.file.mimetype === "image/jpeg" ||
          req.file.mimetype === "image/jpg"
        ) {
          console.log(req.file);
          // req.file.filename = "yes";
          const url = await uploadImage(req.file, todoAvatars);

          const foundUser = await poll.query(
            "UPDATE users SET user_image = $1 WHERE user_id = $2 RETURNING *",
            [url, user.user_id]
          );
          return res.status(200).json(foundUser.rows[0]);
        } else {
          return res.status(403).json({
            error: "Wrong image format. Acceptable formats WEBP PNG JPEG"
          });
        }
      } else {
        return res.status(403).json({ error: "no user" });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(503).json({ error: "service unavailable" });
    }
  }
);

// get all user todos
app.get("/todos", verifyToken, async (req: RequestWithUser, res) => {
  try {
    if (req.user) {
      const allTodos = await poll.query(
        "SELECT *  FROM todos WHERE user_id = $1 ORDER BY created_on ASC",
        [req.user.user.user_id]
      );
      return res.json(allTodos.rows);
    } else {
      return res.status(403).json({ error: "no user" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(503).json({ error: "service unavailable" });
  }
});

// create a todo if log in and header is set
app.post("/todos", verifyToken, async (req: RequestWithUser, res) => {
  try {
    if (req.user) {
      const created_on = new Date();
      // user from verifyToken token must be in header
      const { user } = req.user;
      const { description, tags } = req.body;
      const newTodo = await poll.query(
        "INSERT INTO todos (user_id ,description, created_on, tags) VALUES($1, $2, $3, $4) RETURNING *",
        [user.user_id, description, created_on, tags]
      );
      res.json(newTodo.rows[0]);
    } else {
      res.status(403).json({ error: "no user" });
    }
  } catch (error) {
    console.error(error.message);
  }
});

// get a todo
// app.get("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await poll.query("SELECT * FROM todo WHERE todo_id  = $1", [
//       id
//     ]);
//     res.json(todo.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// update users todo
app.put("/todo/:id", verifyToken, async (req: RequestWithUser, res) => {
  try {
    if (req.user) {
      const { user } = req.user;
      const { id } = req.params;
      const { description, tags } = req.body;

      // try to find and update entry
      const foundTodo = await poll.query(
        "UPDATE todos SET description = $1, tags = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
        [description, tags, parseInt(id), user.user_id]
      );

      // console.log(foundTodo.rows[0]);

      // check if something was updated
      if (foundTodo.rowCount) {
        res.status(200).json(foundTodo.rows[0]);
      } else {
        res.status(401).json({ error: "forbidden" });
      }
    } else {
      res.status(403).json({ error: "no user" });
    }
  } catch (error) {
    console.error(error.message);
  }
});

// update users todo status
app.put("/todos/status/:id", verifyToken, async (req: RequestWithUser, res) => {
  try {
    if (req.user) {
      const { user } = req.user;
      const { id } = req.params;
      const { completed } = req.body;

      // try to find and update entry
      const foundTodo = await poll.query(
        "UPDATE todos SET completed = $1 WHERE id = $2 AND user_id = $3",
        [completed, id, user.user_id]
      );

      // check if something was updated
      if (foundTodo.rowCount) {
        res.status(200).json({ message: "Todo was updated!" });
      } else {
        res.status(401).json({ error: "forbidden" });
      }
    } else {
      res.status(403).json({ error: "no user" });
    }
  } catch (error) {
    console.error(error.message);
  }
});

// delete users todo
app.delete("/todos/:id", verifyToken, async (req: RequestWithUser, res) => {
  try {
    if (req.user) {
      const { id } = req.params;
      const { user } = req.user;

      // deleting todo
      const deletedTodo = await poll.query(
        "DELETE FROM todos WHERE id = $1 AND user_id = $2",
        [id, user.user_id]
      );

      // checking if todo was found and deleted
      if (deletedTodo.rowCount) {
        res.status(200).json({ message: "Todo was deleted!" });
      } else {
        res.status(401).json({ error: "forbidden" });
      }
    } else {
      res.status(403).json({ error: "no user" });
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
