let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWD
    }
});

const writeMail = (from, to, subject, text) => {
    transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text
    }, (err, _) => {
        if (err) console.log(err);
        else {
            return true;
        }
    });
}

module.exports = writeMail;