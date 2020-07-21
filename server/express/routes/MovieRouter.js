const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.list)
router.get('/:id', MovieController.findById)
router.post('/', MovieController.add)
router.delete('/:id', MovieController.destroy)
router.put('/:id', MovieController.update)

module.exports = router