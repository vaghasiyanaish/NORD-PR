// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 587,
//   secure: false, 
//   auth: {
//     user: "prajapatijay0729@gmail.com",
//     pass: "ZgP0WrMXXBnKkfSf", 
//   },
//   tls: {
//     rejectUnauthorized: false 
//   }
// });

// exports.sendMail = async (req, res) => {
//     try {
//         let admin = await Admin.findOne({ email: req.body.email });

//         if (!admin) {
//             console.log("Admin not found");
//             return res.redirect("/admin/forgotpassword");
//         }

//         let otp = Math.floor(100000 + Math.random() * 900000);
//         res.cookie("otp", otp);
//         res.cookie("email", req.body.email);

//         await sendMail(req.body.email, otp);
//         return res.render("forgotpassword/otp");

//     } catch (error) {
//         console.log(error);
//         return res.redirect("/admin/forgotpassword");
//     }
// };



const nodemailer = require("nodemailer");
const Admin = require("../model/admin.model"); 

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "prajapatijay0729@gmail.com",
    pass: "ZgP0WrMXXBnKkfSf", 
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendOtpEmail(toEmail, otp) {
  let mailOptions = {
    from: '"Admin Panel" <prajapatijay0729@gmail.com>',
    to: toEmail,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
}

exports.sendMail = async (req, res) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      console.log("Admin not found");
      return res.redirect("/admin/forgotpassword");
    }

    let otp = Math.floor(100000 + Math.random() * 900000);
    res.cookie("otp", otp);
    res.cookie("email", req.body.email);

    await sendOtpEmail(req.body.email, otp);

    console.log("OTP sent to", req.body.email, "OTP:", otp);
    return res.render("forgotpassword/otp");
  } catch (error) {
    console.log(error);
    return res.redirect("/admin/forgotpassword");
  }
};

