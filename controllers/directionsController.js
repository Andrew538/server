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