const config = require('./../config/config');
const logger= require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);

if(config.env !== 'test'){
    transport   
        .verify()
        .then(() => logger.info('Connected to email server'))
        .catch(() =>{ logger.warn('Unable to connect to email server.Please config to email')})
}

const sendEmail = async(to,subject,text) =>{
    const msg = {from:config.email.from,to,subject,text};
    await transport.sendMail(msg);
};

const sendResetPasswordEmail = async(to,token) =>{
    const subject='Reset password';
    const resetPasswordUrl = `http://127.0.0.1:3000/reset-password?token=${token}`;
    const text=`Dear User,
    To reset you password click on it:${resetPasswordUrl}
    If you did not request any password resets then ignore`;
    await sendEmail(to,subject,text);
}

const sendVerificationEmail = async(to,token) =>{
    const subject = 'Email Verification';
    const verificationEmailUrl = `http://127.0.0.1:3000/verify-email?token=${token}`
    const text = `Dear user,
    to verify email,click on this link: ${verificationEmailUrl} `;
    await sendEmail(to,subject,text);
}

module.exports = {
    transport,
    sendEmail,
    sendResetPasswordEmail,
    sendVerificationEmail,
}
