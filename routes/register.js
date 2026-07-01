const express = require("express");

const registerRoute = express.Router()

const registerController = require("../controller/register");

registerRoute.post("/register", registerController.postRegister);
registerRoute.post("/login", registerController.postLogin);

module.exports = registerRoute;