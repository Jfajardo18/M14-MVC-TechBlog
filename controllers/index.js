const router = require('express').Router();

const apiRoutes = require('./api');
const pages = require('./pageRoutes');

router.use('/', pages);
router.use('/api', apiRoutes);

module.exports = router;