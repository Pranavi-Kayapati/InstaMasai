const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRouter");

const app = express();

app.use(express.json());
app.use("/users", userRouter);

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
