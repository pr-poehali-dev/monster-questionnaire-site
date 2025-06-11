import { useState, useEffect } from "react";

interface MonsterAvatarProps {
  isAsking: boolean;
  isRevealing: boolean;
}

const MonsterAvatar = ({ isAsking, isRevealing }: MonsterAvatarProps) => {
  const [eyeGlow, setEyeGlow] = useState(false);

  useEffect(() => {
    if (isAsking || isRevealing) {
      const interval = setInterval(() => {
        setEyeGlow((prev) => !prev);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isAsking, isRevealing]);

  return (
    <div
      className={`relative mx-auto mb-8 transition-all duration-500 ${
        isRevealing
          ? "animate-pulse scale-110"
          : isAsking
            ? "animate-bounce"
            : ""
      }`}
    >
      <div className="w-32 h-32 bg-gradient-to-b from-gray-800 to-black rounded-full border-4 border-red-600 shadow-2xl shadow-red-900/50">
        {/* Eyes */}
        <div className="flex justify-center pt-6 space-x-6">
          <div
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              eyeGlow ? "bg-red-500 shadow-lg shadow-red-500/80" : "bg-red-600"
            }`}
          />
          <div
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              eyeGlow ? "bg-red-500 shadow-lg shadow-red-500/80" : "bg-red-600"
            }`}
          />
        </div>

        {/* Mouth */}
        <div className="flex justify-center mt-4">
          <div className="w-8 h-2 bg-black rounded-full border border-red-600">
            {/* Teeth */}
            <div className="flex justify-center space-x-1 -mt-1">
              <div className="w-1 h-2 bg-white rounded-b-full" />
              <div className="w-1 h-3 bg-white rounded-b-full" />
              <div className="w-1 h-2 bg-white rounded-b-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
          isRevealing ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-red-600/20 to-purple-600/20 blur-xl -z-10`}
      />
    </div>
  );
};

export default MonsterAvatar;
