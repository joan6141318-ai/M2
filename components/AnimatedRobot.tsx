import React, { useState, useRef, useEffect, useCallback } from 'react';

interface AnimatedRobotProps {
  onClick: () => void;
}

const ROBOT_SIZE = 96; // Corresponds to w-24, h-24. Increased from 80.
const MARGIN = 24; // Corresponds to bottom-6, right-6
const STORAGE_KEY = 'proyecto-moon-robot-position';

const AnimatedRobot: React.FC<AnimatedRobotProps> = ({ onClick }) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const dragInfo = useRef({
    isDragging: false,
    hasMoved: false,
    startPos: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
  });
  const positionRef = useRef(position);
  positionRef.current = position;

  // Load position from localStorage or set a default on mount
  useEffect(() => {
    let initialPos: { x: number; y: number };
    try {
      const savedPositionJSON = localStorage.getItem(STORAGE_KEY);
      if (savedPositionJSON) {
        initialPos = JSON.parse(savedPositionJSON);
      } else {
        // Default to bottom right corner if nothing is saved
        initialPos = {
          x: window.innerWidth - ROBOT_SIZE - MARGIN,
          y: window.innerHeight - ROBOT_SIZE - MARGIN,
        };
      }
    } catch (error) {
      console.error("Failed to parse robot position from localStorage", error);
      // Fallback to default if storage is corrupt
      initialPos = {
        x: window.innerWidth - ROBOT_SIZE - MARGIN,
        y: window.innerHeight - ROBOT_SIZE - MARGIN,
      };
    }

    // CRITICAL FIX: Ensure the loaded or default position is within the current viewport bounds.
    const constrainedX = Math.max(0, Math.min(initialPos.x, window.innerWidth - ROBOT_SIZE));
    const constrainedY = Math.max(0, Math.min(initialPos.y, window.innerHeight - ROBOT_SIZE));
    const finalInitialPos = { x: constrainedX, y: constrainedY };

    setPosition(finalInitialPos);

    // If the position had to be constrained, update localStorage with the valid position.
    if (finalInitialPos.x !== initialPos.x || finalInitialPos.y !== initialPos.y) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalInitialPos));
    }
  }, []);

  // Handle window resize to keep the robot on screen
  useEffect(() => {
    const handleResize = () => {
      setPosition(prevPos => {
        if (!prevPos) return null;

        const constrainedX = Math.max(0, Math.min(prevPos.x, window.innerWidth - ROBOT_SIZE));
        const constrainedY = Math.max(0, Math.min(prevPos.y, window.innerHeight - ROBOT_SIZE));

        const finalPos = { x: constrainedX, y: constrainedY };
        // If the position had to be changed, save it
        if (finalPos.x !== prevPos.x || finalPos.y !== prevPos.y) {
           localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPos));
        }
        return finalPos;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!dragInfo.current.isDragging) return;

    // A small threshold to prevent accidental drags on click
    if (!dragInfo.current.hasMoved) {
      const dx = clientX - dragInfo.current.startPos.x;
      const dy = clientY - dragInfo.current.startPos.y;
      if (Math.sqrt(dx * dx + dy * dy) > 5) {
        dragInfo.current.hasMoved = true;
      }
    }
    
    if (dragInfo.current.hasMoved) {
        let newX = clientX - dragInfo.current.offset.x;
        let newY = clientY - dragInfo.current.offset.y;

        // Constrain to viewport
        newX = Math.max(0, Math.min(newX, window.innerWidth - ROBOT_SIZE));
        newY = Math.max(0, Math.min(newY, window.innerHeight - ROBOT_SIZE));

        setPosition({ x: newX, y: newY });
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!dragInfo.current.isDragging) return;

    dragInfo.current.isDragging = false;
    
    if (dragInfo.current.hasMoved && positionRef.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(positionRef.current));
    }
    
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  }, []);
  
  const handleMouseMove = useCallback((e: MouseEvent) => handleDragMove(e.clientX, e.clientY), [handleDragMove]);
  const handleTouchMove = useCallback((e: TouchEvent) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY), [handleDragMove]);
  const handleMouseUp = useCallback(() => handleDragEnd(), [handleDragEnd]);
  const handleTouchEnd = useCallback(() => handleDragEnd(), [handleDragEnd]);

  const handleDragStart = (clientX: number, clientY: number) => {
    if (!position) return;
    
    dragInfo.current = {
        isDragging: true,
        hasMoved: false,
        startPos: { x: clientX, y: clientY },
        offset: {
            x: clientX - position.x,
            y: clientY - position.y,
        },
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (dragInfo.current.hasMoved) {
        e.preventDefault();
        return;
    }
    onClick();
  };

  return (
    <button
      onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
      onClick={handleClick}
      style={position ? { 
        position: 'fixed', 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        touchAction: 'none', // Prevents scrolling on mobile while dragging
      } : { opacity: 0, pointerEvents: 'none' }}
      className="z-40 w-24 h-24 flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none group"
      aria-label="Open chat assistant"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75 animate-ping"></span>
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src="https://i.postimg.cc/SKHVjrpH/1763059875969-removebg-preview.png"
          alt="Chat assistant robot"
          className="relative w-full h-auto animate-float [filter:drop-shadow(0_0_8px_rgba(192,132,252,0.7))] transform group-hover:scale-110 transition-transform duration-300 pointer-events-none"
        />
      </div>
    </button>
  );
};

export default AnimatedRobot;