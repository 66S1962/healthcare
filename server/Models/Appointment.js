// Models/Appointment.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  specialty: { type: String, required: true },  // لا تنسَ إضافة التخصص الطبي
}, { timestamps: true });

const AppointmentModel = mongoose.model("appointments", appointmentSchema);

export default AppointmentModel;


