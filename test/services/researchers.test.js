const assert = require('assert');
const app = require('../../src/app');

describe('\'researchers\' service', () => {
  it('registered the service', () => {
    const service = app.service('researchers');

    assert.ok(service, 'Registered the service');
  });
});
