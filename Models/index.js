const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const DefineUser = require("./user");
const DefineCollection = require("./collection");
const DefineWishlist = require("./wishlist");
const DefineItem = require("./item");

const User = DefineUser(sequelize, DataTypes)
const Collection = DefineCollection(sequelize, DataTypes)
const Wishlist = DefineWishlist(sequelize, DataTypes)
const Item = DefineItem(sequelize, DataTypes)

User.hasMany(Collection, {
    foreignKey: 'userId',
    allowNull: false,
    onDelete: "CASCADE"
})

Collection.belongsTo(User)
Wishlist.belongsTo(User)

Collection.hasMany(Item, {
    foreignKey: 'collectionId'
})
Wishlist.hasMany(Item, {
    foreignKey: 'wishlistId'
})

// Item.belongsToMany(User, { through: }) //Collection? Wishlist? Id?
// User.belongsToMany(Item, { through: }) //Collection? Wishlist? Id?

sequelize.sync({ alter: true })
module.exports = {
    User,
    Collection,
    Item,
    Wishlist
};