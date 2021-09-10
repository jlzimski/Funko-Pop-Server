const { DataTypes } = require("sequelize");
const db = require("../db");

const Collection = db.define("collection", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    item: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Collection;