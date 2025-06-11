import { useState, useEffect } from "react";
import MonsterAvatar from "./MonsterAvatar";
import QuestionCard from "./QuestionCard";
import FinalMessage from "./FinalMessage";

interface Question {
  question: string;
  options: string[];
}

const allQuestions: Question[] = [
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
  {
    question: "Что ты видишь в зеркале?",
    options: ["Себя", "Ничего", "Что-то странное", "Лучше не смотреть"],
  },
  {
    question: "Как ты засыпаешь?",
    options: ["Легко", "С трудом", "Проверив замки", "Не засыпаю"],
  },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MonsterQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [gamePhase, setGamePhase] = useState<"waiting" | "asking" | "finished">(
    "waiting",
  );
  const [showWelcome, setShowWelcome] = useState(true);

  const handleExplosionComplete = () => {
    // Reset all state and shuffle questions
    setCurrentQuestion(0);
    setAnswers([]);
    setGamePhase("waiting");
    setShowWelcome(true);
    setQuestions(shuffleArray(allQuestions).slice(0, 4));
  };

  // Initialize questions on mount
  useEffect(() => {
    setQuestions(shuffleArray(allQuestions).slice(0, 4));
  }, []);

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

        {gamePhase === "asking" && questions && questions[currentQuestion] && (
          <QuestionCard
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            onAnswer={handleAnswer}
            isVisible={!showWelcome}
          />
        )}

        {gamePhase === "finished" && (
          <div className="space-y-6">
            <FinalMessage
              isVisible={true}
              onExplosionComplete={handleExplosionComplete}
            />
            <div className="text-center">
              <button
                onClick={handleExplosionComplete}
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
