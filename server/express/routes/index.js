const router = require('express').Router()
const MovieRouter = require('./MovieRouter')
const TvSeriesRouter = require('./TvSeriesRouter')
const EntertainmentRouter = require('./EntertainmentRouter')

router.use('/movies', MovieRouter)
router.use('/tv', TvSeriesRouter)
router.use('/entertainme', EntertainmentRouter)

module.exports = router