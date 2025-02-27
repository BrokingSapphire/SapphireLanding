import React from "react";
import { Button } from "../ui/button";

const DigiLockerVerification = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="mx-auto pt-24">
      <h2 className="text-3xl font-bold mb-3">Verify with DigiLocker</h2>
      <p className="text-gray-600 mb-8">
        Complete your verification quickly and securely using DigiLocker
      </p>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="flex items-start mb-4">
          <div className="bg-blue-100 p-2 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-1">
              Why DigiLocker?
            </h3>
            <p className="text-sm text-blue-700">
              DigiLocker is a secure digital platform by the Government of India
              that allows you to access and share your documents easily.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-1">
              Benefits of DigiLocker
            </h3>
            <ul className="text-sm text-blue-700 list-disc ml-4 space-y-1">
              <li>Faster verification with no manual paperwork</li>
              <li>Secure government-approved platform</li>
              <li>Instant KYC verification</li>
            </ul>
          </div>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full py-6 mb-6 bg-blue-600 hover:bg-blue-700 text-white"
      >
        Proceed to DigiLocker
      </Button>

      <div className="text-center text-xs text-gray-600 mt-8 space-y-3">
        <p>I authorise Sapphire to fetch my KYC information from DigiLocker.</p>
        <p>
          If you are looking to open a HUF, Corporate, Partnership, or NRI
          account, you have to{" "}
          <span className="text-blue-400 cursor-pointer">click here.</span>
        </p>
      </div>
    </div>
  );
};

export default DigiLockerVerification;
