import React, { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import QrCodeVerification from "./QrCodeVerification";

interface IPVVerificationProps {
  onNext: () => void;
}

const IPVVerification: React.FC<IPVVerificationProps> = ({ onNext }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            const capturedFile = new File([blob], "captured-image.jpg", {
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
        }, "image/jpeg");
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
    if (!imageFile || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement actual image upload and verification logic here
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onNext();
    } catch (err) {
      setError("Verification failed. Please try again.");
      // Log the error for debugging
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize camera when showCamera becomes true
  useEffect(() => {
    let stream: MediaStream | null = null;

    const setupCamera = async () => {
      if (showCamera && videoRef.current) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
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

  if (showQrCode) {
    return (
      <QrCodeVerification
        onBack={() => setShowQrCode(false)}
        onComplete={onNext}
      />
    );
  }

  return (
    <div className="mx-auto mt-16">
      <FormHeading
        title="Video Verification (IPV)"
        description="A quick face-to-face verification for security."
      />
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
              <div className="relative w-full h-[100vh]">
                <Image
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="object-contain rounded"
                  fill
                  // sizes="(max-width: 400px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Camera className="w-16 h-16 mx-auto text-gray-400" />
              <p className="text-gray-600">Use camera for verification</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button onClick={startCamera} variant="ghost" className="py-3">
                  Open Camera
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
            <Button onClick={stopCamera} variant="ghost" className="py-2">
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
              variant="ghost"
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

        {/* Added "Problems with Webcam? Click Here" with onClick handler */}
        <div className="hidden sm:block text-center mt-4">
          <button
            onClick={() => setShowQrCode(true)}
            className="text-sm bg-transparent border-none cursor-pointer"
          >
            Problems with Webcam?{" "}
            <span className="text-blue-500 underline font-medium">
              Click Here
            </span>
          </button>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!imageFile || isLoading}
        variant="ghost"
        className={`w-full py-6 ${
          !imageFile || isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Verifying..." : "Continue"}
      </Button>
    </div>
  );
};

export default IPVVerification;
