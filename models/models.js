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

const Examination = sequelize.define('examination', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.STRING, allowNull: false},
    client: {type: DataTypes.STRING, allowNull: false},
    manager: {type: DataTypes.STRING, allowNull: false},
    product: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false},
    productionDate: {type: DataTypes.STRING, allowNull: false},
    numberReturnDocument: {type: DataTypes.STRING, allowNull: true},
    plantDocumentNumber: {type: DataTypes.STRING, allowNull: true},
    movingToDefectWarehouse: {type: DataTypes.STRING, allowNull: true},
    releaseDate: {type: DataTypes.STRING, allowNull: true},
    result: {type: DataTypes.STRING, allowNull: true},
    comment: {type: DataTypes.STRING, allowNull: true},
    statusExam: {type: DataTypes.STRING, allowNull: false},
})

const Directions = sequelize.define('directions', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    region: {type: DataTypes.STRING, allowNull: false},
    day: {type: DataTypes.INTEGER, allowNull: false},
    // userid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    userid:{type: DataTypes.JSONB, primaryKey: false, autoIncrement: false},

})

const Сity = sequelize.define('city', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city: {type: DataTypes.STRING, allowNull: false},
    region: {type: DataTypes.STRING, allowNull: false},
    directionid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    user_id:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
})

const Client = sequelize.define('client', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    client: {type: DataTypes.STRING, allowNull: false},
    payment: {type: DataTypes.STRING, allowNull: true},
    address: {type: DataTypes.STRING, allowNull: false},
    contact: {type: DataTypes.STRING, allowNull: false},
    // manager: {type: DataTypes.STRING, allowNull: true},
    manager: {type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    cityid:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    weightusedbattery:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    weightnewbatteries :{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    comment: {type: DataTypes.STRING, allowNull: true},    

})

// const UserRegion = sequelize.define('userId', {
//     id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     userId:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
//     directionId:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
// })



const Day = sequelize.define('day', {

    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    day:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
    region:{type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false},
})


const TypeAKB = sequelize.define('typeakb', {
    name: {type: DataTypes.STRING, allowNull: false},
})



User.hasMany(Examination)
Examination.belongsTo(User)


Directions.hasMany(Сity, {
    foreignKey: 'directionid',
    as: 'city',
    onDelete: 'RESTRICT'

})


// Directions.hasMany(UserRegion, {
//     foreignKey: 'userId',
//     as: 'userId'

// })



// UserRegion.hasMany(Directions, {
//     foreignKey: 
// })

Сity.belongsTo(Directions, {
    foreignKey: 'directionid',
    as: 'directions'
})

Сity.hasMany(Client, {
    foreignKey: 'cityid',
    as: 'client',
    onDelete: 'RESTRICT'
})

User.hasMany(Сity,{
    foreignKey: 'user_id',
    as: 'city'
})




User.hasMany(TypeAKB)
TypeAKB.belongsTo(User)


// sequelize.sync({alter: true})
module.exports = {
    User,
    Examination,
    TypeAKB,
    Directions,
    Сity,
    Client,
    // UserRegion 
}