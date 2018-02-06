const researchers = require('./researchers/researchers.service');
const participants = require('./participants/participants.service');
const mailer = require('./mailer.service');

module.exports = (app) => {
  app.configure(researchers);
  app.configure(participants);
  app.configure(mailer);
};
