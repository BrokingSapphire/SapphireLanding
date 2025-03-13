import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { ChevronDown, Upload } from "lucide-react";

interface UploadIncomeProofProps {
  onNext: () => void;
  onSkip?: () => void;
}

const UploadIncomeProof: React.FC<UploadIncomeProofProps> = ({ 
  onNext,
  onSkip 
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("Bank statement (last 6 months) with ₹10,000+ average balance.");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const documentOptions = [
    "Bank statement (last 6 months) with ₹10,000+ average balance.",
    "Latest salary slip with ₹15,000+ gross monthly income.",
    "Latest Form 16 with ₹1,20,000+ annual income",
    "Net worth certificate of ₹10,00,000+.",
    "Latest demat statement with ₹10,000+ holdings."
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <FormHeading
        title="Upload Income Proof"
        description="A small step for you, a big leap towards seamless trading!"
      />

      <div className="mt-6">
        <div className="relative">
          <div
            className="border  rounded-md p-4 flex justify-between items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="w-[90%]  text-center">{selectedOption}</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>

          {dropdownOpen && (
            <div className="absolute z-10 mt-1  bg-white border rounded-md shadow-lg">
              {documentOptions.map((option, index) => (
                <div
                  key={index}
                  className="p-3 w-[90%] text-center  hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedOption(option);
                    setDropdownOpen(false);
                  }}
                >
                  <span className="">{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="mt-4 border-2 border-dashed border-gray-300 rounded-md p-6 text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center">
              <div className="bg-green-100 text-green-800 rounded-full p-2 mb-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                onClick={() => setSelectedFile(null)}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-600 mb-2">Drag and drop file here or</p>
              <button
                onClick={handleBrowseClick}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Choose file
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={onSkip}
            className="text-gray-500 text-sm hover:text-gray-700 border border-gray-300 rounded py-1 px-3"
          >
            Skip for now
          </button>
        </div>
      </div>

      <Button
        variant={"ghost"}
        onClick={onNext}
        disabled={!selectedFile}
        className="w-full py-6 mb-6 mt-4"
      >
        Continue
      </Button>
    </div>
  );
};

export default UploadIncomeProof;