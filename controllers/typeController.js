const {TypeAKB} = require('../models/models')


class TypeControler {
    async create(req, res) {
        const {name} = req.body

            const exam = await TypeAKB.create({name})
            return res.json(exam)

        try {
            
            
        } catch (error) {
            
        }
        
    }

    async getAll(req, res) {
        
    }

    
}

module.exports = new TypeControler()