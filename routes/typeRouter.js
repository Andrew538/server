const Router = require('express')
const router = new Router()
const typeControler = require('../controllers/typeController')

router.post('/', typeControler.create)
router.get('/', typeControler.getAll)

// router.get('/auth',)





module.exports = router