import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const ExperienciaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

const EspecializacionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);

const CommunityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);


const AboutUs = React.forwardRef<HTMLElement>((props, ref) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(prev => (prev === index ? null : index));
  };

  const getCardClasses = (index: number) => {
    const baseClasses = "p-8 flex flex-col items-center bg-gradient-to-b from-white/10 to-transparent rounded-2xl border border-white/10 transition-all duration-300 ease-in-out cursor-pointer";
    const selectedClasses = "scale-105 bg-gradient-to-b from-white/20 to-black/20 shadow-lg shadow-purple-500/20";
    return `${baseClasses} ${selectedCard === index ? selectedClasses : ''}`;
  };

  return (
    <section ref={ref} className="py-20 px-4">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Quiénes <span className="text-purple-500">somos</span>
          </h2>
          <div className="mt-8 max-w-3xl mx-auto">
              <p className="text-gray-400">
                  Somos una agencia de talentos para plataformas de streaming.
                  <br />
                  Nos especializamos en descubrir y potenciar a creadores de contenido,
                  <br />
                  conectándolos con las plataformas más influyentes a nivel global.
              </p>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className={getCardClasses(0)} onClick={() => handleCardClick(0)}>
                  <ExperienciaIcon />
                  <h3 className="text-2xl font-bold text-white mb-2">Experiencia</h3>
                  <p className="text-gray-400">
                      Con más de 7 años en la industria, hemos perfeccionado el arte de impulsar carreras en el mundo del streaming.
                  </p>
              </div>
              <div className={getCardClasses(1)} onClick={() => handleCardClick(1)}>
                  <EspecializacionIcon />
                  <h3 className="text-2xl font-bold text-white mb-2">Especialización</h3>
                  <p className="text-gray-400">
                      Nos dedicamos exclusivamente a conectar creadores con las plataformas más importantes, asegurando el match perfecto para su contenido.
                  </p>
              </div>
              <div className={getCardClasses(2)} onClick={() => handleCardClick(2)}>
                  <CommunityIcon />
                  <h3 className="text-2xl font-bold text-white mb-2">Comunidad Vibrante</h3>
                  <p className="text-gray-400">
                      Más de <span className="text-purple-500 font-bold">400</span> talentos activos confían en nosotros.
                      <br />
                      Únete a una red de creadores exitosos y colaborativos.
                  </p>
              </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
});

export default AboutUs;