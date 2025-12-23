import express from "express";
const router = express.Router();


import { 
  loginUser,  
  registerUser, 
  verifyOTP,
  resendOTP,
  forgotPassword,
   verifyResetOTP,
   resetPassword,
   resendResetOTP,
} from "../controlers/authcontroler.js"; 



// Define routes
router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login" , loginUser);


router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOTP);
router.post("/reset-password", resetPassword);
router.post("/resend-reset-otp", resendResetOTP);


export default router;  

