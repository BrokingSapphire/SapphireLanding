import React, { useState, useRef } from "react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
  
      // Create a modal-like popup to show the camera feed
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.background = "rgba(0,0,0,0.8)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = "1000";
  
      const captureButton = document.createElement("button");
      captureButton.innerText = "Capture";
      captureButton.style.position = "absolute";
      captureButton.style.bottom = "20px";
      captureButton.style.padding = "10px 20px";
      captureButton.style.background = "#fff";
      captureButton.style.border = "none";
      captureButton.style.cursor = "pointer";
  
      const closeButton = document.createElement("button");
      closeButton.innerText = "✕";
      closeButton.style.position = "absolute";
      closeButton.style.top = "20px";
      closeButton.style.right = "20px";
      closeButton.style.color = "#fff";
      closeButton.style.background = "transparent";
      closeButton.style.border = "none";
      closeButton.style.fontSize = "24px";
      closeButton.style.cursor = "pointer";
  
      const canvas = document.createElement("canvas");
      overlay.appendChild(video);
      overlay.appendChild(captureButton);
      overlay.appendChild(closeButton);
      document.body.appendChild(overlay);
  
      const cleanup = () => {
        stream.getTracks().forEach((track) => track.stop());
        document.body.removeChild(overlay);
      };
  
      captureButton.onclick = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              const capturedFile = new File([blob], "captured-image.jpg", {
                type: "image/jpeg",
              });
              setImageFile(capturedFile);
            }
          }, "image/jpeg");
        }
        cleanup();
      };
  
      closeButton.onclick = cleanup;
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Camera access failed. Please enable permissions.");
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

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (showQrCode) {
    return <QrCodeVerification onBack={() => setShowQrCode(false)} onComplete={onNext} />;
  }

  return (
    <div className="mx-auto mt-16">
      <FormHeading
        title="Video Verification (IPV)"
        description="A quick face-to-face verification for security."
      />
      <div className="mb-6">
        <div className="border-2 border-dashed h-[300px] border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center">
          {imageFile ? (
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="relative w-full h-64">
                <Image
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="object-contain rounded"
                  fill
                  sizes="(max-width: 400px) 100vw, 400px"
                  priority
                />
              </div>

              <Button
                onClick={() => {
                  setImageFile(null);
                  setError(null);
                }}
                variant="ghost"
                className="mt-4 py-4 w-40"
              >
                Re-Capture
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Camera className="w-16 h-16 mx-auto text-gray-400" />
              <p className="text-gray-600">Turn on your camera or upload an image</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  onClick={handleCameraCapture}
                  variant="ghost"
                  className="py-3"
                >
                  Allow Camera Access
                </Button>
                <Button
                  onClick={handleBrowseClick}
                  variant="outline"
                  className="py-3"
                >
                  Browse files
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

        {error && (
          <div className="mt-2 p-2 bg-red-50 rounded">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Added "Problems with Webcam? Click Here" with onClick handler */}
        <div className="text-center mt-4">
          <button 
            onClick={() => setShowQrCode(true)} 
            className="text-sm bg-transparent border-none cursor-pointer"
          >
            Problems with Webcam? <span className="text-blue-500 underline font-medium">Click Here</span>
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