import express from 'express';
import { addMedicalDetails, getMedicalDataForAnalysis, getMedicalProfile } from "../controllers/userController.js";
const router = express.Router();

router.post("/add-medical-details", addMedicalDetails); // Add medical data
router.get("/medical-data/:email", getMedicalDataForAnalysis); // Get medical data for analysis
router.get("/medical-profile/:email", getMedicalProfile); // Get full medical profile

export default router;
