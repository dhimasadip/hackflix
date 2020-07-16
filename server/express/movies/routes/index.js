const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.list)
router.get('/:id', MovieController.findMovie)
router.post('/', MovieController.insert)
router.delete('/:id', MovieController.destroy)

module.exports = router