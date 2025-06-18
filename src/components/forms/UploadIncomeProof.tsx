import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { ChevronRight, Upload, X, Check, AlertCircle, FileText } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useCheckpoint, CheckpointStep } from "@/hooks/useCheckpoint";

interface UploadIncomeProofProps {
  onNext: (file?: File) => void;
  onSkip: () => void;
  uid: string | null;
}

const INCOME_PROOF_TYPES = [
  { id: "form_16_120k_annual", label: "Form 16 (Income ≥ ₹1.2L annually)" },
  { id: "itr_120k_annual", label: "ITR (Income ≥ ₹1.2L annually)" },
  { id: "salary_slip_10k_monthly", label: "Salary Slip (Income ≥ ₹10K monthly)" },
  { id: "bank_statement_10k_monthly", label: "Bank Statement (Income ≥ ₹10K monthly)" },
  { id: "demat_statement_10k_holdings", label: "Demat Statement (Holdings ≥ ₹10K)" },
];

const UploadIncomeProof: React.FC<UploadIncomeProofProps> = ({ onNext, onSkip, uid }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedProofType, setSelectedProofType] = useState<string>("form_16_120k_annual");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { refetchStep } = useCheckpoint();

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Validate file type (PDF only)
      if (file.type !== "application/pdf") {
        setUploadError("Only PDF files are accepted");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size must be less than 5MB");
        return;
      }
      
      setSelectedFile(file);
      setUploadError(null);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Clear selected file
  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle proof type selection
  const handleProofTypeSelect = (proofTypeId: string) => {
    setSelectedProofType(proofTypeId);
  };

  // Initialize income proof with selected type
  const initializeIncomeProof = async () => {
    try {
      // First, check if we already have a valid UID
      if (!uid) {
        console.error("No income proof UID provided");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
          {
            step: "income_proof",
            income_proof_type: selectedProofType
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('authToken')}`
            }
          }
        );
        
        console.log("Income proof initialization response:", response.data);
        return response.data.data.uid;
      }
      
      return uid;
    } catch (error: any) {
      console.error("Error initializing income proof:", error);
      if (error.response?.data?.message) {
        setUploadError(`Initialization error: ${error.response.data.message}`);
      } else if (error.response?.data?.error?.message) {
        setUploadError(`Initialization error: ${error.response.data.error.message}`);
      } else {
        setUploadError("Failed to initialize income proof upload. Please try again.");
      }
      return null;
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload");
      return;
    }
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      // Initialize income proof if needed
      const uploadUid = await initializeIncomeProof();
      
      if (!uploadUid) {
        setUploadError("Failed to get upload authorization. Please try again.");
        setIsUploading(false);
        return;
      }
      
      // Create form data for file upload
      const formData = new FormData();
      formData.append("pdf", selectedFile);
      
      console.log(`Uploading to UID: ${uploadUid}`);
      
      // Upload the file
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/income-proof/${uploadUid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get('authToken')}`
          }
        }
      );
      
      console.log("Upload response:", response.data);
      
      if (response.status === 201) {
        setUploadSuccess(true);
        
        // Refetch the income proof status after a short delay
        setTimeout(() => {
          refetchStep(CheckpointStep.INCOME_PROOF);
          
          // Wait a bit longer before proceeding
          setTimeout(() => {
            onNext(selectedFile);
          }, 2000);
        }, 1000);
      } else {
        setUploadError("Upload failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error uploading file:", error);
      if (error.response?.data?.message) {
        setUploadError(`Upload error: ${error.response.data.message}`);
      } else if (error.response?.data?.error?.message) {
        setUploadError(`Upload error: ${error.response.data.error.message}`);
      } else if (error.response?.status === 401) {
        setUploadError("Authorization expired. Please try again.");
        
        // Try to get a new UID since the current one might be expired
        try {
          // Reinitialize the income proof
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
            {
              step: "income_proof",
              income_proof_type: selectedProofType
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('authToken')}`
              }
            }
          );
          
          console.log("New income proof initialization:", response.data);
          
          if (response.data?.data?.uid) {
            setUploadError("Authorization refreshed. Please try uploading again.");
          }
        } catch (reinitError) {
          console.error("Error refreshing authorization:", reinitError);
        }
      } else {
        setUploadError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Check if income proof is already uploaded
  useEffect(() => {
    const checkIncomeProofStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/income-proof`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('authToken')}`
            }
          }
        );
        
        if (response.status === 200 && response.data?.data?.url) {
          console.log("Income proof already uploaded:", response.data);
          setUploadSuccess(true);
          
          // Delay to show the success message briefly
          setTimeout(() => {
            onNext();
          }, 1500);
        }
      } catch (error) {
        // If 204 or other error, income proof not uploaded yet
        console.log("Income proof not yet uploaded");
      }
    };
    
    checkIncomeProofStatus();
  }, [onNext]);

  // If upload successful, show success screen
  if (uploadSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Income Proof Uploaded Successfully!</h2>
        <p className="text-gray-600 mb-8">
          Your income proof has been received. We'll proceed with verification.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          You'll be automatically redirected to the next step in a moment...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <FormHeading
        title="Upload Income Proof"
        description="Please upload a document as proof of your income."
      />

      <div className="mb-6">
        <h3 className="text-base font-medium mb-3">Select Income Proof Type</h3>
        <div className="space-y-2">
          {INCOME_PROOF_TYPES.map((proofType) => (
            <div key={proofType.id} className="flex items-center">
              <button
                type="button"
                onClick={() => handleProofTypeSelect(proofType.id)}
                className={`flex items-center w-full p-3 border rounded-lg transition-colors ${
                  selectedProofType === proofType.id
                    ? "border-green-600 bg-green-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div
                  className={`w-5 h-5 flex-shrink-0 border rounded-full mr-3 flex items-center justify-center ${
                    selectedProofType === proofType.id
                      ? "border-green-600 bg-white"
                      : "border-gray-400"
                  }`}
                >
                  {selectedProofType === proofType.id && (
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  )}
                </div>
                <span className="text-sm">{proofType.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-medium mb-3">Upload Document</h3>
        
        {/* File selection area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            selectedFile
              ? "border-green-600 bg-green-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 mb-2">
                Click to select or drag and drop your PDF file
              </p>
              <p className="text-xs text-gray-500">Maximum file size: 5MB</p>
              
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              
              <Button
                variant="outline"
                onClick={handleButtonClick}
                className="mt-4"
                type="button"
              >
                Select File
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={clearSelectedFile}
                className="p-1 h-auto"
                type="button"
              >
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Error message */}
      {uploadError && (
        <div className="mb-6 p-3 bg-red-50 rounded flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}

      <div className="flex gap-4 mt-6">
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          variant="ghost"
          className={`py-6 px-8 ${
            (!selectedFile || isUploading)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isUploading ? "Uploading..." : "Upload Document"}
        </Button>
        
        <Button
          onClick={onSkip}
          variant="outline"
          className="py-6"
          type="button"
        >
          Skip for Now
        </Button>
      </div>
      
      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium mb-1">
              Important Information
            </p>
            <p className="text-xs text-amber-700">
              Providing valid income proof is mandatory for F&O, Currency, and
              Commodity segments as per regulations. You may skip now, but you
              won't be able to trade in these segments until income proof is
              verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadIncomeProof;