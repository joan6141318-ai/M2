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

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPodcastPlayerOpen, setIsPodcastPlayerOpen] = useState(false);
  const [isTalentModalOpen, setIsTalentModalOpen] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAboutUsVisible, setIsAboutUsVisible] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const aboutUsRef = useRef<HTMLElement>(null);
  const platformsRef = useRef<HTMLElement>(null);
  const joinUsRef = useRef<HTMLElement>(null);
  const ourTalentsRef = useRef<HTMLElement>(null);
  const tipsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAboutUsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Adjust this value to change when the transition triggers
      }
    );

    const currentRef = aboutUsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
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
      {/* Background container for dynamic background */}
      <div className="fixed inset-0 z-0">
        {/* Default Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000 ${isAboutUsVisible ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            backgroundImage: "url('https://i.postimg.cc/hv5fbmt0/IMG_20251111_053352.jpg?v=1')"
          }}
        />
        {/* "About Us" Section Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000 ${isAboutUsVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: "url('https://i.postimg.cc/wjCYZC12/photo_1616589676_62b3bd4ff6d2.jpg')"
          }}
        />
        {/* Overlay */}
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

        <Footer ref={footerRef} onCTAClick={() => setIsFormOpen(true)} />
      </div>

      {/* Overlays and Modals */}
      <AnimatedRobot onClick={() => setIsChatOpen(!isChatOpen)} />
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />
      <ApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <PodcastPlayer isOpen={isPodcastPlayerOpen} onClose={() => setIsPodcastPlayerOpen(false)} />
      <TalentDetailModal isOpen={isTalentModalOpen} onClose={handleCloseTalentModal} talent={selectedTalent} />
      <PaymentTableModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </>
  );
};

export default App;