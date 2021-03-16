const express = require("express");

const userController = require("../Controller/UserController");

let router = express.Router();

router.get("/user", userController.getAll);
router.get("/user/:email", userController.get);
router.put("/user/:email", userController.update);
//only /auth/signup?
router.post("/user", userController.create);
router.delete("/user/:email", userController.delete);
router.get("/user/:email/promote/:role", userController.promote);

module.exports = router;