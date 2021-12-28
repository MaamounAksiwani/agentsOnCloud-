// require connection
const connection = require('../../db/db');

/// get all appointments
const getAllAppointments = (req, res) => {
    const allappointments = "SELECT * from appointments";
    connection.query(allappointments, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Server Error"
            })
        }
        if (result) {
            return res.status(200).json({
                success: true,
                message: "All appointments",
                result: result
            })
        }
    })
}

/// create new appointments
const createAppointments = (req, res) => {
    const { statess, buyerid, sellerrid } = req.body;
    const query = `INSERT INTO appointments (statess ,buyerid ,sellerrid) VALUES (?,?,?)`;
    const data = [statess, buyerid, sellerrid];
    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Server Error",
                error: err
            })
        }
        if (result) {
            return res.status(200).json({
                success: true,
                message: "successfully add new appointments",
                result: result
            })
        }
    })
}

/// get all appointments by userid
const getAllAppointmentsByUserId = (req, res) => {
    let id = req.params.id;
    const query = `  SELECT * 
    FROM ((appointments 
    JOIN sellers ON sellers.sellerid = appointments.sellerrid)
    JOIN buyer ON buyer.userid = appointments.buyerid) where buyer.userid= ${id}`;
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Server Error"
            })
        }
        if (result.length) {
            return res.status(200).json({
                success: true,
                message: `All appointments for id ${id}`,
                result: result
            })
        } else {
            return res.status(404).json({
                success: false,
                message: `There's no appointments for this id ${id}`
            })
        }
    })
}

const getAllAppointmentsByseller = (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT * 
    FROM ((appointments 
    JOIN sellers ON sellers.sellerid = appointments.sellerrid)
    JOIN buyer ON buyer.userid = appointments.buyerid) where sellers.sellerid = ${id}`;
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Server Error"
            })
        }
        if (result.length) {
            return res.status(200).json({
                success: true,
                message: `All appointments for id ${id}`,
                result: result
            })
        } else {
            return res.status(404).json({
                success: false,
                message: `There's no appointments for this id ${id}`
            })
        }
    })
}

/// you can get all accspet appointments to doctros


const allAcceptAppointment = (req, res) => {
    const id = req.params.id;
    const pending = `SELECT * 
    FROM ((appointments 
    JOIN sellers ON sellers.sellerid = appointments.sellerrid)
    JOIN buyer ON buyer.userid = appointments.buyerid) where appointments.statess = 1 and sellers.sellerid = ${id}`;
    connection.query(pending, (err, response) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
        if (response) {
            res.status(200).json({
                success: true,
                message: "All pending Appointment",
                result: response
            });
        }
    });
}



/// you can accept the booking using this function
const acceptTheBooking = (req, res) => {
    const id = req.params.id;
    const select = `SELECT * FROM appointments where id = ${id}`;
    connection.query(select, (err, result) => {
        if (err) {
            const error = {
                success: false,
                message: `Your id ===> ${id} is not Found`,
            };
            res.status(500).json(error);
        }
        if (result.length) {
            const updateRow = `UPDATE appointments SET statess = 1  WHERE id = ${id}`;
            connection.query(updateRow, (err, response) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "Server Error",
                        error: err
                    });
                }
                if (response) {
                    res.status(200).json({
                        success: true,
                        message: "success change the booking from pending to accept",
                    });
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Your id ${id} is not Found`
            });
        }
    });
};

// you can reject the booking using this function
const rejectedTheBooking = (req, res) => {
    const id = req.params.id;
    const select = `SELECT * FROM appointments where id = ${id}`;
    connection.query(select, (err, response) => {
        if (err) {
            const error = {
                success: false,
                message: "Server Error",
            };
            res.status(500).json(error);
        }
        if (response.length) {
            const reject = `UPDATE appointments SET statess = 2  WHERE id = ${id}`;
            connection.query(reject, (err, response) => {

                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "Server Error",
                    });
                }
                if (response) {
                    res.status(200).json({
                        success: true,
                        message: "success updated booking to rejected",
                    });
                }
            });
        } else {
            res.json(`your ${id} is not found`);
        }
    });
};


///get all appointments pending 

const AllpendingAppointment = (req, res) => {
    const id = req.params.id;
    const pending = `SELECT * 
    FROM ((appointments 
    JOIN sellers ON sellers.sellerid = appointments.sellerrid)
    JOIN buyer ON buyer.userid = appointments.buyerid) where appointments.statess = 0 and sellers.sellerid = ${id}`;
    connection.query(pending, (err, response) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
        if (response) {
            res.status(200).json({
                success: true,
                message: "All pending Appointment",
                result: response
            });
        }
    });
}
module.exports = { createAppointments, getAllAppointments, getAllAppointmentsByUserId, getAllAppointmentsByseller, acceptTheBooking, rejectedTheBooking, AllpendingAppointment, allAcceptAppointment }