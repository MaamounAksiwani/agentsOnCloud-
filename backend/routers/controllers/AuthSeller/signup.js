const connection = require("../../../db/db");

const bcrypt = require("bcrypt");

const registerSeller = async(req, res) => {
    let { doctorname, email, passwordd, phoneNumber, title, decs, fees, locationn } = req.body;
    let passwordHash = await bcrypt.hash(passwordd, 10);
    let data = [doctorname, email, passwordHash, phoneNumber, title, decs, fees, locationn];
    let register = `INSERT INTO sellers (doctorname, email, passwordd, phoneNumber, title, decs ,fees ,locationn) VALUES (?,?,?,?,?,?,?,?)`;

    connection.query(register, data, (error, result) => {
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

module.exports = registerSeller;