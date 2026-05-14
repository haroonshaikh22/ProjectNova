import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Project Nova",
      link: "https://projectnova.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.maigenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,

    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mail = {
    from: "projectnova@example.com", // sender address
    to: options.to, // list of recipients
    subject: options.subject, // subject line
    text: emailTextual, // plain text body
    html: emailHtml, // HTML body
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const emailVerificationMailTemplate = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Mailgen! We're very excited to have you on board.",
      action: {
        instructions: "To verify your email address, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const passwordResetMailTemplate = (username, resetPasswordUrl) => {
  return {
    body: {
      name: username,
      intro:
        "we got a request to reset your password. If you didn't make this request, just ignore this email. Otherwise, you can reset your password using this link:",
      action: {
        instructions: "To reset your password, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset Password",
          link: resetPasswordUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { emailVerificationMailTemplate, passwordResetMailTemplate, sendMail };
