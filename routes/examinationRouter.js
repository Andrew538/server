const Router = require('express')
const router = new Router()
const examinationController = require('../controllers/examinationController')

router.post('/newentry', examinationController.create)
router.get('/getall', examinationController.getAll)
router.delete('/del', examinationController.remove)
router.post('/upgrade', examinationController.upgrade)
router.get('/getone', examinationController.getOne)



// router.get('/auth',)





module.exports = router