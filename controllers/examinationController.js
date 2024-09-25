const {Examination} = require('../models/models')


class ExaminationController {
    async create(req, res) {
       
        try {
            const {data, client, manager, product, releaseDate, result} = req.body

            const exam = await Examination.create({data, client, manager, product, releaseDate, result})
            return res.json(exam)

            
        } catch (error) {
            
        }
        
    }

    async getAll(req, res) {
        let {id, limit, page} = req.query
        page = limit || 1
        limit = limit || 9
        let offset = page * limit - limit
        let exam;
        if (!id) {
            exam = await Examination.findAll({limit, offset})
        }

        if (id) {
            exam = await Examination.findAll({where:{id}, limit, offset})
        }

        return res.json(exam)
    }

    async remove(req, res) {
        const {id} = req.body
        try {
            const delFull = await Examination.destroy({
                where: {
                    id
                }
            })
            return res.json(delFull)
            
        } catch (error) {
            // error.console.log(error)
        }

       
    }

    
}

module.exports = new ExaminationController()