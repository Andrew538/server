const Router = require('express')
const router = new Router()
const examinationController = require('../controllers/examinationController')

router.post('/', examinationController.create)
router.get('/', examinationController.getAll)
router.delete('/', examinationController.remove)

// router.get('/auth',)





module.exports = router