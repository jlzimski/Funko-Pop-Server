const Express = require("express");
const router = Express.Router();
const { ItemModel } = require("../models");

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
});

router.get('/about', (req, res) => {
    res.send('This is the about route!')
});

//============================================
//      Add Item to Database (Admin only)
//============================================
router.post("/add", async (req, res) => {
    const { handle, title, image, series } = req.body.Item;
    const itemEntry = {
        handle,
        title,
        image,
        series,
    }
    try {
        const newItem = await ItemModel.create(itemEntry);
        res.send('Adding an item');
        res.status(200).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
//===========================================
//      Get All Items
//===========================================
router.get("/", async (req, res) => {
    try {
        const allItems = await ItemModel.findAll({ limit: 10000 });
        res.status(200).json(allItems);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
//============================================
//      Delete Item from Database (Admin only)
//============================================
// router.delete("/delete/:id", async (req, res) => {
//     const adminId = req.user.id;
//     const itemId = req.item.id;
//     try {
//         const query = {
//             where: {
//                 id: itemId,
//             }
//         };
//         await ItemModel.destroy(query);
//         res.status(200).json({ message: "Item removed" });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });
// ===============================
//      Get Item by Title (Search Bar)
// ===============================
// router.get("/:title", async (req, res) => {
//     const { title } = req.params;
//     try {
//         const search = await ItemModel.findAll({
//             where: { title: title }
//         });
//         res.status(200).json(search);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });
// ===============================
//      Update ???? 
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
// ====================================================
//      Get Items by Alpha (to fill browsing list)
// ====================================================
// router.get("/:alpha", async (req, res) => {
//     const { alpha } = req.params;
//     try {
//         const byAlpha = await ItemModel.findAll({
//             where: { alpha: alpha }
//         });
//         res.status(200).json(byAlpha);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });



module.exports = router;