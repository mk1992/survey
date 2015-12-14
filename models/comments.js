var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  survey: {type: Schema.Types.ObjectId, required: true, trim: true},
  type: {type: String, required: true, trim: true },
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Comment = mongoose.model('Comment', schema);

module.exports = Comment;
