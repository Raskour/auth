const bcrypt = require('bcrypt');
const pool = require('./db');
async function addNewuser(email,password,name){

//check if email exists
    const existingUser = await pool.query(
        `SELECT  * FROM "users" where email=$1`,
        [email]
    )

    if(existingUser.rows.length>0){
        
throw new Error("Email exists")
    }
// hash password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

//insert new user
    const result = await pool.query(
        `INSERT INTO "users"
        (email,password,name)
        values ($1,$2,$3)
        RETURNING * `,
        [email, hashedPassword,name]
    );

    return result.rows[0]

}

async function checkAuthentication(email,password){
//Look up user by email
const result = await pool.query(
    `SELECT * FROM "users" where email = $1`,
    [email]
);

if(result.rows.length === 0){
    return false;
};

const user = result.rows[0];

//Compare password

const isMatch = await bcrypt.compare(password,user.password);
//user.password is the hashed password stored in teh DB.

if(!isMatch){
    return false;
}
// return true; if not applying jwt

return user; // needed so we can sign user.id or user.email into the token
}

module.exports = {
    addNewuser,
    checkAuthentication
}