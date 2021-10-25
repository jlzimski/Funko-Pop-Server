const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    // isAdmin: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false
    // }
});

module.exports = User;


// const sequelize = require("sequelize");

// const DefineUser = (sequelize, DataTypes) => {
//     const User = sequelize.define("user", {
//         email: {
//             type: DataTypes.STRING(100),
//             allowNull: false,
//             unique: true,
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         isAdmin: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false
//         }
//     })
//     return User
// };

// module.exports = DefineUser;