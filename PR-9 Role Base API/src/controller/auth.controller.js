const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../middleware/nodeMailer.middleware");

exports.registerUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email, isDelete: false });
    if (user) {
      return res.json({ status: 400, message: "User Already Exist" });
    }

    let plainPassword = req.body.password;

    let imagePath = "";
    if (req.file) {
      if (req.body.role === "Admin") {
        imagePath = `/uploads/Admin-Images/${req.file.filename}`;
      } else if (req.body.role === "Manager") {
        imagePath = `/uploads/Manager-Images/${req.file.filename}`;
      } else if (req.body.role === "Employee") {
        imagePath = `/uploads/Employee-Images/${req.file.filename}`;
      }
    }

    let hashPassword = await bcrypt.hash(plainPassword, 10);

    user = await User.create({
      ...req.body,
      password: hashPassword,
      profileImage: imagePath,
    });

    let mailMessage = {
      from: "khushalvaghasiya0@gmail.com",
      to: `${req.body.email}`,
      subject: "Welcome to Admin Panel - Your Account Details",
      html: `
<div style="font-family: 'Segoe UI', system-ui, sans-serif; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  <div style="max-width: 500px; margin: auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center;">

    <!-- Header -->
    <div style="font-size: 2rem; font-weight: 700; color: #4f46e5; margin-bottom: 10px;">🚀 AdminPanel</div>
    <h1 style="color: #1f2937; font-size: 1.8rem; margin-bottom: 8px;">Welcome, ${user.firstname}!</h1>
    <p style="color: #6b7280; margin-bottom: 30px; line-height: 1.5;">
      Your account has been created successfully. Here are your login details:
    </p>

    <!-- Security Badge -->
    <div style="display: inline-flex; align-items: center; gap: 8px; background: #dcfce7; color: #166534; padding: 8px 20px; border-radius: 20px; font-size: 0.9rem; margin: 15px 0;">
      <span>🔐</span> Secure Account Created
    </div>

    <!-- Dotted Box Credentials -->
    <div style="background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%); border: 2px dashed #4f46e5; padding: 25px; border-radius: 15px; margin: 25px 0;">
      <div style="color: #6b7280; font-size: 0.9rem; margin-bottom: 15px; font-weight: 600;">YOUR LOGIN CREDENTIALS</div>

      <div style="display: flex; align-items: center; gap: 12px; margin: 15px 0; padding: 12px; background: white; border-radius: 10px; border-left: 4px solid #4f46e5;">
        <div style="color: #4f46e5; font-weight: 600; min-width: 80px;">Email:</div>
        <div style="color: #1f2937; font-weight: 500;">${req.body.email}</div>
      </div>

      <div style="display: flex; align-items: center; gap: 12px; margin: 15px 0; padding: 12px; background: white; border-radius: 10px; border-left: 4px solid #10b981;">
        <div style="color: #10b981; font-weight: 600; min-width: 80px;">Password:</div>
        <div style="color: #1f2937; font-weight: 500; letter-spacing: 1px;">${plainPassword}</div>
      </div>
    </div>

    <!-- Security Notice -->
    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 10px; margin: 20px 0; text-align: left; color: #92400e;">
      <div style="display: flex; align-items: flex-start; gap: 10px;">
        <span style="font-size: 1.2rem;">🔒</span>
        <div>
          <strong>Security Alert:</strong> For your safety, please change your password immediately after logging in.
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div style="background: #f0f9ff; border-radius: 12px; padding: 20px; margin: 25px 0;">
      <h3 style="color: #0369a1; margin-bottom: 15px; font-size: 1.1rem;">🚀 Quick Start Guide</h3>
      <div style="text-align: left; color: #475569; font-size: 0.9rem; line-height: 1.6;">
        • Login with credentials above<br>
        • Change your password<br>
        • Complete your profile<br>
        • Explore dashboard features
      </div>
    </div>

    <!-- Footer -->
    <div style="color: #9ca3af; font-size: 0.8rem; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p>Need help? Contact our support team at support@adminpanel.com</p>
      <p style="margin-top: 8px;">© ${new Date().getFullYear()} Admin Panel. All rights reserved.</p>
    </div>

  </div>
</div>
  `
    };



    await sendEmail(mailMessage);

    return res.json({
      status: 201,
      message: "User Registered Successfully & Email Sent",
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};



exports.loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email, isDelete: false });
    if (!user) {
      return res.json({ status: 404, message: "User Not Found !!!" })
    }

    let passwordCompare = await bcrypt.compare(req.body.password, user.password)
    if (!passwordCompare) {
      return res.json({ message: "Invalid Credential !!!" });
    }

    let token = jwt.sign({
      userId: user._id
    }, process.env.SECREAT_KEY)

    return res.json({ message: "Login Succesfully", token, reqUser: user })
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: 'Server Error' });
  }
}
