// require connection
const connection = require('../../db/db');


/// this function will return all users 
const getAllUsers = (req, res) => {
    // this query to return the users
    const query = `SELECT * FROM buyer`;
    connection.query(query, (respones, err) => {
        /// if there's any error this code you will return that message
        if (err) {
            const error = {
                success: false,
                message: "Something Error Try Again",
                err: err
            }
            res.status(500).json(err);
        }
        /// if there's no any error this code you will return that message
        if (respones) {
            const successfully = {
                success: true,
                message: "all buyers",
                result: respones
            }
            res.status(200).json(successfully);
        }
    });
}

// this function will create new user
const createUser = (req, res) => {
    const { username, lastName, email, passwordd } = req.body;
    const addNewUser = `INSERT INTO buyer (username , lastName , email ,passwordd) VALUES (?,?,?,?)`;
    const data = [username, lastName, email, passwordd];
    connection.query(addNewUser, data, (err, respones) => {
        if (err) {
            const Fail = {
                success: false,
                message: "Something Error",
                error: err
            }
            res.status(500).json(Fail)
        }
        if (respones) {
            const successfully = {
                success: true,
                message: "successfully add new user",
                result: respones
            }
            res.status(200).json(successfully)
        }
    })
}

module.exports = { getAllUsers, createUser }