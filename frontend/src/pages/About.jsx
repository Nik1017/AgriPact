import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="max-w-xl bg-white shadow-md rounded-2xl p-8 border border-green-100 text-center">
        <h3 className="text-3xl font-bold text-green-800 mb-4">Our Services</h3>

        <button
          onClick={() => window.history.back()}
          className="mb-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          ← Back
        </button>
        <p className="text-gray-700 text-base leading-relaxed">
          We're currently building the content for this page. Expect helpful details about our services, pricing, and case studies very soon.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            {/* Simple farm icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="48"
              height="48"
              fill="none"
              stroke="#166534"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21h18" />
              <path d="M5 21V10l7-5 7 5v11" />
              <circle cx="12" cy="14" r="3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
