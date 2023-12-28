var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cron = require("cron");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const connection = require("./src/database/connection");
const userRoute = require("./src/v1/routes/index");
const sessionStore = new MySQLStore({}, connection);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   cors({
//     origin: "http://localhost", // add another in the future
//     methods: "POST, GET, PUT, PATCH, DELETE",
//     credentials: true,
//   })
// );
app.use(
  session({
    secret: "^nd82@37nki$897ncs",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: false,
      maxAge: 10 * 60 * 1000, // 10 minutes
    },
  })
);

// const cleanUpExpiredSession = new cron.CronJob("0 */12 * * *", async () => {
//   try {
//     const currentTime = new Date();
//     await sessionStore.clearExpiredSessions(currentTime);
//     console.log("Expired sessions has been cleared successfully!");
//   } catch (err) {
//     console.log("Error cleaning up expired session: ", err);
//   }
// });

// cleanUpExpiredSession.start();

app.use("/api/v1/users", userRoute);
// api/v1/users/check_session
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(5000, () => {
  console.log("listenin on port 5000");
});
