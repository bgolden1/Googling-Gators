var nodemailer = require('nodemailer');
const gmail = require('./config.json').gmail

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmail.user,
      pass: gmail.password
    }
});

exports.sendEmail = (__to__, __subject__, __text__) => {
    var mailOptions = {
        from: gmail.user,
        to: __to__,
        subject: __subject__,
        html: __text__
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}