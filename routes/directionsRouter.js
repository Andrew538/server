const Router = require('express')
const router = new Router()
const directionsController = require('../controllers/directionsController')

router.post('/newdirection', directionsController.createDirections)
router.get('/alluserid', directionsController.allUserIdforDirections)
router.post('/newcity', directionsController.createCity)

router.post('/newdeliverynumber', directionsController.createDeliveryNumber)
router.post('/updatedeliverynumber', directionsController.updateDeliveryNumber)
router.post('/newdirectionsrady', directionsController.createDirectionsRady)
// router.post('/newdirectionsradytwo', directionsController.createDirectionsRadyTwo)

router.post('/newcitydirectionsrady', directionsController.createCityDirectionsRady)
// router.post('/newcitydirectionsrady', directionsController.createAllCityDirectionsRady)




router.post('/newclient', directionsController.createClient)
router.post('/updateclient', directionsController.updateClient)
router.delete('/removeclient', directionsController.removeClient)

router.post('/newstatus', directionsController.addStatusDelivery)
router.post('/newdelivery', directionsController.createDelivery)
router.delete('/removedelivery', directionsController.removeDelivery)

router.get('/allregions', directionsController.getAllregions)
router.get('/oneregions', directionsController.getOneRegions)
router.get('/onedeliverynumber', directionsController.getOneDeliveryNumber)
router.get('/allTodaysdirections', directionsController.getTodaysDirections)
router.get('/onetodaysdirections', directionsController.getOneTodaysDirections)



 

router.get('/getalltoday', directionsController.getAllToday)
router.get('/getallcity', directionsController.getAllCity)
router.get('/getcitysofday', directionsController.getCitysofDay)
router.get('/getalldelivery', directionsController.getAllDelivery)
router.get('/getalldeliveryredy', directionsController.getAllDeliveryRedy)

router.get('/getoneclient', directionsController.getOneClient)
router.get('/getonedelivery', directionsController.getOneDelivery)
router.get('/getonedeliveryready', directionsController.getOneClientDeliveryReady)
router.post('/updateclientdelivery', directionsController.updateClientDelivery)
router.get('/getonecitydirectionrady', directionsController.getOneCityDirectionsRady)

router.get('/getalldeliveryarhive', directionsController.getArhiveDelivery)

// Роут для общего веса, пока не трогать
// router.get('/gettotalweightofnew', directionsController.gettoTalWeightOfNew)

module.exports = router
