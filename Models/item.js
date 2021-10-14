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
        type: DataTypes.TEXT,
        allowNull: false
    },
    series: {
        type: DataTypes.STRING
    }
});

module.exports = Item;