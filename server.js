const e = require("express");
const express = require("express");
const mongoose = require("mongoose");
const product = require("./models/productModel");
const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Welcome to server");
// });

// app.get("/blog", (req, res) => {
//   res.send("New  blog");
// });

app.get("/product", async (req, res) => {
  try {
    const newProduct = await product.find(req.body);
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newProduct = await product.findById(id);
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newProduct = await product.findByIdAndDelete(id);
    if (!newProduct) {
      return res
        .status(404)
        .json({ message: `can't find product with ID ${id}` });
    }

    const message = `Product with ID: ${id} Successfully deleted`
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newProduct = await product.findByIdAndUpdate(id, req.body);

    if (!newProduct) {
      return res
        .status(404)
        .json({ message: `can't find product with ID ${id}` });
    }

    const updateProduct = await product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const newProduct = await product.create(req.body);
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:password042@shopapi.cregg5l.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
    });
    console.log("Successfully connected to Mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
