import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import FormHeading from '../general-components/formHeading';

const IPVVerification = ({ onNext }: { onNext: () => void }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraCapture = () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'user';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          validateAndSetImage(file);
        }
      };
      input.click();
    } catch (err) {
        console.error('Camera access error:', err); // Log the error
        setError('Camera access failed. Please try again or use file upload.');
    }
  };

  const validateAndSetImage = (file: File) => {
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      onNext();
    } catch (err) {
      setError('Verification failed. Please try again.');
      // Log the error for debugging
      console.error('Verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-16">
      <FormHeading
        title={"Video Verification (IPV)"}
        description={"A quick face-to-face verification for security."}
      />
      <div className="mb-6">
        <div className="border-2 border-dashed h-[300px] border-gray-300 rounded-lg p-8">
          {imageFile ? (
            <div className="space-y-4">
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
                variant={"ghost"}
                className="mt-6 py-6"
              >
                Remove Image
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Camera className="w-16 h-16 mx-auto text-gray-400" />
              <p className="text-gray-600">
                Turn on your camera or upload an image
              </p>
              <Button
                onClick={handleCameraCapture}
                variant={"ghost"}
                className="py-3"
              >
                Allow Camera Access
              </Button>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-2 p-2 bg-red-50 rounded">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleCameraCapture}
            className="flex items-center px-4 py-2 border border-gray-300 rounded hover:border-gray-400 transition-colors"
          >
            <Camera className="w-5 h-5 mr-2" />
            Re-Capture
          </button>
          <label className="flex items-center px-4 py-2 border border-gray-300 rounded hover:border-gray-400 transition-colors cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            Upload Image
          </label>
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!imageFile || isLoading}
        variant={"ghost"}
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