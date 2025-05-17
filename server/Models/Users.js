import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  phone: String,
  address: String,
  role: String // 'patient' أو 'doctor'
});

export default mongoose.model("users", UserSchema);
