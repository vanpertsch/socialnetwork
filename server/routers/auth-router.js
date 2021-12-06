const express = require("express");
const { requireNotLoggedIn, requireLoggedIn } = require("../middleware/authorization.js");

const { hash, compare } = require("../../helper/bc.js");
const db = require("../../helper/db.js");

const router = express.Router();


router.get('/user/id.json', function (req, res) {
    res.json({
        userId: req.session.userId
    });
});

router.post("/registration.json", requireNotLoggedIn, (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password)
        .then(hashedPW => {
            return db.addUser(first, last, email, hashedPW);
        })
        .then((result) => {
            req.session.userId = result.rows[0].id;
            result.success = true;
            res.json(result);
            console.log("yay insertet");
        }).catch((err) => {
            console.log("err in addUser", err);
            return res.status(err.status || 500).send({
                error: {
                    status: err.status || 500,
                    // message: err.message || "Internal Server Error",
                },
            });
        });
});




router.post("/login.json", requireNotLoggedIn, (req, res) => {
    const { email, password } = req.body;
    db.checkEmail(email).then(result => {
        if (result == undefined) {
            result.error = true;
            return res.json(result);
        } else {
            return db.getPassword(email)
                .then(({ rows }) => {
                    return compare(password, rows[0].password);
                }).then(result => {
                    //if user is already registered:
                    if (result) {
                        return db.getUserId(email).then((result) => {
                            //Set Session Cookie
                            req.session.userId = result.rows[0].id;
                            result.success = true;
                            res.json(result);

                        });
                        // if user enters wrong password / is not registered
                    } else {
                        result.error = true;
                        return res.json(result);
                    }
                });
        }
    }).catch((err) => {
        console.log("err in login", err);
        return res.status(err.status || 500).send({
            error: {
                status: err.status || 500,
                // message: err.message || "Internal Server Error",
            },
        });
    });
});



router.get("/user/profile/:id", (req, res) => {
    const user_id = req.params.id;

    db.getUserProfile(user_id)
        .then(({ rows }) => {
            return res.json(rows[0]);
        }).catch((err) => {
            return res.status(err.status || 500).send({
                error: {
                    status: err.status || 500,
                    // message: err.message || "Internal Server Error",
                },
            });
        });
});
// logout route to delete your cookies
router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

module.exports.authRouter = router;


