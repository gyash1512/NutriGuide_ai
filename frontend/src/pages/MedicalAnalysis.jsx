import React, { useState } from 'react';

const MedicalAnalysis = () => {
  const [medicalData, setMedicalData] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/gemini/analyze-medical-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ medicalData })
    })
    .then(res => res.json())
    .then(data => {
      setAnalysis(data.analysis);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error analyzing medical data:', error);
      setAnalysis('Error: Could not analyze medical data.');
      setLoading(false);
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medical Data Analysis</h1>
      <textarea
        className="w-full h-64 p-2 border rounded"
        placeholder="Paste your medical data here..."
        value={medicalData}
        onChange={(e) => setMedicalData(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {analysis && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Analysis Result</h2>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default MedicalAnalysis;
