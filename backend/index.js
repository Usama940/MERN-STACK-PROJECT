const express = require("express");
const app = express();
const PORT = 5000;
const { LogReqRes } = require("./middlewere/index");
const userRouter = require("./routes/user");
const connectMongoDb = require("./connection");
connectMongoDb(
  "mongodb+srv://usama:Ka7VFWtThXa4oGol@cluster0.fhxqlda.mongodb.net/"
);

app.use(express.urlencoded({ extended: false }));
app.use(LogReqRes("log.text"));
app.use("/users", userRouter);

app.listen(PORT, () =>
  console.log(` Server started on http://localhost:${PORT}`)
);
