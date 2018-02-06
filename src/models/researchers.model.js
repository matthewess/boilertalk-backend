// researchers-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const researchers = new mongooseClient.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    admin: { type: Boolean, default: false },
  }, {
    timestamps: true,
  });

  return mongooseClient.model('researchers', researchers);
};
