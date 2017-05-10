var nodeMailer = require('nodemailer');
var security = require('./../config/security.config.json');
var config = require('./../config/main.config');

var transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'asking.platform@gmail.com',
    pass: security.mailPassword
  }
});

var sendMail = function (receiver, subject, text, html) {
  var mailOptions = {
    from: '"Asking Platform" <asking.platform@gmail.com>', // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

module.exports.passwordResetMail = function (email, password) {
  sendMail(email,
    '[Asking] Password Reset',
    'Use this email to reset your password.',
    `
      <p>Asking question and answer platform reset your password according to your request.</p>
      <p>This is your new password: <b>${password}</b></p>
    `
  );
};

module.exports.accountConfirmationMail = function (email, tempUserUrl) {
  var url = config.host + '/api/user/verification/' + tempUserUrl;
  sendMail(email,
    '[Asking] Email Confirmation',
    'Click on this link to activate user user account at Asking',
    `
      <p>Asking question and answer platform created a user account for you click on this link to activate your user account.</p>
      <p>Activation link: <a href="${url}">${url}</a></p>
    `
  )
};
