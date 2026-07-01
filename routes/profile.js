const {protect} = require("../controller/auth");

const express = require("express");
const { Profile } = require("../controller/profile");

const profileRouter = express.Router();

profileRouter.get("/profile", protect, Profile);

module.exports = profileRouter;