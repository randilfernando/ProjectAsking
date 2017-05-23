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
    html: `
      <head>
        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      
        <style>
          *{
            font-family: 'Roboto';
          }
          h5 {
            padding-bottom: 20px;
          }
      
          p {
            padding-bottom: 20px;
          }
        </style>
      </head>
      <body>
      <header>
        <div class="row grey darken-2 white-text valign-wrapper" style="height: 100px;">
          <div class="col s12 m8 l4 offset-m2 offset-l4">
            <h3 class="center">asking</h3>
          </div>
        </div>
      </header>
      <main>
        ${html}
      </main>
      <footer>
        <div class="row grey darken-2 white-text valign-wrapper" style="height: 50px">
          <div class="container">
            <div class="col s12">
              <h6 class="left">Alternate Solutions.</h6>
            </div>
          </div>
        </div>
      </footer>
      </body>
    ` // html body
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
      <div class="container">
        <div class="row">
          <div class="col s12">
            <h5>Reset your password.</h5>
            <p>Dear ${username},</p>
            <p>You requested to reset your password at asking question and answer platform.<br>
              Account: <a href="mailto:${email}">${email}</a></p>
            <p>Your new password: ${password}</p>
            <p>If you have any issues resetting the password please contact system administrator.<br>
              <a href="mailto:asking.platform@gmail.com">asking.platform@gmail.com</a></p></p>
            <p>Thank you.</p>
          </div>
        </div>
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
      <div class="container">
        <div class="row">
          <div class="col s12">
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
        </div>
      </div>
    `
  )
};

module.exports = {
  passwordResetMail: passwordResetMail,
  accountConfirmationMail: accountConfirmationMail,
};
