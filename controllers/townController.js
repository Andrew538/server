const {Сity} = require('../models/models')

class TownController {
  async create(req, res) {
    const { city, region } = req.body;
    const w = await Сity.create({ city, region });
    return res.json(w);
  }

  async getpost(req, res) {
    let { id } = req.query;

    let exam;
    if (!id) {
      exam = await Сity.findAll(
        
      );
    }

    return res.json(exam);
  }
}


module.exports = new TownController()