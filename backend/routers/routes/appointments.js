// require express
const express = require('express');

/// require all controllers 
const { createAppointments, getAllAppointments, getAllAppointmentsByUserId, getAllAppointmentsByseller, acceptTheBooking, rejectedTheBooking, allAcceptAppointment, AllpendingAppointment } = require('../controllers/appointments');

// define Router
const appointmentsRouter = express.Router();

// Routes

//  [get]  [http://localhost:5000/appointments]
appointmentsRouter.get("/", getAllAppointments);



//  [post]  [http://localhost:5000/appointments/addNewAppointments]
appointmentsRouter.post("/addNewAppointments", createAppointments);


//  [get]  [http://localhost:5000/appointments/buyer/:id]
appointmentsRouter.get("/buyer/:id", getAllAppointmentsByUserId);


//  [get]  [http://localhost:5000/appointments/seller/:id]
appointmentsRouter.get("/seller/:id", getAllAppointmentsByseller)


//  [put]  [http://localhost:5000/appointments/accept/:id]
appointmentsRouter.put("/accept/:id", acceptTheBooking);


//  [put]  [http://localhost:5000/appointments/reject/:id]
appointmentsRouter.put("/reject/:id", rejectedTheBooking);

// [get] [http://localhost:5000/appointments/pending]
appointmentsRouter.get("/pending/:id", AllpendingAppointment);


// [get] [http://localhost:5000/appointments/accept/appointments/:id]
appointmentsRouter.get("/accept/appointments/:id", allAcceptAppointment)
module.exports = appointmentsRouter;