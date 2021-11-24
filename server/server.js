const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

const db = require("../db.js");

const { hash, compare } = require("../bc.js");

const cookieSession = require('cookie-session');



// ---------------------------------Start Middleware-------------------------


app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

//The express.json() function is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());


//Makes the body elements from the post request readble
app.use(express.urlencoded({
    extended: false
}));

const COOKIE_SECRET = process.env.COOKIE_SECRET || require("../.secrets.json").COOKIE_SECRET;

//Enables session cookies
app.use(cookieSession({
    secret: COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    // Security protect against Cross- site request forgeries(CSRF):
    sameSite: true
}));

//Security protects against clickjacking/ website being loaded as an iframe
app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});


//Get information about the routes while developing
app.use((req, res, next) => {
    console.log(`${req.method}|${req.url}`);
    next();
});
// ---------------------------------End Middleware-------------------------





app.get('/user/id.json', function (req, res) {
    res.json({
        userId: req.session.userId
    });
});

app.post("/registration.json", (req, res) => {
    const { first, last, email, password } = req.body;
    console.log(first, last, email, password);

    hash(password)
        .then(hashedPW => {
            console.log("hashedPW", hashedPW)
            return db.addUser(first, last, email, hashedPW);
        })
        .then((result) => {
            req.session.userId = result.rows[0].id;
            result.success = true;
            res.json(result);
            console.log("yay insertet", req.session);
        }).catch((err) => {
            console.log("err in addUser", err);
            res.render("profile", {
                error: "Please try again"
            });
        });
});




//last possible route . sends allways back index.html
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
