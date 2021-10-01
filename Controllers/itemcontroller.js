const Express = require("express");
const router = Express.Router();
const { ItemModel } = require("../Models");

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
});

router.get('/about', (req, res) => {
    res.send('This is the about route!')
});

// ===============================
//      Get All Items (to fill scrolling list)
// ===============================
router.get("/", async (req, res) => {
    try {
        const results = await ItemModel.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
// ===============================
//      Get Item by Id (to view within a collection/wishlist-item within gallery)
//      -to update a collection/wishlist
// ===============================
// router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const itemById = await ItemModel.findAll({
//             where: { id: id }
//         });
//         res.status(200).json(itemById);
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