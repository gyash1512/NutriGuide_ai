import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Add this field
  dob: { type: Date, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);

