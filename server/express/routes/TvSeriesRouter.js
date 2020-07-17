const router = require('express').Router()
const TvSeriesController = require('../controllers/TvSeriesController')

router.get('/', TvSeriesController.list)
router.get('/:id', TvSeriesController.findById)
router.delete('/:id', TvSeriesController.destroy)
router.post('/', TvSeriesController.add)

module.exports = router