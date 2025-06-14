import React, { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import QrCodeVerification from "./QrCodeVerification";
import axios from "axios";

interface IPVVerificationProps {
  onNext: () => void;
  initialData?: any;
  isCompleted?: boolean;
}

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize IPV when component mounts (if not completed)
  useEffect(() => {
    if (!isCompleted && !isInitialized) {
      initializeIPV();
    }
  }, [isCompleted, isInitialized]);

  const initializeIPV = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "ipv"
        }
      );

      if (response.data?.data?.uid) {
        setIpvUid(response.data.data.uid);
        setIsInitialized(true);
      } else {
        setError("Failed to initialize IPV. Please try again.");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError("Failed to initialize IPV. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      setShowCamera(true);
      setError(null);
      // Camera will be initialized in useEffect when showCamera becomes true
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
        }, "image/jpeg", 0.8); // 0.8 quality for better compression
      }
    }
  };

  const validateAndSetImage = (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setImageFile(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || isLoading || !ipvUid) return;

    if (isCompleted) {
      onNext();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/ipv/${ipvUid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // If successful, proceed to next step
      onNext();
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(`Upload failed: ${err.response.data.message}`);
      } else if (err.response?.status === 401) {
        setError("Upload session expired. Please try again.");
        // Re-initialize IPV
        setIsInitialized(false);
        setIpvUid(null);
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setImageFile(null);
    setError(null);
    setIsInitialized(false);
    setIpvUid(null);
    initializeIPV();
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
          setError("Camera access failed. Please enable permissions.");
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

  // Show completed state
  if (isCompleted) {
    return (
      <div className="mx-auto mt-16">
        <FormHeading
          title="IPV Verification Completed!"
          description="Your video verification has been completed successfully."
        />

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-green-800 font-medium">IPV Verification Successful!</h3>
              <p className="text-green-700 text-sm">Your identity has been verified through video.</p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          variant="ghost"
          className="w-full py-6"
        >
          Continue to Next Step
        </Button>
      </div>
    );
  }

  if (showQrCode) {
    return (
      <QrCodeVerification
        onBack={() => setShowQrCode(false)}
        onComplete={onNext}
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

  return (
    <div className="mx-auto mt-16">
      <FormHeading
        title="Video Verification (IPV)"
        description="A quick face-to-face verification for security."
      />

      {!ipvUid && (
        <div className="mb-4 p-3 bg-yellow-50 rounded border border-yellow-200">
          <p className="text-yellow-600 text-sm">Verification session not ready. Please wait...</p>
        </div>
      )}

      <div className="mb-6">
        <div className="border-2 border-dashed h-[300px] border-gray-300 rounded-lg flex flex-col items-center justify-center overflow-hidden">
          {showCamera ? (
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
              <p className="text-gray-600">Use camera for verification</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button 
                  onClick={startCamera} 
                  variant="ghost" 
                  className="py-3"
                  disabled={!ipvUid}
                >
                  Open Camera
                </Button>

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="py-3"
                  disabled={!ipvUid}
                >
                  Upload Image
                </Button>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {showCamera && (
          <div className="flex justify-center mt-4 gap-4">
            <Button onClick={capturePhoto} variant="ghost" className="py-2">
              Capture
            </Button>
            <Button onClick={stopCamera} variant="outline" className="py-2">
              Cancel
            </Button>
          </div>
        )}

        {imageFile && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                setImageFile(null);
                setError(null);
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

        {/* QR Code fallback - will implement later when APIs are ready */}
        <div className="hidden sm:block text-center mt-4">
          <button
            onClick={() => setShowQrCode(true)}
            className="text-sm bg-transparent border-none cursor-pointer"
            disabled // Temporarily disabled until QR APIs are ready
          >
            Problems with Webcam?{" "}
            <span className="text-gray-400 line-through">
              Click Here
            </span>
            <span className="text-xs text-gray-500 block">
              (QR verification coming soon)
            </span>
          </button>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!imageFile || isLoading || !ipvUid}
        variant="ghost"
        className={`w-full py-6 ${
          (!imageFile || isLoading || !ipvUid) ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Uploading..." : "Continue"}
      </Button>

      <div className="text-center text-xs text-gray-600 mt-4">
        <p>
          Please ensure your face is clearly visible and well-lit for successful verification.
          Session expires in 10 minutes.
        </p>
      </div>
    </div>
  );
};

export default IPVVerification;