"use client";
import React, { useState, useEffect } from "react";
import MatchCorrectlyBackButton from "@/components/buttons/MatchCorrectlyBackButton";
import { PiQuestionLight } from "react-icons/pi";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoAlarmSharp } from "react-icons/io5";
import { GiTap } from "react-icons/gi";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";


// Define constants for terms and definitions
const TERMS = ["Mean", "Median", "Mode", "Range", "Variance"] as const;
type Term = (typeof TERMS)[number];

type TermDefinition = {
  definitions: string[]; // Array of possible definitions
  correctAnswer: string; // The correct definition for this term
};

const DEFINITIONS: Record<Term, TermDefinition> = {
  Mean: {
    definitions: [
      "The mean is the middle value in a dataset when the values are arranged in order.",
      "The mean is the value that appears most frequently in a dataset.",
      "The mean is the sum of all values in a dataset divided by the number of values. ",
      "The mean is the difference between the highest and lowest values in a dataset.",
      "The mean is the square root of the sum of squared deviations from the average.",
    ],
    correctAnswer:
      "The mean is the sum of all values in a dataset divided by the number of values. ",
  },
  Median: {
    definitions: [
      "The median is the average of all values in a dataset.",
      "The median is the value that appears most frequently in a dataset.",
      "The median is the difference between the highest and lowest values in a dataset.",
      "The median is the middle value in a dataset when the values are arranged in ascending or descending order.",
      "The median is the sum of all values divided by the number of values.",
    ],
    correctAnswer:
      "The median is the middle value in a dataset when the values are arranged in ascending or descending order. ",
  },
  Mode: {
    definitions: [
      "The mode is the middle value in a dataset when the values are arranged in order.",
      "The mode is the value that appears most frequently in a dataset. A dataset can have one mode,  ",
      "The mode is the average of all values in a dataset.",
      "The mode is the difference between the highest and lowest values in a dataset.",
      "The mode is the sum of all values divided by the number of values.",
    ],
    correctAnswer:
      "The mode is the value that appears most frequently in a dataset. A dataset can have one mode,  ",
  },
  Range: {
    definitions: [
      "The range is the difference between the highest and lowest values in a dataset.",
      "The range is the middle value in a dataset when the values are arranged in order.",
      "The range is the value that appears most frequently in a dataset.",
      "The range is the average of all values in a dataset.",
      "The range is the sum of all values divided by the number of values.",
    ],
    correctAnswer:
      "The range is the difference between the highest and lowest values in a dataset.",
  },
  Variance: {
    definitions: [
      "Variance is a measure of how spread out the values in a dataset are. It is calculated as the average of the squared differences from the mean.",
      "Variance is the middle value in a dataset when the values are arranged in order.",
      "Variance is the value that appears most frequently in a dataset.",
      "Variance is the difference between the highest and lowest values in a dataset.",
      "Variance is the sum of all values divided by the number of values.",
    ],
    correctAnswer:
      "Variance is a measure of how spread out the values in a dataset are. It is calculated as the average of the squared differences from the mean.",
  },
};

// Define types for state and props
type MatchedAnswers = Record<Term, string | null>;
type Progress = Record<Term, boolean | null>;

const Page = () => {
  // State with proper types
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [draggedTerm, setDraggedTerm] = useState<Term | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [matched, setMatched] = useState<MatchedAnswers>({} as MatchedAnswers);
  const [hoveredDefinition, setHoveredDefinition] = useState<string | null>(
    null
  );
  const [, setAttempted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [progress, setProgress] = useState<Progress>({} as Progress);
  const [isTimerUp, setIsTimerUp] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

const router = useRouter()

  // Load saved state from local storage on mount
  useEffect(() => {
    const savedMatched = localStorage.getItem("matched");
    const savedProgress = localStorage.getItem("progress");
    const savedScore = localStorage.getItem("score");
    const savedCurrentIndex = localStorage.getItem("currentIndex");
    const savedTimeLeft = localStorage.getItem("timeLeft");

    if (savedMatched) setMatched(JSON.parse(savedMatched));
    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedScore) setScore(Number(savedScore));
    if (savedCurrentIndex) setCurrentIndex(Number(savedCurrentIndex));
    if (savedTimeLeft) setTimeLeft(Number(savedTimeLeft));
  }, []);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("matched", JSON.stringify(matched));
    localStorage.setItem("progress", JSON.stringify(progress));
    localStorage.setItem("score", score.toString());
    localStorage.setItem("currentIndex", currentIndex.toString());
    localStorage.setItem("timeLeft", timeLeft.toString());
  }, [matched, progress, score, currentIndex, timeLeft]);

  // Clear local storage
  const clearLocalStorage = () => {
    localStorage.removeItem("matched");
    localStorage.removeItem("progress");
    localStorage.removeItem("score");
    localStorage.removeItem("currentIndex");
    localStorage.removeItem("timeLeft");
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
        setIsTimerUp(true);
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Grade the user when the timer ends or on finish
  const gradeUser = () => {
    TERMS.forEach((term) => {
      const userAnswer = matched[term];
      if (userAnswer) {
        const isAnswerCorrect = DEFINITIONS[term].correctAnswer === userAnswer;
        setProgress((prev) => ({ ...prev, [term]: isAnswerCorrect }));
        if (isAnswerCorrect) {
          setScore((prev) => prev + 1); // Increment score for correct answers
        }
      }
    });
    setIsTimerUp(true); // End the test
    setTimeLeft(0); // Set the timer to 0
    clearLocalStorage(); // Clear local storage
  };

  // Drag and drop handlers
  const handleDragStart = (term: Term) => {
    if (!isTimerUp) {
      setDraggedTerm(term);
    }
  };

  const handleDrop = (definition: string) => {
    if (draggedTerm && !isTimerUp) {
      const isAnswerCorrect =
        DEFINITIONS[draggedTerm].correctAnswer === definition;
      setMatched((prev) => ({ ...prev, [TERMS[currentIndex]]: definition }));
      setIsCorrect(isAnswerCorrect);
      setAttempted(true);
      setProgress((prev) => ({
        ...prev,
        [TERMS[currentIndex]]: isAnswerCorrect,
      }));
      if (isAnswerCorrect) {
        setScore((prev) => prev + 1); // Increment score for correct answers
      }
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < TERMS.length - 1 && !isTimerUp) {
      setCurrentIndex((prev) => prev + 1);
      resetStateForNextQuestion();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0 && !isTimerUp) {
      setCurrentIndex((prev) => prev - 1);
      resetStateForNextQuestion();
    }
  };

  // Reset handler for the current question
  const handleReset = () => {
    if (!isTimerUp) {
      setMatched((prev) => ({ ...prev, [TERMS[currentIndex]]: null }));
      setIsCorrect(null);
      setAttempted(false);
      setProgress((prev) => ({ ...prev, [TERMS[currentIndex]]: null }));
      setTimeLeft(10); // Reset the timer to 10 seconds
    }
  };

  // Reset state for the next question
  const resetStateForNextQuestion = () => {
    setDraggedTerm(null);
    setIsCorrect(null);
    setAttempted(false);
  };

  const handleDragEnter = (definition: string) => {
    if (!isTimerUp) {
      setHoveredDefinition(definition);
    }
  };

  const handleDragLeave = () => {
    if (!isTimerUp) {
      setHoveredDefinition(null);
    }
  };

  // Progress bar rendering
  const renderProgressBar = () => (
    <div className="flex gap-2 mb-4">
      {TERMS.map((term, index) => (
        <div
          key={index}
          className={`h-3 w-10 rounded-md ${
            progress[term] === true
              ? "bg-purple-500"
              : progress[term] === false
              ? "bg-purple-500"
              : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="p-4 max-w-[850px] mx-auto font-poppins">
      <div className="flex justify-between items-center">
        <MatchCorrectlyBackButton back={handleBack} />
        <p className="font-bold text-2xl">Course Preview</p>
        <div className="border-2 border-purple-200 p-3 rounded-lg w-fit inline-block">
          <PiQuestionLight className="text-purple-600" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="mt-4 font-bold mb-2 text-lg sm:text-xl">
          Lesson 1.{currentIndex + 1}
        </p>
        <span className="bg-purple-500 text-white text-xs sm:text-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <IoAlarmSharp />
          {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </span>
      </div>

      {renderProgressBar()}

      {isTimerUp ? (
        <div className="mb-20">
          <p className="mb-4 text-center font-semibold text-xl sm:text-2xl">
            Time up!
          </p>
          <div className="mt-6 text-center">
            <p className="text-xl sm:text-2xl font-bold text-purple-500">
              Your Score: {score} / {TERMS.length}
            </p>
            <button
              className="mt-4 py-2 px-24 rounded hover:text-red-200 bg-green-500 text-white text-sm sm:text-base"
              onClick={() => {
                // Reset all state variables
                setCurrentIndex(0);
                setMatched({} as MatchedAnswers);
                setProgress({} as Progress);
                setScore(0);
                setTimeLeft(120)
                setIsTimerUp(false);
              }}
            >
              Start New Test
            </button>

            <p className="mt-5">or</p>

<button
className="cursor-pointer text-white hover:text-red-200 mb-2 mt-6 bg-purple-500 py-2 px-20 rounded"
onClick={() => router.push("/assessment/multiple-questions")}
>
multiple questions
</button>


          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center gap-2 mb-8 w-full relative">
            <div className="border-2 bg-slate-300 p-3 rounded-lg w-fit absolute left-0">
              <GiTap className="text-purple-600" />
            </div>

            <p className="text-center font-semibold text-lg sm:text-xl w-full">
              Match the Algebraic terms!
            </p>
          </div>

          {/* Drop Section */}
          <div className="grid grid-cols-2 gap-4">
            {DEFINITIONS[TERMS[currentIndex]].definitions.map(
              (definition, index, array) => (
                <div
                  key={index}
                  className={`border border-dashed p-4 text-center rounded-md min-h-[60px] flex items-center justify-between gap-2 ${
                    matched[TERMS[currentIndex]] === definition
                      ? isCorrect
                        ? "border-green-500 bg-green-100"
                        : "border-red-500 bg-red-100"
                      : hoveredDefinition === definition
                      ? "border-purple-500 bg-purple-200"
                      : "border-gray-400 bg-purple-100"
                  } ${
                    index === array.length - 1 && array.length % 2 !== 0
                      ? "col-span-2 justify-self-center"
                      : ""
                  }`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(definition)}
                  onDragEnter={() => handleDragEnter(definition)}
                  onDragLeave={handleDragLeave}
                  style={{ pointerEvents: isTimerUp ? "none" : "auto" }}
                >
                  {definition}
                  {matched[TERMS[currentIndex]] === definition &&
                    (isCorrect ? (
                      <IoCheckmarkCircle className="text-green-500 text-2xl" />
                    ) : (
                      <IoCloseCircle className="text-red-500 text-2xl" />
                    ))}
                </div>
              )
            )}
          </div>

          {/* Drag Section */}
          <p className="text-center font-semibold text-lg sm:text-xl mt-10">
            Drag the algebraic term below to match the definition above
          </p>
          <div className="flex justify-center">
          <div className="w-full">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 px-4">
    {TERMS.map((term, index) => (
      <div
        key={index}
        className={`border-2 p-4 text-center rounded-lg cursor-pointer bg-[#070606] text-[#fefefe] min-w-[100px] md:w-[120px]
          ${
            TERMS.length % 2 !== 0 && index === TERMS.length - 1
              ? "col-span-2 sm:col-span-1" // Apply col-span-2 only on small screens
              : ""
          }`}
        draggable={!isTimerUp}
        onDragStart={() => handleDragStart(term)}
        style={{ pointerEvents: isTimerUp ? "none" : "auto" }}
      >
        {term}
      </div>
    ))}
  </div>
</div>
</div>

          {/* Reset and Next Button Section */}
          <div className="flex items-center space-x-6 justify-center">
            <div
              className="border-2 border-purple-200 p-3 rounded-lg w-fit inline-block mt-5 cursor-pointer"
              onClick={!isTimerUp ? handleReset : undefined}
              style={{ pointerEvents: isTimerUp ? "none" : "auto" }}
            >
              <FaArrowsRotate />
            </div>

            <button
              className="mt-6 p-3 rounded-lg bg-purple-800 text-white w-[40%] md:w-[30%] flex items-center justify-center gap-4 text-sm sm:text-base"
              onClick={() => {
                if (currentIndex < TERMS.length - 1) {
                  handleNext(); // Go to the next question
                } else {
                  gradeUser(); // Score the user and set timer to 0
                }
              }}
              disabled={isTimerUp}
            >
              {currentIndex < TERMS.length - 1 ? "Continue" : "Finish"}
              <FaArrowRightLong className="ml-2" /> {/* Icon on the right */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;