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

// const router = require("express").Router();
// const { Wishlist } = require("../models");
// const { jsonWebTokenError } = require("jsonwebtoken");
// const validateJWT = require("../middleware/validate-jwt");

// router.post("/create", async (req, res) => {
//     const { name, item_id, description } = req.body.Wishlist;
//     const { id } = req.user.id;
//     const createWishlist = {
//         name,
//         owner: id,
//         item_id,
//         description
//     };
//     try {
//         const newWishlist = await Wishlist.create(createWishlist);
//         res.status(200).json(newWishlist);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// router.get("/mine", validateJWT, async (req, res) => {
//     const { id } = req.user.id;
//     try {
//         const userWishlist = await Wishlist.findAll({
//             where: {
//                 owner: id
//             }
//         });
//         res.status(200).json(userWishlist);
//     } catch (err) {
//         res.status(500).json({ error });
//     }
// });

// router.put("/update/:id", validateJWT, async (req, res) => {  // <---/:wishlistId/:itemId
//     const { name, description, itemId } = req.body.wishlist;
//     const wishlistId = req.params.wishlistId;
//     const userId = req.user.id;
//     const query = {
//         where: { id: wishlistId, owner: userId }
//     };
//     const updatedWishlist = {
//         name: name,
//         description: description,
//         itemId: itemId
//     };
//     try {
//         const update = await Wishlist.update(updatedWishlist, query);
//         res.status(200).json(update);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

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
//         await Wishlist.destroy(query);
//         res.status(200).json({ message: "Wishlist Deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// //      Delete Item from Wishlist         <---will this delete wishlist too?
// router.delete("/delete/:itemId", validateJWT, async (req, res) => {  //<---/:wishlistId/:itemId ???????
//     const wishlistId = req.wishlist.id;
//     const itemId = req.params.id;
//     try {
//         const query = {
//             where: {
//                 id: wishlistId,
//                 itemId: itemId
//             }
//         };
//         await Wishlist.destroy(query);
//         res.status(200).json({ message: "Item Deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// router.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const results = await Wishlist.findAll({
//             where: { id: id }
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// module.exports = router;