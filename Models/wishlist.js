const { DataTypes } = require("sequelize");
const db = require("../db");

const Wishlist = db.define("wishlist", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Wishlist;