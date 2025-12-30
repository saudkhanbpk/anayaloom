import nodemailer from 'nodemailer';
import dotenv  from 'dotenv';

dotenv.config()
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});
console.log(process.env.EMAIL_PASS);


transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"AnayaBloom" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Account - OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="color: #4CAF50; font-size: 32px;">${otp}</h1>
        <p>This OTP will expire in 2 minutes.</p>
      </div>
    `,
  });
};

export default sendOTPEmail;