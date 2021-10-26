const { DataTypes } = require("sequelize");
const db = require("../db");

const Collection = db.define("collection", {
    collection_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Collection;

// const sequelize = require("sequelize");
// const db = require("../db");

// const DefineCollection = (sequelize, DataTypes) => {
//     const Collection = sequelize.define("collection", {
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         owner: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         description: { // itemId????????
//             type: DataTypes.TEXT,
//             allowNull: true,
//         },
//     })
//     return Collection
// };

// module.exports = DefineCollection;