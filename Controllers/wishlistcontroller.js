const Express = require("express");
const router = Express.Router();
const validateJWT = require("../Middleware/validate-jwt");
const { WishlistModel } = require("../Models");

// ==============================
//     Wishlist Create
// ==============================
router.post("/create", validateJWT, async (req, res) => {
    const { name, description } = req.body.wishlist;
    const { id } = req.user;
    const { id } = req.item;
    const wishlist = {
        name,
        user: id,
        item: id,
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
            where: {
                owner: id
            }
        });
        res.status(200).json(userWishlists);
    } catch (err) {
        res.status(500).json({ error });
    }
});

router.get('/about', (req, res) => {
    res.send('This is the about route!')
});

module.exports = router;