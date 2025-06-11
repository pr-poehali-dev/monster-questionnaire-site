import { useEffect, useState } from "react";

interface FinalMessageProps {
  isVisible: boolean;
}

const FinalMessage = ({ isVisible }: FinalMessageProps) => {
  const [shake, setShake] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShake(true);
      const shakeTimer = setTimeout(() => setShake(false), 2000);

      // Show second message after delay
      const messageTimer = setTimeout(() => {
        setShowSecondMessage(true);
      }, 3000);

      return () => {
        clearTimeout(shakeTimer);
        clearTimeout(messageTimer);
      };
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

        {showSecondMessage && (
          <div className="mt-8 animate-fade-in">
            <div className="text-5xl font-bold text-white animate-pulse font-mono tracking-wider drop-shadow-2xl">
              ТЫ САМ ЭТО СДЕЛАЛ
            </div>
            <div className="mt-4 text-lg text-red-300 font-mono animate-pulse">
              И теперь поздно что-то менять...
            </div>
          </div>
        )}

        {/* Enhanced spooky effects */}
        <div className="mt-6 flex justify-center space-x-4">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping delay-100" />
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping delay-200" />
        </div>

        {showSecondMessage && (
          <div className="absolute -inset-4 bg-red-900/20 rounded-xl blur-3xl animate-pulse -z-10" />
        )}
      </div>
    </div>
  );
};

export default FinalMessage;
