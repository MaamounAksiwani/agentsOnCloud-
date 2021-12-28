const connection = require("../../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginSeller = async(req, res) => {
    const { email, passwordd } = req.body;
    const query = `SELECT * FROM sellers WHERE email = ?`;
    const data = [email, passwordd];
    connection.query(query, data, async(error, result) => {
        if (result.length) {
            const valid = await bcrypt.compare(passwordd, result[0].passwordd);
            if (valid) {
                const payload = {
                    email: result[0].email,
                    doctorname: result[0].doctorname,
                    sellerid: result[0].sellerid,
                };

                const options = {
                    expiresIn: "10day",
                };
                const token = await jwt.sign(payload, process.env.SECRET, options);

                res.status(200).json({
                    success: true,
                    message: `Email and Password are correct`,
                    token: token,
                    payload: payload,
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: `Password is not correct`,
                });
            }
            if (error) {
                res.status(500).json({
                    success: false,
                    message: `Server Error`,
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: `The email doesn't exist`,
            });
        }
    });
};

module.exports = loginSeller;