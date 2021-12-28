const connection = require("../../db/db")

const searchForSellerByTitle = (req, res) => {
    const searchTitle = req.query.name
    const query = `SELECT * FROM sellers WHERE doctorname LIKE "%${searchTitle}%"`;

    connection.query(query, (error, result) => {
        if (result) {
            return res.status(200).json({
                success: true,
                search: result
            });

        }
        if (error) {
            return res.status(400).json({
                success: false,
                message: "sellers title doesn't exist"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: `Server Error`,
                error: error
            });
        }
    });
};

module.exports = { searchForSellerByTitle }