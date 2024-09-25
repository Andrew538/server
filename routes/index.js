const Router = require('express')
const router = new Router()
const examinationRouter = require('./examinationRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/examination', examinationRouter)
router.use('/type', typeRouter)







module.exports = router