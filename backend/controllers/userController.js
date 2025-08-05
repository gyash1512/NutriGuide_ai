import MedicalData from '../models/MedicalData.js';

export const addMedicalDetails = async (req, res) => {
  try {
    const { email, testType, testData } = req.body;

    if (!email || !testType || !testData || typeof testData !== "object") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const update = { [testType]: testData };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const medicalData = await MedicalData.findOneAndUpdate({ email }, update, options);

    res.status(200).json({ message: "Medical details added successfully!", medicalData });
  } catch (error) {
    console.error("Error adding medical details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMedicalDataForAnalysis = async (req, res) => {
  try {
    const { email } = req.params;
    const medicalData = await MedicalData.findOne({ email });

    if (!medicalData) {
      return res.status(200).json({});
    }

    // Remove null/empty fields and the email from the data before returning
    const curatedData = {};
    for (const key in medicalData.toObject()) {
      if (medicalData[key] !== null && key !== 'email' && key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt') {
        curatedData[key] = medicalData[key];
      }
    }

    res.status(200).json(curatedData);
  } catch (error) {
    console.error("Error fetching medical data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMedicalProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const medicalProfile = await MedicalData.findOne({ email });

    if (!medicalProfile) {
      return res.status(200).json({}); // Return empty object if no data
    }

    res.status(200).json(medicalProfile);
  } catch (error) {
    console.error("Error fetching medical profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
