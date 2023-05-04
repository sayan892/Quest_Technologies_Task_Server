const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./Router/authroutes");
const userRoutes = require("./Router/userroutes");
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.get("/", function (req, res) {
  res.json({ message: "READY TO RECEIVE REQUEST" });
});
app.use((err, res) => {
  console.log(err)
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(port,() => {console.log(`app is listening at port ${port}`)})
