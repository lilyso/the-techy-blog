const router = require("express").Router();
const { Article, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all articles and JOIN with user data
    const articleData = await Article.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    const articles = articleData.map((article) => article.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      articles,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit article route
router.get("/article/:id/edit", async (req, res) => {
  try {
    // Get article by id and JOIN with user data
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });
    const article = articleData.get({ plain: true });
    res.render("articleupdate", {
      ...article,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/article/:id", async (req, res) => {
  let userId = req.session.user_id;
  // Get article by id and JOIN wit user and comment data
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        // Comment table JOIN with User to get username
        { model: Comment, include: [{ model: User }] },
      ],
    });

    const article = articleData.get({ plain: true });

    res.render("article", {
      ...article,
      logged_in: req.session.logged_in,
      uid: userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user articles when logged in to render to dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Article }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is logged in, redirect to dashboard
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
