// import React, { useState } from "react";
// import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
// import Image from "next/image";

// // Define image paths
// const IMAGES = {
//   visa: "/signup/visa.png",
//   upi: "/signup/upi.png",
//   nbank: "/signup/nbank.png"
// } as const;

// interface PaymentOptionProps {
//   label: string;
//   icon?: string;
//   isSelected: boolean;
//   onClick: () => void;
//   cardLogos?: string[];
// }

// interface FormData {
//   selectedPayment: string;
//   isValid: boolean;
// }

// interface BankSelectionProps {
//   onNextStep: (paymentMethod: string) => void;
//   formData: FormData;
//   updateFormData: (data: Partial<FormData>) => void;
// }

// const PaymentOption: React.FC<PaymentOptionProps> = ({
//   label,
//   icon,
//   isSelected,
//   onClick,
//   cardLogos,
// }) => (
//   <div
//     onClick={onClick}
//     className={`flex items-center p-4 mb-4 border rounded-lg cursor-pointer transition-colors ${
//       isSelected ? "border-teal-800 bg-teal-50" : "hover:border-teal-800"
//     }`}
//   >
//     <div className="w-6 h-6 border-2 border-teal-800 rounded-full flex items-center justify-center mr-4">
//       {isSelected && <div className="bg-teal-800 rounded-full h-4 w-4" />}
//     </div>
//     <span className="text-xl flex-grow">{label}</span>
//     <div className="flex items-center gap-2">
//       {cardLogos?.map((logo, index) => (
//         <Image
//           key={index}
//           src={logo}
//           alt={`${label} logo`}
//           className="h-6 object-contain"
//           width={1000}
//           height={1000}
//         />
//       ))}
//       {icon && (
//         <Image 
//           src={icon}
//           alt={`${label} icon`}
//           className="h-6 w-6 object-contain"
//           width={1000}
//           height={1000}
//         />
//       )}
//     </div>
//   </div>
// );

// const BankSelection: React.FC<BankSelectionProps> = ({
//   updateFormData,
//   onNextStep,
// }) => {
//   const [selectedPayment, setSelectedPayment] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const handlePaymentSelection = (method: string): void => {
//     setSelectedPayment(method);
//     updateFormData({ selectedPayment: method, isValid: true });
//   };

//   const handleProceedToPay = async (): Promise<void> => {
//     if (!selectedPayment || isSubmitting) return;

//     setIsSubmitting(true);

//     try {
//       // Simulating API call with timeout
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       onNextStep(selectedPayment);
//     } catch (error) {
//       console.error("Error during payment processing:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full -mt-16 py-12">
//       <h1 className="text-4xl font-bold mb-2">
//         Unlock Your Trading Potential - Get Started for
//       </h1>
//       <h2 className="text-4xl font-bold text-yellow-500 mb-4">
//         Just ₹99/- only
//       </h2>

//       <div className="w-full">
//         <h3 className="text-2xl font-medium mb-6">
//           Choose your payment option
//         </h3>

//         <PaymentOption
//           label="Debit/Credit Card"
//           isSelected={selectedPayment === "card"}
//           onClick={() => handlePaymentSelection("card")}
//           cardLogos={[IMAGES.visa]}
//         />

//         <PaymentOption
//           label="UPI"
//           icon={IMAGES.upi}
//           isSelected={selectedPayment === "upi"}
//           onClick={() => handlePaymentSelection("upi")}
//         />

//         <PaymentOption
//           label="Net Banking"
//           icon={IMAGES.nbank}
//           isSelected={selectedPayment === "netbanking"}
//           onClick={() => handlePaymentSelection("netbanking")}
//         />
//       </div>

//       <AnimatedSubscribeButton
//         type="button"
//         onClick={handleProceedToPay}
//         subscribeStatus={isSubmitting}
//         className={`w-full py-4 rounded-lg text-white text-lg font-medium transition-colors ${
//           selectedPayment && !isSubmitting
//             ? "bg-teal-800 hover:bg-teal-700"
//             : "bg-gray-300 cursor-not-allowed"
//         }`}
//         disabled={!selectedPayment || isSubmitting}
//       >
//         <span>Proceed to pay</span>
//         <span>Processing...</span>
//       </AnimatedSubscribeButton>
//     </div>
//   );
// };

// export default BankSelection;