
interface StepContent {
  title: string;
  subtitle: string;
}

interface LeftPanelProps {
  step: number;
}

const content: Record<number, StepContent> = {
  0: {
    title: "Verify Your Mobile Number",
    subtitle: "Let's start by verifying your mobile number for secure access.",
  },
  1: {
    title: "Verify Your Email",
    subtitle: "Please verify your email address to continue.",
  },
  2: {
    title: "PAN Verification",
    subtitle: "Help us verify your identity with your PAN details.",
  },
  3: {
    title: "Aadhaar Verification",
    subtitle: "Complete your KYC by verifying your Aadhaar details.",
  },
  4: {
    title: "Card Details",
    subtitle: "Add your payment information to access premium features.",
  },
  5: {
    title: "Trading Account Details",
    subtitle: "Complete your trading profile to start investing.",
  },
};

const LeftPanel = ({ step }: LeftPanelProps) => {
  return (
    <div className=" text-white p-12 rounded-lg w-full">
      <h1 className="text-4xl font-bold mb-6">{content[step].title}</h1>
      <p className="text-lg">{content[step].subtitle}</p>
    </div>
  );
};

export default LeftPanel;



