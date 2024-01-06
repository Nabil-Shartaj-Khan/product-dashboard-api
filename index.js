const express = require("express");
const app = express();
require("dotenv").config();
require("./db");
const PORT = process.env.PORT || 9000;
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Everything is OK");
});

// route for /products
app.use("/products", productRoutes);

// route for /products
app.use("/users", userRoutes);

app.listen(9000, () => {
  console.log("App is running on PORT: " + PORT);
});
