import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios";
import QRCode from "qrcode";

interface QrCodeVerificationProps {
  onBack: () => void;
  onComplete: () => void;
  ipvUid: string;
}

const QrCodeVerification: React.FC<QrCodeVerificationProps> = ({
  onBack,
  onComplete,
  ipvUid
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 minutes
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  
  // QR code points to sapphirebroking.com with UUID as parameter
  const qrCodeUrl = `https://sapphirebroking.com/qr-ipv?uid=${ipvUid}`;
  
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
      }
    };

    if (ipvUid) {
      generateQR();
    }
  }, [qrCodeUrl, ipvUid]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setError("Session expired. Please try again.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const checkVerificationStatus = async () => {
    setIsChecking(true);
    setError(null);

    try {
      // Use your existing IPV endpoint
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/ipv`,
        { 
          withCredentials: true 
        }
      );

      // If we get a successful response with data, IPV is completed
      if (response.status === 200 && response.data?.data?.url) {
        onComplete();
      } else {
        setError("Verification not completed yet. Please complete verification on your mobile device.");
      }
    } catch (err: any) {
      if (err.response?.status === 204) {
        // IPV not uploaded yet (NO_CONTENT from your backend)
        setError("Verification not completed yet. Please complete verification on your mobile device.");
      } else if (err.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.response?.status === 401) {
        setError("Session expired. Please restart the process.");
      } else {
        setError("Failed to check status. Please try again.");
      }
    } finally {
      setIsChecking(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full mx-auto flex flex-col items-start mt-16">
      <FormHeading
        title="Video Verification (IPV)"
        description="Scan the QR code with your phone to complete verification."
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
                alt="QR Code for IPV Verification"
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
          The QR code will open a webpage where you can take your photo
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-blue-800 text-sm">
            <strong>Instructions:</strong>
          </p>
          <ol className="text-blue-700 text-sm mt-2 text-left space-y-1">
            <li>1. Scan the QR code with your phone camera</li>
            <li>2. Take a clear photo of your face on the mobile page</li>
            <li>3. Click "Check Status" below to verify completion</li>
          </ol>
        </div>

        <Button
          onClick={checkVerificationStatus}
          disabled={isChecking || timeRemaining <= 0 || !qrCodeDataUrl}
          className={`w-full py-3 mb-4 ${
            (isChecking || !qrCodeDataUrl) ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isChecking ? (
            <div className="flex items-center justify-center">
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Checking Status...
            </div>
          ) : (
            "Check Verification Status"
          )}
        </Button>
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
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default QrCodeVerification;