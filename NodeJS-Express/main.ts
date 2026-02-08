import express from "express";
import path from "path";
import createError from "http-errors";
// import indexRouter from "./routes/index";
import apiIndexRouter from "./routes/apiIndex.ts";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/api", apiIndexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
