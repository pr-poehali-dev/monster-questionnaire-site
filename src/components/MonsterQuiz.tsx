import { useState, useEffect } from "react";
import MonsterAvatar from "./MonsterAvatar";
import QuestionCard from "./QuestionCard";
import FinalMessage from "./FinalMessage";

interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: "Что ты делаешь когда темно?",
    options: [
      "Включаю свет",
      "Иду спать",
      "Проверяю углы",
      "Прячусь под одеялом",
    ],
  },
  {
    question: "Слышишь ли ты голоса по ночам?",
    options: ["Нет, никогда", "Иногда", "Да, часто", "Они говорят со мной"],
  },
  {
    question: "Что тебя больше всего пугает?",
    options: ["Пауки", "Темнота", "Одиночество", "То что за спиной"],
  },
  {
    question: "Веришь ли ты в монстров?",
    options: [
      "Нет, это глупости",
      "Возможно",
      "Да, они реальны",
      "Я один из них",
    ],
  },
];

const MonsterQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [gamePhase, setGamePhase] = useState<"waiting" | "asking" | "finished">(
    "waiting",
  );
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setGamePhase("asking");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setGamePhase("finished");
      }, 1500);
    }
  };

  const startOver = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setGamePhase("waiting");
    setShowWelcome(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <MonsterAvatar
          isAsking={gamePhase === "asking"}
          isRevealing={gamePhase === "finished"}
        />

        {showWelcome && (
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-red-500 mb-4 font-mono">
              ДОБРО ПОЖАЛОВАТЬ
            </h1>
            <p className="text-gray-400 text-lg font-mono">
              Монстр хочет задать тебе несколько вопросов...
            </p>
          </div>
        )}

        {gamePhase === "asking" && (
          <QuestionCard
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            onAnswer={handleAnswer}
            isVisible={!showWelcome}
          />
        )}

        {gamePhase === "finished" && (
          <div className="space-y-6">
            <FinalMessage isVisible={true} />
            <div className="text-center">
              <button
                onClick={startOver}
                className="px-6 py-3 bg-gray-800 hover:bg-red-900 text-gray-300 hover:text-white border border-gray-700 hover:border-red-600 rounded-lg transition-all duration-300 font-mono"
              >
                Начать заново
              </button>
            </div>
          </div>
        )}

        {gamePhase === "asking" && (
          <div className="mt-6 text-center">
            <div className="text-gray-500 font-mono">
              Вопрос {currentQuestion + 1} из {questions.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonsterQuiz;
