const Express = require("express");
const router = Express.Router();
const validateJWT = require("../Middleware/validate-jwt");
const { CollectionModel } = require("../Models");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});

// ==============================
//     Collection Create
// ==============================
router.post("/create", validateJWT, async (req, res) => {
    const { name, description } = req.body.collection;
    const { id } = req.user;
    const { id } = req.item;
    const collection = {
        name,
        user: id,
        item: id,
        description
    }
    try {
        const newCollection = await CollectionModel.create(collection);
        res.status(200).json(newCollection);
    } catch (err) {
        res.status(500).json({ error });
    }
});
// ===============================
//      Get Collections by User
// ===============================
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userCollections = await CollectionModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userCollections);
    } catch (err) {
        res.status(500).json({ error });
    }
});


router.get('/about', (req, res) => {
    res.send('This is the about route!')
});

module.exports = router;