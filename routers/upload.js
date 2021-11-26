const express = require("express");
// const { requireSigned, requireLoggedIn } = require("../middleware/authorization.js");

const db = require("../db.js");

const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');

const s3 = require('../s3');

const router = express.Router();


// -------------------------------------------multerHelperFunctions-------------------------

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join('server/uploads'));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});


router.post('/upload', uploader.single("file"), s3.upload, (req, res) => {
    console.log("*****************");
    console.log("POST /upload Route");
    console.log("*****************");

    if (req.file) {

        const email = req.body.email;

        const aws = "https://s3.amazonaws.com/";
        const bucket = "spicedling/";
        const filename = req.file.filename;
        const url = `${aws}${bucket}${filename}`;
        console.log("email", email);

        db.addImage(url, email)
            .then(({ rows }) => {
                console.log(res);
                return res.json(rows[0]);
            })
            .catch(err => console.log("error in addImage", err));
    } else {
        res.json({
            error: true
        });
    }
});

module.exports.uploadRouter = router;


