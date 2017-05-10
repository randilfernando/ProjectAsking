var nodeMailer = require('nodemailer');
var security = require('./../config/security.config.json');

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

module.exports.passwordResetMail = function(email, password){
  sendMail(email,
    '[Asking] Password Reset',
    'Use this email to reset your password.',
    '<p>Asking question and answer platform reset your password according to your request.</p>' +
    '<p>This is your new password: <b>' + password + '</b></p>' +
    '<button onclick="console.log(1)">Click me!</button>'
  )
};
