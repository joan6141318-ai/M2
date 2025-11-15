import React from 'react';
import AnimatedSection from './AnimatedSection';
import type { Talent } from '../types';

const TwitchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.714 0h1.715v5.143h-1.715zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0H6zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714v9.429z"/>
    </svg>
);

const YouTubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);

const BigoLiveIcon = () => (
    <img src="https://i.postimg.cc/DyHHxDjx/bigo-live-seeklogo.png" alt="Bigo Live logo" className="h-5 w-5 mr-1.5" />
);

const talents: Talent[] = [
  {
    name: 'steficupcake',
    platform: 'Bigo Live',
    imageUrl: 'https://i.postimg.cc/N0Z5jrFK/IMG_20251107_193051.jpg',
    videoId: 'https://player.vimeo.com/video/1137301114',
    bio: '**Vibrante, carismática y llena de humor**\nNo te pierdas sus gameplays y charlas únicas.\n\nRecord recaudación : 2.5 Millones\n\nPaís: Colombia',
    isVerified: true,
    socials: {
      twitter: '#',
      instagram: '#',
      tiktok: '#',
    },
  },
  {
    name: 'lbm0312',
    platform: 'Bigo Live',
    imageUrl: 'https://i.postimg.cc/rpn71VcF/In_Shot_20251107_185715214.jpg',
    videoId: 'https://player.vimeo.com/video/1137304485',
    bio: '**Energética, positiva e inspiradora**\nÚnete a sus transmisiones de baile y música.\n\nRecord recaudación : 3 Millones\n\nPaís: Colombia',
    isVerified: true,
    socials: {
      twitter: '#',
      instagram: '#',
      tiktok: '#',
    },
  },
  {
    name: 'Seli_105',
    platform: 'Bigo Live',
    imageUrl: 'https://i.postimg.cc/Dw1kLCZ3/IMG_20251113_221309.jpg',
    videoId: 'https://player.vimeo.com/video/1137306392',
    bio: '**Creativa, única y muy artística**\nExplora el mundo del arte y diseño en sus directos.\n\nRecord recaudación : 1.8 Millones\n\nPaís: Venezuela',
    isVerified: true,
    socials: {
        twitter: '#',
        instagram: '#',
        tiktok: '#',
    },
  },
  {
    name: 'boanquita_',
    platform: 'Bigo Live',
    imageUrl: 'https://i.postimg.cc/R0Mtzmk6/IMG_20251107_183411.png',
    videoId: 'https://player.vimeo.com/video/1137287888',
    bio: '**Dulce, alegre y divertida**\nNo te pierdas sus transmisiones todos los días\n\nRecord recaudación : 1.5 Millones\n\nPaís: Colombia',
    isVerified: true,
    socials: {
        twitter: '#',
        instagram: '#',
        tiktok: '#',
    },
  },
];


interface OurTalentsProps {
  onTalentClick: (talent: Talent) => void;
}

const renderPlatformIcon = (platform: Talent['platform']) => {
    switch (platform) {
      case 'Twitch':
        return <TwitchIcon />;
      case 'YouTube':
        return <YouTubeIcon />;
      case 'Bigo Live':
        return <BigoLiveIcon />;
      default:
        return null;
    }
};

const OurTalents = React.forwardRef<HTMLElement, OurTalentsProps>(({ onTalentClick }, ref) => {
  const duplicatedTalents = [...talents, ...talents];

  return (
    <section ref={ref} className="py-20 md:py-28">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Nuestros <span className="text-purple-500">Talentos</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Conoce a algunos de los creadores increíbles que forman parte de nuestra familia.
          </p>
        </div>
      </AnimatedSection>
      
      <div className="mt-16 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]">
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {duplicatedTalents.map((talent, index) => (
            <div key={`${talent.name}-${index}`} className="mx-4 flex-shrink-0 w-72 sm:w-80">
                <div
                className="relative aspect-[2/3] w-full cursor-pointer group rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
                onClick={() => onTalentClick(talent)}
                >
                <img 
                    src={talent.imageUrl} 
                    alt={talent.name} 
                    className="w-full h-full object-cover object-top" 
                />
                
                {/* Purple glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/40 via-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Ficha Técnica */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex justify-between items-end">
                    <div>
                        <h3 className="text-xl font-bold text-white truncate [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">{talent.name}</h3>
                        <div className="flex items-center mt-1 text-gray-200">
                            {renderPlatformIcon(talent.platform)}
                            <span className="text-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">{talent.platform}</span>
                        </div>
                    </div>
                    <div className="text-sm text-purple-400 font-semibold">
                        Ver momentos
                    </div>
                </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default OurTalents;