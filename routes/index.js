const Router = require('express')
const router = new Router()
const examinationRouter = require('./examinationRouter')
const directionsRouter = require('./directionsRouter')
const cityRouter = require('./cityRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/examination', examinationRouter)
router.use('/type', typeRouter)
router.use('/direction',directionsRouter )
router.use('/city', cityRouter)








module.exports = router