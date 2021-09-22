const Express = require("express");
const router = Express.Router();
// const validateJWT = require("../Middleware/validate-jwt");
const { CollectionModel } = require("../Models");

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
});

// ==============================
//     Collection Create
// ==============================
router.post("/create", async (req, res) => {
    const { name, item_id, description } = req.body.Collection;
    const { id } = req.user;
    const createCollection = {
        name,
        user_id: id,
        item_id,
        description
    };
    try {
        const newCollection = await CollectionModel.create(createCollection);
        res.status(200).json(newCollection);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
// ===============================
//      Get Collections by User
// ===============================
// router.get("/mine", validateJWT, async (req, res) => {
//     const { id } = req.user;
//     try {
//         const userCollections = await CollectionModel.findAll({
//             where: {
//                 owner: id
//             }
//         });
//         res.status(200).json(userCollections);
//     } catch (err) {
//         res.status(500).json({ error });
//     }
// });
// ===============================
//      Get Collection by Name
// ===============================
// router.get("/:name", async (req, res) => {
//     const { name } = req.params;
//     try {
//         const results = await CollectionModel.findAll({
//             where: { name: name }
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });
// ===============================
//      Update a Collection
// ===============================
// router.put("/update/:id", validateJWT, async (req, res) => {
//     const { name, description } = req.body.collection;
//     const collectionId = req.params.collectionId;
//     const userId = req.user.id;

//     const query = {
//         where: { id: collectionId, owner: userId }
//     };

//     const updatedCollection = {
//         name: name,
//         description: description,
//         item: item
//     };

//     try {
//         const update = await CollectionModel.update(updatedCollection, query);
//         res.status(200).json(update);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });
// ===============================
//      Delete a Collection
// ===============================
// router.delete("/delete/:id", validateJWT, async (req, res) => {
//     const ownerId = req.user.id;
//     const collectionId = req.params.id;

//     try {
//         const query = {
//             where: {
//                 id: collectionId,
//                 owner: ownerId
//             }
//         };

//         await CollectionModel.destroy(query);
//         res.status(200).json({ message: "Collection Deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });


// router.get('/about', (req, res) => {
//     res.send('This is the about route!')
// });

module.exports = router;