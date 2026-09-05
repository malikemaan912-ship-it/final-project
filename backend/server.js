const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const recipes = [
  {
    id: 1,
    name: "Chicken Biryani",
    cuisine: "Pakistani",
    rating: 4.9
  },
  {
    id: 2,
    name: "Margherita Pizza",
    cuisine: "Italian",
    rating: 4.8
  },
  {
    id: 3,
    name: "Chicken Chow Mein",
    cuisine: "Chinese",
    rating: 4.7
  },
  {
    id: 4,
    name: "Chicken Tacos",
    cuisine: "Mexican",
    rating: 4.8
  }
];

app.get("/", (req, res) => {
  res.json({
    message: "🍴 Foodie Backend is Running!"
  });
});
app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});