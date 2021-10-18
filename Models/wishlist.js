// const { DataTypes } = require("sequelize");
// const db = require("../db");

// const Wishlist = db.define("wishlist", {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     owner: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     item_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
// });

// module.exports = Wishlist;

const sequelize = require("sequelize");
const db = require("../db");

const DefineWishlist = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define("wishlist", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    })
    return Wishlist
};

module.exports = DefineWishlist;