// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { Check } from "lucide-react";
// import FormHeading from "./FormHeading";

// interface AadhaarPANMismatchProps {
//   onNext: () => void;
// }

// const AadhaarPANMismatch: React.FC<AadhaarPANMismatchProps> = ({ onNext }) => {
//   const [fullName, setFullName] = useState("");
//   const [dob, setDob] = useState("");
//   const [isChecked, setIsChecked] = useState(true);
//   const [errors, setErrors] = useState<{fullName?: string, dob?: string}>({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setFullName(value);
//     setErrors(prev => ({ ...prev, fullName: undefined }));
//   };

//   const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setDob(value);
//     setErrors(prev => ({ ...prev, dob: undefined }));
//   };

//   const validateForm = () => {
//     const newErrors: {fullName?: string, dob?: string} = {};

//     if (!fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     } else if (fullName.trim().length < 2) {
//       newErrors.fullName = "Full name must be at least 2 characters";
//     }

//     if (!dob) {
//       newErrors.dob = "Date of birth is required";
//     } else {
//       const selectedDate = new Date(dob);
//       const today = new Date();
//       const age = today.getFullYear() - selectedDate.getFullYear();
      
//       if (selectedDate > today) {
//         newErrors.dob = "Date of birth cannot be in the future";
//       } else if (age < 18) {
//         newErrors.dob = "You must be at least 18 years old";
//       } else if (age > 100) {
//         newErrors.dob = "Please enter a valid date of birth";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setIsLoading(true);
    
//     try {
//       // API call would go here
//       const requestBody = {
//         step: "aadhaar_mismatch_details",
//         full_name: fullName.trim(),
//         dob: dob
//       };

//       console.log('Request body:', requestBody);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       onNext();
//     } catch (error) {
//       console.error("Error submitting Aadhaar PAN mismatch details:", error);
//       setErrors({ fullName: 'Network error. Please try again.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Calculate max date (18 years ago from today)
//   const maxDate = new Date();
//   maxDate.setFullYear(maxDate.getFullYear() - 18);
//   const maxDateString = maxDate.toISOString().split('T')[0];

//   // Calculate min date (100 years ago from today)
//   const minDate = new Date();
//   minDate.setFullYear(minDate.getFullYear() - 100);
//   const minDateString = minDate.toISOString().split('T')[0];

//   return (
//     <div className="mx-auto p-4 mt-10">
//       <FormHeading
//         title="Resolve Aadhaar PAN Mismatch"
//         description="Please provide your correct details to resolve the mismatch between your Aadhaar and PAN information."
//       />

//       <div className="space-y-4 mb-6">
//         <div className="space-y-2">
//           <label htmlFor="fullName" className="block text-sm font-medium">
//             Full Name (as per Aadhaar)*
//           </label>
//           <input
//             type="text"
//             id="fullName"
//             value={fullName}
//             onChange={handleNameChange}
//             className={`w-full p-3 border rounded-lg ${
//               errors.fullName ? "border-red-500" : "border-gray-300"
//             }`}
//             placeholder="Enter your full name"
//           />
//           {errors.fullName && (
//             <p className="text-xs text-red-500">{errors.fullName}</p>
//           )}
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="dob" className="block text-sm font-medium">
//             Date of Birth*
//           </label>
//           <div className="relative">
//             <input
//               type="date"
//               id="dob"
//               value={dob}
//               onChange={handleDobChange}
//               min={minDateString}
//               max={maxDateString}
//               className={`w-full p-3 border rounded-lg ${
//                 errors.dob ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//           </div>
//           {errors.dob && (
//             <p className="text-xs text-red-500">{errors.dob}</p>
//           )}
//         </div>
//       </div>
      
//       <div className="mb-6 flex items-center cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
//         <div
//           className={`h-6 w-6 flex items-center justify-center border-2 rounded-lg transition-colors cursor-pointer
//             ${isChecked ? "border-green-600 bg-white" : "border-gray-400"}`}
//         >
//           {isChecked && <Check className="h-4 w-4 text-green-600" />}
//         </div>
//         <label className="text-sm text-gray-600 ml-2">
//           I confirm that the above details are correct and match my Aadhaar card.
//         </label>
//       </div>
      
//       <Button 
//         variant="ghost"
//         onClick={handleSubmit}
//         disabled={isLoading || !fullName.trim() || !dob || !isChecked}
//         className="py-6 w-full disabled:opacity-50"
//       >
//         {isLoading ? "Submitting Details..." : "Submit Details"}
//       </Button>
//     </div>
//   );
// };

// export default AadhaarPANMismatch;