import { conn, insertData } from "../config/db.js"; // Import the conn and insertData function from db.js

/**
 * Controller to add a new user to the 'users' table.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const addUser = (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Insert user into 'users' table
    insertData("users", { name, email }, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to add user" });
      }
      res.status(200).json({ message: "User added successfully!" });
    });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMedicalDataForAnalysis = (req, res) => {
  const { email } = req.params;
  const tables = [
    "complete_blood_count",
    "lipid_panel",
    "liver_function",
    "kidney_function",
    "blood_sugar",
    "thyroid_function",
    "vitamin_levels",
    "inflammatory_markers",
    "coagulation_tests",
    "cancer_markers"
  ];

  const medicalData = {};
  let queries = tables.length;

  tables.forEach(table => {
    const query = `SELECT * FROM ${table} WHERE email = ?`;
    conn.query(query, [email], (err, result) => {
      if (err) {
        console.error(`Error fetching data from ${table}:`, err);
        queries--;
        if (queries === 0) {
          res.status(200).json(medicalData);
        }
        return;
      }

      if (result.length > 0) {
        const filteredResult = {};
        for (const key in result[0]) {
          if (result[0][key] !== null && result[0][key] !== '' && key !== 'email') {
            filteredResult[key] = result[0][key];
          }
        }
        if (Object.keys(filteredResult).length > 0) {
          medicalData[table] = filteredResult;
        }
      }

      queries--;
      if (queries === 0) {
        res.status(200).json(medicalData);
      }
    });
  });
};

/**
 * Controller to add medical details to the respective test table.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const addMedicalDetails = (req, res) => {
  try {
    const { email, testType, testData } = req.body;

    // Validate input
    if (!email || !testType || !testData || typeof testData !== "object") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Ensure testType corresponds to a valid table name
    const validTables = [
      "complete_blood_count",
      "lipid_panel",
      "liver_function",
      "kidney_function",
      "blood_sugar",
      "thyroid_function",
      "vitamin_levels",
      "inflammatory_markers",
      "coagulation_tests",
      "cancer_markers"
    ];

    if (!validTables.includes(testType)) {
      return res.status(400).json({ error: "Invalid test type" });
    }

    // Ensure email is included in testData
    testData.email = email;

    // Insert data into the respective table
    insertData(testType, testData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database insertion failed" });
      }
      res.status(200).json({ message: "Medical details added successfully!" });
    });

  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
