import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { auth } from "../firebase"; // Adjust the path based on your project structure

// Available blood test categories mapped with their fields
// Available blood test categories mapped with their fields
const bloodTestFields = {
  "Complete Blood Count (CBC)": {
    table: "complete_blood_count",
    fields: {
      hemoglobin: "Hemoglobin (g/dL)",
      hematocrit: "Hematocrit (%)",
      rbc_count: "Red Blood Cell Count (million/uL)",
      wbc_count: "White Blood Cell Count (thousand/uL)",
      platelet_count: "Platelet Count (thousand/uL)",
      mcv: "Mean Corpuscular Volume (MCV) (fL)",
      mch: "Mean Corpuscular Hemoglobin (MCH) (pg)",
      mchc: "Mean Corpuscular Hemoglobin Concentration (MCHC) (g/dL)",
      rdw: "Red Cell Distribution Width (RDW) (%)",
    },
  },
  "Lipid Panel": {
    table: "lipid_panel",
    fields: {
      total_cholesterol: "Total Cholesterol (mg/dL)",
      hdl: "High-Density Lipoprotein (HDL) (mg/dL)",
      ldl: "Low-Density Lipoprotein (LDL) (mg/dL)",
      triglycerides: "Triglycerides (mg/dL)",
      vldl: "Very Low-Density Lipoprotein (VLDL) (mg/dL)",
    },
  },
  "Liver Function Test": {
    table: "liver_function",
    fields: {
      total_bilirubin: "Total Bilirubin (mg/dL)",
      direct_bilirubin: "Direct Bilirubin (mg/dL)",
      indirect_bilirubin: "Indirect Bilirubin (mg/dL)",
      ast: "Aspartate Aminotransferase (AST) (U/L)",
      alt: "Alanine Aminotransferase (ALT) (U/L)",
      alp: "Alkaline Phosphatase (ALP) (U/L)",
      total_protein: "Total Protein (g/dL)",
      albumin: "Albumin (g/dL)",
      globulin: "Globulin (g/dL)",
    },
  },
  "Kidney Function Test": {
    table: "kidney_function",
    fields: {
      bun: "Blood Urea Nitrogen (mg/dL)",
      creatinine: "Creatinine (mg/dL)",
      uric_acid: "Uric Acid (mg/dL)",
      sodium: "Sodium (mEq/L)",
      potassium: "Potassium (mEq/L)",
      chloride: "Chloride (mEq/L)",
      bicarbonate: "Bicarbonate (mEq/L)",
    },
  },
  "Blood Sugar Test": {
    table: "blood_sugar",
    fields: {
      fasting_glucose: "Fasting Blood Glucose (mg/dL)",
      postprandial_glucose: "Postprandial Blood Glucose (mg/dL)",
      random_glucose: "Random Blood Glucose (mg/dL)",
      hba1c: "Hemoglobin A1c (%)",
      insulin: "Insulin (μU/mL)",
    },
  },
  "Thyroid Function Test": {
    table: "thyroid_function",
    fields: {
      tsh: "Thyroid-Stimulating Hormone (TSH) (μIU/mL)",
      free_t3: "Free Triiodothyronine (T3) (pg/mL)",
      free_t4: "Free Thyroxine (T4) (ng/dL)",
      total_t3: "Total Triiodothyronine (T3) (ng/dL)",
      total_t4: "Total Thyroxine (T4) (μg/dL)",
      anti_tpo: "Anti-Thyroid Peroxidase (Anti-TPO) (IU/mL)",
      anti_tg: "Anti-Thyroglobulin (Anti-TG) (IU/mL)",
    },
  },
  "Vitamin Levels Test": {
    table: "vitamin_levels",
    fields: {
      vitamin_d: "Vitamin D (ng/mL)",
      vitamin_b12: "Vitamin B12 (pg/mL)",
      iron: "Iron (μg/dL)",
      tibc: "Total Iron Binding Capacity (TIBC) (μg/dL)",
      transferrin_sat: "Transferrin Saturation (%)",
      ferritin: "Ferritin (ng/mL)",
      magnesium: "Magnesium (mg/dL)",
      phosphorus: "Phosphorus (mg/dL)",
      zinc: "Zinc (μg/dL)",
      copper: "Copper (μg/dL)",
    },
  },
  "Inflammatory Markers Test": {
    table: "inflammatory_markers",
    fields: {
      crp: "C-Reactive Protein (CRP) (mg/L)",
      hs_crp: "High-Sensitivity C-Reactive Protein (hs-CRP) (mg/L)",
      esr: "Erythrocyte Sedimentation Rate (ESR) (mm/hr)",
      rf: "Rheumatoid Factor (RF) (IU/mL)",
      ana: "Antinuclear Antibody (ANA) (IU/mL)",
      anti_ccp: "Anti-Cyclic Citrullinated Peptide (Anti-CCP) (U/mL)",
      c3: "Complement C3 (mg/dL)",
      c4: "Complement C4 (mg/dL)",
    },
  },
  "Coagulation Tests": {
    table: "coagulation_tests",
    fields: {
      pt: "Prothrombin Time (PT) (seconds)",
      inr: "International Normalized Ratio (INR)",
      aptt: "Activated Partial Thromboplastin Time (APTT) (seconds)",
      d_dimer: "D-Dimer (ng/mL)",
      fibrinogen: "Fibrinogen (mg/dL)",
    },
  },
  "Cancer Markers Test": {
    table: "cancer_markers",
    fields: {
      psa: "Prostate-Specific Antigen (PSA) (ng/mL)",
      ca_125: "Cancer Antigen 125 (CA-125) (U/mL)",
      ca_19_9: "Cancer Antigen 19-9 (CA-19-9) (U/mL)",
      cea: "Carcinoembryonic Antigen (CEA) (ng/mL)",
      afp: "Alpha-Fetoprotein (AFP) (ng/mL)",
      beta_hcg: "Beta-Human Chorionic Gonadotropin (Beta-hCG) (mIU/mL)",
    },
  },
};


// Function to save data in local storage
const saveToLocalStorage = (data) => {
  localStorage.setItem("medical_data", JSON.stringify(data));
};

// Function to get data from local storage
const getFromLocalStorage = () => {
  const data = localStorage.getItem("medical_data");
  return data ? JSON.parse(data) : {};
};

const MedicalDetails = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [testData, setTestData] = useState(getFromLocalStorage());
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    const fetchMedicalProfile = async () => {
      const email = auth.currentUser?.email;
      if (!email) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/medical-profile/${email}`);
        const data = await response.json();
        if (response.ok) {
          const formattedData = {};
          for (const test in data) {
            const testName = Object.keys(bloodTestFields).find(key => bloodTestFields[key].table === test);
            if (testName) {
              formattedData[testName] = data[test];
            }
          }
          setTestData(formattedData);
          if (data.ai_health_summary) {
            setAiSummary(data.ai_health_summary);
          }
        }
      } catch (error) {
        console.error('Error fetching medical profile:', error);
      }
    };

    fetchMedicalProfile();
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection((prev) => (prev === section ? null : section)); // Toggle section
  };

  // Handle form field changes
  const handleInputChange = (test, field, value) => {
    setTestData((prev) => {
      const updatedData = {
        ...prev,
        [test]: {
          ...prev[test],
          [field]: value,
        },
      };
      saveToLocalStorage(updatedData);
      return updatedData;
    });
  };

  // Handle test submission
  const handleSubmit = async (test) => {
    const email = auth.currentUser?.email;
    if (!email) {
      alert("User email not found. Please log in again.");
      return;
    }

    const testTable = bloodTestFields[test]?.table; // Get the corresponding SQL table
    const testValues = testData[test];

    if (!testTable || !testValues) {
      alert("Invalid test data. Please try again.");
      return;
    }
    const parsedData = Object.fromEntries(
      Object.entries(testData[selectedTest]).map(([key, value]) => [key, parseFloat(value)])
    );
    
    const requestBody = {
      email,
      testType: testTable,
      testData: parsedData,
    };
    console.log("Request Body:", JSON.stringify(requestBody, null, 2)); // Debugging
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/add-medical-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(requestBody),
      });      
      
      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.error || "Invalid input");
      if (response.ok) {
        alert(`${test} data saved successfully!`);
      } else {
        const errorData = await response.json();
        alert(`Failed to save data: ${errorData.message}`);
      }
    } catch (error) {
      alert("An error occurred while saving the data.");
      console.error("Submission error:", error);
    }
  };


  return (
    <div className="container mx-auto p-4">
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full text-center mb-12"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl font-bold text-gray-900 mb-4"
        >
          Medical Details
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg text-gray-600"
        >
          Manage your health records, AI summaries, and appointments in one place.
        </motion.p>
      </motion.div>

      {/* Navigation Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Upload Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => handleSectionClick("upload")}
        >
          <h3 className="text-xl font-bold mb-4">Upload & Display Medical Details</h3>
          <p className="text-gray-600">Securely upload and view your medical records.</p>
        </motion.div>

        {/* AI Summary Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => handleSectionClick("aiSummary")}
        >
          <h3 className="text-xl font-bold mb-4">AI Health Summary</h3>
          <p className="text-gray-600">Get AI-generated insights from your medical data.</p>
        </motion.div>

        {/* Appointments Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => handleSectionClick("appointments")}
        >
          <h3 className="text-xl font-bold mb-4">Appointments</h3>
          <p className="text-gray-600">Manage your doctor visits and schedules.</p>
        </motion.div>
      </motion.div>

      {/* Upload Section Content */}
      {activeSection === "upload" && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Select Blood Test</h4>
          <select
            onChange={(e) => setSelectedTest(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Choose a test...</option>
            {Object.keys(bloodTestFields).map((test) => (
              <option key={test} value={test}>
                {test}
              </option>
            ))}
          </select>

          {/* Test Form */}
          {selectedTest && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">{selectedTest}</h4>
              {Object.entries(bloodTestFields[selectedTest].fields).map(([field, label]) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">{label}</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={testData[selectedTest]?.[field] || ""}
                    onChange={(e) => handleInputChange(selectedTest, field, e.target.value)}
                  />
                </div>
              ))}
              <button
                onClick={() => handleSubmit(selectedTest)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}

      {/* AI Summary Section Content */}
      {activeSection === "aiSummary" && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">AI Health Summary</h4>
          <button
            onClick={async () => {
              setLoadingSummary(true);
              const email = auth.currentUser?.email;
              if (!email) {
                alert("User email not found. Please log in again.");
                setLoadingSummary(false);
                return;
              }
              try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini/health-summary/${email}`, {
                  headers: {
                    'ngrok-skip-browser-warning': 'true',
                  },
                });
                const data = await response.json();
                if (response.ok) {
                  setAiSummary(data.analysis);
                } else {
                  throw new Error(data.error || "Failed to fetch summary");
                }
              } catch (error) {
                alert("An error occurred while fetching the summary.");
                console.error("Summary error:", error);
              }
              setLoadingSummary(false);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            disabled={loadingSummary}
          >
            {loadingSummary ? "Generating..." : "Generate AI Health Summary"}
          </button>
          {aiSummary && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiSummary}</ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* Appointments Section Content */}
      {activeSection === "appointments" && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Manage Appointments</h4>
          <p className="text-gray-700">Your upcoming and past appointments will be listed here.</p>
        </div>
      )}
    </div>
  );
};

export default MedicalDetails;
