import express from 'express';
import { addUser, addMedicalDetails, getMedicalDataForAnalysis } from "../controllers/userController.js";
const router = express.Router();

router.post("/add-user", addUser); // Add user to the database
router.post("/add-medical-details", addMedicalDetails); // Add medical data
router.get("/medical-data/:email", getMedicalDataForAnalysis); // Get medical data for analysis

export default router;
