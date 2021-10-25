const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    let { email, password, username, isAdmin } = req.body.user;
    try {
        const User = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
            username,
            isAdmin
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email or Username already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            });
        }
    }
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;
    try {
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {

            let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.status(200).json({
                user: loginUser,
                message: "User successfully logged in!",
                sessionToken: token
            });
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
        } else {
            res.status(401).json({
                message: "Login failed"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});

module.exports = router;

// const router = require("express").Router();
// const { UniqueConstraintError } = require("sequelize/lib/errors");
// const { User } = require("../models");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const validateIsAdmin = require("../middleware/validate-admin");
// const validateJWT = require("../middleware/validate-jwt");

// router.post("/register", async(req, res) => {
//     let { email, password, username } = req.body.User;
//     try {
//         let isAdmin = req.body.User.isAdmin ? req.body.User.isAdmin : false
//         const newUser = await User.create({
//             email,
//             password: bcrypt.hashSync(password, 13),
//             username,
//             isAdmin
//         });
//         let token = jwt.sign({
//             id: newUser.id,
//         }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

//         res.status(201).json({
//             message: `${email} has been successfully registered.`,
//             user: newUser,
//             sessionToken: token
//         })
//     } catch (err) {
//         if (err instanceof UniqueConstraintError) {
//             res.status(409).json({
//                 message: `${email} is already in use.`
//             });
//         } else {
//             res.status(500).json({
//                 message: `Failed to register email: {email}.`
//             });
//         }
//     }
// });

// router.post("/login", async(req, res) => {
//     console.log(req.body.User)
//     let { email, password } = req.body.User;
//     try {
//         const loginUser = await User.findOne({
//             where: {
//                 email: email,
//             },
//         });
//         if (loginUser) {
//             let passwordCompare = await bcrypt.compare(password, loginUser.password);
//             if (passwordCompare) {
//                 let token = jwt.sign({
//                     id: loginUser.id,
//                 }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
//                 res.status(200).json({
//                     user: loginUser,
//                     message: `${email} successfully logged in.`,
//                     sessionToken: token
//                 });
//             } else {
//                 res.status(401).json({
//                     message: "Invalid email or password"
//                 })
//             }
//         } else {
//             res.status(401).json({
//                 message: "Invalid email or password"
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to login user."
//         });
//     }
// });

// router.get("/:id", [validateJWT, validateIsAdmin], async(req, res) => {
//     const { id } = req.params;
//     try {
//         const findUser = await User.findOne({
//             where: {
//                 id: id
//             }
//         });
//         res.status(200).json(findUser)
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// router.delete("/:id", [validateJWT, validateIsAdmin], async(req, res) => {
//     const { id } = req.params;
//     try {
//         const query = {
//             where: {
//                 id: id
//             }
//         };
//         await User.destroy(query);
//         res.status(200).json({
//             message: `User ${id} has been deleted.`
//         })
//     } catch (err) {
//         res.status(500).json({ error: err })
//     }
// });

// module.exports = router;