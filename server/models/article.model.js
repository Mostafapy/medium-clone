const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    text: String,
    title: String,
    description: String,
    featureImg: String,
    claps: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        text: String
      }
    ]
  }
);

ArticleSchema.methods.clap = function() {
  this.claps++;
  return this.save();
};

ArticleSchema.methods.comment = function(comment) {
  this.comments.push(comment);
  return this.save();
};

ArticleSchema.methods.addAuthor = function (authorId) {
  this.author = authorId;
  return this.save();
};

ArticleSchema.methods.getUserArticle = function (authorId) {
  mongoose.model('Article').find({ author: authorId }).then((article) => {
    return article;
  });
};

module.exports = mongoose.model('Article', ArticleSchema);