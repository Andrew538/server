const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, name} = req.body

        if (!email || !password || !name || !role) {
            return next(ApiError.badRequest('Заполните данные пользователя'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, name, password: hashPassword})
        if(user) {
            return next(ApiError.badRequest('Пользователь успешно создан'))
        }
       
        // const token = generateJwt(user.id, user.email, user.role)
        // return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
       
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async check(req, res, next) {
        // const tok = req.body
        // console.log(tok)
        // if(!tok) {
        // return next(ApiError.internal('Пользователь не найден'))

        // }

      try {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
      } catch (error) {
        return next(ApiError.internal('Пользователь не найден'))

      }
       
        
       
    }


    async users(req, res) {
       let {id} = req.query
      let all;
      
       if (!id) {
        all = await User.findAll({id})
    }
   
       return res.json(all)
    }
}


module.exports = new UserController()







// class Usercontroller {

//     async registration(req, res, next) {
//         const {email, password, role} = req.body
//         if(!email || !password) {
//             // return  console.log('Ошибка')
//             return next(ApiError.badRequest('Некорректный email или password'))
//         }
//         const candidat = await User.findOne({where: {email}})
//         if(candidat) {
//             return next(ApiError.badRequest('Пользователь с таким email уже существует'))
//             // return console.log('Ошибка, емаил уже есть XW8AG4NH8JK110763')
//         }
        
//         const hashPassord = await bcrypt.hash(password, 5)
//         const user = await User.create({email, role, password: hashPassord})
//         // const examination = await Examination.create({userId: user.id})
//         const token = generateJwt(user.id, user.email, user.role)
//         return res.json({token})
//     }

//     async login(req, res) {
//         const {email, password} = req.body
//         const user = await User.findOne({where: {email}})
//         if (!user) {
//             return console.log('Пользоатель не найден')
//         }

//         let comparePassword = bcrypt.compareSync(password, user.password)

//         if(!comparePassword) {
//             return console.log('Указан неверный пароль')
//         }
//         const token = generateJwt(user.id, user.email, user.role)
//         return res.json({token})
//     }

//     async check(req, res) {
//         const token = generateJwt(req.user.id, req.user.email, )
//         return res.json({token})
//     }
// }

// module.exports = new Usercontroller()