import React, { useState } from 'react';

// Icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

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

interface PaymentTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const paymentLevels = [
  {
    level: 'Nivel A',
    seedGoal: '2,000',
    dailyHours: '2',
    remuneration: '$14',
    seedExchange: '$9',
    totalPayment: '$23 USD',
  },
  {
    level: 'Nivel B',
    seedGoal: '5,000',
    dailyHours: '2',
    remuneration: '$35',
    seedExchange: '$23',
    totalPayment: '$58 USD',
  },
  {
    level: 'Nivel C',
    seedGoal: '10,000',
    dailyHours: '2',
    remuneration: '$74',
    seedExchange: '$48',
    totalPayment: '$122 USD',
  },
  {
    level: 'Nivel CE',
    seedGoal: '20,000',
    dailyHours: '2',
    remuneration: '$141',
    seedExchange: '$95',
    totalPayment: '$236 USD',
  },
  {
    level: 'Nivel D',
    seedGoal: '30,000',
    dailyHours: '2',
    remuneration: '$211',
    seedExchange: '$143',
    totalPayment: '$354 USD',
  },
  {
    level: 'Nivel E',
    seedGoal: '60,000',
    dailyHours: '2',
    remuneration: '$422',
    seedExchange: '$286',
    totalPayment: '$708 USD',
  },
  {
    level: 'Nivel S1',
    seedGoal: '100,000',
    dailyHours: '2',
    remuneration: '$660',
    seedExchange: '$476',
    totalPayment: '$1,136 USD',
  },
  {
    level: 'Nivel S2',
    seedGoal: '150,000',
    dailyHours: '2',
    remuneration: '$990',
    seedExchange: '$714',
    totalPayment: '$1,704 USD',
  },
  {
    level: 'Nivel S3',
    seedGoal: '200,000',
    dailyHours: '2',
    remuneration: '$1,320',
    seedExchange: '$952',
    totalPayment: '$2,272 USD',
  },
  {
    level: 'Nivel S4',
    seedGoal: '250,000',
    dailyHours: '2',
    remuneration: '$1,650',
    seedExchange: '$1,190',
    totalPayment: '$2,840 USD',
  },
  {
    level: 'Nivel S5',
    seedGoal: '300,000',
    dailyHours: '2',
    remuneration: '$1,980',
    seedExchange: '$1,429',
    totalPayment: '$3,409 USD',
  },
  {
    level: 'Nivel S6',
    seedGoal: '400,000',
    dailyHours: '2',
    remuneration: '$2,700',
    seedExchange: '$1,905',
    totalPayment: '$4,604 USD',
  },
  {
    level: 'Nivel S7',
    seedGoal: '500,000',
    dailyHours: '2',
    remuneration: '$3,550',
    seedExchange: '$2,381',
    totalPayment: '$5,931 USD',
  },
  {
    level: 'Nivel S8',
    seedGoal: '750,000',
    dailyHours: '2',
    remuneration: '$5,500',
    seedExchange: '$3,572',
    totalPayment: '$9,072 USD',
  },
  {
    level: 'Nivel S9',
    seedGoal: '1,000,000',
    dailyHours: '2',
    remuneration: '$6,800',
    seedExchange: '$4,762',
    totalPayment: '$11,562 USD',
  },
  {
    level: 'Nivel S10',
    seedGoal: '1,500,000',
    dailyHours: '2',
    remuneration: '$10,400',
    seedExchange: '$7,143',
    totalPayment: '$17,543 USD',
  },
  {
    level: 'Nivel S11',
    seedGoal: '2,000,000',
    dailyHours: '2',
    remuneration: '$14,500',
    seedExchange: '$9,524',
    totalPayment: '$24,024 USD',
  },
  {
    level: 'Nivel S12',
    seedGoal: '3,000,000',
    dailyHours: '2',
    remuneration: '$22,500',
    seedExchange: '$14,286',
    totalPayment: '$36,786 USD',
  },
];


const PaymentTableModal: React.FC<PaymentTableModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? paymentLevels.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === paymentLevels.length - 1 ? 0 : prevIndex + 1));
  };

  if (!isOpen) return null;

  const currentLevel = paymentLevels[currentIndex];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-[#100F13]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-xl relative animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20">
          <CloseIcon />
        </button>
        
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Tabla de Pagos</h2>

        <div className="mt-4">
            <img 
                src="https://i.postimg.cc/8zccpBdH/NIVEL_20251030_155750_0001.png" 
                alt="Tabla de Pagos" 
                className="w-full h-auto rounded-lg shadow-lg"
            />
        </div>

        {/* Informative Cards Carousel */}
        <div className="mt-8">
            <div className="relative overflow-hidden h-64">
                {paymentLevels.map((level, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      aria-hidden={index !== currentIndex}
                    >
                        <div className="bg-transparent border border-purple-500 p-6 rounded-lg h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-purple-400 text-center mb-4">{level.level}</h3>
                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-gray-400">Meta en semillas</dt>
                                    <dd className="font-semibold text-white">{level.seedGoal}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-400">Horas diarias</dt>
                                    <dd className="font-semibold text-white">{level.dailyHours}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-400">Remuneración</dt>
                                    <dd className="font-semibold text-white">{level.remuneration}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-400">Cambio de semillas</dt>
                                    <dd className="font-semibold text-white">{level.seedExchange}</dd>
                                </div>
                                <div className="pt-3 mt-2 border-t border-white/10 flex justify-between">
                                    <dt className="text-gray-300 font-bold">Pago total</dt>
                                    <dd className="font-bold text-lg text-purple-400">{level.totalPayment}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                ))}
            </div>
            {/* Carousel Controls */}
            <div className="flex justify-center items-center mt-4">
                <button onClick={handlePrev} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Anterior">
                    <ArrowLeftIcon />
                </button>
                <span className="mx-4 text-sm font-semibold text-white tabular-nums" aria-live="polite">{currentIndex + 1} / {paymentLevels.length}</span>
                <button onClick={handleNext} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" aria-label="Siguiente">
                    <ArrowRightIcon />
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentTableModal;