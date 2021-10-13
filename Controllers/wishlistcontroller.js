const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { WishlistModel } = require("../models");

// ==============================
//     Wishlist Create
// ==============================
router.post("/create", validateJWT, async (req, res) => {
    const { name, description } = req.body.wishlist;
    const { id } = req.user;
    const { item_id } = req.item;
    const wishlist = {
        name,
        owner: id,
        item_id: id,
        description
    }
    try {
        const newWishlist = await WishlistModel.create(wishlist);
        res.status(200).json(newWishlist);
    } catch (err) {
        res.status(500).json({ error });
    }
});
// ===============================
//      Get Wishlists by User
// ===============================
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userWishlists = await WishlistModel.findAll({
            where: { owner: id }
        });
        res.status(200).json(userWishlists);
    } catch (err) {
        res.status(500).json({ error });
    }
});
// ===============================
//      Get Wishlist by Name
// ===============================
router.get("/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const results = await WishlistModel.findAll({
            where: { name: name }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
// ===============================
//      Update a Wishlist
// ===============================
// router.put("/update/:wishlistId", validateJWT, async (req, res) => {
//     const { name, description } = req.body.wishlist;
//     const wishlistId = req.params.wishlistId;
//     const owner = req.user.id;

//     const query = {
//         where: { id: wishlistId, owner: userId }
//     };

//     const updatedWishlist = {
//         name: name,
//         description: description,
//         item: item
//     };

//     try {
//         const update = await WishlistModel.update(updatedWishlist, query);
//         res.status(200).json(update);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });
// ===============================
//      Delete a Wishlist
// ===============================
// router.delete("/delete/:id", validateJWT, async (req, res) => {
//     const ownerId = req.user.id;
//     const wishlistId = req.params.id;

//     try {
//         const query = {
//             where: {
//                 id: wishlistId,
//                 owner: ownerId
//             }
//         };

//         await WishlistModel.destroy(query);
//         res.status(200).json({ message: "Wishlist Deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });



// router.get('/about', (req, res) => {
//     res.send('This is the about route!')
// });

module.exports = router;