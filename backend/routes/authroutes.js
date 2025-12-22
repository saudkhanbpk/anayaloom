// const express = require("express");
// const router = express.Router();
// const {
//   registerUser,
//   verifyOTP,
// } = require("../controlers/authcontroler");

// router.post("/register", registerUser);
// router.post("/verify-otp", verifyOTP);

// module.exports = router;


import express from "express";
const router = express.Router();


import { 
  loginUser,  
  registerUser, 
  verifyOTP,
  resendOTP 
} from "../controlers/authcontroler.js"; 



// Define routes
router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login" , loginUser);


export default router;  

