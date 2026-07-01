const mongoose = require("mongoose");
const Schema = mongoose.Schema; // 1. Pull Schema out of mongoose

const registerUserSchema = new Schema({ // 2. Correct instantiation syntax
    name: {
        type: String, // 3. Use uppercase String constructor
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        unique: true, // Prevents duplicate emails in your system
        lowercase: true, // Automatically converts emails to lowercase
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["student", "teacher", "admin"], // Only these 3 options are allowed
        default: "student" // If no role is provided in the request, it defaults to student
    }
}, { timestamps: true }); // Optional: Automatically adds createdAt and updatedAt fields

// Export the model (using the singular, Capitalized name convention "User")
module.exports = mongoose.model("User", registerUserSchema);