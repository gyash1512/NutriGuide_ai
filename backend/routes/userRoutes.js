import express from 'express';
import { addUser, addMedicalDetails } from "../controllers/userController.js";
const router = express.Router();

router.post("/add-user", addUser); // Add user to the database
router.post("/add-medical-details", addMedicalDetails); // Add medical data

export default router;
