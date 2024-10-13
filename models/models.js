const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Examination = sequelize.define('examination', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    data: {type: DataTypes.STRING, allowNull: false},
    client: {type: DataTypes.STRING, allowNull: false},
    manager: {type: DataTypes.STRING, allowNull: false},
    product: {type: DataTypes.STRING, allowNull: false},
    releaseDate: {type: DataTypes.INTEGER, allowNull: false},
    result: {type: DataTypes.STRING, allowNull: true}
})

const TypeAKB = sequelize.define('typeakb', {
    name: {type: DataTypes.STRING, allowNull: false},

})

User.hasMany(Examination)
Examination.belongsTo(User)

User.hasMany(TypeAKB)
TypeAKB.belongsTo(User)

module.exports = {
    User,
    Examination,
    TypeAKB
}