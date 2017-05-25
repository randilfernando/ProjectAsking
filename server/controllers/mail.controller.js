"use strict";

const nodeMailer = require('nodemailer');
const security = require('./../config/security.config.json');
const config = require('./../config/main.config');

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'asking.platform@gmail.com',
    pass: security.mailPassword
  }
});

const sendMail = function (receiver, subject, text, html) {
  let mailOptions = {
    from: '"Asking Platform" <asking.platform@gmail.com>', // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

const passwordResetMail = function (email, password, username) {
  sendMail(email,
    '[Asking] Password Reset',
    'Use this email to reset your password.',
    `
      <div style="padding-left: 20px">
        <h3>Reset your password.</h3>
        <p>Dear ${username},</p>
        <p>You requested to reset your password at asking question and answer platform.<br>
          Account: <a href="mailto:${email}">${email}</a></p>
        <p>Your new password: ${password}</p>
        <p>If you have any issues resetting the password please contact system administrator.<br>
          <a href="mailto:asking.platform@gmail.com">asking.platform@gmail.com</a></p></p>
        <p>Thank you.</p>
      </div>
    `
  );
};

const accountConfirmationMail = function (email, tempUserUrl, username) {
  let url = config.url + '/api/user/verification/' + tempUserUrl;
  sendMail(email,
    '[Asking] Email Confirmation',
    'Click on this link to activate user user account at Asking',
    `
      <div style="padding-left: 20px">
        <h5>Confirm your user account.</h5>
        <p>Dear ${username},</p>
        <p>Thank you for registering at Asking question and answer platform.<br>
          Your account has been created with the email address<br>
          <a href="mailto:${email}">${email}</a></p>
        <p>Click the following link to complete your registration<br>
          <a href="${url}">${url}</a></p>
        <p>If you have any issues accessing the link above please copy and paste it directly in your browser.</p>
        <p>Thank you.</p>
      </div>
    `
  )
};

const accountActivatedMail = function (email, password, username) {
  sendMail(email,
    '[Asking] Account Created',
    'Asking has created a user account for you.',
    `
      <div style="padding-left: 20px">
        <h5>Login to use asking platform.</h5>
        <p>Dear ${username},</p>
        <p>Asking question and answer platform has created a user account for you.<br>
          Username: <a href="mailto:${email}">${email}</a></p>
        <p>Password: <b>${password}</b></p>
        <p>If you have any issues logging please contact system administrator.<br>
          <a href="mailto:asking.platform@gmail.com">asking.platform@gmail.com</a></p></p>
        <p>Thank you.</p>
      </div>
    `
  )
};

module.exports = {
  passwordResetMail: passwordResetMail,
  accountConfirmationMail: accountConfirmationMail,
  accountActivatedMail: accountActivatedMail
};
