// Models/Report.js
import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  patientName: String,
  reportDate: Date,
  diagnosis: String,
  prescription: String,
  medications: [String],
  email: String 
}, { timestamps: true });

const ReportModel = mongoose.model("reports", ReportSchema);
export default ReportModel;
