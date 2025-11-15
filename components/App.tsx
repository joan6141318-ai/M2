import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import AboutUs from './AboutUs';
import Platforms from './Platforms';
import JoinUs from './JoinUs';
import OurTalents from './OurTalents';
import StreamingTips from './StreamingTips';
import FAQ from './FAQ';
import Footer from './Footer';
import Chatbot from './Chatbot';
import NavigationMenu from './NavigationMenu';
import ApplicationForm from './ApplicationForm';
import PodcastPlayer from './PodcastPlayer';
import TalentDetailModal from './TalentDetailModal';
import PaymentTableModal from './PaymentTableModal';
import AnimatedRobot from './AnimatedRobot';
import type { Talent } from '../types';
import { isApiAvailable } from '../services/geminiService';

const ApiKeyErrorOverlay: React.FC = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 text-center">
        <div className="bg-[#100F13]/90 border border-red-500/50 rounded-2xl p-8 w-full max-w-lg animate-scale-in">
            <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold mt-6 text-white">Error de Configuración</h2>
            <p className="mt-2 text-gray-300">
                La aplicación no se puede conectar a los servicios de IA.
            </p>
            <p className="mt-4 text-sm text-gray-400 bg-white/5 p-3 rounded-lg">
                Si eres el desarrollador, asegúrate de haber configurado la variable de entorno <code className="bg-black/50 text-purple-300 px-1 py-0.5 rounded">API_KEY</code> en tu plataforma de despliegue (ej. Vercel).
            </p>
        </div>
    </div>
);

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPodcastPlayerOpen, setIsPodcastPlayerOpen] = useState(false);
  const [isTalentModalOpen, setIsTalentModalOpen] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(1);

  const heroRef = useRef<HTMLElement>(null);
  const aboutUsRef = useRef<HTMLElement>(null);
  const platformsRef = useRef<HTMLElement>(null);
  const joinUsRef = useRef<HTMLElement>(null);
  const ourTalentsRef = useRef<HTMLElement>(null);
  const tipsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  
  const apiAvailable = isApiAvailable();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      const scrollY = window.scrollY;
      const fadeEnd = heroHeight / 2;
      
      if (scrollY < fadeEnd) {
        setBgOpacity(1 - (scrollY / fadeEnd));
      } else {
        setBgOpacity(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleTalentClick = (talent: Talent) => {
    setSelectedTalent(talent);
    setIsTalentModalOpen(true);
  };

  const handleCloseTalentModal = () => {
    setIsTalentModalOpen(false);
  };

  const navItems = [
    { name: 'Inicio', ref: heroRef },
    { name: 'Quiénes somos', ref: aboutUsRef },
    { name: 'Socios', ref: platformsRef },
    { name: 'Talentos', ref: ourTalentsRef },
    { name: 'Tips', ref: tipsRef },
    { name: 'Únete', ref: joinUsRef },
    { name: 'FAQ', ref: faqRef },
    { name: 'Podcast', action: () => setIsPodcastPlayerOpen(true) },
  ];

  return (
    <>
      {!apiAvailable && <ApiKeyErrorOverlay />}

      {/* Reverted background container with original transition effect */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000"
          style={{ 
            backgroundImage: "url('https://i.postimg.cc/pX0CoGgP/girl-streamer-bg.jpg')",
            opacity: bgOpacity 
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://i.postimg.cc/3w7pXz7g/nebula-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Scrollable content container */}
      <div className="relative z-10 bg-transparent text-white">
        <Header onMenuClick={() => setIsMenuOpen(true)} />
        
        <main>
          <Hero ref={heroRef} onCTAClick={() => setIsFormOpen(true)} />
          <AboutUs ref={aboutUsRef} />
          <Platforms ref={platformsRef} />
          <OurTalents ref={ourTalentsRef} onTalentClick={handleTalentClick} />
          <StreamingTips ref={tipsRef} />
          <JoinUs ref={joinUsRef} onCTAClick={() => setIsFormOpen(true)} />
          <FAQ ref={faqRef} onOpenPaymentModal={() => setIsPaymentModalOpen(true)} />
        </main>

        <Footer ref={footerRef} />
      </div>

      {/* Overlays and Modals */}
      {apiAvailable && <AnimatedRobot onClick={() => setIsChatOpen(!isChatOpen)} />}
      {apiAvailable && <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />
      <ApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <PodcastPlayer isOpen={isPodcastPlayerOpen} onClose={() => setIsPodcastPlayerOpen(false)} />
      <TalentDetailModal isOpen={isTalentModalOpen} onClose={handleCloseTalentModal} talent={selectedTalent} />
      <PaymentTableModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </>
  );
};

export default App;
