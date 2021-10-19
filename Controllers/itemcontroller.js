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
router.delete("/:id", async (req, res) => {
    const itemId = req.item.id;
    try {
        const query = {
            where: {
                id: itemId
            }
        };
        await ItemModel.destroy(query);
        res.status(200).json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
// ===============================
//      Get Item by Title (Search Bar)
// ===============================
router.get("/:title", async (req, res) => {
    const { title } = req.params;
    try {
        const search = await ItemModel.findAll({
            where: { title: title }
        });
        res.status(200).json(search);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
// ===============================
//      Update ???? 
// ===============================
router.put("/:id", async (req, res) => {
    const { handle, title, image, series } = req.body.item;
    const itemId = req.params.id;
    const query = {
        where: {
            id: id
        }
    };
    const updatedItem = {
        handle: handle,
        title: title,
        image: image,
        series: series
    };
    try {
        const update = await ItemModel.update(updatedItem, query);
        res.status(200).json({
            message: `Item ${itemId} updated.`
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;

const router = require("express").Router();
const { Item } = require("../models");
const { JsonWebTokenError } = require("jsonwebtoken");
const validateIsAdmin = require("../middleware/validate-admin");
const validateJWT = require("../middleware/validate-jwt");

router.post("/", [validateJWT, validateIsAdmin], async(req, res) => {
    const { handle, title, image, series } = req.body.Item;
    const { id } = req.user.id;
    const itemEntry = {
        handle,
        title,
        image,
        series
    }
    try {
        const newItem = await Item.create(itemEntry);
        res.status(200).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

router.get("/", async(req, res) => {
    try {
        const allItems = await Item.findAll({ limit: 10000 });
        res.status(200).json(allItems);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.delete("/:id", async (req, res) => {
    const itemId = req.item.id;
    try {
        const query = {
            where: {
                id: itemId
            }
        };
        await Item.destroy(query);
        res.status(200).json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:title", async (req, res) => {
    const { title } = req.params;
    try {
        const search = await Item.findAll({
            where: { title: title }
        });
        res.status(200).json(search);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put("/:id", async (req, res) => {
    const { handle, title, image, series } = req.body.item;
    const itemId = req.params.id;
    const query = {
        where: {
            id: id
        }
    };
    const updatedItem = {
        handle: handle,
        title: title,
        image: image,
        series: series
    };
    try {
        const update = await Item.update(updatedItem, query);
        res.status(200).json({
            message: `Item ${itemId} updated.`
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
