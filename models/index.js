const Article = require("./Article");
const User = require("./User");
const Comment = require("./Comment");

User.hasMany(Article, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Article.hasMany(Comment, {
  foreignKey: "article_id",
});

Article.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Article, {
  foreignKey: "article_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Article, Comment };
