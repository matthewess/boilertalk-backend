// participants-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const participants = new mongooseClient.Schema({
    experimenterCode: { type: String, required: true, unique: true },
    report: {
      start: Date,
      end: Date,
      feed: [{
        liked: Boolean,
        disliked: Boolean,
        comments: [{ author: String, body: String }],
      }],
    },
  }, {
    timestamps: true,
  });

  return mongooseClient.model('participants', participants);
};
