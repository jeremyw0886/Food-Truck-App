const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const foodTruckRoutes = require("./routes/foodTrucks");  // ✅ Ensure this path is correct
const authRoutes = require("./routes/auth");

// Use Routes
app.use("/api/foodtrucks", foodTruckRoutes);
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
