const express = require("express");
const db = require("../../helper/db.js");
const router = express.Router();


router.post("/friendship", (req, res) => {
    const { otherProfile_id, buttonText } = req.body;
    const user_id = req.session.userId;
    console.log("router.post friendship", otherProfile_id, buttonText, user_id);

    if (buttonText == "send friend request") {

        db.addFriendRequest(otherProfile_id, user_id,)
            .then((result) => {
                // res.json(result);
                res.json({ message: "friendship request" });
                console.log("yay insertet");
            })
            .catch((err) => {
                console.log("err in addFriendRequest", err);
                return res.status(err.status || 500).send({
                    error: {
                        status: err.status || 500,
                        // message: err.message || "Internal Server Error",
                    },
                });
            });
    }

    if (buttonText == "unfriend") {
        db.removeFriendRequest(otherProfile_id, user_id)
            .then((result) => {
                // res.json(result);
                res.json({ message: "unfriend" });
                console.log("yay deleted");
            })
            .catch((err) => {
                console.log("err in addFriendRequest", err);
                return res.status(err.status || 500).send({
                    error: {
                        status: err.status || 500,
                        // message: err.message || "Internal Server Error",
                    },
                });
            });
    }


    if (buttonText == "Cancel friend request") {

        db.removeFriendRequest(otherProfile_id, user_id)
            .then((result) => {
                // res.json(result);
                res.json({ message: "Cancel friend request" });
                console.log("yay deletet");
            })
            .catch((err) => {
                console.log("err in addFriendRequest", err);
                return res.status(err.status || 500).send({
                    error: {
                        status: err.status || 500,
                        // message: err.message || "Internal Server Error",
                    },
                });
            });
    }

    if (buttonText == "Accept friend request") {

        db.updateFriendRequest(otherProfile_id, user_id,)
            .then((result) => {
                // res.json(result);
                res.json({ message: " Accept friend request" });
                console.log("yay updated");
            })
            .catch((err) => {
                console.log("err in addFriendRequest", err);
                return res.status(err.status || 500).send({
                    error: {
                        status: err.status || 500,
                        // message: err.message || "Internal Server Error",
                    },
                });
            });
    }



});

// if (buttonText == "Cancel friend request"  ){
//     db.removeFriendRequest().then(())
// }


// if (request has been made && not accepted from loggedIn_id) {

// if (request has been made && not accepted from otherProfile_id) {


router.get('/friendshipstat/:id', (req, res) => {

    const otherProfile_id = req.params.id;
    const user_id = req.session.userId;

    db.getFriendshipStatus(otherProfile_id, user_id).then((result) => {
        console.log("rows friendshipstat", result.rows);
        if (!result.rows.length) {
            return res.json({ message: "no request" });
        } else {
            return res.json(result.rows[0]);
        }
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


module.exports.friendshipRouter = router;
