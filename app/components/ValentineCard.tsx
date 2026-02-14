"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ValentineCard = () => {
  const [noButtonPosition, setNoButtonPosition] = useState<{ top: string | number; left: string | number; position: 'static' | 'absolute' }>({ top: 'auto', left: 'auto', position: 'static' });
  const [isLoading, setIsLoading] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const lastMoveTimeRef = useRef<number>(0);
  const router = useRouter();

  const moveNoButton = () => {
    const headerHeight = 150; // Approximating header height to avoid overlap
    const newTop = Math.max(headerHeight, Math.random() * 80 + 10) + '%'; // Keep it somewhat lower
    const newLeft = Math.random() * 80 + 10 + '%';
    
    // Simpler random position for now, just to move it
    const randomTop = Math.random() * 80 + '%';
    const randomLeft = Math.random() * 80 + '%';

    setNoButtonPosition({ top: randomTop, left: randomLeft, position: 'absolute' });
    lastMoveTimeRef.current = Date.now();
  };

  const handleYesClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/update-love', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update');
      }
      
      // Navigate to success page
      router.push('/accepted');
    } catch (error: any) {
      console.error('Operation failed:', error);
      alert(error.message || "Error sending love to database 😢");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle: don't move if we moved recently (within 400ms)
      if (Date.now() - lastMoveTimeRef.current < 400) return;

      if (!noBtnRef.current) return;

      const btnRect = noBtnRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) + Math.pow(e.clientY - btnCenterY, 2)
      );

      // Circular detection area: trigger if cursor is within 200px of button center
      if (distance < 200) { 
        moveNoButton();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 min-w-3xl min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
        <div className="mb-8 flex justify-center">
            {/* Placeholder for the cute character - using an emoji for now which is universally cute */}
            <div className="text-9xl animate-bounce">
                🐱❤️
            </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-12 leading-tight">
          Vidhi will you be my valentine?
        </h1>

        <div className="flex justify-center gap-8 mb-8 w-full static">
          <button 
            onClick={handleYesClick}
            disabled={isLoading}
            className={`bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-md transform ${isLoading ? 'opacity-80 cursor-wait' : 'hover:scale-150 active:scale-95 cursor-pointer'} z-10 flex items-center justify-center min-w-[120px]`}>
            {isLoading ? (
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Yes"
            )}
          </button>
          <button 
            ref={noBtnRef}
            onMouseEnter={moveNoButton}
            style={{ top: noButtonPosition.top, left: noButtonPosition.left, position: noButtonPosition.position, transition: 'top 0.4s ease-out, left 0.4s ease-out' }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xl font-bold py-4 px-10 rounded-full shadow-sm whitespace-nowrap z-0 cursor-not-allowed"
          >
            No
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-4">
          "No" seems a bit shy <span role="img" aria-label="shy-devil">😈</span>
        </p>
      </div>
    </div>
  );
};

export default ValentineCard;
