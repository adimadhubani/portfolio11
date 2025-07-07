const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendContactMail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
        from: `"Portfolio Contact Form" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `🚀 Internship Opportunity Inquiry from ${name}`,
        html: `
          <h2>New Internship Inquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr />
          <p>This message was sent via your portfolio contact form.</p>
        `,
      };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: "Message sent successfully." });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
};
