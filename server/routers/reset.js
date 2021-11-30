const express = require("express");
const { hash, compare } = require("../../helper/bc.js");
const db = require("../../helper/db.js");

const router = express.Router();


const cryptoRandom = require('crypto-random-string');
const { sendEmail } = require("../../helper/ses.js");



router.post("/password/reset/start", (req, res) => {
    let { email } = req.body;
    db.checkEmail(email)
        .then(result => {
            if (result == undefined) {
                result.error = true;
                return res.json(result);
            } else {
                const randomString = cryptoRandom({ length: 8 });

                db.addCode(randomString, email)
                    .then((result) => {
                        sendEmail("serious.sword@spicedling.email", "New password", `here is your code ${randomString}. Use ist to get set a new password to your existing account`);
                        result.success = true;
                        res.json(result);
                        console.log("yay insertet");
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

router.post("/password/reset/confirm", (req, res) => {
    let { code, password, email } = req.body;
    console.log("/password/reset/confirm", code, password, email);
    db.validateCode(code, email)
        .then(result => {
            console.log("validateCode", result);
            if (result == undefined) {
                console.log("validateCode no success");
                result.error = true;
                return res.json(result);
            } else {
                hash(password)
                    .then(hashedPW => {
                        console.log("hashedPW", hashedPW);
                        return db.updatePassword(email, hashedPW);
                    })
                    .then((result) => {
                        result.success = true;
                        res.json(result);
                        console.log("yay insertet", req.session);
                    }).catch((err) => {
                        console.log("err in updatePassword", err);
                        return res.status(err.status || 500).send({
                            error: {
                                status: err.status || 500,
                                // message: err.message || "Internal Server Error",
                            },
                        });
                    });
            }
        }).catch((err) => {
            console.log("err in validateCode", err);
            return res.status(err.status || 500).send({
                error: {
                    status: err.status || 500,
                    // message: err.message || "Internal Server Error",
                },
            });
        });
});

module.exports.resetRouter = router;


