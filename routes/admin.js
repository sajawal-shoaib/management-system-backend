// routes/admin.js
const express = require("express");
const adminRouter = express.Router();

const { protect, authorize } = require("../controller/auth"); // 👈 Unpacked here
const crud = require("../controller/crud");
const register = require("../controller/register")

// 👇 Notice the "auth." prefix is completely removed here:
adminRouter.get("/students", protect, authorize("teacher", "admin"), crud.getStudents);
adminRouter.get("/student/:email", protect, authorize("teacher", "admin"), crud.findStudent);
adminRouter.delete("/student/:email", protect, authorize("teacher", "admin"), crud.deleteStudent);
adminRouter.put("/student/:email", protect, authorize("teacher", "admin"), crud.updateStudent);
adminRouter.post("/add-students", register.postRegister);

module.exports = adminRouter;