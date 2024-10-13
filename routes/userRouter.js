const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
// const checkAuth = require('../middleware/authMiddleware')

// router.post('/registration', userController.registration)
router.post('/registration', checkRoleMiddleware('ADMIN'), userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
// router.get('/users-list',authMiddleware, userController.userList)

// router.post('/registration', checkRoleMiddleware('ADMIN'), userController.registration)



module.exports = router