require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const verify = (req, res, next) => {
  if (req.path.includes("/login")) {
    next();
  } else {
    const token = req.headers.authorization?.replace("Bearer ", "");
    jwt.verify(token, "makisu", { algorithms: ["HS256"] }, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "未授权访问" });
      }
      next();
    });
  }
};
app.use(verify);

const db = require("./app/models");

console.log(db.url);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
