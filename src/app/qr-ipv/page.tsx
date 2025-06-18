'use client';

import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

// Separate component to handle search params
const QRIPVContent = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!uid) {
      setError("Invalid verification link");
    }
  }, [uid]);

  const startCamera = async () => {
    try {
      setShowCamera(true);
      setError(null);
    } catch {
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
            const capturedFile = new File([blob], "mobile-ipv-verification.jpg", {
              type: "image/jpeg",
            });
            setImageFile(capturedFile);
            setShowCamera(false);

            // Stop camera
            const stream = video.srcObject as MediaStream;
            if (stream) {
              stream.getTracks().forEach((track) => track.stop());
            }
          }
        }, "image/jpeg", 0.8);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || !uid) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      // Use your existing putIpv endpoint
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/ipv/${uid}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          // NOTE: No withCredentials here because mobile doesn't have the user's cookies
          // The backend validates using the UUID in Redis
        }
      );

      setSuccess(true);
    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: { message?: string } } };
      if (error.response?.status === 401) {
        setError("Verification session expired. Please scan the QR code again.");
      } else if (error.response?.data?.message) {
        setError(`Upload failed: ${error.response.data.message}`);
      } else {
        setError("Verification failed. Please try again.");
      }
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
            video: { 
              facingMode: "user",
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch {
          setError("Camera access failed. Please enable permissions.");
          setShowCamera(false);
        }
      }
    };

    if (showCamera) {
      setupCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showCamera]);

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Complete!</h1>
            <p className="text-gray-600">
              Your identity has been verified successfully. You can now close this page and continue on your computer.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="mb-4">
            <Image 
              src="/logo.png"
              alt="Sapphire Broking"
              width={32}
              height={32}
              className="h-8 mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Identity Verification</h1>
          <p className="text-gray-600">Take a clear photo of your face for verification</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 rounded border border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center min-h-[200px] flex flex-col items-center justify-center">
            {showCamera ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-48 object-cover rounded"
              />
            ) : imageFile ? (
              <div className="space-y-4">
                <div className="relative w-full h-32">
                  <Image
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="object-contain rounded"
                    fill
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="w-12 h-12 mx-auto text-gray-400" />
                <p className="text-gray-600">Take a photo or upload an image</p>
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {showCamera ? (
          <div className="flex gap-3 mb-4">
            <Button onClick={capturePhoto} className="flex-1">
              Capture Photo
            </Button>
            <Button 
              onClick={() => {
                setShowCamera(false);
                const video = videoRef.current;
                if (video && video.srcObject) {
                  const stream = video.srcObject as MediaStream;
                  stream.getTracks().forEach((track) => track.stop());
                }
              }} 
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            <Button onClick={startCamera} className="w-full" disabled={isLoading}>
              <Camera className="w-4 h-4 mr-2" />
              Open Camera
            </Button>
            
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              variant="outline" 
              className="w-full"
              disabled={isLoading}
            >
              <Upload className="w-4 h-4 mr-2" />
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
        )}

        {imageFile && !showCamera && (
          <div className="space-y-3">
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading} 
              className="w-full"
            >
              {isLoading ? "Verifying..." : "Submit Verification"}
            </Button>
            
            <Button 
              onClick={() => setImageFile(null)} 
              variant="outline" 
              className="w-full"
              disabled={isLoading}
            >
              Take Another Photo
            </Button>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Secure verification powered by Sapphire Broking</p>
        </div>
      </div>
    </div>
  );
};

// Main page component with Suspense wrapper
const QRIPVPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification page...</p>
        </div>
      </div>
    }>
      <QRIPVContent />
    </Suspense>
  );
};

export default QRIPVPage;