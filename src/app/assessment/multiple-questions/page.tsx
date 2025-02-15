"use client";
import BackButton from "@/components/buttons/BackButton";
import MultipleQuestionHeader from "@/components/MultipleQuestionHeader";
import { IMultipleQuestions } from "@/interfaces/multipleQuestions";
import { FC, useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { useRouter } from "next/navigation";


const questions = [
  {
    id: 1,
    question: "What do plants need for photosynthesis?",
    options: ["oxygen and sugar", "sunlight, water & carbon dioxide", "protein & soil", "Rome"],
    correct: "sunlight, water & carbon dioxide",
  },
  {
    id: 2,
    question: "What is the role of sunlight in photosynthesis?",
    options: ["it provides energy to make food", "it helps plants absorb water", "Mars", "it turns leaves green"],
    correct: "it provides energy to make food",
  },
  {
    id: 3,
    question: "What is the primary pigment involved in photosynthesis?",
    options: ["chlorophyll", "carotene", "xanthophyll", "anthocyanin"],
    correct: "chlorophyll",
  },
  {
    id: 4,
    question: "What gas do plants release during photosynthesis?",
    options: ["carbon dioxide", "oxygen", "nitrogen", "hydrogen"],
    correct: "oxygen",
  },
  {
    id: 5,
    question: "What is the main product of photosynthesis?",
    options: ["glucose", "protein", "fat", "starch"],
    correct: "glucose",
  },

];

const Page: FC<IMultipleQuestions> = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

    const router = useRouter();
  
  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedIndex = localStorage.getItem("currentIndex");
    const savedScore = localStorage.getItem("score");

    if (savedIndex) setCurrentIndex(Number(savedIndex));
    if (savedScore) setScore(Number(savedScore));
  }, []);

  // Save currentIndex and score to localStorage when they change
  useEffect(() => {
    localStorage.setItem("currentIndex", String(currentIndex));
    localStorage.setItem("score", String(score));
  }, [currentIndex, score]);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (option: string) => {
    setSelected(option);
    const correct = option === currentQuestion.correct;
    setIsCorrect(correct);

    if (correct && isCorrect === null) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setIsCorrect(null);
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelected(null);
      setIsCorrect(null);
    }
  };

  const finishQuiz = () => {
    setFinished(true);
    localStorage.removeItem("currentIndex"); // Clear saved progress
    localStorage.removeItem("score"); // Clear saved score
  };

  const startAgain = () => {
    setCurrentIndex(0); // Reset to the first question
    setSelected(null); // Clear selected answer
    setIsCorrect(null); // Reset correctness state
    setScore(0); // Reset score
    setFinished(false); // Reset finished state
  };

  return (
    <div className="px-2 lg:px-10 py-3 max-w-[850px] mx-auto ">
      <BackButton back={previousQuestion} />
      <MultipleQuestionHeader currentPoint={score} goalPoints={questions.length} />
      <div className="p-6 max-w-md mx-auto">
        {finished ? (
          <div className="text-center">
            <p className="text-lg font-semibold mb-4">
              Quiz finished! Your score: {score} / {questions.length}
            </p>
            <button
              onClick={startAgain}
              className="mt-4 p-2 bg-green-500 text-white rounded px-20 hover:text-red-200"
            >
              Start Again
            </button>

            <p className="mt-5">or</p>

            <button
            className="cursor-pointer text-white hover:text-red-200 mb-2 mt-6 bg-purple-500 py-2 px-20 rounded"
            onClick={() => router.push("/assessment/match-correctly")}
          >
            Drag & Drop
          </button>

          </div>
        ) : (
          <>
            <p className="font-semibold text-lg mb-2">Question {currentIndex + 1}</p>
            <h3 className="font-medium text-lg">{currentQuestion.question}</h3>
            <div className="mt-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selected === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`flex justify-between items-center w-full p-3 border rounded-md mb-2 text-left
                      ${isSelected ? (isCorrect ? "border-green-700 bg-green-100" : "border-red-700 bg-red-100") : "border-gray-300"}
                    `}
                  >
                    {option}
                    {isSelected &&
                      (isCorrect ? (
                        <IoMdCheckmarkCircleOutline className="text-green-700 w-5 h-5" />
                      ) : (
                        <MdErrorOutline className="text-red-700 w-5 h-5" />
                      ))}
                  </button>
                );
              })}
            </div>

            {selected && (
              <div
                className={`mt-10 p-3 rounded-md flex items-center gap-2 text-sm font-semibold 
                  ${isCorrect ? "bg-green-100 text-green-400" : "bg-red-100 text-red-700"}`}
              >
                {isCorrect ? <IoMdCheckmarkCircleOutline className="w-5 h-5" /> : <MdErrorOutline className="w-5 h-5" />}
                {isCorrect ? `Right! ${currentQuestion.correct} is the correct answer.` : "Think about it again."}
              </div>
            )}

            {selected && (
              <button
                onClick={currentIndex < questions.length - 1 ? nextQuestion : finishQuiz}
                className="mt-4 p-2 bg-green-500 text-white rounded w-full"
              >
                {currentIndex < questions.length - 1 ? "Next" : "Finish"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;