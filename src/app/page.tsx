"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleNavigation = (path: string) => {
    setIsLoading(true); // Set loading to true
    setTimeout(() => {
      router.push(path); // Navigate after a short delay
    }, 1000); // Simulate loading for 1 second
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isLoading ? (
        <div className="text-2xl font-bold">Loading...</div> // Loading state
      ) : (
        <>
          <p className="text-2xl font-bold mb-4">Welcome to the assessment</p>
          <p className="text-xl font-semibold mb-4">click on one of the buttons below</p>
          <button
            className="cursor-pointer text-white hover:text-blue-800 mb-4 bg-slate-500 p-3 rounded-lg"
            onClick={() => handleNavigation("/assessment/multiple-questions")}
          >
            Multiple Questions
          </button>
          <button
            className="cursor-pointer text-white hover:text-blue-800 mb-2 bg-slate-500 p-3 rounded-lg"
            onClick={() => handleNavigation("/assessment/match-correctly")}
          >
            Drag & drop
          </button>
        </>
      )}
    </div>
  );
}