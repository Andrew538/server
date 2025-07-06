const Router = require('express')
const router = new Router()
const townController = require('../controllers/townController')


router.post('/newcity', townController.create)
router.get('/getpost', townController.getpost)

module.exports = router