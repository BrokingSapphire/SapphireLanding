import React, { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import QrCodeVerification from "./QrCodeVerification";
import axios from "axios";
import Cookies from 'js-cookie';
import { useCheckpoint, CheckpointStep } from '@/hooks/useCheckpoint';
import { toast } from "sonner";

interface IPVVerificationProps {
  onNext: () => void;
  initialData?: any;
  isCompleted?: boolean;
}

// Global flag to track if completion toast has been shown in this session
let hasShownGlobalCompletedToast = false;

const IPVVerification: React.FC<IPVVerificationProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [ipvUid, setIpvUid] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [cameraAutoStarted, setCameraAutoStarted] = useState(false);
  const [wantsToReverify, setWantsToReverify] = useState(false); // New state to track re-verification intent
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use the checkpoint hook to check for existing IPV data
  const { 
    isStepCompleted,
    getStepData,
    refetchStep 
  } = useCheckpoint();

  // Check if IPV is already completed and show toast
  useEffect(() => {
    console.log("useEffect triggered - isStepCompleted:", isStepCompleted(CheckpointStep.IPV), "wantsToReverify:", wantsToReverify, "isInitialized:", isInitialized, "isLoading:", isLoading);
    
    if (isStepCompleted(CheckpointStep.IPV) && !wantsToReverify) {
      // IPV is already completed and user doesn't want to re-verify
      if (!isInitialized) {
        setIsInitialized(true);
      }
      
      // Show completion toast only once per session
      if (!hasShownGlobalCompletedToast) {
        toast.success("IPV verification already completed! You can proceed or re-verify if needed.");
        hasShownGlobalCompletedToast = true;
      }
      return;
    }

    // If not completed OR user wants to re-verify, initialize IPV
    // But only if we haven't already initialized and we're not already loading
    if (((!isStepCompleted(CheckpointStep.IPV) && !isInitialized) || wantsToReverify) && !isLoading && !ipvUid) {
      console.log("Calling initializeIPV from useEffect");
      initializeIPV();
    }
  }, [isStepCompleted(CheckpointStep.IPV), wantsToReverify]); // Only depend on these two values

  // Auto-start camera after initialization is complete
  useEffect(() => {
    if (isInitialized && ipvUid && !cameraAutoStarted && (wantsToReverify || !isStepCompleted(CheckpointStep.IPV))) {
      // Small delay to ensure everything is ready
      setTimeout(() => {
        startCamera();
        setCameraAutoStarted(true);
      }, 500);
    }
  }, [isInitialized, ipvUid, cameraAutoStarted, wantsToReverify, isStepCompleted]);

  const initializeIPV = async () => {
    console.log("initializeIPV called - isLoading:", isLoading, "ipvUid:", ipvUid);
    
    // Prevent multiple simultaneous calls
    if (isLoading || ipvUid) {
      console.log("Already initializing or UID exists, skipping...");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const authToken = Cookies.get('authToken');
      if (!authToken) {
        setError("Authentication token not found. Please restart the process.");
        return;
      }

      console.log("Making API call to initialize IPV session...");

      // Use the correct endpoint for IPV initialization
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "ipv"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      if (response.data?.data?.uid) {
        console.log("IPV session initialized with UID:", response.data.data.uid);
        setIpvUid(response.data.data.uid);
        setIsInitialized(true);
      } else {
        setError("Failed to initialize IPV. Please try again.");
      }
    } catch (err: any) {
      console.error("IPV initialization error:", err);
      if (err.response) {
        if (err.response.data?.message) {
          setError(`Error: ${err.response.data.message}`);
        } else if (err.response.status === 400) {
          setError("Invalid request. Please try again.");
        } else if (err.response.status === 401) {
          setError("Authentication failed. Please restart the process.");
        } else if (err.response.status === 403) {
          setError("Access denied. Please check your authentication and try again.");
        } else {
          setError(`Server error (${err.response.status}). Please try again.`);
        }
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      setShowCamera(true);
      setError(null);
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Camera access failed. Please enable permissions.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const capturedFile = new File([blob], "ipv-verification.jpg", {
              type: "image/jpeg",
            });
            setImageFile(capturedFile);
            setShowCamera(false);

            // Stop all video tracks when photo is captured
            const stream = video.srcObject as MediaStream;
            if (stream) {
              stream.getTracks().forEach((track) => track.stop());
            }
          }
        }, "image/jpeg", 0.8);
      }
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called - isLoading:", isLoading, "imageFile:", !!imageFile, "ipvUid:", !!ipvUid);
    
    // Prevent multiple submissions
    if (isLoading) {
      console.log("Already submitting, please wait...");
      return;
    }

    // If already completed and no new image and not wanting to re-verify, just go to next step
    if (isStepCompleted(CheckpointStep.IPV) && !imageFile && !wantsToReverify) {
      console.log("Step completed, no new image, proceeding to next step");
      onNext();
      return;
    }

    if (!imageFile || !ipvUid) {
      console.log("Missing image or UID, cannot submit");
      return;
    }

    console.log("Starting IPV submission...");
    setIsLoading(true);
    setError(null);

    try {
      const authToken = Cookies.get('authToken');
      if (!authToken) {
        setError("Authentication token not found. Please restart the process.");
        return;
      }

      const formData = new FormData();
      formData.append('image', imageFile);

      console.log("Uploading IPV with UID:", ipvUid);

      // Use the correct PUT endpoint for IPV upload
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/ipv/${ipvUid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      console.log("IPV uploaded successfully");
      toast.success("IPV verification completed successfully!");
      
      // Reset re-verification state immediately to prevent further submissions
      setWantsToReverify(false);
      setIsLoading(false); // Set loading to false immediately
      
      // Refetch IPV step to update the hook
      refetchStep(CheckpointStep.IPV);

      // Auto-advance after 2 seconds
      setTimeout(() => {
        onNext();
      }, 2000);
      
    } catch (err: any) {
      console.error("IPV upload error:", err);
      setIsLoading(false); // Make sure to reset loading state on error
      
      if (err.response) {
        if (err.response.data?.message) {
          setError(`Upload failed: ${err.response.data.message}`);
        } else if (err.response.status === 401) {
          setError("Upload session expired. Please try again.");
          // Re-initialize IPV
          setIsInitialized(false);
          setIpvUid(null);
          setCameraAutoStarted(false);
        } else if (err.response.status === 422) {
          setError("Invalid image format. Please try again.");
        } else if (err.response.status === 403) {
          setError("Access denied. Please check your authentication and try again.");
        } else {
          setError(`Server error (${err.response.status}). Please try again.`);
        }
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleRetry = () => {
    setImageFile(null);
    setError(null);
    setIsInitialized(false);
    setIpvUid(null);
    setCameraAutoStarted(false);
    setWantsToReverify(true); // Set intent to re-verify
  };

  const handleVerifyAgain = () => {
    console.log("User wants to verify again");
    
    // Clear all states first
    setImageFile(null);
    setError(null);
    setShowCamera(false);
    setCameraAutoStarted(false);
    
    // Stop camera if running
    stopCamera();
    
    // Reset initialization states
    setIsInitialized(false);
    setIpvUid(null);
    
    // Set the intent to re-verify (this will trigger useEffect)
    setWantsToReverify(true);
  };

  // Initialize camera when showCamera becomes true
  useEffect(() => {
    let stream: MediaStream | null = null;

    const setupCamera = async () => {
      if (showCamera && videoRef.current) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { 
              facingMode: "user",
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Camera access error:", err);
          setError("Camera access failed. Please enable permissions or use the mobile camera option.");
          setShowCamera(false);
        }
      }
    };

    if (showCamera) {
      setupCamera();
    }

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showCamera]);

  const stopCamera = () => {
    setShowCamera(false);
    // Stop camera stream
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const shouldShowCamera = ipvUid && (wantsToReverify || !isStepCompleted(CheckpointStep.IPV));
  const shouldShowCompletedState = isStepCompleted(CheckpointStep.IPV) && !wantsToReverify;

  // Always show the same UI - whether fresh or completed
  if (showQrCode && ipvUid) {
    return (
      <QrCodeVerification
        onBack={() => setShowQrCode(false)}
        onComplete={onNext}
        ipvUid={ipvUid}
      />
    );
  }

  // Show initialization loading
  if (!isInitialized && isLoading) {
    return (
      <div className="mx-auto mt-16">
        <FormHeading
          title="Video Verification (IPV)"
          description="Initializing verification session..."
        />
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <span className="ml-3 text-gray-600">Setting up verification...</span>
        </div>
      </div>
    );
  }

  // Show error state if initialization failed
  if (!isInitialized && error) {
    return (
      <div className="mx-auto mt-16">
        <FormHeading
          title="Video Verification (IPV)"
          description="Failed to initialize verification session."
        />
        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
        <Button
          onClick={handleRetry}
          variant="ghost"
          className="w-full py-6"
        >
          Try Again
        </Button>
      </div>
    );
  }

  const getButtonText = () => {
    if (isLoading) return "Uploading...";
    if (isStepCompleted(CheckpointStep.IPV) && !imageFile && !wantsToReverify) return "Continue";
    return "Continue";
  };

  return (
    <div className="mx-auto mt-16">
      <FormHeading
        title="Video Verification (IPV)"
        description="A quick face-to-face verification for security."
      />

      {/* Show loading message when initializing for re-verification */}
      {wantsToReverify && !ipvUid && isLoading && (
        <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <p className="text-blue-700 text-sm">Initializing new verification session...</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="border-2 border-dashed h-[300px] border-gray-300 rounded-lg flex flex-col items-center justify-center overflow-hidden">
          {shouldShowCompletedState ? (
            // Show completed state with option to verify again
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-600 font-medium">IPV Verification Completed</p>
              <p className="text-gray-600 text-sm">Click below to verify again if needed</p>
              <Button
                onClick={handleVerifyAgain}
                variant="ghost"
                className="py-3"
              >
                Verify Again
              </Button>
            </div>
          ) : showCamera ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded"
            />
          ) : imageFile ? (
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="relative w-full h-[250px]">
                <Image
                  src={URL.createObjectURL(imageFile)}
                  alt="IPV Preview"
                  className="object-contain rounded"
                  fill
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Camera className="w-16 h-16 mx-auto text-gray-400" />
              <p className="text-gray-600">Camera will open automatically</p>
              {!cameraAutoStarted && shouldShowCamera && (
                <div className="flex justify-center">
                </div>
              )}
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {showCamera && (
          <div className="flex justify-center mt-4 gap-4">
            <Button onClick={capturePhoto} variant="ghost" className="py-2">
              Capture Photo
            </Button>
            <Button onClick={stopCamera} variant="outline" className="py-2">
              Cancel
            </Button>
          </div>
        )}

        {imageFile && shouldShowCamera && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                setImageFile(null);
                setError(null);
                // Auto-restart camera
                setTimeout(() => startCamera(), 100);
              }}
              variant="outline"
              className="py-2"
            >
              Re-Capture
            </Button>
          </div>
        )}

        {error && (
          <div className="mt-2 p-2 bg-red-50 rounded">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* QR Code option - only show when camera should be available */}
        {shouldShowCamera && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowQrCode(true)}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
              disabled={!ipvUid}
            >
              Problems with Webcam? Use Mobile Camera
            </button>
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={
          !!((!imageFile && !shouldShowCompletedState) || 
          isLoading || 
          (shouldShowCamera && !ipvUid))
        }
        variant="ghost"
        className={`w-full py-6 ${
          ((!imageFile && !shouldShowCompletedState) || isLoading || (shouldShowCamera && !ipvUid)) 
            ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {getButtonText()}
      </Button>

      <div className="text-center text-sm text-gray-600 mt-4">
        <p>
          Please ensure your face is clearly visible and well-lit for successful verification.
          Session expires in 10 minutes.
        </p>
      </div>
    </div>
  );
};

export default IPVVerification;