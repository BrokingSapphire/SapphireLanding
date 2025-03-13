import React from "react";
import { ArrowLeft } from "lucide-react";
import FormHeading from "./FormHeading";

interface SignatureQrCodeProps {
  onBack: () => void;
  onComplete: () => void;
}

const SignatureQrCode: React.FC<SignatureQrCodeProps> = ({ onBack, onComplete }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <FormHeading 
        title="Signature" 
        description="A quick scan to secure your trades—verify your signature in seconds!" 
      />
      
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="border-2 border-gray-300 rounded-lg p-4 mb-4">
          <div className="w-48 h-48">
            {/* QR Code SVG */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="200" height="200" fill="white" />
              <path
                d="M40 40H80V80H40V40ZM120 40H160V80H120V40ZM40 120H80V160H40V120Z"
                fill="#0A5F5C"
              />
              <path
                d="M100 40H110V50H100V40ZM90 50H100V60H90V50ZM110 50H120V60H110V50ZM80 60H90V70H80V60ZM100 60H110V70H100V60ZM120 60H130V70H120V60ZM90 70H100V80H90V70ZM110 70H120V80H110V70ZM130 70H140V80H130V70ZM150 70H160V80H150V70ZM80 80H90V90H80V80ZM100 80H110V90H100V80ZM130 80H140V90H130V80ZM90 90H100V100H90V90ZM110 90H120V100H110V90ZM140 90H150V100H140V90ZM80 100H90V110H80V100ZM100 100H110V110H100V100ZM120 100H130V110H120V100ZM150 100H160V110H150V100ZM40 110H50V120H40V110ZM90 110H100V120H90V110ZM110 110H120V120H110V110ZM130 110H140V120H130V110ZM150 110H160V120H150V110ZM100 120H110V130H100V120ZM120 120H130V130H120V120ZM140 120H150V130H140V120ZM90 130H100V140H90V130ZM110 130H120V140H110V130ZM130 130H140V140H130V130ZM150 130H160V140H150V130ZM80 140H90V150H80V140ZM100 140H110V150H100V140ZM120 140H130V150H120V140ZM140 140H150V150H140V140ZM90 150H100V160H90V150ZM110 150H120V160H110V150ZM130 150H140V160H130V150ZM150 150H160V160H150V150Z"
                fill="#0A5F5C"
              />
            </svg>
          </div>
        </div>
        
        <p className="text-center font-medium mb-6">
          Scan this QR code with your phone to continue!
        </p>
        
        <button
          onClick={onBack}
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          go-back
        </button>
      </div>
      
      {/* Demo-only button to simulate completing the signature via QR code */}
      
    </div>
  );
};

export default SignatureQrCode;