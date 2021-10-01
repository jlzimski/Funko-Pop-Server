require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.use(require('./Middleware/headers'));

const controllers = require("./Controllers");

app.use(Express.json());

app.use("/item", controllers.itemController);
app.use("/user", controllers.userController);
app.use("/collection", controllers.collectionController);
// app.use(require("./Middleware/validate-jwt"));



dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000. `);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });

