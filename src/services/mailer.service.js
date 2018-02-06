const createService = require('feathers-mailgun');

module.exports = (app) => {
  const options = {
    apiKey: app.get('mailgun').apiKey,
    domain: app.get('mailgun').domain,
  };

  // Initialize our service with any options it requires
  app.use('/mailer', createService(options));

  // Get our initialized service so that we can register hooks and filters
  // const service = app.service('researchers');

  // service.hooks(hooks);
};
