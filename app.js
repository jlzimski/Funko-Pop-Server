const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require("./Controllers");

app.use(Express.json());

app.use("/collection", controllers.collectionController);
app.use("/user", controllers.userController);

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

