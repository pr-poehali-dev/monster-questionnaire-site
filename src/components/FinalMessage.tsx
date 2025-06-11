import { useEffect, useState } from "react";

interface FinalMessageProps {
  isVisible: boolean;
  onExplosionComplete?: () => void;
}

const FinalMessage = ({
  isVisible,
  onExplosionComplete,
}: FinalMessageProps) => {
  const [shake, setShake] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShake(true);
      const shakeTimer = setTimeout(() => setShake(false), 2000);

      // Show second message after delay
      const messageTimer = setTimeout(() => {
        setShowSecondMessage(true);
      }, 3000);

      // Start glitch effects after final message
      const glitchTimer = setTimeout(() => {
        setShowGlitch(true);
      }, 6000);

      // Explosion and restart
      const explosionTimer = setTimeout(() => {
        setShowExplosion(true);
        setTimeout(() => {
          onExplosionComplete?.();
        }, 2000);
      }, 8000);

      return () => {
        clearTimeout(shakeTimer);
        clearTimeout(messageTimer);
        clearTimeout(glitchTimer);
        clearTimeout(explosionTimer);
      };
    }
  }, [isVisible, onExplosionComplete]);

  if (!isVisible) return null;

  return (
    <div className={`animate-fade-in ${shake ? "animate-pulse" : ""}`}>
      <div className="bg-gradient-to-b from-red-900 to-black border-4 border-red-600 rounded-lg p-8 shadow-2xl shadow-red-900/80 text-center">
        <div className="text-4xl font-bold text-red-400 mb-4 font-mono tracking-wider">
          Я АКИНАТОР 666
        </div>
        <div className="text-6xl font-bold text-red-500 animate-pulse font-mono tracking-widest">
          ТЕБЕ КАНЕЦ
        </div>

        {showSecondMessage && (
          <div className="mt-8 animate-fade-in">
            <div className="text-5xl font-bold text-white animate-pulse font-mono tracking-wider drop-shadow-2xl">
              ТЫ ХОЧЕШЬ ЖИТЬ?
            </div>
            <div className="mt-6">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg font-mono text-xl border-2 border-red-400 animate-pulse">
                НЕТ
              </button>
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

        {/* Glitch effects overlay */}
        {showGlitch && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-red-500 opacity-20 animate-ping" />
            <div className="absolute inset-0 bg-green-500 opacity-10 animate-pulse" />
            <div className="absolute inset-0 bg-blue-500 opacity-15 animate-bounce" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                animation: "glitch 0.1s infinite",
              }}
            />
          </div>
        )}

        {/* Explosion effect */}
        {showExplosion && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 bg-white animate-ping" />
            <div className="absolute inset-0 bg-red-500 animate-pulse" />
            <div className="absolute inset-0 bg-yellow-500 opacity-70 animate-bounce" />
          </div>
        )}

        <style jsx>{`
          @keyframes glitch {
            0% {
              transform: translate(0);
            }
            20% {
              transform: translate(-2px, 2px);
            }
            40% {
              transform: translate(-2px, -2px);
            }
            60% {
              transform: translate(2px, 2px);
            }
            80% {
              transform: translate(2px, -2px);
            }
            100% {
              transform: translate(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FinalMessage;
