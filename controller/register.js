const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = require("../model/register");

exports.postRegister = async function (req, res, next) {
    try {
        const { name, email, password, role } = req.body;

        // 1. Use findOne so it returns null if the user isn't found
        const existingUser = await registerUser.findOne({ email });

        if (existingUser) {
            // Good practice: Use status 400 for bad requests
            return res.status(400).json("Email already exists! Please try a different Email");
        }

        // 2. Use the modern async/await version of bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 3. Create the user using the resolved hashedPassword
        await registerUser.create({
            name: name,
            email: email,
            password: hashedPassword, // Securely saved!
            role: role
        });

        res.status(201).json("Congratulations! You are Registered");
        
    } catch (error) {
        // Essential: Catch any database errors or system crashes
        console.error("Registration Error:", error);
        res.status(500).json("Something went wrong on the server.");
    }
    next();
};


exports.postLogin = async function (req, res, next) {
    try {
        const { email, password } = req.body; // Login typically only needs email and password

        // 1. Find the specific user by email
        const user = await registerUser.findOne({ email });

        if (!user) {
            return res.status(404).json("Account does not exist");
        }

        // 2. Await the comparison and use the hashed password stored in the user document
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json("Password does not match, please try again");
        }

        // 3. Sign the JWT payload (good practice to include the user's ID)
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, 
            "secret", // In production, move this string to a .env file!
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        // 4. Set the cookie properly with a key name and options
        res.cookie("token", token, {
            httpOnly: true, // Secure: protects cookie from client-side scripts
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.status(200).json("Welcome to Student Management System");

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json("Something went wrong on the server.");
    }
};