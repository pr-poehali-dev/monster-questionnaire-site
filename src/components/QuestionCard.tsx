interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  isVisible: boolean;
}

const QuestionCard = ({
  question,
  options,
  onAnswer,
  isVisible,
}: QuestionCardProps) => {
  if (!isVisible) return null;

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-b from-gray-900 to-black border-2 border-red-800 rounded-lg p-6 shadow-2xl shadow-red-900/30">
        <h2 className="text-xl font-bold text-red-400 mb-6 text-center font-mono">
          {question}
        </h2>

        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="w-full p-3 bg-gray-800 hover:bg-red-900 text-gray-300 hover:text-white border border-gray-700 hover:border-red-600 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-900/50 font-mono text-left"
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
