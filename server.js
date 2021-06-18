const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const checkAuth = require("./lib/chectAuth");
const isAdmin = require("./lib/isAdmin");
const userAdmin = require("./controllers/Admin/UserAdminController");
const http = require("http");
// Server(app);
// const io = require("socket.io")(http, {
//   cors: {
//     origin: "*",
//   },
// });
const cors = require("cors");
const morgan = require("morgan");

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Welcome to server created by David Kristek</h1>");
});
// http.listen(PORT, () => console.log(`Server started on port ${PORT}`));
server.listen(port, () => {
  console.log(`Server running at port ` + port);
});
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Database connected");
    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Welcome to server created by David Kristek</h1>");
    });
    // http.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    server.listen(port, () => {
      console.log(`Server running at port ` + port);
    });
  })
  .catch((err) => console.log(err));

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<h1>Hello World</h1>");
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// sockets :
// require("./Sockets")(io);

// app.get("/", (req, res) => {
//   res.json({"msg" : "Welcome to server created by David Kristek"})
// });

// server.listen(port, () => {
//   console.log(`Server running at port ` + port);
// });
