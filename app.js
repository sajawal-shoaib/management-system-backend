const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");

const cors = require("cors");

// Make sure this is placed BEFORE app.use(registerRoute)


const registerRoute = require("./routes/register");
const adminRoute = require("./routes/admin");
const profileRouter = require("./routes/profile");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    credentials: true // Crucial for your HTTP-Only cookies to slide through safely!
}));

// 1. MIDDLEWARE ALWAYS GOES FIRST (Crucial for Postman req.body to work)
app.use(express.json()); 

app.use(cookieparser());

// 2. DATABASE CONNECTION
mongoose.connect("mongodb+srv://sajawal:Sajawal202@interview-ai.xl8zai3.mongodb.net/users")
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// 3. BASE ROUTE
app.get("/", (req, res, next) => {
    console.log(req.url, req.method);
    res.send("Server is up and running!");
});

// 4. ROUTER MIDDLEWARE (Placed after express.json)
app.use(registerRoute);
app.use(adminRoute);
app.use(profileRouter)

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is Running at PORT ${PORT}`);
});