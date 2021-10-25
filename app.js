require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.use(require('./middleware/headers'));

const controllers = require("./controllers");

app.use(Express.json());

app.use("/item", controllers.itemController);
app.use("/user", controllers.userController);
app.use("/collection", controllers.collectionController);
// app.use(require("./Middleware/validate-jwt"));



dbConnection.authenticate()
    .then(() => dbConnection.sync( ))
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000. `);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });

//{ alter: true } line 20 after sync




// require("dotenv").config();
// const Express = require("express");
// const app = Express();
// const { sequelize } = require("./db");

// app.use(require('./middleware/headers'));

// const controllers = require("./controllers");

// app.use(Express.json());

// app.use("/item", controllers.itemController);
// app.use("/user", controllers.userController);
// app.use("/collection", controllers.collectionController);
// app.use("/wishlist", controllers.wishlistController);

// // app.listen(process.env.PORT, () => {
// //     console.log(`[Server]: App is listening on 3000.`);
// // });


// dbConnection.authenticate()
//     .then(() => dbConnection.sync( ))
//     .then(() => {
//         app.listen(3000, () => {
//             console.log(`[Server]: App is listening on 3000. `);
//         });
//     })
//     .catch((err) => {
//         console.log(`[Server]: Server crashed. Error = ${err}`);
//     });

// //{ alter: true } line 20 after sync