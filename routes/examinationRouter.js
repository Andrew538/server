const Router = require('express')
const router = new Router()
const examinationController = require('../controllers/examinationController')
router.post('/newentry', examinationController.create)
router.get('/getall', examinationController.getAll)
router.get('/getallworks', examinationController.getAllWorks)
router.get('/getallarhive', examinationController.getAllArhive)
router.get('/getallcharger', examinationController.getAllCharger)
router.get('/getallready', examinationController.getAllReady)


// router.get('/pages', examinationController.pages)

router.delete('/del', examinationController.remove)
router.post('/upgrade', examinationController.upgrade)
router.post('/upgradeNumberReturnDocument', examinationController.upgradeNumberReturnDocument)
router.post('/upgradePlantDocumentNumber', examinationController.upgradePlantDocumentNumber)
router.post('/upgradeMovingToDefectWarehouse', examinationController.upgradeMovingToDefectWarehouse)
router.post('/upgradeUpdateReleaseDate', examinationController.upgradeUpdateReleaseDate)





router.get('/getone', examinationController.getOne)


router.get('/getstatus', examinationController.getStatus)








module.exports = router