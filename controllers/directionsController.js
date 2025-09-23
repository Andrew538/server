// const { checkExact } = require('express-validator');
// const { model, Sequelize, transaction } = require('../db');
const { model } = require('../db');
const ApiError = require('../error/ApiError');
const {Directions, Сity, Client, Delivery, DeliveryNumber, DirectionsRady, Citydirectionsredy } = require('../models/modelsMapDirections')
const {User} = require('../models/models')
const { Op, Sequelize } = require('sequelize');





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

  async allUserIdforDirections(req, res) {
    const userid = await User.findAll({
      attributes: ["id"],
      raw: true,
      where: {
        role: "MANAGER",
      },
    });

    return res.json(userid);
  }
  async createCity(req, res) {
    try {
      // Удалил region и     user_id,
      const { city, directionid, day } = req.body;

      const newCity = await Сity.create({
        city,
        directionid,
        day,
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
        directionid,
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
        directionid,
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
      const newDeliveryNumber = await DeliveryNumber.create({
        dateofcreation,
      });
      return res.json(newDeliveryNumber);

      if (!checkNumder) {
        const newDeliveryNumber = await DeliveryNumber.create({
          dateofcreation,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateDeliveryNumber(req, res) {
    try {
      const { id } = req.body;

      const checkNumder = await DeliveryNumber.update(
        {
          status: "Arhive",
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.json(checkNumder);
    } catch (error) {
      console.log(error);
    }
  }

  async createDirectionsRady(req, res, next) {
    try {
      const { deliverynumberid, dateofcreation, arrayDirections } = req.body;

      const checkDirectionsRady = await DirectionsRady.findOne({
        where: {
          deliverynumberid: deliverynumberid,
          dateofcreation: dateofcreation,
        },
      });
      if (checkDirectionsRady) {
        console.log("Запись есть");
      } else {
        const newDirectionsRady = await DirectionsRady.bulkCreate(
          arrayDirections
        );
        return res.json(newDirectionsRady);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // async createDirectionsRadyTwo(req, res) {
  //   try {
  //     const {dirredyid, todaysdate, statusDirectios} = req.body;

  //     const checkDirectionsRady = await DirectionsRady.findOne({
  //       where: {
  //         directionid: Number(dirredyid),
  //       },
  //     });

  //     if (checkDirectionsRady) {
  //        const newDirectionsRady = await DirectionsRady.update(
  //          {
  //           statusDirectios: statusDirectios
  //          },
  //          {
  //            where: {
  //              directionid: Number(dirredyid),
  //              dateofcreation: todaysdate,
  //         statusDirections: 'Arhive'

  //            },
  //          }
  //        );
  //       return res.json(newDirectionsRady);
  //     } else {
  //       // const newDirectionsRady = await DirectionsRady.create({
  //       //   region: reg,
  //       //   day: day,
  //       //   directionid: Number(dirredyid),
  //       //   dateofcreation: todaysdate,
  //       //   deliverynumberid: Number(deliverynumberid),
  //       // });
  //       // return res.json(newDirectionsRady);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async createCityDirectionsRady(req, res, next) {
    try {
      const { cId, dirId } = req.body;

      const checkCitydirectionsredy = await Citydirectionsredy.findOne({
        where: { cityid: Number(cId), directionsredyid: Number(dirId) },
      });

      if (!checkCitydirectionsredy) {
        const newCityDirectionsRady = await Citydirectionsredy.create({
          cityid: Number(cId),
          directionsredyid: Number(dirId),
        });
        return res.json(newCityDirectionsRady);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //   async createAllCityDirectionsRady(req, res, next) {
  //   try {
  //     const { allCityDirectionsRady } = req.body;
  //     const checkCitydirectionsredy = await Citydirectionsredy.findOne({
  //       where: { cityid: Number(cId), directionsredyid: Number(dirId) },
  //     });
  //     // if (checkCitydirectionsredy) {
  //     // // next (console.log("Запись уже есть"))
  //     // } else {
  //       const newAllCityDirectionsRady = await Citydirectionsredy.bulkCreate(
  //         allCityDirectionsRady
  //       );
  //       return res.json(newAllCityDirectionsRady);
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
        directionsredyid,
        citydirectionsradyId,
        priceofusedbattery
      } = req.body;
      const checkwDelivery = await Delivery.findOne({
        where: { dateofcreation: dateofcreation, clientid: clientid },
      });
      if (checkwDelivery) {
        return next(
          ApiError.badRequest(
            'Клиент. уже в доставке. Отредактируйте данные в разделе "Готовы к отгрузке"'
          )
        );
      }

      const newDelivery = await Delivery.create({
        payment,
        client,
        address,
        contact,
        directionid,
        manager,
        cityid,
        clientid,
        weightusedbattery: weightusedbattery,
        weightnewbatteries: weightnewbatteries,
        comment,
        dateofcreation,
        directionsredyid,
        citydirectionsredyId: citydirectionsradyId,
        priceofusedbattery
      });
      return res.json(newDelivery);
    } catch (error) {
      console.log(error);
    }
  }

  async removeDelivery(req, res) {
    const { id, iddirection, dateCreate } = req.body;

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
            await DirectionsRady.update(
              {
                statusDirections: "Arhive",
              },
              {
                where: {
                  dateofcreation: dateCreate,
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
        priceofusedbattery
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
          priceofusedbattery: priceofusedbattery
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
              attributes: ["id", "city"],
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

  async getTodaysDirections(req, res) {
    const { days } = req.query;

    try {
      const allTodaysDirections = await Directions.findAll({
        where: { day: days },
      });
      return res.json(allTodaysDirections);
    } catch (error) {}
  }

  async getOneTodaysDirections(req, res) {
    const { regionid, todaysdate } = req.query;

    try {
      const oneTodaysDirections = await DirectionsRady.findOne({
        where: {
          directionid: Number(regionid),
          dateofcreation: todaysdate,
        },
      });
      return res.json(oneTodaysDirections);
    } catch (error) {}
  }

  async getOneRegions(req, res) {
    const { id } = req.query;
    try {
      const OneRegion = await Directions.findOne({
        where: {
          id,
        },
      });
      return res.json(OneRegion);
    } catch (error) {
      return error.message;
    }
  }

  async getOneDeliveryNumber(req, res, next) {
    const { dateofcreation } = req.query;
    try {
      const OneDeliveryNumber = await DeliveryNumber.findOne({
        where: {
          dateofcreation,
        },
      });
      if (!OneDeliveryNumber) {
        return;
      } else {
        return res.json(OneDeliveryNumber);
      }
    } catch (error) {
      return error.message;
    }
  }

  async getAllToday(req, res) {
    try {
      let { userid, day } = req.query;
      let days;
      days = await Directions.findAll({
        order: [["region", "ASC"]],
        where: {
          userid: {
            // [Op.contains]: Number(userid),
            [Op.any]: Sequelize.literal("ARRAY[userid]"),
          },
          day: {
            [Op.eq]: day,
          },
        },
        include: [
          {
            model: Сity,
            as: "city",
            //attributes: ["id", "city", "region"],
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
    } catch (error) {}
  }

  async getAllDelivery(req, res) {
    try {
      let {} = req.query;
      let allDelivery;
      allDelivery = await Directions.findAll({
        order: [["region", "ASC"]],
        where: {
          statusDirections: "Delivery",
        },
        include: [
          {
            model: Сity,
            as: "city",
            // attributes: ["id", "city", "region"],
            include: [
              {
                model: Delivery,
                as: "delivery",
                where: {
                  statusClient: "Delivery",
                },
              },
            ],
          },
        ],
      });

      return res.json(allDelivery);
    } catch (error) {}
  }
//  НЕ ТРОГАТЬ РАБОТАЕТ
  // async getAllDeliveryRedy(req, res) {
  //   try {
  //     let {} = req.query;
  //     let allDelivery;
  //     allDelivery = await DeliveryNumber.findAll({
  //       //  order: [['region', 'ASC']],
  //       where: {
  //         status: "Delivery",
  //       },

  //       include: [
  //         {
  //           model: DirectionsRady,
  //           as: "directionsredy",
  //           // where: { statusDirections: "Delivery" },
  //           include: [
  //             {
  //               model: Citydirectionsredy,
  //               as: "citydirectionsredy",

  //               include: [
  //                 {
  //                   model: Сity,
  //                   as: "city",

  //                 },
  //                   {  model: Delivery,
  //                     as: "delivery",

  //                   }
  //                   ],
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     return res.json(allDelivery);
  //   } catch (error) {}
  // }
    //  



    async getAllDeliveryRedy(req, res) {
    try {
      let {} = req.query;
      let allDelivery;
      allDelivery = await DeliveryNumber.findAll({
        //  order: [['region', 'ASC']],
        where: {
          status: "Delivery",
        },
        // attributes: [
        //   // 'id'
        //   // [Sequelize.fn('SUM', Sequelize.col('delivery.weightnewbatteries')), 'totalLikes']
        // ],
        include: [
          {
            model: DirectionsRady,
            as: "directionsredy",
            // where: { statusDirections: "Delivery" },

          // attributes: [
          //         "id",
          //         "directionid",
          //         "dateofcreation",
          //         "deliverynumberid",
          //       ],


            include: [
              {
                model: Citydirectionsredy,
                as: "citydirectionsredy",
                // attributes: [
                //   "id",
                //   "cityid",
                //   "directionsredyid",
                //   "dateofcreation",
                // ],

                include: [
                  {
                    model: Сity,
                    as: "city",
                    // attributes: ["id"],
                  },
                  {
                    model: Delivery,
                    as: "delivery",
                    

                    // group: ["cityid"],
                  },
                ],
              },
            ],
        group: 'DeliveryNumber.id'

          },
          
        ],
      });

      return res.json(allDelivery);
    } catch (error) {}
  }
     
  // async getAllDeliveryRedy(req, res) {
  //   try {
  //     let {} = req.query;
  //     let allDelivery;
  //     allDelivery = await DeliveryNumber.findAll({
  //       //  order: [['region', 'ASC']],
  //       where: {
  //         status: "Delivery",
  //       },

  //       include: [
  //         {
  //           model: DirectionsRady,
  //           as: "directionsredy",
  //           // where: { statusDirections: "Delivery" },
  //           include: [
  //             {
  //               model: Citydirectionsredy,
  //               as: "citydirectionsredy",
               
  //               include: [
  //                 {
  //                   model: Сity,
  //                   as: "city",
  //                 },
  //                 {
  //                   model: Delivery,
  //                   as: "delivery",
                    
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     return res.json(allDelivery);
  //   } catch (error) {}
  // }

  async getArhiveDelivery(req, res) {
    try {
      let {} = req.query;
      let allDelivery;
      allDelivery = await DeliveryNumber.findAll({
        //  order: [['region', 'ASC']],
        where: {
          status: "Arhive",
        },

        include: [
          {
            model: DirectionsRady,
            as: "directionsredy",
            // where: { statusDirections: "Delivery" },
            include: [
              {
                model: Citydirectionsredy,
                as: "citydirectionsredy",

                include: [
                  {
                    model: Сity,
                    as: "city",
                  },
                  { model: Delivery, as: "delivery" },
                ],
              },
            ],
          },
        ],
      });

      return res.json(allDelivery);
    } catch (error) {}
  }
  // async getOneDelivery(req, res) {
  //   try {
  //     let { id } = req.query;
  //     let oneDelivery;
  //     oneDelivery = await Directions.findOne({
  //       where: {
  //         // statusDirections: 'Delivery',
  //         id,
  //       },
  //       include: [
  //         {
  //           model: Сity,
  //           as: "city",
  //           //  attributes: ["id", "city", "region"],
  //           include: [
  //             {
  //               model: Delivery,
  //               as: "delivery",
  //               where: {
  //                 statusClient: "Delivery",
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     return res.json(oneDelivery);
  //   } catch (error) {}
  // }

  async getOneDelivery(req, res) {
    try {
      let { id } = req.query;
      let oneDelivery;
      oneDelivery = await DeliveryNumber.findOne({
        where: {
          // statusDirections: 'Delivery',
          id,
        },
        include: [
          {
            model: DirectionsRady,
            as: "directionsredy",
            // where: { statusDirections: "Delivery" },
            include: [
              {
                model: Citydirectionsredy,
                as: "citydirectionsredy",
                include: [
                  {
                    model: Сity,
                    as: "city",
                  },
                  { model: Delivery, as: "delivery" },
                ],
              },
            ],
          },
        ],
      });

      return res.json(oneDelivery);
    } catch (error) {}
  }

  async getOneCityDirectionsRady(req, res) {
    try {
      let { dirId, cId } = req.query;
      let oneDelivery;
      oneDelivery = await Citydirectionsredy.findOne({
        where: {
          directionsredyid: dirId,
          cityid: cId,
        },
      });

      return res.json(oneDelivery);
    } catch (error) {}
  }
  async getAllDelivery(req, res) {
    try {
      let {} = req.query;
      let allDelivery;
      allDelivery = await DeliveryNumber.findAll({
        //  order: [['region', 'ASC']],
        where: {
          status: "Delivery",
        },

        include: [
          {
            model: DirectionsRady,
            as: "directionsredy",
            where: { statusDirections: "Arhive" },
            include: [
              {
                model: Citydirectionsredy,
                as: "citydirectionsredy",
                include: [
                  {
                    model: Сity,
                    as: "city",
                    include: [
                      {
                        model: Delivery,
                        as: "delivery",
                        // where:{statusClient: 'Arhive'}
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.json(allDelivery);
    } catch (error) {}
  }
  async getOneClient(req, res) {
    const { id } = req.query;
    try {
      const OneClient = await Client.findOne({
        where: {
          id,
        },
      });
      return res.json(OneClient);
    } catch (error) {
      return error.message;
    }
  }

  async getOneClientDeliveryReady(req, res) {
    const { id } = req.query;
    try {
      const OneClientDelivery = await Delivery.findOne({
        where: {
          id: id,
        },
      });
      return res.json(OneClientDelivery);
    } catch (error) {
      return error.message;
    }
  }

  async updateClientDelivery(req, res) {
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
        weightusedbattery,
        weightnewbatteries,
        comment,
        priceofusedbattery
      } = req.body;

      const updateClient = await Delivery.update(
        {
          payment: payment,
          client: client,
          address: address,
          contact: contact,
          directionid: directionid,
          manager: manager,
          cityid: cityid,
          weightusedbattery: weightusedbattery,
          weightnewbatteries: Number(weightnewbatteries),
          comment: comment,
          priceofusedbattery: priceofusedbattery
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

  async getAllDirectionsReadyOfCity(req, res) {
    try {
      let {} = req.query;
      let allDelivery;
      allDelivery = await DirectionsRady.findAll({
        where: {
          statusDirections: "Delivery",
        },
        include: [
          {
            model: Сity,
            as: "city",
            // attributes: ["id", "city", "region"],
            include: [
              {
                model: Delivery,
                as: "delivery",
                where: {
                  statusClient: "Delivery",
                },
              },
            ],
          },
        ],
      });

      return res.json(allDelivery);
    } catch (error) {}
  }
  async getAllCity(req, res) {
    let { directionid } = req.query;
    let allcity;
    // if (!id) {
    try {
      allcity = await Сity.findAll({
        where: {
          directionid: directionid,
        },
      });
    } catch (error) {}

    // }

    return res.json(allcity);
  }

  async getCitysofDay(req, res) {
    let { day } = req.query;
    let allcity;
    // if (!id) {
    try {
      allcity = await Сity.findAll({
        where: {
          day: day,
        },
      });
    } catch (error) {}

    // }

    return res.json(allcity);
  }

  // async gettoTalWeightOfNew(req, res) {
  //   try {
  //     let { dateofcreation, cityid } = req.query;

  //     let sum;
  //     sum = await Delivery.findOne( {
  //       // where: {
  //       //   // dateofcreation: dateofcreation,
  //       //   // cityid: cityid
        
  //       // },
  //       attributes: [
  //         [Sequelize.fn('SUM', Sequelize.col('weightnewbatteries')), 'pop']
  //       ],
  //       where: {
  //         dateofcreation: dateofcreation,
  //         cityid: [8, 7, 6]
  //       }
  //     });

  //     return res.json(sum);
  //   } catch (error) {}
  // }

  //   const result = await YourMainModel.findAll({
  //     include: [{
  //       model: YourNestedModel,
  //       attributes: [
  //         [sequelize.fn('SUM', sequelize.col('YourNestedModel.your_column_to_sum')), 'totalSum']
  //       ]
  //     }],
  //     attributes: ['id', 'name'] // Атрибуты родительской модели
  //   });


//РАботает частично
  
  // async gettoTalWeightOfNew(req, res) {
  //   try {
  //     let { dateofcreation, cityid } = req.query;

  //     let sum;
  //      sum = await Delivery.findAll({
  //       // where: {
  //       // // 
  //       // dateofcreation: dateofcreation
  //       // }, 
  //      attributes:[
  //       'directionsredyid',
      
  //        [Sequelize.fn('SUM', Sequelize.col('weightnewbatteries')), 'itemCount'],
         
  //      ],
      
       
  //      group: ['directionsredyid',]
      
       
  //   });

  //     return res.json(sum);
  //   } catch (error) {}
  // }




// const Order = sequelize.model("Order"); // Ваша модель заказа
// const OrderItem = sequelize.model("OrderItem"); // Ваша модель элементов заказа




//  async gettoTalWeightOfNew(req, res) {
//     try {
//      let { dateofcreation, cityid } = req.query;

//       let sum;
//      sum = await Citydirectionsredy.findAll({
//     attributes: [
//       'id',
//       'cityid', 
//           [Sequelize.fn('SUM', Sequelize.col(`${Delivery}.${weightnewbatteries}`)), 'totalOrderAmount']

//     ],

//        include: [{
//       model: Delivery,
//       as: 'delivery',
//        attributes: [
//         // 'cityid',
//         // 'weightnewbatteries',
//     ],
    
//     group: ['Citydirectionsredy.id']

    
//     }, ],
      
    
   
   
//     // group: ['Citydirectionsredy.id'], // Group by user ID to get sum per user
//   });

//   // console.log(JSON.stringify(sum, null, 2));

//        return res.json(sum);
//      } catch (error) {}
//    }



  async gettoTalWeightOfNew(req, res) {
    try {
      let { dateofcreation, cityid } = req.query;

      let sum;
      
      return res.json(sum);
    } catch (error) {}
  }

   
   

}

module.exports = new DirectionsController()