const express = require("express");

const db = require("../db.js");

const router = express.Router();


const cryptoRandom = require('crypto-random-string');
const { sendEmail } = require("../server/ses.js");



router.post("/password/reset/start", (req, res) => {

    let { email } = req.body;
    console.log(req.body);
    db.checkEmail(email)
        .then(result => {
            console.log("checkEmail", result);
            if (result == undefined) {
                console.log("email not here");
                // result.error = true;
                // return res.json(result);
            } else {

                const randomString = cryptoRandom({
                    length: 8
                });
                console.log(randomString);

                db.addCode(randomString, email)
                    .then((result) => {
                        sendEmail("serious.sword@spicedling.email", "New password", `here is your code ${randomString}. Use ist to get set a new password to your existing account`);
                        result.success = true;
                        res.json(result);
                        console.log("yay insertet", req.session);
                    }).catch((err) => {
                        console.log("err in addCode", err);
                        return res.status(err.status || 500).send({
                            error: {
                                status: err.status || 500,
                                // message: err.message || "Internal Server Error",
                            },
                        });
                    });
            }
        }).catch((err) => {
            console.log("err in checkEmail", err);
            return res.status(err.status || 500).send({
                error: {
                    status: err.status || 500,
                    // message: err.message || "Internal Server Error",
                },
            });
        });



});

module.exports.resetRouter = router;


