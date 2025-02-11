import React, { ChangeEvent, KeyboardEvent, FormEvent, useState } from "react";

interface EmailVerificationProps {
  onNextStep: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  onNextStep,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", "", "", ""],
    otpVisible: false,
    otpSent: false,
    emailError: "",
    isValid: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const updateFormData = (data: Partial<typeof formData>): void => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleOtpChange = (index: number, value: string): void => {
    if (/^[0-9]{0,1}$/.test(value)) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;

      updateFormData({
        otp: newOtp,
        isValid:
          validateEmail(formData.email) &&
          newOtp.every((digit) => digit !== ""),
      });

      if (value && index < formData.otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput instanceof HTMLInputElement) {
          nextInput.focus();
        }
      }
    }
  };

  const handleBackspace = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace") {
      const newOtp = [...formData.otp];

      if (newOtp[index] === "" && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput instanceof HTMLInputElement) {
          prevInput.focus();
        }
      } else {
        newOtp[index] = "";
        updateFormData({
          otp: newOtp,
          isValid:
            validateEmail(formData.email) &&
            newOtp.every((digit) => digit !== ""),
        });

        if (index > 0 && e.currentTarget.value === "") {
          const prevInput = document.getElementById(`otp-${index - 1}`);
          if (prevInput instanceof HTMLInputElement) {
            prevInput.focus();
          }
        }
      }
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = e.target.value;
    updateFormData({
      email: newEmail,
      emailError: "",
      isValid:
        validateEmail(newEmail) && formData.otp.every((digit) => digit !== ""),
    });
  };

  const handleGetOtp = (): void => {
    if (validateEmail(formData.email)) {
      updateFormData({
        otpVisible: true,
        otpSent: true,
        emailError: "",
      });
    } else {
      updateFormData({
        emailError: "Please enter a valid email address.",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.isValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 10000));

      if (formData.isValid) {
        onNextStep();
      }
    } catch (error) {
      console.error("Error during submission:", error);
      updateFormData({
        emailError: "An error occurred during submission. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputFilter = (e: FormEvent<HTMLInputElement>): void => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-4">Hi, Welcome to Sapphire!</h1>
      <p className="text-gray-600 mb-8">
        Get started in just a few easy steps!
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            className="w-full border rounded-md px-4 py-2"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleEmailChange}
            disabled={isSubmitting}
          />
          {formData.emailError && (
            <p className="text-red-500 text-sm mt-2">{formData.emailError}</p>
          )}
          <div className="flex justify-end space-x-4 mt-2">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGetOtp}
              disabled={isSubmitting}
            >
              Get OTP →
            </button>
            {formData.otpSent && (
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleGetOtp}
                disabled={isSubmitting}
              >
                Resend
              </button>
            )}
          </div>
        </div>

        {formData.otpVisible && (
          <div className="mb-8 transition-opacity duration-500 ease-in-out">
            <label className="block text-gray-700 mb-2">OTP</label>
            <div className="flex gap-4 justify-between w-full max-w-md">
              {formData.otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="tel"
                  name={`otp-${index}`}
                  className="w-14 h-14 border rounded-md text-center text-lg"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  onInput={handleInputFilter}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`w-full bg-teal-800 text-white py-3 rounded-md hover:bg-teal-700 mb-8 ${
            formData.isValid && !isSubmitting
              ? ""
              : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!formData.isValid || isSubmitting}
        >
          {isSubmitting ? "Please wait..." : "Continue"}
        </button>

        <div className="space-y-4 text-sm text-gray-600">
          <p className="leading-relaxed">
            I authorise Sapphire to contact me even if my email is registered on
            DND. I authorise Sapphire to fetch my KYC information from the C-KYC
            registry with my PAN.
          </p>
          <p>
            If you are looking to open a HUF, Corporate, Partnership, or NRI
            account, you have to{" "}
            <button
              type="button"
              className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              click here
            </button>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
