import React from "react";


const Support = () => {
  return (
    <div className="bg-gradient-to-b from-white to-teal-600/70 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="w-32 sm:w-40">
            <img
              src="/service.svg"
              alt="Support icon"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-2 px-4 sm:px-20 text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-semibold">
              Get Support Anytime, Anywhere
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              We're just a call, email, or message away to help you with your
              trading journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <p className="text-black font-semibold">Have any queries?</p>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                Contact Support
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 inline-block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12h6M15 9l3 3-3 3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <button className="bg-[#152F46] text-base sm:text-lg text-white px-5 sm:px-7 py-2 sm:py-3 rounded-full hover:bg-[#1A3B59] transition-colors duration-200 w-full sm:w-auto">
          Let's Connect
        </button>
      </div>
    </div>
  );
};

export default Support;
