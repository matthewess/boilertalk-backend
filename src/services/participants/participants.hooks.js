const verifyFeedPass = (context) => {
  if (context.app.get('feed').pass.includes(context.data.pass)) {
    return Promise.resolve(context);
  }
  return Promise.reject(new Error('Invalid pass'));
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [verifyFeedPass],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
