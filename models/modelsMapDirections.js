const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Directions = sequelize.define('directions', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    region: {type: DataTypes.STRING, allowNull: false},
    day: {type: DataTypes.INTEGER, allowNull: false},
    userid:{type: DataTypes.JSONB, primaryKey: false, autoIncrement: false},
    // statusDirections: {type: DataTypes.STRING,  allowNull: true},
    // directionid:{type: DataTypes.INTEGER,  allowNull: true, autoIncrement: false, },
})  
    
const Сity = sequelize.define('city', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city: {type: DataTypes.STRING, allowNull: false},
    // region: {type: DataTypes.STRING, allowNull: false},
    directionid:{type: DataTypes.INTEGER, autoIncrement: false, },
    day: {type: DataTypes.INTEGER, allowNull: false},

    // user_id:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
})        
    
const Client = sequelize.define('client', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    client: {type: DataTypes.STRING, allowNull: false},
    payment: {type: DataTypes.STRING, allowNull: true},
    address: {type: DataTypes.STRING, allowNull: false},
    contact: {type: DataTypes.STRING, allowNull: false},
    directionid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    manager: {type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    cityid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    weightusedbattery:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false,defaultValue: 0, allowNull: true},
    weightnewbatteries :{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false, defaultValue: 0, allowNull: true},
    comment: {type: DataTypes.STRING, allowNull: true},    
    statusDelivery: {type: DataTypes.STRING, allowNull: true},
}) 

 
const DeliveryNumber = sequelize.define('deliverynumber', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dateofcreation:{type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, defaultValue: "Delivery"},
    // alldirections: {type: DataTypes.JSONB, primaryKey: false, autoIncrement: false}
}) 
    
const DirectionsRady = sequelize.define(
  "directionsredy",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    region: { type: DataTypes.STRING, allowNull: false },
    day: { type: DataTypes.STRING, allowNull: false },
    directionid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: false,
    },
    dateofcreation: { type: DataTypes.STRING, allowNull: false },
    statusDirections: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Delivery",
    },
    deliverynumberid: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      autoIncrement: false,
    },
  }, 
//  {
//     sequelize,
//     modelName: this.DirectionsRady,
//     hooks: {
//       beforeBulkCreate: async (records, options) => {
//         const allRecords = await DirectionsRady.findAll();
//         for (const newRecord of records) {
//           for (const allRecord of allRecords) {
//             if (
//               newRecord.directionid === allRecord.directionid &&
//               newRecord.dateofcreation === allRecord.dateofcreation
//             ) {
//               return console.log("Запись уже есть")
//             }
//           }
//         }
//       },
//     },
//   }
);        
 
const DirectionsArhive = sequelize.define('directionsarhive', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    region: {type: DataTypes.STRING, allowNull: false},
    day: {type: DataTypes.INTEGER, allowNull: false},
    // userid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    userid:{type: DataTypes.JSONB, primaryKey: false, autoIncrement: false},
    dateofcreation:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    statusDirections: {type: DataTypes.STRING,  allowNull: true},

}) 

const DeliveryArhive = sequelize.define('deliveryarhive', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    payment: {type: DataTypes.STRING, allowNull: true},
    client: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    contact: {type: DataTypes.STRING, allowNull: false},
    directionid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    manager: {type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    cityid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    clientid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    weightusedbattery:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    weightnewbatteries :{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    comment: {type: DataTypes.STRING, allowNull: true},    
    statusClient: {type: DataTypes.STRING, defaultValue: "Delivery"},
    dateofcreation:{type: DataTypes.STRING, allowNull: false},

    // clientIdForDelivery :{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
})  
  
const Delivery = sequelize.define('delivery', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    payment: {type: DataTypes.STRING, allowNull: true},
    client: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    contact: {type: DataTypes.STRING, allowNull: false},
    directionid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    manager: {type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    cityid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    clientid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    weightusedbattery:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false, allowNull: true},
    weightnewbatteries :{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false, allowNull: true},
    comment: {type: DataTypes.STRING, allowNull: true},    
    statusClient: {type: DataTypes.STRING, primaryKey: false, defaultValue: "Delivery"},
    dateofcreation:{type: DataTypes.STRING,  allowNull: false, unique: false},
    directionsredyid:{type: DataTypes.INTEGER,  allowNull: false},
    citydirectionsredyId:{type: DataTypes.INTEGER,  allowNull: true},
//  deliverynumberid: {  
//       type: DataTypes.INTEGER,
//       primaryKey: false,
//       autoIncrement: false,
//     }, 
       
    // clientIdForDelivery :{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
})  
 
 const Citydirectionsredy = sequelize.define('citydirectionsredy', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    cityid:{type: DataTypes.INTEGER, allowNull: false},
    directionsredyid:{type: DataTypes.INTEGER,  allowNull: false},

 })
  

const Day = sequelize.define('day', {

    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    day:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    region:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
})
 
 
Directions.hasMany(Сity, {
    foreignKey: 'directionid',
    as: 'city',
    // onDelete: 'RESTRICT'

})
Сity.belongsTo(Directions, {
    foreignKey: 'directionid',
    as: 'directions'
})

Сity.hasMany(Client, {
    foreignKey: 'cityid',
    as: 'client',
    // onDelete: 'RESTRICT'
})

Client.belongsTo(Сity, {
    foreignKey: 'cityid',
    as: 'city'
})
// Связи для раздела - Готовы к отгрузке и Архива поставок //

DeliveryNumber.hasMany(DirectionsRady, {
  foreignKey: "deliverynumberid",
  as: "directionsredy",
}); 
// -------
// ---------
DeliveryNumber.hasMany(Delivery, {
  foreignKey: "deliverynumberid",
  as: "delivery",
}); 

DeliveryNumber.hasMany(Citydirectionsredy, {
  foreignKey: "deliverynumberid",
  as: "citydirectionsredy",
});  
//----------------------------


DirectionsRady.belongsTo(DeliveryNumber, {
  foreignKey: "deliverynumberid",
  as: "deliverynumber",
});   
// DirectionsRady.hasMany(Delivery, {
//   foreignKey: "directionsradyid",
//   as: "delivery",
// }); 
  
DirectionsRady.hasMany(Citydirectionsredy, {
  foreignKey: "directionsredyid",
  as: "citydirectionsredy",
});

DirectionsRady.hasMany(Сity, {
  foreignKey: "directionid",
  as: "city",
});

Citydirectionsredy.belongsTo(Сity, {
  foreignKey: "cityid",
  as: "city",
});  

Citydirectionsredy.hasMany(Delivery, {
  foreignKey: "citydirectionsredyId",
  as: "delivery",
});    
 
Сity.hasMany(Delivery, {
    foreignKey: 'cityid',
    as: 'delivery'
})
 
Delivery.belongsTo(Сity, {
  foreignKey: "cityid",
  as: "city",
}); 

// -----------------------------//
 
User.belongsTo(Client)
Client.hasOne(User)
// User.hasMany(Citydirectionsredy)

//  sequelize.sync({alter: true})


module.exports = {
  User,
    Directions,
    Сity,
    Client,
    Delivery,
    DeliveryNumber,
    DirectionsRady,
    Citydirectionsredy

}