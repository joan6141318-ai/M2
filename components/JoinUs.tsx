import React from 'react';
import AnimatedSection from './AnimatedSection';

// Icons for the benefits section
const GrowthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MonetizationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5A6.5 6.5 0 1012 5.5a6.5 6.5 0 000 13z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

interface JoinUsProps {
  onCTAClick: () => void;
}

const JoinUs = React.forwardRef<HTMLElement, JoinUsProps>(({ onCTAClick }, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 bg-[#100F13]/50 backdrop-blur-sm">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Únete a <span className="text-purple-500">Nuestra Comunidad</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Da el siguiente paso en tu carrera y forma parte del futuro del streaming.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-12 items-start">
          {/* Benefits Column */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white text-left">Lo que ganas al unirte</h3>
            <div className="flex items-start space-x-4 text-left">
              <MonetizationIcon />
              <div>
                <h4 className="text-xl font-semibold text-white">100% de tus ganancias</h4>
                <p className="text-gray-400 mt-1">No te cobramos ningún tipo de % o comisiones. Tus ganancias las recibes al 100%.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <SupportIcon />
              <div>
                <h4 className="text-xl font-semibold text-white">Soporte Dedicado</h4>
                <p className="text-gray-400 mt-1">Cuentas con un equipo de expertos que te apoya en cada paso de tu carrera. Brindamos soporte 24/7.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 text-left">
              <GrowthIcon />
              <div>
                <h4 className="text-xl font-semibold text-white">Monetización Efectiva</h4>
                <p className="text-gray-400 mt-1">Accede a Bonos exclusivos por desempeño, las mejores Recompensas en programa de referidos no esperes más Maximizar tus ganancias !</p>
              </div>
            </div>
          </div>

          {/* Requirements & CTA Column */}
          <div className="bg-gradient-to-b from-white/10 to-transparent p-8 rounded-2xl border border-white/10">
            <h3 className="text-3xl font-bold text-white text-left mb-6">Requisitos para aplicar</h3>
            <ul className="space-y-4 text-left">
              <li className="flex items-center text-gray-300"><CheckIcon /> Ser mayor de 18 años.</li>
              <li className="flex items-center text-gray-300"><CheckIcon /> Disponibilidad mínimo 2 horas al día.</li>
              <li className="flex items-center text-gray-300"><CheckIcon /> Buenas iluminación y conexión de internet.</li>
            </ul>
            <button
              onClick={onCTAClick}
              className="mt-10 w-full px-10 py-4 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 ease-in-out">
              Enviar mi Solicitud
            </button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
});

export default JoinUs;