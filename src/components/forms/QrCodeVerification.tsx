import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Clock} from "lucide-react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import axios from "axios";
import QRCode from "qrcode";
import { toast } from "sonner";
import Image from "next/image";

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
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [isPolling, setIsPolling] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'waiting' | 'checking' | 'completed' | 'failed'>('waiting');
  
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
        toast.error("Failed to generate QR code");
      }
    };

    if (ipvUid) {
      generateQR();
    }
  }, [qrCodeUrl, ipvUid]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPolling(false);
          setVerificationStatus('failed');
          setError("Session expired. Please try again.");
          toast.error("Session expired. Please try again.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Polling function
  const checkVerificationStatus = async () => {
    if (!isPolling || verificationStatus === 'completed') return;

    setVerificationStatus('checking');
    setError(null);

    try {
      // Use your existing IPV endpoint
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/ipv/`,
        { 
          withCredentials: true 
        }
      );

      // If we get a successful response with data, IPV is completed
      if (response.status === 200 && response.data?.data?.url) {
        setVerificationStatus('completed');
        setIsPolling(false);
        toast.success("Verification completed successfully!");
        
        // Stop polling and complete after a short delay
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
        
        setTimeout(() => {
          onComplete();
        }, 1500);
      } else {
        setVerificationStatus('waiting');
      }
    } catch (err: unknown) {
      // Define a type guard for AxiosError
      function isAxiosError(error: unknown): error is { response: { status: number; data?: { message?: string } } } {
        return (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as { response?: unknown }).response === "object" &&
          (error as { response: { status: number } }).response !== undefined
        );
      }

      if (isAxiosError(err)) {
        const response = err.response;
        if (response.status === 204) {
          // IPV not uploaded yet (NO_CONTENT from your backend)
          setVerificationStatus('waiting');
        } else if (response.data?.message) {
          setError(`Error: ${response.data.message}`);
          setVerificationStatus('failed');
          setIsPolling(false);
          toast.error(`Error: ${response.data.message}`);
        } else if (response.status === 401) {
          setError("Session expired. Please restart the process.");
          setVerificationStatus('failed');
          setIsPolling(false);
          toast.error("Session expired. Please restart the process.");
        } else {
          // For other errors, continue polling but show a warning
          console.warn("Polling error:", err);
          setVerificationStatus('waiting');
        }
      } else {
        // Unknown error structure
        console.warn("Unknown error during polling:", err);
        setVerificationStatus('waiting');
      }
    }
  };

  // Start polling when component mounts
  useEffect(() => {
    if (isPolling && qrCodeDataUrl) {
      // Initial check
      checkVerificationStatus();
      
      // Set up polling interval (check every 3 seconds)
      pollingIntervalRef.current = setInterval(() => {
        checkVerificationStatus();
      }, 3000);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [isPolling, qrCodeDataUrl]);

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
              <Image
                height={200}
                width={200}
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
            <li>3. Wait for automatic verification (no need to refresh)</li>
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
          disabled={verificationStatus === 'completed'}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Go Back
        </Button>
        
        {verificationStatus === 'completed' && (
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

export default QrCodeVerification;