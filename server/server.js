//require() is basically import in node
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const productRoutes = require(`./routes/productRoutes`);
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(`/api/products`, productRoutes);

app.get("/", (req, res) => {
  res.send("RetroFit API running. This should show up in the front page!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
