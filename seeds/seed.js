const sequelize = require("../config/connection");
const { User, Article, Comment } = require("../models");

const userData = require("./userData.json");
const articleData = require("./articleData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const articles = await Article.bulkCreate(articleData, {
      individualHooks: true,
      returning: true,
    });

    const comments = await Comment.bulkCreate(commentData, {
      individualHooks: true,
      returning: true,
    });

    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

seedDatabase();
