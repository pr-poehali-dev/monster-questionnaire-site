import { useEffect, useState } from "react";

interface FinalMessageProps {
  isVisible: boolean;
}

const FinalMessage = ({ isVisible }: FinalMessageProps) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`animate-fade-in ${shake ? "animate-pulse" : ""}`}>
      <div className="bg-gradient-to-b from-red-900 to-black border-4 border-red-600 rounded-lg p-8 shadow-2xl shadow-red-900/80 text-center">
        <div className="text-4xl font-bold text-red-400 mb-4 font-mono tracking-wider">
          ТЫ ВЫИГРАЛ
        </div>
        <div className="text-6xl font-bold text-red-500 animate-pulse font-mono tracking-widest">
          ПРОВАЛИВАЙ666
        </div>

        {/* Spooky effects */}
        <div className="mt-6 flex justify-center space-x-4">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping delay-100" />
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping delay-200" />
        </div>
      </div>
    </div>
  );
};

export default FinalMessage;
