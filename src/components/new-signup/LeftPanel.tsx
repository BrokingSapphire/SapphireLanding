interface FeaturePoint {
  title: string;
  description: string;
}

const LeftPanel = () => {

  const features: FeaturePoint[] = [
    {
      title: "Seamless Account Creation",
      description:
        "Effortless and quick sign-up process with secure verification to get you started in minutes.",
    },
    {
      title: "Advanced Trading Tools",
      description:
        "Access real-time market insights, analytics, and AI-powered strategies to maximize your trading potential.",
    },
    {
      title: "Secure & Trusted Platform",
      description:
        "Trade with confidence on a highly secure platform backed by industry-leading encryption and compliance.",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between relative px-20 py-14">
      {/* Background decorative elements with enhanced animations */}
      <div className="absolute left-32 top-2 bg-yellow-400 w-96 h-40 blur-[70px] opacity-40 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
      <div className="absolute -left-6 -top-2 bg-green-500 w-44 h-32 blur-[70px] opacity-40 rounded-full animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute -right-6 -top-2 bg-green-500 w-44 h-32 blur-[70px] opacity-40 rounded-full animate-[float_10s_ease-in-out_infinite]"></div>

      <div className="absolute left-2 top-56 blur animate-[spin_15s_linear_infinite]">
        <div className="w-0 h-0 border-solid -rotate-45 border-l-[25px] border-r-[25px] border-b-[50px] border-l-transparent border-r-transparent border-b-green-500"></div>
      </div>

      <div className="absolute left-16 bottom-24 z-0 blur animate-[float_12s_ease-in-out_infinite]">
        <div className="w-0 h-0 border-solid rotate-45 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-yellow-400"></div>
      </div>

      <div className="w-6 h-6 bg-purple-500 blur opacity-70 rounded-full absolute right-24 bottom-32 z-0 animate-[float_12s_ease-in-out_infinite]"></div>

      {/* New animated element */}
      <div className="w-3 h-3 bg-blue-400 blur opacity-60 rounded-full absolute right-40 top-40 z-0 animate-[ping_5s_ease-in-out_infinite]"></div>

      <div className="flex-grow relative z-10">
        <div className="max-w-2xl w-full py-8">
          <div className="mb-12 mt-16">
            <h1 className="text-4xl font-bold text-gray-900 animate-[fadeIn_1s_ease-out]">
              Trusted Broking for
              <br />
              Smarter Investments.
            </h1>
          </div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start"
                style={{
                  animation: `fadeIn 0.5s ease-out ${0.5 + index * 0.2}s both`,
                }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="w-full pt-4 animate-[fadeIn_0.5s_ease-out_1.2s_both]">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>© Sapphire Broking</div>
          <div className="flex items-center space-x-2">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>T&C</span>
            <span>•</span>
            <span>Contact Us</span>
          </div>
        </div>
      </footer>

      {/* Add global keyframes for custom animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LeftPanel;
