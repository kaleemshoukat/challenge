const router  = require('express').Router();
const genresRoutes=require('./genresRoutes');

router.use('/genres', genresRoutes);

module.exports = router