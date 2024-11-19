const {Examination} = require('../models/models')


class ExaminationController {
    async create(req, res) {
       
        try {
            const {date, client, city, productionDate, numberReturnDocument, plantDocumentNumber,comment, manager, product, releaseDate, result} = req.body

            const exam = await Examination.create({date, client, city, productionDate, numberReturnDocument,plantDocumentNumber, comment, manager, product, releaseDate, result})
            return res.json(exam)

            
        } catch (error) {
            
        }
        
    }

    async getAll(req, res) {
        let {id, limit, page} = req.query
        // let {id} = req.query

        page = limit || 1
        limit = limit || 10000000
        let offset = page * limit - limit
        let exam;
        if (!id) {
            exam = await Examination.findAll({limit, offset})
        }

        if (id) {
            exam = await Examination.findAll({where:{id}})
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

    async upgrade(req, res) {
        const {id, releaseDate, result} = req.body
        try {
            const updateFull = await Examination.update(
                {
                    releaseDate: releaseDate,
                    result: result
                },
                {
                    where: {
                       id: id
                    }
                }
                
            )
            return res.json(updateFull)
            
        } catch (error) {
            return error.message
            
        }

       
    }

    async getOne(req, res) {
        const {id} = req.query
        try {
            const oneExam = await Examination.findOne({
                where: {id}
            })
        return res.json(oneExam)

            
        } catch (error) {
            return error.message
        }
       
    }

    
}

module.exports = new ExaminationController()