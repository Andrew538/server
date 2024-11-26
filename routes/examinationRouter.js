const Router = require('express')
const router = new Router()
const examinationController = require('../controllers/examinationController')

router.post('/newentry', examinationController.create)
router.get('/getall', examinationController.getAll)
router.get('/getallworks', examinationController.getAllWorks)
router.get('/getallarhive', examinationController.getAllArhive)
router.get('/getallcharger', examinationController.getAllСharger)
router.get('/getallready', examinationController.getAllReady)


// router.get('/pages', examinationController.pages)

router.delete('/del', examinationController.remove)
router.post('/upgrade', examinationController.upgrade)
router.get('/getone', examinationController.getOne)
router.get('/getstatus', examinationController.getStatus)



// router.get('/auth',)





module.exports = router