
export default function AcceptedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4 animate-in fade-in duration-1000">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-3xl w-full text-center border-4 border-pink-200">
        
        <div className="mb-8 animate-bounce text-8xl">
          💖💑💖
        </div>

        <h1 className="text-5xl font-bold text-pink-600 mb-8 font-serif">
          Yay! See you there!
        </h1>

        <div className="space-y-6 text-gray-700 text-xl font-medium">
          <p className="leading-relaxed">
            I'm so happy you said yes! It's going to be magical and romantic. ✨
          </p>
          
          <div className="bg-pink-100 p-8 rounded-2xl mt-8 inline-block shadow-inner transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-pink-800 mb-4 border-b-2 border-pink-300 pb-2">
              📅 Date Details
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span>
                  <strong>Location:</strong> Tam Jham 3rd floor of Hilltown Plaza, situated on the SP Ring Road
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🍽️</span>
                <span>
                  <strong>Dinner:</strong> A Special Evening Together 💖
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏰</span>
                <span>
                  <strong>Time:</strong> 8:00 PM
                </span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-pink-400 italic">
            Can't wait to see you! ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
