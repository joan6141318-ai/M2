import React from 'react';

interface HeroProps {
  onCTAClick: () => void;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(({ onCTAClick }, ref) => {
  return (
    <section ref={ref} className="h-screen flex items-center justify-center text-center px-4">
      {/* Background elements are now in App.tsx to create a parallax effect */}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight font-poppins">
          Conecta. Crea. <span className="text-purple-500">Brilla.</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-md">
          Tu talento merece ser visto.
        </p>
        <button 
          onClick={onCTAClick}
          className="mt-8 px-10 py-4 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 focus:outline-none hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
          Comienza hoy
        </button>
      </div>
    </section>
  );
});

export default Hero;