const router = require('express').Router()
const TvSeriesController = require('../controllers/TvSeriesController')

router.get('/', TvSeriesController.list)
router.get('/:id', TvSeriesController.findTv)
router.post('/', TvSeriesController.insert)
router.delete('/:id', TvSeriesController.destroy)

module.exports = router