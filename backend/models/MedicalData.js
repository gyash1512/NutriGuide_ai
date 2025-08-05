import mongoose from 'mongoose';

const medicalDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  complete_blood_count: { type: Object },
  lipid_panel: { type: Object },
  liver_function: { type: Object },
  kidney_function: { type: Object },
  blood_sugar: { type: Object },
  thyroid_function: { type: Object },
  vitamin_levels: { type: Object },
  inflammatory_markers: { type: Object },
  coagulation_tests: { type: Object },
  cancer_markers: { type: Object },
  ai_health_summary: { type: String },
}, {
  timestamps: true,
});

const MedicalData = mongoose.model('MedicalData', medicalDataSchema);

export default MedicalData;
