const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
<<<<<<< HEAD
const io = require("socket.io")();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
=======

const spotifyRouter = require("./routes/spotify.router");
>>>>>>> 220157131fb9cd2538c8209a83c0a88b31d823b1

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
app.use("/", indexRouter);
app.use("/users", usersRouter);
=======
app.use("/spotify", spotifyRouter);
>>>>>>> 220157131fb9cd2538c8209a83c0a88b31d823b1

module.exports = app;
