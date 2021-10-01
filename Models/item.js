const { DataTypes } = require("sequelize");
const db = require("../db");

const Item = db.define("item", {
    handle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    series: {
        type: DataTypes.STRING,
        allowNull: true
    },
    alpha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Item;