// require connection
const connection = require('../../db/db');


/// this function get all doctors
const getAllSellers = (req, res) => {
        const sellers = "SELECT * FROM sellers";
        connection.query(sellers, (err, result) => {
            if (err) {
                const error = {
                    success: false,
                    message: "Something Error Try Again",
                    err: err
                }
                res.status(500).json(error);
            }
            if (result) {
                const success = {
                    success: true,
                    message: "All sellers",
                    result: result
                }
                res.status(200).json(success);
            }
        })
    }
    /// you can create new doctor using this function
const createNewSellers = (req, res) => {
    const { doctorname, email, phoneNumber, title, decs, fees, locationn, passwordd } = req.body;
    const addNewSellers = `INSERT INTO sellers (doctorname , email ,phoneNumber ,title ,decs , fees , locationn ,passwordd) VALUES (?,?,?,?,?,?,?,?)`;
    const data = [doctorname, email, phoneNumber, title, decs, fees, locationn, passwordd];
    connection.query(addNewSellers, data, (err, respones) => {
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
                message: "successfully add new sellers",
                result: respones
            }
            res.status(200).json(successfully)
        }
    })

}

/// get all information the doctors 
const getInfoForSellers = (req, res) => {
    let id = req.params.id;
    const query = `SELECT * FROM sellers WHERE sellerid = ${id}`;
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                error: error,
            });
        }
        if (result.length) {
            res.status(200).json({
                success: true,
                message: `All information is private for Dr using id: ${id}`,
                result: result,
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Your id ${id} is not Found`,
            });
        }
    });
};



module.exports = { getAllSellers, createNewSellers, getInfoForSellers }