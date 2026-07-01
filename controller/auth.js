const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = require("../model/register");

// 1. PROTECT MIDDLEWARE (Verifies the user is logged in)
exports.protect = (req, res, next) => {
    let token; // Safely declared block-scoped variable

    // Check if the token exists inside the cookies
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else {
        return res.status(401).json({ message: "Please Login again" });
    }

    try {
        // Verify the token using your secret key
        const decoded = jwt.verify(token, "secret");

        // Attach the decoded payload (id, email, role) to the request object
        req.user = decoded;
        
        next(); // Moves the request forward to the authorize middleware
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Invalid or expired token. Please login again." });
    }
};

// 2. AUTHORIZE MIDDLEWARE (Verifies the user has the correct role)
exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if user object exists and if their role is included in the allowed list
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role (${req.user?.role || "guest"}) is not allowed to access this resource`
            });
        }

        
        next(); // Moves the request forward to your CRUD controller (e.g., getStudents)
    };
};