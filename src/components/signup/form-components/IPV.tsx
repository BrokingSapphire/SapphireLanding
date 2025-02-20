import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image';

interface IPVVerificationProps {
  onNextStep: () => void;
}

const IPVVerification: React.FC<IPVVerificationProps> = ({ onNextStep }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCameraClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'user';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setImageFile(file);
      }
    };
    input.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile || isLoading) return;

    setIsLoading(true);
    try {
      // Simulated upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onNextStep();
    } catch (error) {
      console.error('Error during image upload:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-1">In-Person Verification (IPV)</h1>
      <p className="text-gray-600 mb-6">Step 7 of 9</p>

      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          {imageFile ? (
            <div className="space-y-4">
              <Image 
                src={URL.createObjectURL(imageFile)} 
                alt="Preview" 
                className="max-w-full h-auto mx-auto rounded"
                width={1000}
                height={1000}
              />
              <button
                onClick={() => setImageFile(null)}
                className="text-teal-800 hover:text-teal-700"
              >
                Remove image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">Turn on your camera</p>
              <button
                onClick={handleCameraClick}
                className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Allow
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleCameraClick}
            className="flex items-center px-4 py-2 border border-gray-300 rounded hover:border-gray-400 transition-colors"
          >
            <Camera className="w-5 h-5 mr-2" />
            Re-Image
          </button>
          <label className="flex items-center px-4 py-2 border border-gray-300 rounded hover:border-gray-400 transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            Upload Image
          </label>
        </div>
      </div>

      {imageFile && (
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full bg-teal-800 text-white py-3 rounded transition-colors
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'}`}
        >
          {isLoading ? 'Uploading...' : 'Continue'}
        </button>
      )}

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Problems with Webcam?{' '}
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Click Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default IPVVerification;