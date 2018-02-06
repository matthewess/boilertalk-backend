const generator = require('generate-password');
const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

const adminOnly = (context) => {
  const options = { secret: context.app.get('authentication').secret };
  return context.app.passport.verifyJWT(context.params.headers.authorization, options)
    .then(payload => context.app.service('researchers').get(payload.userId))
    .then((user) => {
      if (!user.admin) {
        return Promise.reject(new Error('Not admin'));
      }
      return Promise.resolve(context);
    })
    .catch(err => Promise.reject(err));
};

const createPassword = (context) => {
  // eslint-disable-next-line
  context.data.password = generator.generate();
  const template = {
    from: 'team@boilertalk.us',
    to: context.data.email,
    subject: 'Boilertalk details',
    html: `<html>
<p>Hello ${context.data.name}!</p><br>
<br>
<p>You've been invited to Boilertalk as a researcher.</p><br>
<br>
<p>Please log in at <a href="http://boilertalk.us">boilertalk</a>.</p><br>
<br>
<p>Use your email and the password ${context.data.password}.</p>
</html>`,
  };
  return context.app.service('mailer').create(template)
    .then(() => Promise.resolve(context))
    .catch(err => Promise.reject(err));
};

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    // hashPassword last to send email
    create: [authenticate('jwt'), adminOnly, createPassword, hashPassword()],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt'), adminOnly],
  },

  after: {
    all: [protect('password')],
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
