const User = require("../model/register");

// 1. GET ALL STUDENTS (Typically filtered by role)
exports.getStudents = async (req, res, next) => {
    try {
        // Find users where role is 'student' (or leave empty {} to find everyone)
        const students = await User.find({ role: "student" });
        res.status(200).json(students);
    } catch (error) {
        console.error("Get Students Error:", error);
        res.status(500).json({ message: "Server error retrieving students" });
    }
};

// 2. FIND A SINGLE STUDENT BY ID
exports.findStudent = async (req, res, next) => {
    try {
        // Capture the email parameter from the URL route
        const studentEmail = req.params.email; 
        
        // Look up by the email field in your schema
        const student = await User.findOne({ email: studentEmail });

        if (!student) {
            return res.status(404).json({ message: "Student not found with that email address." });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("Find Student Error:", error);
        res.status(500).json({ message: "Server error while searching for student." });
    }
};

// 3. UPDATE A STUDENT BY ID
exports.updateStudent = async (req, res, next) => {
    try {
        const studentEmail = req.params.email;
        const { name, role } = req.body;

        // 📝 Add this temporary log to see exactly what is arriving
        console.log(`Attempting database update for email string: "${studentEmail}"`);

        const updatedStudent = await User.findOneAndUpdate(
            { email: studentEmail }, 
            { name, role },          
            // Replaced 'new: true' with the modern MongoDB driver standard
            { returnDocument: 'after', runValidators: true } 
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student record not found for update." });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: updatedStudent
        });
    } catch (error) {
        console.error("Update Student Error:", error);
        res.status(500).json({ message: "Server error while altering student record." });
    }
};

// 4. DELETE A STUDENT BY ID
exports.deleteStudent = async (req, res, next) => {
    try {
        // 1. Capture the email parameter from the route
        const studentEmail = req.params.email;

        // 2. Query by the email field, not findByIdAndDelete
        const deletedStudent = await User.findOneAndDelete({ email: studentEmail.trim() });

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found with that email address" });
        }

        res.status(200).json({ message: "Student record deleted successfully" });
    } catch (error) {
        console.error("Delete Student Error:", error);
        res.status(500).json({ message: "Server error deleting student" });
    }
};
