const Express = require("express");
const router = Express.Router();
const { ItemModel } = require("../Models");

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
    const { handle, title, image, series, alpha } = req.body.Item;
    const itemEntry = {
        handle,
        title,
        image,
        series,
        alpha
    }
    try {
        const newItem = await ItemModel.create(itemEntry);
        res.send('Adding an item');
        res.status(200).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
// ====================================================
//      Get Items by Alpha (to fill browsing list)
// ====================================================
router.get("/:alpha", async (req, res) => {
    const { alpha } = req.params;
    try {
        const byAlpha = await ItemModel.findAll({
            where: { alpha: alpha }
        });
        res.status(200).json(byAlpha);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
// ===============================
//      Get Item by Id (to view within a collection/wishlist-item within gallery)
//      -to update a collection/wishlist
// ===============================
// router.get("/:#", async (req, res) => {
//     try {
//         const otherItems = await ItemModel.findAll({
//             where: { alpha: "#" }
//         });
//         res.status(200).json(otherItems);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });
// ===============================
//      Get Item by Title (Search Bar)
// ===============================
// router.get("/:title", async (req, res) => {
//     const { name } = req.params;
//     try {
//         const results = await ItemModel.findAll({
//             where: { id: id }
//         });
//         res.status(200).json(results);
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
// ===============================
//      Delete a Item from a Collection/Wishlist
// ===============================
// router.delete("/delete/:id", validateJWT, async (req, res) => {
//     const itemId = req.params.id;
//     const collectionId = req.collection.id;
//     const wishlistId = req.wishlist.id;

//     try {
//         const query = { // if else?????
//             where: {
//                 id: itemId,
//                 collection: collectionId,
//                 wishlistId: wishlistId
//             }
//         };

//         await ItemModel.destroy(query);
//         res.status(200).json({ message: "Item Deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });



module.exports = router;