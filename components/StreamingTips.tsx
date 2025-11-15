import React, { useState, useRef } from 'react';
import AnimatedSection from './AnimatedSection';

const tips = [
  {
    title: 'Iluminación Profesional',
    description: 'Una buena iluminación es clave. Utiliza al menos tres fuentes de luz: una principal, una de relleno y una contraluz para destacar y crear profundidad.',
    imageUrl: 'https://i.postimg.cc/26sGhw8D/IMG_20251030_074627.png',
  },
  {
    title: 'Calidad de Audio',
    description: 'El audio es más importante que el video. Invierte en un buen micrófono de condensador y úsalo con un filtro anti-pop para un sonido claro y profesional.',
    imageUrl: 'https://i.postimg.cc/xj6F5MVk/IMG_20251030_082256.png',
  },
  {
    title: 'Interactúa con tu Audiencia',
    description: 'Lee el chat, responde preguntas y agradece a tus seguidores. Crear una comunidad es fundamental para crecer y mantener a tu audiencia comprometida.',
    imageUrl: 'https://i.postimg.cc/rm0C901L/IMG_20251112_211906.png',
  },
  {
    title: 'Sé Consistente',
    description: 'Establece un horario de transmisión y cúmplelo. La consistencia ayuda a que tu audiencia sepa cuándo encontrarte en línea y genera lealtad.',
    imageUrl: 'https://i.postimg.cc/RFk1pSdL/IMG_20251112_212102.png',
  },
  {
    title: 'Define tu Nicho',
    description: 'Encuentra un juego o tema que te apasione. Ser auténtico y especializarte en un nicho te ayudará a atraer a una audiencia leal y destacarte.',
    imageUrl: 'https://i.postimg.cc/xdS2QMC0/IMG_20251112_212522.jpg',
  },
];

// Icons
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

const StreamingTips = React.forwardRef<HTMLElement>((props, ref) => {
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? tips.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === tips.length - 1 ? 0 : prevIndex + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = 0; // Reset on new touch
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchEndX.current === 0) return; // No move
    const deltaX = touchEndX.current - touchStartX.current;
    
    // Swipe left
    if (deltaX < -50) {
      handleNext();
    }
    // Swipe right
    else if (deltaX > 50) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section ref={ref} className="py-20 px-4">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[2.5rem] sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Tips para tu <span className="text-purple-500">Transmisión</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Consejos prácticos para llevar tu contenido al siguiente nivel y cautivar a tu audiencia.
          </p>
          <div className="mt-16 min-h-[8rem]">
            {!isCarouselVisible ? (
              <button 
                onClick={() => setIsCarouselVisible(true)}
                className="px-10 py-4 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 focus:outline-none hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
                Ver más
              </button>
            ) : (
              <div 
                className="max-w-4xl mx-auto bg-gradient-to-b from-white/10 to-transparent rounded-2xl border border-white/10 p-4 sm:p-8 animate-scale-in"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative overflow-hidden h-[28rem] sm:h-[36rem] rounded-lg">
                  {/* Tip Content */}
                  {tips.map((tip, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        index === currentIndex ? 'opacity-100 z-10' : 'opacity-0'
                      }`}
                      aria-hidden={index !== currentIndex}
                    >
                       <img src={tip.imageUrl} alt={tip.title} className="w-full h-full object-cover"/>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-4 sm:p-8 text-left pb-28 sm:pb-36">
                          <h3 className="text-2xl sm:text-3xl font-bold text-white">{tip.title}</h3>
                          <p className="text-gray-300 mt-2 text-sm sm:text-base">{tip.description}</p>
                       </div>
                    </div>
                  ))}

                  {/* Navigation & Controls Container */}
                  <div className="absolute z-20 inset-x-0 bottom-0 px-4 py-3">
                      <div className="flex justify-center items-center">
                          <button onClick={handlePrev} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Previous tip">
                              <ArrowLeftIcon />
                          </button>
                          <span className="mx-6 text-lg font-semibold text-white tabular-nums" aria-live="polite">{currentIndex + 1} / {tips.length}</span>
                          <button onClick={handleNext} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Next tip">
                              <ArrowRightIcon />
                          </button>
                      </div>
                      <div className="text-center mt-3">
                        <button 
                            onClick={() => setIsCarouselVisible(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            Ver menos
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
});

export default StreamingTips;