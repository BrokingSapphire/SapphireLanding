import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Clock, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios";
import QRCode from "qrcode";
import { toast } from "sonner";

interface SignatureQrCodeProps {
  onBack: () => void;
  onComplete: () => void;
  signatureUid: string;
}

const SignatureQrCode: React.FC<SignatureQrCodeProps> = ({
  onBack,
  onComplete,
  signatureUid
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 minutes
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [isPolling, setIsPolling] = useState(true);
  const [signatureCompleted, setSignatureCompleted] = useState(false);
  
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // QR code points to sapphirebroking.com with UUID as parameter
  const qrCodeUrl = `https://sapphirebroking.com/qr-signature?uid=${signatureUid}`;
  
  // Generate QR code when component mounts
  useEffect(() => {
    const generateQR = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(qrCodeUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeDataUrl(dataUrl);
      } catch (err) {
        console.error('Error generating QR code:', err);
        setError("Failed to generate QR code");
        toast.error("Failed to generate QR code");
      }
    };

    if (signatureUid) {
      generateQR();
    }
  }, [qrCodeUrl, signatureUid]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPolling(false);
          setError("Session expired. Please try again.");
          toast.error("Session expired. Please try again.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Polling function (hidden from UI)
  const checkSignatureStatus = async (isManualCheck = false) => {
    if (!isPolling && !isManualCheck) return;

    // Only show loading state for manual checks
    if (isManualCheck) {
      setIsChecking(true);
    }
    
    // Only clear error for manual checks to avoid clearing session expired messages
    if (isManualCheck) {
      setError(null);
    }

    try {
      // Use your existing getSignature endpoint
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/signature`,
        { 
          withCredentials: true 
        }
      );

      // If we get a successful response with data, signature is completed
      if (response.status === 200 && response.data?.data?.url) {
        setSignatureCompleted(true);
        setIsPolling(false);
        toast.success("Signature completed successfully!");
        
        // Stop polling
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
        
        // Auto-complete after a short delay
        setTimeout(() => {
          onComplete();
        }, 1500);
      } else {
        // Only show error for manual checks
        if (isManualCheck) {
          setError("Signature not completed yet. Please complete signature on your mobile device.");
        }
      }
    } catch (err: any) {
      if (err.response?.status === 204) {
        // Signature not uploaded yet (NO_CONTENT from your backend)
        if (isManualCheck) {
          setError("Signature not completed yet. Please complete signature on your mobile device.");
        }
      } else if (err.response?.data?.message) {
        const errorMessage = `Error: ${err.response.data.message}`;
        setError(errorMessage);
        if (isManualCheck) {
          toast.error(errorMessage);
        }
        // Stop polling on serious errors
        setIsPolling(false);
      } else if (err.response?.status === 401) {
        const errorMessage = "Session expired. Please restart the process.";
        setError(errorMessage);
        setIsPolling(false);
        if (isManualCheck) {
          toast.error(errorMessage);
        }
      } else {
        // For other errors during polling, continue silently
        // Only show error for manual checks
        if (isManualCheck) {
          setError("Failed to check status. Please try again.");
          toast.error("Failed to check status. Please try again.");
        } else {
          // Log error but continue polling
          console.warn("Polling error (continuing):", err);
        }
      }
    } finally {
      if (isManualCheck) {
        setIsChecking(false);
      }
    }
  };

  // Start hidden polling when component mounts
  useEffect(() => {
    if (isPolling && qrCodeDataUrl && !signatureCompleted) {
      // Initial check (silent)
      checkSignatureStatus(false);
      
      // Set up polling interval (check every 3 seconds, silently)
      pollingIntervalRef.current = setInterval(() => {
        checkSignatureStatus(false);
      }, 3000);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [isPolling, qrCodeDataUrl, signatureCompleted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Manual check function for button click
  const handleManualCheck = () => {
    checkSignatureStatus(true);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full mx-auto flex flex-col items-start mt-16">
      <FormHeading
        title="Signature"
        description="Scan the QR code with your phone to sign digitally."
      />

      <div className="relative w-full mb-4">
        <div className="absolute right-2 -top-6 flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatTime(timeRemaining)}</span>
        </div>
        
        <div className="border-2 border-gray-300 rounded-lg p-4 flex justify-center items-center">
          <div className="w-64 h-64 flex items-center justify-center">
            {qrCodeDataUrl ? (
              <img 
                src={qrCodeDataUrl} 
                alt="QR Code for Signature"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="animate-pulse bg-gray-200 w-48 h-48 rounded flex items-center justify-center">
                <span className="text-gray-500">Generating QR...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center w-full mb-6">
        <p className="font-medium mb-2">
          Scan this QR code with your phone to continue!
        </p>
        <p className="text-sm text-gray-600 mb-4">
          The QR code will open a webpage where you can sign digitally
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-blue-800 text-sm">
            <strong>Instructions:</strong>
          </p>
          <ol className="text-blue-700 text-sm mt-2 text-left space-y-1">
            <li>1. Scan the QR code with your phone camera</li>
            <li>2. Sign on the mobile signature pad</li>
            <li>3. Wait for automatic completion or click "Check Status"</li>
          </ol>
        </div>

      </div>

      {error && (
        <div className="w-full mb-4 p-3 bg-red-50 rounded border border-red-200">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}

      <div className="w-full mt-4 flex justify-between items-center">
        <Button
          onClick={onBack}
          variant="link"
          className="flex items-center text-blue-500"
          disabled={signatureCompleted}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Go Back
        </Button>
        
        {signatureCompleted && (
          <Button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignatureQrCode;