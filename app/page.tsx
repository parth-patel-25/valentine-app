import ValentineCard from "./components/ValentineCard";

export default function Home() {
  return (
    <main>
      {/* Mobile View (< 768px) */}
      <div className="flex md:hidden flex-col items-center justify-center min-h-screen bg-red-200 text-center p-8">
        <div className="text-8xl mb-8 animate-bounce">📱😠</div>
        <h1 className="text-3xl font-bold text-red-800 mb-4">
          Why did you open this in mobile?
        </h1>
        <p className="text-red-700 text-lg">
          I told you to open this in laptop!
        </p>
      </div>

      {/* Tablet View (768px - 1023px) */}
      <div className="hidden md:flex lg:hidden flex-col items-center justify-center min-h-screen bg-yellow-200 text-center p-8">
        <div className="text-8xl mb-8 animate-pulse">📟😒</div>
        <h1 className="text-3xl font-bold text-yellow-800 mb-4">
          Why did you open this in tablet?
        </h1>
        <p className="text-yellow-700 text-lg">
          I told you to open this in laptop!
        </p>
      </div>

      {/* Desktop/Laptop View (>= 1024px) */}
      <div className="hidden lg:block">
        <ValentineCard />
      </div>
    </main>
  );
}