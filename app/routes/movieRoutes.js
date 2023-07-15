const router  = require('express').Router();
const movieController = require('../controllers/movieController');

router.post('/create', movieController.create);
router.get('/list', movieController.list);
router.delete('/delete/:id', movieController.delete);
router.get('/edit/:id', movieController.edit);
router.put('/update/:id', movieController.update);

module.exports = router;