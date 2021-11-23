const router = require("express").Router();
const userRoutes = require("./userRoutes");
const homeRoutes = require("./articleRoutes");

router.use("/dashboard", userRoutes);
router.use("/home", homeRoutes);

module.exports = router;
