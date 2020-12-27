const express = require("express");
const { check, body } = require("express-validator");
const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter the valid email")
      .normalizeEmail()
      .trim(),
    body(
      "password",
      "Password should be 5 charcter long and should be alphanumeric value."
    )
      .isAlphanumeric()
      .isLength({ min: 5 })
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Do you even know how the fuck an email look like")
      .normalizeEmail()
      .trim()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("User already exists");
          }
        });
      }),
    body(
      "password",
      "Password should be 5 charcter long and should be alphanumeric value."
    )
      .isAlphanumeric()
      .isLength({ min: 5 })
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password did not match.");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset-password", authController.getReset);

router.post("/reset-password", authController.postReset);

router.get("/reset-password/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
