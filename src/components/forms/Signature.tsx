import React, { useState, useRef, useEffect } from "react";
import FormHeading from "./FormHeading";
import SignatureQrCode from "./SignatureQrCode";
import axios from "axios";
import Cookies from 'js-cookie';
import { useCheckpoint, CheckpointStep } from '@/hooks/useCheckpoint'; // Adjust import path as needed

interface SignatureComponentProps {
  onNext: () => void;
  initialData?: any;
  isCompleted?: boolean;
}

const SignatureComponent: React.FC<SignatureComponentProps> = ({ 
  onNext, 
  initialData, 
  isCompleted 
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);
  const [signatureUid, setSignatureUid] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Use the checkpoint hook to check for existing signature data
  const { 
    isStepCompleted,
    getStepData,
    refetchStep 
  } = useCheckpoint();

  // Check if signature is already completed from the hook
  useEffect(() => {
    if (isStepCompleted(CheckpointStep.SIGNATURE)) {
      // Signature is already completed, no need to initialize
      setIsInitialized(true);
      return;
    }

    // If not completed and not initialized, initialize signature
    if (!isInitialized) {
      initializeSignature();
    }
  }, [isStepCompleted, isInitialized]);

  // Check if there's existing signature data
  useEffect(() => {
    const signatureData = getStepData(CheckpointStep.SIGNATURE);
    if (signatureData?.url) {
      // Signature already exists
      setIsInitialized(true);
    }
  }, [getStepData]);

  const initializeSignature = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const authToken = Cookies.get('authToken');
      if (!authToken) {
        setError("Authentication token not found. Please restart the process.");
        setIsLoading(false);
        return;
      }

      // Use the correct endpoint for signature initialization
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/checkpoint`,
        {
          step: "signature"
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      if (response.data?.data?.uid) {
        setSignatureUid(response.data.data.uid);
        setIsInitialized(true);
      } else {
        setError("Failed to initialize signature session. Please try again.");
      }
    } catch (err: any) {
      console.error("Signature initialization error:", err);
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

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions with higher resolution for better quality
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Scale context to handle the resolution difference
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    contextRef.current = context;
  };

  useEffect(() => {
    if (isInitialized) {
      initializeCanvas();
      // Add resize listener to reinitialize canvas when window resizes
      const handleResize = () => {
        initializeCanvas();
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isInitialized]);

  const startDrawing = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    setIsDrawing(true);
    const context = contextRef.current;
    if (!context) return;

    let clientX, clientY;

    if ("touches" in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
      event.preventDefault(); // Prevent scrolling on touch
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const boundingRect = canvasRef.current?.getBoundingClientRect();
    if (!boundingRect) return;

    const x = clientX - boundingRect.left;
    const y = clientY - boundingRect.top;

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const context = contextRef.current;
    if (!context) return;

    let clientX, clientY;

    if ("touches" in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
      event.preventDefault(); // Prevent scrolling on touch
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const boundingRect = canvasRef.current?.getBoundingClientRect();
    if (!boundingRect) return;

    const x = clientX - boundingRect.left;
    const y = clientY - boundingRect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    contextRef.current?.closePath();

    if (canvasRef.current) {
      const signatureData = canvasRef.current.toDataURL();
      setSignature(signatureData);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
    setError(null);
  };

  const convertDataURLToFile = (dataURL: string, filename: string): File => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async () => {
    // If already completed, just go to next step
    if (isStepCompleted(CheckpointStep.SIGNATURE)) {
      onNext();
      return;
    }

    if (!signature || isLoading || !signatureUid) return;

    setIsLoading(true);
    setError(null);

    try {
      const authToken = Cookies.get('authToken');
      if (!authToken) {
        setError("Authentication token not found. Please restart the process.");
        setIsLoading(false);
        return;
      }

      // Convert canvas signature to file
      const signatureFile = convertDataURLToFile(signature, "signature.png");
      
      const formData = new FormData();
      formData.append('image', signatureFile);

      // Use the correct PUT endpoint for signature upload
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup/signature/${signatureUid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      // Refetch signature step to update the hook
      refetchStep(CheckpointStep.SIGNATURE);

      // If successful, proceed to next step
      onNext();
    } catch (err: any) {
      console.error("Signature upload error:", err);
      if (err.response) {
        if (err.response.data?.message) {
          setError(`Upload failed: ${err.response.data.message}`);
        } else if (err.response.status === 401) {
          setError("Session expired. Please try again.");
          // Re-initialize signature session
          setIsInitialized(false);
          setSignatureUid(null);
          clearSignature();
        } else if (err.response.status === 422) {
          setError("Invalid signature format. Please try again.");
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

  const handleRetry = () => {
    setError(null);
    setIsInitialized(false);
    setSignatureUid(null);
    clearSignature();
    initializeSignature();
  };

  const handleQrCodeClick = () => {
    setShowQrCode(true);
  };

  // Show completed state
  if (isStepCompleted(CheckpointStep.SIGNATURE)) {
    return (
      <div className="mx-auto mt-16">
        <FormHeading
          title="Signature Completed!"
          description="Your signature has been submitted successfully."
        />

        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-green-800 font-medium">Signature Submitted Successfully!</h3>
              <p className="text-green-700 text-sm">Your signature has been captured and verified.</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full px-8 py-6 rounded bg-teal-800 hover:bg-teal-900 text-white"
        >
          Continue to Next Step
        </button>
      </div>
    );
  }

  // Render QR code component if user clicks "Click Here"
  if (showQrCode && signatureUid) {
    return (
      <SignatureQrCode
        onBack={() => setShowQrCode(false)}
        onComplete={onNext}
        signatureUid={signatureUid}
      />
    );
  }

  // Show initialization loading
  if (!isInitialized && isLoading) {
    return (
      <div className="mx-auto mt-16">
        <FormHeading
          title="Signature"
          description="Initializing signature session..."
        />
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <span className="ml-3 text-gray-600">Setting up signature pad...</span>
        </div>
      </div>
    );
  }

  // Show error state if initialization failed
  if (!isInitialized && error) {
    return (
      <div className="mx-auto mt-16">
        <FormHeading
          title="Signature"
          description="Failed to initialize signature session."
        />
        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
        <button
          onClick={handleRetry}
          className="w-full px-8 py-6 rounded bg-teal-800 hover:bg-teal-900 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16">
      <FormHeading
        title="Signature"
        description="Add your signature to complete the paperwork"
      />

      {!signatureUid && (
        <div className="mb-4 p-3 bg-yellow-50 rounded border border-yellow-200">
          <p className="text-yellow-600 text-sm">Signature session not ready. Please wait...</p>
        </div>
      )}

      <div className="mb-6">
        <div className="border-2 border-dashed h-[300px] border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            className={`w-full h-full bg-white rounded-md touch-none ${
              !signatureUid ? "opacity-50 cursor-not-allowed" : "cursor-crosshair"
            }`}
            onMouseDown={signatureUid ? startDrawing : undefined}
            onMouseMove={signatureUid ? draw : undefined}
            onMouseUp={signatureUid ? stopDrawing : undefined}
            onMouseLeave={signatureUid ? stopDrawing : undefined}
            onTouchStart={signatureUid ? startDrawing : undefined}
            onTouchMove={signatureUid ? draw : undefined}
            onTouchEnd={signatureUid ? stopDrawing : undefined}
          />
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={clearSignature}
            disabled={!signatureUid || isLoading}
            className={`px-8 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 ${
              (!signatureUid || isLoading) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Clear
          </button>

          <button
            onClick={handleSubmit}
            disabled={!signature || isLoading || !signatureUid}
            className={`px-8 py-2 rounded bg-teal-800 hover:bg-teal-900 text-white ${
              (!signature || isLoading || !signatureUid) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* QR Code option */}
        <div className="text-center mt-4">
          <button
            onClick={handleQrCodeClick}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
            disabled={!signatureUid}
          >
            Problems with Signature Pad? Use Mobile to Sign
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-4">
        <p>
          Please sign clearly within the box above. Your signature will be used for document verification.
          Session expires in 10 minutes.
        </p>
      </div>
    </div>
  );
};

export default SignatureComponent;