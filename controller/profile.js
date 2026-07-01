const User = require("../model/register");

exports.Profile = async (req, res, next) => {
    try {
        // req.user is automatically populated by your 'protect' middleware!
        // We can look up the fresh user document from MongoDB using the ID inside the token
        const userProfile = await User.findById(req.user.id).select("-password"); // "-password" hides the hashed password from the response

        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }

        // Send back a clean JSON object containing the profile data
        res.status(200).json({
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    });
        
    } catch (error) {
        console.error("Profile Fetch Error:", error.message);
        res.status(500).json({ message: "Server error fetching profile" });
    }
};