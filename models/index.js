const User = require('./User');
const Article = require('./article');
const Comment = require('./comment');

User.hasMany(Article, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Article.hasMany(Comment, {
  foreignKey: 'article_id',
  onDelete: 'CASCADE'
});

Article.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Article, {
  foreignKey: 'article_id'
});

module.exports = { User, Article, Comment };
