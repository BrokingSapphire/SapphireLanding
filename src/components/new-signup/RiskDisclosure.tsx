import React from "react";
import { Button } from "../ui/button";

interface RiskDisclosureModalProps {
  onAccept: () => void;
  onClose: () => void;
}

const RiskDisclosureModal: React.FC<RiskDisclosureModalProps> = ({ onAccept, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[45vh] overflow-y-auto shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Risk Disclosures on Derivatives</h2>
        <div className="text-sm text-gray-700 max-h-[60vh] overflow-y-auto">
          <ul className="list-disc pl-5">
            <li>9 out of 10 individual traders in the equity Futures and Options Segment incurred net losses.</li>
            <li>On average, loss-makers registered a net trading loss close to ₹50,000.</li>
            <li>Over and above the net trading losses incurred, loss-makers expended an additional 28% of net trading losses as transaction costs.</li>
            <li>Those making net trading profits incurred between 15% to 50% of such profits as transaction costs.</li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">
            <strong>Source:</strong> <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">SEBI study</a> dated January 25, 2023 on "Analysis of Profit and Loss of Individual Traders dealing in equity Futures and Options (F&O) Segment", wherein Aggregate Level findings are based on annual Profit/Loss incurred by individual traders in equity F&O during FY 2021-22.
          </p>
        </div>
        <div className="flex justify-end mt-6 gap-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button variant="outline" onClick={onAccept}>I Accept</Button>
        </div>
      </div>
    </div>
  );
};

export default RiskDisclosureModal;