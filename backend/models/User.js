import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  healthGoals: String,
  preferences: Array,
  medicalConditions: Array,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
