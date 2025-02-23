import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image'
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
    } catch (error) {
      setError('Camera access failed. Please try again or use file upload.');
    }
  };

  const validateAndSetImage = (file: File) => {
    // Reset error state
    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    // Validate file size (max 5MB)
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
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-16">
      <h2 className="text-3xl font-bold mb-2">In-Person Verification (IPV)</h2>
      <p className="text-gray-600 mb-8">
        Complete your verification by taking a clear photo
      </p>

      <div className="mb-6  ">
        <div className="border-2 border-dashed h-[300px] border-gray-300 rounded-lg p-8">
          {imageFile ? (
            <div className="space-y-4">
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="max-w-full h-auto mx-auto rounded"
                width={400}
                height={400}
              />
              <button
                onClick={() => setImageFile(null)}
                className="text-teal-800 hover:text-teal-700 block mx-auto"
              >
                Remove image
              </button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Camera className="w-16 h-16 mx-auto text-gray-400" />
              <p className="text-gray-600">Turn on your camera or upload an image</p>
              <button
                onClick={handleCameraCapture}
                className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Allow Camera Access
              </button>
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
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

      <button
        onClick={handleSubmit}
        disabled={!imageFile || isLoading}
        className={`w-full bg-teal-800 text-white py-3 rounded font-medium transition-colors ${
          !imageFile || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'
        }`}
      >
        {isLoading ? 'Verifying...' : 'Continue'}
      </button>
    </div>
  );
};

export default IPVVerification;