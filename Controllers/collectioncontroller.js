const router = require("express").Router();

// const validateJWT = require("../middleware/validate-jwt");
const { CollectionModel } = require("../models");

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
});

// ==============================
//     Collection Create
// ==============================
router.post("/newCollection", async (req, res) => {
    console.log("Ready to Create!")
    const { name, item_id, description } = req.body.Collection;
    const { id } = req.user;
    const createCollection = {
        name,
        owner: id,
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

// const router = require("express").Router();
// const { Collection } = require("../models");
// const { jsonWebTokenError } = require("jsonwebtoken");
// const validateJWT = require("../middleware/validate-jwt");

// router.post("/create", async (req, res) => {
//     const { name, item_id, description } = req.body.Collection;
//     const { id } = req.user.id;
//     const createCollection = {
//         name,
//         owner: id,
//         item_id,
//         description
//     };
//     try {
//         const newCollection = await CollectionModel.create(createCollection);
//         res.status(200).json(newCollection);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// router.get("/mine", validateJWT, async (req, res) => {
//     const { id } = req.user.id;
//     try {
//         const userCollections = await Collection.findAll({
//             where: {
//                 owner: id
//             }
//         });
//         res.status(200).json(userCollections);
//     } catch (err) {
//         res.status(500).json({ error });
//     }
// });

// router.put("/update/:id", validateJWT, async (req, res) => {  // <---/:collectionId/:itemId
//     const { name, description, itemId } = req.body.collection;
//     const collectionId = req.params.collectionId;
//     const userId = req.user.id;
//     const query = {
//         where: { id: collectionId, owner: userId }
//     };
//     const updatedCollection = {
//         name: name,
//         description: description,
//         itemId: itemId
//     };
//     try {
//         const update = await Collection.update(updatedCollection, query);
//         res.status(200).json(update);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

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
//         await Collection.destroy(query);
//         res.status(200).json({ message: "Collection Deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// //      Delete Item from Collection         <---will this delete collection too?
// router.delete("/delete/:itemId", validateJWT, async (req, res) => {  //<---/:collectionId/:itemId ???????
//     const collectionId = req.collection.id;
//     const itemId = req.params.id;
//     try {
//         const query = {
//             where: {
//                 id: collectionId,
//                 itemId: itemId
//             }
//         };
//         await Collection.destroy(query);
//         res.status(200).json({ message: "Item Deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const results = await Collection.findAll({
//             where: { id: id }
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// module.exports = router;