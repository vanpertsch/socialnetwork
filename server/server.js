const express = require("express");

// const app = express();
//export for testing
const app = exports.app = express();
const compression = require("compression");

const path = require("path");
const cookieSession = require('cookie-session');


const server = require('http').Server(app);

// const io = require('socket.io')(server, {
//     allowRequest: (req, callback) =>
//         callback(null, req.headers.referer.startsWith("http://localhost:3000"))
// });

let io;
if (process.env.NODE_ENV == 'production') {
    io = require('socket.io')(server, {
        allowRequest: (req, callback) =>
            callback(null, req.headers.referer.startsWith("https://react-socialnetwork.herokuapp.com/"))
    });
} else {
    io = require('socket.io')(server, {
        allowRequest: (req, callback) =>
            callback(null, req.headers.referer.startsWith("http://localhost:3000"))
    });
}


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

const COOKIE_SECRET = process.env.COOKIE_SECRET || require("../secrets.json").COOKIE_SECRET;

//Enables session cookies
const cookieSessionMiddleware = cookieSession({
    secret: COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    // Security protect against Cross- site request forgeries(CSRF):
    sameSite: true
});

app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

// app.listen(process.env.PORT || 3001, function () {
//     console.log("I'm listening.");
// });



server.listen(process.env.PORT || 3001); // it's server, not app, that does the listening




io.on('connection', function (socket) {

    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;

    console.log(`socket with the id ${socket.id}  and userid ${userId} is now connected`);


    db.getLastTenChatMessages()
        .then(({ rows }) => {

            const results = rows.map(row => {
                const date = new Date(row.created_at);

                const formatedDate = new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "long",
                    timeStyle: "short",
                }).format(date);

                return {
                    ...row,
                    created_at: formatedDate
                };

            });

            socket.emit('chatMessages', results);
        })
        .catch(err => {
            console.log('err getting last 10 messages: ', err);
        });

    socket.on('newChatMessage', message => {
        const userId = socket.request.session.userId;
        console.log('message: ', message);
        // add message to DB
        db.addMessage(message, userId)
            .then(({ rows }) => {
                console.log("add message message id", rows[0].id);
                // socket.emit('chatMessages', rows);
                return db.getLastMessage(rows[0].id);
            })
            .then(({ rows }) => {
                console.log("before", rows[0]);
                const date = new Date(rows[0].created_at);
                const formatedDate = new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "long",
                    timeStyle: "short",
                }).format(date);
                console.log("DATUM", formatedDate);

                io.emit('chatMessage', {
                    created_at: formatedDate,
                    first: rows[0].first,
                    img_url: rows[0].img_url,
                    last: rows[0].last,
                    message: rows[0].message,
                    message_id: rows[0].message_id,
                    userid: rows[0].userid

                });
            })
            .catch(err => {
                console.log('err adding message ', err);
            });

        // get users name and image url from DB
        // send back to client
    });

});
