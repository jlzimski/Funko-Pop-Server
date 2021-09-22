const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:endor1979@localhost:5432/funko-pop");

module.exports = sequelize;

// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "123456",
//     DB: "testdb",
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };