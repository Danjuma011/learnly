"use client";
import BackButton from "@/components/buttons/BackButton";
import MultipleQuestionHeader from "@/components/MultipleQuestionHeader";
import { IMultipleQuestions } from "@/interfaces/multipleQuestions";
import { FC, useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

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
  {
    id: 6,
    question: "Where does photosynthesis primarily occur in a plant?",
    options: ["roots", "stem", "leaves", "flowers"],
    correct: "leaves",
  },
  {
    id: 7,
    question: "What is the chemical equation for photosynthesis?",
    options: [
      "6CO2 + 6H2O → C6H12O6 + 6O2",
      "C6H12O6 + 6O2 → 6CO2 + 6H2O",
      "2H2 + O2 → 2H2O",
      "Na + Cl → NaCl",
    ],
    correct: "6CO2 + 6H2O → C6H12O6 + 6O2",
  },
  {
    id: 8,
    question: "What is the role of water in photosynthesis?",
    options: [
      "it provides oxygen",
      "it provides electrons",
      "it provides carbon dioxide",
      "it provides energy",
    ],
    correct: "it provides electrons",
  },
  {
    id: 9,
    question: "What is the role of carbon dioxide in photosynthesis?",
    options: [
      "it provides oxygen",
      "it provides carbon for glucose",
      "it provides energy",
      "it provides water",
    ],
    correct: "it provides carbon for glucose",
  },
  {
    id: 10,
    question: "What is the name of the process that converts light energy into chemical energy?",
    options: ["respiration", "photosynthesis", "transpiration", "fermentation"],
    correct: "photosynthesis",
  },
  {
    id: 11,
    question: "What is the byproduct of photosynthesis?",
    options: ["carbon dioxide", "water", "oxygen", "glucose"],
    correct: "oxygen",
  },
  {
    id: 12,
    question: "What is the name of the organelle where photosynthesis occurs?",
    options: ["mitochondria", "nucleus", "chloroplast", "ribosome"],
    correct: "chloroplast",
  },
  {
    id: 13,
    question: "What is the role of chlorophyll in photosynthesis?",
    options: [
      "it absorbs sunlight",
      "it absorbs water",
      "it absorbs carbon dioxide",
      "it absorbs oxygen",
    ],
    correct: "it absorbs sunlight",
  },
  {
    id: 14,
    question: "What is the name of the process that plants use to absorb water?",
    options: ["photosynthesis", "transpiration", "respiration", "osmosis"],
    correct: "osmosis",
  },
  {
    id: 15,
    question: "What is the name of the process that plants use to release water vapor?",
    options: ["photosynthesis", "transpiration", "respiration", "osmosis"],
    correct: "transpiration",
  },
  {
    id: 16,
    question: "What is the name of the process that converts glucose into energy?",
    options: ["photosynthesis", "respiration", "transpiration", "fermentation"],
    correct: "respiration",
  },
  {
    id: 17,
    question: "What is the name of the sugar produced during photosynthesis?",
    options: ["fructose", "sucrose", "glucose", "lactose"],
    correct: "glucose",
  },
  {
    id: 18,
    question: "What is the name of the pores on leaves that allow gas exchange?",
    options: ["stomata", "chloroplasts", "xylem", "phloem"],
    correct: "stomata",
  },
  {
    id: 19,
    question: "What is the name of the tissue that transports water in plants?",
    options: ["phloem", "xylem", "stomata", "chloroplast"],
    correct: "xylem",
  },
  {
    id: 20,
    question: "What is the name of the tissue that transports sugars in plants?",
    options: ["phloem", "xylem", "stomata", "chloroplast"],
    correct: "phloem",
  },
  {
    id: 21,
    question: "What is the name of the process that converts glucose into starch?",
    options: ["photosynthesis", "respiration", "transpiration", "polymerization"],
    correct: "polymerization",
  },
  {
    id: 22,
    question: "What is the name of the process that converts starch into glucose?",
    options: ["photosynthesis", "respiration", "hydrolysis", "fermentation"],
    correct: "hydrolysis",
  },
  {
    id: 23,
    question: "What is the name of the process that converts glucose into ATP?",
    options: ["photosynthesis", "respiration", "transpiration", "fermentation"],
    correct: "respiration",
  },
  {
    id: 24,
    question: "What is the name of the process that converts glucose into ethanol?",
    options: ["photosynthesis", "respiration", "transpiration", "fermentation"],
    correct: "fermentation",
  },
  {
    id: 25,
    question: "What is the name of the process that converts glucose into lactic acid?",
    options: ["photosynthesis", "respiration", "transpiration", "fermentation"],
    correct: "fermentation",
  },
  {
    id: 26,
    question: "What is the name of the process that converts glucose into carbon dioxide and water?",
    options: ["photosynthesis", "respiration", "transpiration", "fermentation"],
    correct: "respiration",
  },
  {
    id: 27,
    question: "What is the name of the process that converts glucose into glycogen?",
    options: ["photosynthesis", "respiration", "polymerization", "fermentation"],
    correct: "polymerization",
  },
  {
    id: 28,
    question: "What is the name of the process that converts glucose into cellulose?",
    options: ["photosynthesis", "respiration", "polymerization", "fermentation"],
    correct: "polymerization",
  },
  {
    id: 29,
    question: "What is the name of the process that converts glucose into lipids?",
    options: ["photosynthesis", "respiration", "polymerization", "fermentation"],
    correct: "polymerization",
  },
  {
    id: 30,
    question: "What is the name of the process that converts glucose into proteins?",
    options: ["photosynthesis", "respiration", "polymerization", "fermentation"],
    correct: "polymerization",
  },
];

const Page: FC<IMultipleQuestions> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

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
              className="mt-4 p-2 bg-green-500 text-white rounded w-full"
            >
              Start Again
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