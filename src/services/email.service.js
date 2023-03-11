const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);

transport
  .verify()
  .then(() => logger.info('Connected to email server'))
  .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'))

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://localhost:3000/v1/auth/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://localhost:3000/v1/auth/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const sendWelcomeEmail = async (to, name) => {
  const subject = 'Let’s get started with Eventify 🚀';
  const text = `Dear ${name},\nWelcome to our platform! We're thrilled to have you here and look forward to helping you manage your events smoothly and efficiently.
  As a new user, you now have access to all the features and tools that our platform has to offer. Whether you're planning a small gathering or a large-scale event, our application will make the process simple and stress-free.
  We're committed to providing you with the best possible experience, so please don't hesitate to reach out to us if you have any questions or feedback. We're here to help you every step of the way.
  Thank you for choosing our platform to manage your events, and we hope you enjoy using it as much as we enjoyed building it! \nSigned:\nNwokporo Chukwuebuka Victor\nCEO, Eventify🚀`
  await sendEmail(to, subject, text);
}

const sendAttendeeEmail = async (attendeeName, attendeeEmail, eventName, date, location, organizerName, organizerEmail, organizerPhoneNumber) => {
  const subject = `You are invited to ${eventName}: RSVP today!✨🍸`
  const text = `Dear ${attendeeName}, \nWe are thrilled to extend an invitation to you for ${eventName}, which will take place on ${date} at ${location}.\n 
As one of our valued guests, we would love for you to join us for this special occasion.\n If you have any questions regarding this matter, please feel free to contact us at ${organizerEmail}/${organizerPhoneNumber} \nSee you there!🚀🚀\n\nSigned: \n${organizerName}\nEvent Organizer🚀`
  await sendEmail(attendeeEmail, subject, text);
}

const sendAttendeeRemovalMail = async (attendeeName, attendeeEmail, eventName, eventLocation, date, organizerName, organizerEmail, organizerPhoneNumber) => {
  const subject = `Notification of attendee removal from ${eventName}`
  const text = ` Dear ${attendeeName},
I regret to inform you that you have been removed from the list of attendees for ${eventName} that is scheduled to take place on ${date} at ${eventLocation}. The decision to remove you from the list of attendees has been made due to some undisclosed reasons.
We understand that this may come as a disappointment, but we hope you can understand that we have taken this step to ensure the smooth running of the event and to accommodate the needs of all attendees. If you have any questions regarding this matter, please feel free to contact us at ${organizerEmail}/${organizerPhoneNumber}.
  
We appreciate your interest in attending the event and thank you for your understanding.
  
Sincerely,
${organizerName}
Event Organizer`
  await sendEmail(attendeeEmail, subject, text);
}

module.exports = {
  sendAttendeeRemovalMail,
  transport,
  sendEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendAttendeeEmail
};
