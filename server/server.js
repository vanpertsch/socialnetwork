const express = require("express");

// const app = express();
//export for testing
const app = exports.app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require('cookie-session');



const db = require("../helper/db.js");
const { hash, compare } = require("../helper/bc.js");


// const { requireLoggedIn, requireNotSigned } = require("../middleware/authorization.js");
const { authRouter } = require("./routers/auth-router.js");
const { resetRouter } = require("./routers/reset.js");
const { uploadRouter } = require("./routers/upload.js");
const { usersRouter } = require("./routers/users.js");
const { friendshipRouter } = require("./routers/friendship.js");

const { sendEmail } = require("../helper/ses.js");

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


// ---------------------------------Own Middleware-------------------------≈

app.use(authRouter);
app.use(resetRouter);
app.use(uploadRouter);
app.use(usersRouter);
app.use(friendshipRouter);
// app.use(signersRouter);

// ---------------------------------End Middleware-------------------------≈


app.get("/email", function (req, res) {
    sendEmail("serious.sword@spicedling.email", "test", "test");
});

//last possible route . sends allways back index.html
app.get("*", function (req, res) {
    console.log("start route");
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));

});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
