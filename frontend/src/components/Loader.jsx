import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .loader {
            border: 4px solid #9ca3af; /* A solid medium grey */
            border-left-color: #ffffff; /* White revolving part */
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
          }
        `}
      </style>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
