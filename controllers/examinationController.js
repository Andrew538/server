const {Examination} = require('../models/models')
const ApiError = require('../error/ApiError');
 

class ExaminationController {
  async create(req, res, next) {
    // try {

    const {
      date,
      client,
      city,
      productionDate,
      numberReturnDocument,
      plantDocumentNumber,
      comment,
      manager,
      product, 
      releaseDate,
      result,
      statusExam,
    } = req.body;

    if (!date || !client || !city || !productionDate || !product || !manager) {
      return next(ApiError.badRequest("Заполните поле"));
    }

    const exam = await Examination.create({
      date,
      client,
      city,
      productionDate,
      numberReturnDocument,
      plantDocumentNumber,
      comment,
      manager,
      product,
      releaseDate,
      result,
      statusExam,
    });
    return res.json(exam);

    // } catch (error) {
    

    // }
  }

  async getAll(req, res) {
    let { id } = req.query;

    let exam;
    if (!id) { 
      exam = await Examination.findAll({ 
        where: {
          statusExam: "New",
        },
      });
    }

    return res.json(exam);
  }

  async getAllWorks(req, res) {
    let { id } = req.query;

    let examWorks;
    if (!id) {
      examWorks = await Examination.findAll({
        where: {
          statusExam: "Works",
        },
      });
    }

    return res.json(examWorks);
  }

  async getAllArhive(req, res) {
    let { id } = req.query;

    let examarhive;
    if (!id) {
      examarhive = await Examination.findAll({
        where: {
          statusExam: "Arhive",
        },
      });
    }
    return res.json(examarhive);
  }

  // async getAllСharger(req, res) {
  //     let {id} = req.query

  //     let examcharger;
  //     if (!id) {
  //         examcharger = await Examination.findAll( {where: {
  //             statusExam: 'Сharger'
  //         }})
  //     }
  //     return res.json(examcharger)
  // }

  async getAllCharger(req, res) {
    let { id } = req.query;

    let examcharger;
    if (!id) {
      examcharger = await Examination.findAll({
        where: {
          statusExam: "Charger",
        },
      });
    }
    return res.json(examcharger);
  }

  async getAllReady(req, res) {
    let { id } = req.query;

    let examready;
    if (!id) {
      examready = await Examination.findAll({
        where: {
          statusExam: "Ready",
        },
      });
    }
    return res.json(examready);
  }

  async remove(req, res) {
    const { id } = req.body;
    try {
      const delFull = await Examination.destroy({
        where: {
          id,
        },
      });
      return res.json(delFull);
    } catch (error) {
      // error.console.log(error)
    }
  }

  async upgrade(req, res) {
    const { id, result, statusExam } = req.body;
    try {
      const updateFull = await Examination.update(
        {
          result: result,
          statusExam: statusExam,
        },
        {
          where: {
            id: id,
          },
        }
      );
      // return res.json(updateFull)
    } catch (error) {
      return error.message;
    }
  }

  async upgradeNumberReturnDocument(req, res) {
    const { id, numberReturnDocument, statusExam } = req.body;
    try {
      const updateFull = await Examination.update(
        {
          numberReturnDocument: numberReturnDocument,
          statusExam: statusExam,
        },
        {
          where: {
            id: id,
          },
        }
      );
      // return res.json(updateFull)
    } catch (error) {
      return error.message;
    }
  }

  
  async upgradePlantDocumentNumber(req, res) {
    const { id, plantDocumentNumber, statusExam } = req.body;
    try {
      const updateFull = await Examination.update(
        {
          plantDocumentNumber: plantDocumentNumber,
          statusExam: statusExam,
        },
        {
          where: {
            id: id,
          },
        }
      );
      // return res.json(updateFull)
    } catch (error) {
      return error.message;
    }
  }

  async upgradeMovingToDefectWarehouse(req, res) {
    const { id, movingToDefectWarehouse, statusExam } = req.body;
    try {
      const updateFull = await Examination.update(
        {
          movingToDefectWarehouse: movingToDefectWarehouse,
          statusExam: statusExam,
        },
        {
          where: {
            id: id,
          },
        }
      );
      // return res.json(updateFull)
    } catch (error) {
      return error.message;
    }
  }

    async upgradeUpdateReleaseDate(req, res) {
    const { id, releaseDate, statusExam } = req.body;
    try {
      const updateFull = await Examination.update(
        {
          releaseDate: releaseDate,
          statusExam: statusExam,
        },
        {
          where: {
            id: id,
          },
        }
      );
      // return res.json(updateFull)
    } catch (error) {
      return error.message;
    }
  }


  async getOne(req, res) {
    const { id } = req.query;
    try {
      const oneExam = await Examination.findOne({
        where: { id },
      });
      return res.json(oneExam);
    } catch (error) {
      return error.message;
    }
  }

  // async getOne(req, res) {
  //     const {id} = req.params
  //     try {
  //         const oneExam = await Examination.findOne({
  //             where: {id},
  //             include: [{model: Examination, as: 'info'}]
  //         })
  //     return res.json(oneExam)

  //     } catch (error) {
  //         return error.message
  //     }

  // }

  async getStatus(req, res) {
    const { id } = req.query;

    try {
      if (!id) {
        const checkStatus = await Examination.findOne({
          where: { statusExam },
        });

        return res.json(checkStatus);
      }
    } catch (error) {}
  }
}

module.exports = new ExaminationController()