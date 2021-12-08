const express = require("express");
const db = require("../../helper/db.js");
const router = express.Router();

const { BUTTON } = require("../../helper/constants.js");




router.post("/friendship", (req, res) => {
    const { otherProfile_id, buttonText } = req.body;
    const user_id = req.session.userId;
    console.log("router.post friendship", otherProfile_id, buttonText, user_id);

    if (buttonText == `${BUTTON.SEND}`) {

        db.addFriendRequest(otherProfile_id, user_id,)
            .then((result) => {
                return res.json(result.rows[0]);
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

    if (buttonText == `${BUTTON.ACCEPT}`) {

        db.updateFriendRequest(otherProfile_id, user_id,)
            .then((result) => {
                return res.json(result.rows[0]);
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


    if (buttonText == `${BUTTON.UNFRIEND}`) {
        db.removeFriendRequest(otherProfile_id, user_id)
            .then(() => {
                return res.json({ message: "no request" });
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


    if (buttonText == `${BUTTON.CANCEL}`) {

        db.removeFriendRequest(otherProfile_id, user_id)
            .then(() => {
                return res.json({ message: "no request" });
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
    if (buttonText == `${BUTTON.REJECT}`) {

        db.removeFriendRequest(otherProfile_id, user_id)
            .then(() => {
                return res.json({ message: "no request" });
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
router.get('/friends/friends-and-wannabes', (req, res) => {

    const otherProfile_id = req.params.id;
    const user_id = req.session.userId;

    db.getFriendsAndWannabes(user_id).then((result) => {
        console.log("rows friends-and-wannabes", result.rows);

        return res.json(result.rows);

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
