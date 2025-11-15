import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
);

interface FAQProps {
  onOpenPaymentModal: () => void;
}

const FAQ = React.forwardRef<HTMLElement, FAQProps>(({ onOpenPaymentModal }, ref) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: '¿Cómo y cuándo recibo mis pagos?',
            answer: (
                <>
                    <p>
                        Los pagos se procesan mensualmente dentro de la primera semana de cada mes siguiente al periodo de ganancias. Recibirás tu pago con base en el cumplimiento mensual alcanzado.
                    </p>
                    <button 
                      type="button" 
                      onClick={onOpenPaymentModal} 
                      className="text-purple-400 hover:text-purple-300 mt-3 block font-semibold"
                    >
                        Ver tabla de pagos
                    </button>
                </>
            ),
        },
        {
            question: '¿Qué tipo de soporte técnico ofrecen?',
            answer: <p>Ofrecemos soporte las 24 horas del día, los 7 días de la semana para dudas relacionadas con la plataforma, configuración, bloqueos, eventos y cualquier otra duda de tu streaming.</p>,
        },
        {
            question: '¿Me cobran algún tipo de porcentaje?',
            answer: <p>No, no cobramos ningún tipo de porcentaje o comisión por representarte. Tus ganancias son 100% para ti. Nuestras ganancias se basan en estrategias comerciales con nuestros socios.</p>,
        },
        {
            question: '¿Qué sucede si necesito retirarme por una emergencia? ¿Hay alguna penalización?',
            answer: <p>No, en lo absoluto. Comprendemos que pueden surgir imprevistos y tu bienestar es lo más importante. No aplicamos ninguna penalización. Solo te pedimos que te comuniques con tu agente para encontrar juntos la mejor solución.</p>,
        }
    ];

    return (
        <section ref={ref} className="py-20 px-4 bg-[#100F13]/50 backdrop-blur-sm">
            <AnimatedSection>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                            Preguntas <span className="text-purple-500">Frecuentes</span>
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            Respuestas rápidas a las dudas más comunes de nuestros talentos.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-white/10 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center p-6 text-left text-lg font-semibold text-white bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <span>{faq.question}</span>
                                    <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    {openIndex === index ? <MinusIcon /> : <PlusIcon />}
                                    </div>
                                </button>
                                <div
                                    className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <div className="p-6 pt-0 text-gray-400 text-left">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
});

export default FAQ;