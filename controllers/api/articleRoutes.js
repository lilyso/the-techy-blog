const router = require("express").Router();
const { Article } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newArticle = await Article.create({
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newArticle);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedArticle = await Article.update(
      {
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
      },

      {
        where: {
          id: req.body.id,
          user_id: req.session.user_id,
        },
      }
    );

    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const articleData = await Article.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!articleData) {
      res.status(404).json({ message: "No article found with this id!" });
      return;
    }

    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
