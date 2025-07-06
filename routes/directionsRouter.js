const Router = require('express')
const router = new Router()
const directionsController = require('../controllers/directionsController')

router.post('/newdirection', directionsController.createDirections)
router.post('/newcity', directionsController.createCity)
router.post('/newclient', directionsController.createClient)
router.get('/allregions', directionsController.getAllregions)
router.get('/getallmonday', directionsController.getAllMonday)
router.get('/getallcity', directionsController.getAllCity)


module.exports = router
