const connection = require("../../../db/db");

const bcrypt = require("bcrypt");

const registerBuyer = async(req, res) => {
    let { username, lastname, email, passwordd } = req.body;
    let passwordHash = await bcrypt.hash(passwordd, 10);
    let data = [username, lastname, email, passwordHash];
    let query = `INSERT INTO buyer (username , lastname , email ,passwordd) VALUES (?,?,?,?)`;

    connection.query(query, data, (error, result) => {
        if (result) {
            return res.status(200).json(result);
        }
        if (error) {
            return res.status(409).json({
                success: false,
                message: `Duplicate Email Found`,
                error: error,
            });
        }
    });
};

module.exports = registerBuyer;