// src/components/LeftPanel.jsx
import React from "react";

const content = {
  0: {
    title: "Verify Your Mobile Number",
    subtitle: "Let's start by verifying your mobile number for secure access.",
  },
  1: {
    title: "Personal Information",
    subtitle: "Help us know you better by providing your basic details.",
  },
  2: {
    title: "Address Details",
    subtitle: "Please provide your current residential address.",
  },
};

const LeftPanel = ({ step }) => (
  <div className="w-1/2 bg-teal-800 p-12 text-white fixed left-0 h-screen">
    <h1 className="text-4xl font-bold mb-6">{content[step].title}</h1>
    <p className="text-lg">{content[step].subtitle}</p>
  </div>
);

export default LeftPanel;

// src/components/Forms/MobileVerification.jsx


// src/components/Forms/PersonalInfo.jsx
