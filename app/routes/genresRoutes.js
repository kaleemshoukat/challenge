const router  = require('express').Router();
const genresController = require('../controllers/genresController');

router.post('/create', genresController.create);
router.get('/list', genresController.list);
router.delete('/delete/:id', genresController.delete);
router.get('/edit/:id', genresController.edit);
router.put('/update/:id', genresController.update);

module.exports = router;