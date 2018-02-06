// Initializes the `researchers` service on path `/researchers`
const createService = require('feathers-mongoose');
const createModel = require('../../models/researchers.model');
const hooks = require('./researchers.hooks');

module.exports = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'researchers',
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/researchers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('researchers');

  service.hooks(hooks);
};
