const { model } = require('../db');
const {Directions, User, Сity, Client,UserRegion, Day} = require('../models/models')
const { Op } = require('sequelize');
class DirectionsController {
  async createDirections(req, res) {
    try {
      const { region, day, userid } = req.body;
      const dir = await Directions.create({ region, day, userid });
      return res.json(dir);
    } catch (error) {
      console.log(error);
    }
  }

  async createCity(req, res) {
    try {
      const { city, region, directionid, user_id } = req.body;

      const newCity = await Сity.create({
        city,
        region,
        directionid,
        user_id,
      });
      return res.json(newCity);
    } catch (error) {}
  }

  async createClient(req, res) {
    try {
      const {
        client,
        payment,
        address,
        contact,
        manager,
        cityid,
        weightusedbattery,
        weightnewbatteries,
        comment,
      } = req.body;
      const newClients = await Client.create({
        client,
        payment,
        address,
        contact,
        manager,
        cityid,
        weightusedbattery,
        weightnewbatteries,
        comment,
      });
      return res.json(newClients);
    } catch (error) {
      console.log(error);
    }
  }

  async createDeliveryNumber(req, res) {
    try {
      const { dateofcreation } = req.body;

      const checkNumder = await DeliveryNumber.findOne({
        where: { dateofcreation },
      });
      if (!checkNumder) {
        const newDeliveryNumber = await DeliveryNumber.create({
          dateofcreation,
        });
        return res.json(newDeliveryNumber);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createDirectionsRady(req, res) {
    try {
      const { arrayDirections } = req.body;

      const newDirectionsRady = await DirectionsRady.bulkCreate(
        arrayDirections
      );
      return res.json(newDirectionsRady);
    } catch (error) {
      console.log(error);
    }
  }

  async createCityDirectionsRady(req, res) {
    try {
      const { cityid, directionsredyid } = req.body;
      const checkCitydirectionsredy = await Citydirectionsredy.findOne({
        where: { cityid: cityid, directionsredyid: directionsredyid },
      });
      if (checkCitydirectionsredy) {
        return;
      } else {
        const newCityDirectionsRady = await Citydirectionsredy.create({
          cityid: Number(cityid),
          directionsredyid: Number(directionsredyid),
        });
        return res.json(newCityDirectionsRady);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeClient(req, res) {
    const { id } = req.body;
    try {
      const delClient = await Client.destroy({
        where: {
          id,
        },
      });
      return res.json(delClient);
    } catch (error) {
      // error.console.log(error)
    }
  }

  async createDelivery(req, res, next) {
    try {
      const {
        payment,
        client,
        address,
        contact,
        directionid,
        manager,
        cityid,
        clientid,
        weightusedbattery,
        weightnewbatteries,
        comment,
        dateofcreation,
      } = req.body;
      // const checkwDelivery = await Delivery.findOne({ where: { client } });
      // if (checkwDelivery) {
      //   return next(
      //     ApiError.badRequest(
      //       'Клиент. уже в доставке. Отредактируйте данные в разделе "Готовы к отгрузке"'
      //     )
      //   );
      // }
      const newDelivery = await Delivery.create({
        payment,
        client,
        address,
        contact,
        directionid,
        manager,
        cityid,
        clientid,
        weightusedbattery,
        weightnewbatteries,
        comment,
        dateofcreation,
      });

      // const id = directionid;
      // await Directions.update(
      //   {
      //     statusDirections: "Delivery",
      //   },
      //   {
      //     where: {
      //       id: id,
      //     },
      //   }
      // );

      return res.json(newDelivery);
    } catch (error) {
      console.log(error);
    }
  }

  async removeDelivery(req, res) {
    const { id, iddirection } = req.body;

    try {
      const check = await Delivery.findOne({
        where: { directionid: iddirection },
      });
      if (check) {
        const delDelivery = await Delivery.destroy({
          where: {
            id: id,
          },
        });

        if (delDelivery) {
          const checkId = await Delivery.findOne({
            where: {
              directionid: {
                [Op.eq]: iddirection,
              },
            },
          });
          if (!checkId) {
            await DirectionsRady.destroy(
              // {
              //   statusDirections: "",
              // },
              {
                where: {
                  directionid: iddirection,
                },
              }
            );
          }
        }

        return res.json(delDelivery);
      }
    } catch (error) {
      // error.console.log(error)
    }
  }

  async removeClient(req, res) {
    const { id } = req.body;
    try {
      const delClient = await Client.destroy({
        where: {
          id,
        },
      });
      return res.json(delClient);
    } catch (error) {
      // error.console.log(error)
    }
  }

  async addStatusDelivery(req, res) {
    try {
      const { id, statusDelivery } = req.body;
      const newDelivery = await Client.update(
        {
          statusDelivery: statusDelivery,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.json(newDelivery);
    } catch (error) {
      console.log(error);
    }
  }

  async updateClient(req, res) {
    try {
      const {
        id,
        payment,
        client,
        address,
        contact,
        directionid,
        manager,
        cityid,
        comment,
      } = req.body;

      const updateClient = await Client.update(
        {
          payment: payment,
          client: client,
          address: address,
          contact: contact,
          directionid: directionid,
          manager: manager,
          cityid: cityid,
          comment: comment,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.json(updateClient);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllregions(req, res) {
    let { directionId } = req.query;

    if (!directionId) {
      try {
        const direction = await Directions.findAll({
          include: [
            {
              model: Сity,
              as: "city",
              attributes: ["id", "city", "region"],
              include: [
                {
                  model: Client,
                  as: "client",
                },
              ],
            },
          ],  
        }); 
        return res.json(direction);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getAllMonday(req, res) {   
    try {
       let { userid, day } = req.query;
       let days;
       days = await Directions.findAll({
         where: {
          userid: {
             [Op.contains]: Number(userid)
           },
           day: {
             [Op.eq]: day,
           },
           
         },
         include: [
           {
             model: Сity,
             as: "city",
             attributes: ["id", "city", "region"],
             include: [
               {
                 model: Client,
                 as: "client",
                 where: {
                   manager: userid,
                 },
               },
             ],
           },
         ],
       });
       return res.json(days);
      
    } catch (error) {
      
    }

  }

  
  // async getAllMonday(req, res) {
  //   let { id, userid ,day, } = req.query;

  //   let days;

  //   if (!id) {
  //     days = await UserRegion.findAll(
  //       {
  //       // where: {
  //       //  [Op.and]: [
  //       //    {userid: userid},
  //       //  { day: day}
      
  //       //  ]
  //       // }
  //       // ,
  //       include: [
  //         {
  //           model: Directions,
  //           as: "userId",
  //           attributes: ["id", "city", "region"],
  //           include: [
  //             {
  //               model: Client,
  //               as: "client",
  //             },
  //           ],
  //         },
  //       ],
  //     }
  //   );
  //   }
  //   // console.log(days)
  //   return res.json(days);
  // }

  async getAllCity(req, res) {
    let {id} = req.query;
    let allcity;
    if(!id) {
      allcity = await Сity.findAll()
    }

    return res.json(allcity)
  }

  // async getAllregions(req, res) {
  //   let { directionId } = req.query;

  //   if (!directionId) {
  //     try {
  //       const direction = await Directions.findAll({

  //         include: [
  //           {
  //             model: Day,
  //             as: "day",

  //         include: [
  //           {
  //             model: Сity,
  //             as: "city",
  //             attributes: ["id", "city", "region"],
  //             include: [
  //               {
  //                 model: Client,
  //                 as: "client"
  //               }
  //             ]
  //           },
  //         ],
  //           }
  //         ]

  //       });

  //       return res.json(direction);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }
}


module.exports = new DirectionsController()