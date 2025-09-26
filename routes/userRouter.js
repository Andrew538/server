const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration', checkRoleMiddleware('ADMIN'), userController.registration)
router.post( '/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/allmanagers',authMiddleware, userController.allManagers)
router.post( '/addneuserindirections', userController.addNewUserinDirections)

// router.get('/surname',authMiddleware, userController.getSurname)





module.exports = router