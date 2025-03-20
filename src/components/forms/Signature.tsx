import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import SignatureQrCode from "./SignatureQrCode";

interface SignatureComponentProps {
  onNext: () => void;
}

const SignatureComponent: React.FC<SignatureComponentProps> = ({ onNext }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

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

  React.useEffect(() => {
    initializeCanvas();
    // Add resize listener to reinitialize canvas when window resizes
    const handleResize = () => {
      initializeCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const context = contextRef.current;
    if (!context) return;
    
    let clientX, clientY;
    
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
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

  const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const context = contextRef.current;
    if (!context) return;
    
    let clientX, clientY;
    
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
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
  };

  const handleSubmit = () => {
    if (signature) {
      onNext();
    }
  };

  const handleQrCodeClick = () => {
    setShowQrCode(true);
  };

  // Render QR code component if user clicks "Click Here"
  if (showQrCode) {
    return <SignatureQrCode onBack={() => setShowQrCode(false)} onComplete={onNext} />;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <FormHeading 
        title="Signature" 
        description="Add your signature to complete the paperwork" 
      />
      
      <div className="mt-6">
        <canvas
          ref={canvasRef}
          className="w-full h-72 bg-gray-100 rounded-md touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        
        <div className="hidden sm:block mt-2 text-center">
          <button 
            className=" text-sm"
            onClick={handleQrCodeClick}
          >
            Problems with Signature? <span className=" text-blue-500 underline">Click Here</span>
          </button>
        </div>
        
        <div className="flex justify-between mt-4">
          <button 
            onClick={clearSignature}
            className="px-8 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Clear
          </button>
          
          <button 
            onClick={handleSubmit}
            disabled={!signature}
            className= "px-8 py-2 rounded bg-teal-800 hover:bg-teal-900 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureComponent;