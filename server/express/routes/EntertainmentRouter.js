const router = require('express').Router()
const EntertainmentController = require('../controllers/EntertainmentController')

router.get('/', EntertainmentController.getAll)

module.exports = router