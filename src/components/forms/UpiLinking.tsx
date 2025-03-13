import React from "react";
import { Button } from "../ui/button";
import FormHeading from "./FormHeading";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

interface UpiLinkingProps {
  onNext: () => void;
  onBack: () => void;
}

const UpiLinking: React.FC<UpiLinkingProps> = ({  onBack }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <FormHeading 
        title="Bank Account Details" 
        description="Seamlessly link your bank for smooth transactions." 
      />
      
      <div className="mt-6 bg-gray-50 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">UPI QR</h3>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>4:48</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex-1 flex justify-center">
            <div className="bg-white p-4 rounded-lg">
              <Image 
              width={100}  
              height={100}  
                src="/api/placeholder/200/200" 
                alt="QR Code" 
                className="w-48 h-48"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <p className="text-gray-700 mb-4">Scan the QR using any UPI App</p>
            
            <div className="flex space-x-2 mb-6">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">₹</span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">G</span>
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">P</span>
              </div>
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">P</span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <h4 className="font-medium">Scan QR Code</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>₹1 will be debited from your account and refunded within 24 hours.</li>
                <li>Scan using any UPI app to complete bank verification.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button 
          type="button" 
          variant="link" 
          onClick={onBack}
          className="text-blue-500 mr-auto flex items-center"
        >
          Enter details manually <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UpiLinking;