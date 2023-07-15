const router  = require('express').Router();
const genresRoutes=require('./genresRoutes');
const movieRoutes=require('./movieRoutes');

router.use('/genres', genresRoutes);
router.use('/movie', movieRoutes);

module.exports = router