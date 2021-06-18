const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const checkAuth = require("./lib/chectAuth");
const isAdmin = require("./lib/isAdmin");
const userAdmin = require('./controllers/Admin/UserAdminController');
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

dotenv.config();
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Database connected");
    http.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// sockets :
require("./Sockets")(io);

const test = () => {
  console.log("healllo");
};

app.use("/api/auth", require("./routes/auth"));
app.use("/api/category", require("./routes/category"));
app.use("/api/posts", require("./routes/posts"));


// first admin route
app.get("/api/admin/first", checkAuth, userAdmin.first_admin, require("./routes/admin"));

app.use("/api/admin", checkAuth, isAdmin, require("./routes/admin"));


