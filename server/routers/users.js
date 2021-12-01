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

router.get("/api/otherprofile/:id", (req, res) => {
    const id = req.params.id;
    const user_id = req.session.userId;
    console.log("id  getOtherProfile", id);
    if (id == user_id) {
        return res.json({ message: "redirect user" });
    }


    db.getOtherProfile(id)
        .then(({ rows }) => {
            console.log("user id rows getOtherProfile", rows);
            return res.json(rows[0]);
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
