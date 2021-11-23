const router = require('express').Router();
const dashboardRoutes = require('./userRoutes');
const homeRoutes = require('./projectRoutes');

router.use('/dashboard', userRoutes);
router.use('/home', homeRoutes);

module.exports = router;
