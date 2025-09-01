const bcrypt = require('bcrypt');
const pool = require('./db');
async function addNewuser(email,password){
//check if email exists
    const existingUser = await pool.query(
        `SELECT  * FROM "users" where email=$1`,
        [email]
    )

    if(existingUser.rows.length>0){
        
throw new Error("Email exists")
    }
// insert new user

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
        `INSERT INTO "users"
        (email,password)
        values ($1,$2)
        RETURNING * `,
        [email, hashedPassword]
    );

    return result.rows[0]

}

module.exports = {
    addNewuser
}