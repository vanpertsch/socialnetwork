const express = require("express");
const db = require("../../helper/db.js");
const router = express.Router();




router.get("/users/:searchterm", (req, res) => {
    const user_id = req.session.userId;
    const term = req.params.searchterm;
    console.log("users", user_id, term, req.params);
    db.getUsers(user_id, term)
        .then(({ rows }) => {
            console.log("user id rows", rows);
            return res.json(rows);
        }).catch((err) => {
            console.log(err);
            return res.status(err.status || 500).send({
                error: {
                    status: err.status || 500,
                    // message: err.message || "Internal Server Error",
                },
            });
        });
});

router.get("/newusers/id.json", (req, res) => {
    const user_id = req.session.userId;
    console.log("users", user_id);
    db.getNewestUsers(user_id)
        .then(({ rows }) => {
            console.log("user id rows", rows);
            return res.json(rows);
        }).catch((err) => {
            console.log(err);
            return res.status(err.status || 500).send({
                error: {
                    status: err.status || 500,
                    // message: err.message || "Internal Server Error",
                },
            });
        });
});

module.exports.usersRouter = router;
