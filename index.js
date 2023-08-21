const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRouter");
const { postRouter } = require("./routes/postRouter");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to db");
    console.log("Server is running on port 8080");
  } catch (error) {}
});
