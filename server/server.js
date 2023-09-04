const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const boxRoute = require("./routes/myroute");
const authRoute = require("./routes/auth");
const { login } = require("./controllers/authController");
const app = express();

//connect database
mongoose
  .connect(process.env.DATABASE, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected...✅"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
app.use("/api", boxRoute);
app.use("/api", authRoute);
app.use("/api", login);
//start server
const port = process.env.PORT;
app.listen(port, () => console.log(`start server on port ${port}`));
