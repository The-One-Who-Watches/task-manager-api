const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "timeponyeon61@gmail.com",
    subject: "thanks for joining",
    text: `Welcome abord, ${name}. Please let me know about any problems you may have the app`,
  });
};

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "timeponyeon61@gmail.com",
    subject: "Sorry to see you go.",
    text: `${name}, we regret to see that you've canceled your subsription, if you would like to tell us what we did wrong. You can do so at this fake link <fakelink.fake.com>`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
};
