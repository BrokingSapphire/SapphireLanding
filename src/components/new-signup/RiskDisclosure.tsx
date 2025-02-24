import React from "react";

interface RiskDisclosureModalProps {
  onAccept: () => void;
  onClose: () => void;
}

const RiskDisclosureModal: React.FC<RiskDisclosureModalProps> = ({
  onAccept,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="p-8">
          <h3 className="text-2xl font-semibold mb-6">
            Risk Disclosures on Derivatives
          </h3>

          <div className="space-y-4 text-gray-700">
            <ul className="list-disc pl-5 space-y-4 text-base">
              <li>
                9 out of 10 individual traders in the equity Futures and Options Segment 
                incurred net losses.
              </li>
              <li>
                On average, loss-makers registered a net trading loss close to ₹50,000.
              </li>
              <li>
                Over and above the net trading losses incurred, loss-makers expended an 
                additional 28% of net trading losses as transaction costs.
              </li>
              <li>
                Those making net trading profits incurred between 15% to 50% of such 
                profits as transaction costs.
              </li>
            </ul>

            <div className="mt-8 text-sm text-gray-600">
              <p>
                Source: <span className="text-teal-800">SEBI study</span> dated January 25, 2023 
                on &quot;Analysis of Profit and Loss of Individual Traders dealing in equity 
                Futures and Options (F&O) Segment&quot;, wherein Aggregate Level findings are 
                based on annual Profit/Loss incurred by individual traders in equity F&O during 
                FY 2021-22.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              className="bg-green-500 text-white px-8 py-3 rounded font-medium hover:bg-green-600 transition-colors"
            >
              Understood!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskDisclosureModal;