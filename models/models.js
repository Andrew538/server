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



const TypeAKB = sequelize.define('typeakb', {
    name: {type: DataTypes.STRING, allowNull: false},
})



User.hasMany(Examination)
Examination.belongsTo(User)




User.hasMany(TypeAKB)
TypeAKB.belongsTo(User)


// sequelize.sync({alter: true}) 
module.exports = {
    User,
    Examination,
    TypeAKB,
    // Directions,
    // Сity,
    // Client,
    // Delivery
    // UserRegion 
}