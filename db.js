const spicedPg = require("spiced-pg");

const dbUsername = "postgres";
const dbUserPassword = "postgres";
const database = "socialnetwork";

const db = spicedPg(process.env.DATABASE_URL || `postgres:${dbUsername}:${dbUserPassword}@localhost:5432/${database}`);

console.log("[db] Connecting to ", database);


// ----------------------ADD------------------------------------------------
module.exports.addUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first,last,email,password) VALUES($1,$2,$3,$4) RETURNING id`;
    const params = [first, last, email, password];
    return db.query(q, params);
};
module.exports.addCode = (code, email) => {
    const q = `INSERT INTO password_reset_codes (code, email) VALUES($1,$2)`;
    const params = [code, email];
    return db.query(q, params);
};

module.exports.addImage = (url, email) => {
    const q = `UPDATE users SET img_url = $1 WHERE users.email = $2 RETURNING users.img_url, users.first, users.last`;
    const params = [url, email];
    return db.query(q, params);
};

// ---------------------UPDATE------------------------------------------------
module.exports.updatePassword = (email, password) => {
    const q = `UPDATE users SET password=$2  WHERE users.email = $1`;
    const params = [email, password];
    return db.query(q, params);
};

// ---------------------Check------------------------------------------------
module.exports.checkEmail = (email) => {
    const q = `SELECT * FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.validateCode = (code, email) => {
    const q = `SELECT * FROM password_reset_codes WHERE (password_reset_codes.code = $1) AND (password_reset_codes.email = $2) AND (CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes')`;
    const params = [code, email];
    return db.query(q, params);
};


// ---------------------GET--------------------------------------------------

module.exports.getUserProfile = (id) => {
    const q = `SELECT first,last,email,img_url FROM users WHERE users.id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getPassword = (email) => {
    const q = `SELECT password  FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserId = (email) => {
    const q = `SELECT id  FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};


