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

const PoppoLiveIcon = () => (
    <img src="https://i.postimg.cc/tTBYyRQm/1763094168746.png" alt="Poppo Live" className="h-5 w-auto mr-2" />
);

const talents: Talent[] = [
  {
    name: 'steficupcake',
    platform: 'Poppo Live',
    imageUrl: 'https://i.postimg.cc/N0Z5jrFK/IMG_20251107_193051.jpg',
    videoId: 'https://res.cloudinary.com/dskj7hk3c/video/upload/InShot_20240713_180424194_u2s7yl.mp4',
    bio: 'Stefi es una creadora de contenido vibrante y carismática que se especializa en gameplays llenos de humor y sesiones de "Just Chatting" donde conecta con su comunidad de una manera única y auténtica.',
    socials: {
      twitter: '#',
      instagram: '#',
      tiktok: '#',
    },
  },
  {
    name: 'El Mariana',
    platform: 'Twitch',
    imageUrl: 'https://i.postimg.cc/sX0pQyFh/el-mariana.jpg',
    videoId: 'https://res.cloudinary.com/dskj7hk3c/video/upload/v1721092800/samples/elephants.mp4',
    bio: 'El Mariana es uno de los streamers más grandes de Latinoamérica, conocido por su humor irreverente, su carisma y su habilidad para conectar con la audiencia en juegos de todo tipo.',
    socials: {
      twitter: '#',
      instagram: '#',
      tiktok: '#',
    },
  },
  {
    name: 'AriGameplays',
    platform: 'Twitch',
    imageUrl: 'https://i.postimg.cc/VLx6XF0B/arigameplays.jpg',
    videoId: 'https://res.cloudinary.com/dskj7hk3c/video/upload/v1721092800/samples/caminandes.mp4',
    bio: 'Abril "Ari" Garza es una de las streamers más influyentes, destacando en una variedad de juegos y contenido IRL. Su energía y conexión con su comunidad la han convertido en un ícono del streaming.',
    socials: {
        twitter: '#',
        instagram: '#',
        tiktok: '#',
    },
  },
  {
    name: 'JuanSGuarnizo',
    platform: 'YouTube',
    imageUrl: 'https://i.postimg.cc/9Q2YVp6C/juansguarnizo.jpg',
    videoId: 'https://res.cloudinary.com/dskj7hk3c/video/upload/v1721092800/samples/sea-turtle.mp4',
    bio: 'Juan es un creador de contenido colombiano que ha conquistado Twitch con su versatilidad, participando en series de roleplay, jugando títulos de alta competencia y creando momentos inolvidables.',
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
      case 'Poppo Live':
        return <PoppoLiveIcon />;
      default:
        return null;
    }
};

const OurTalents = React.forwardRef<HTMLElement, OurTalentsProps>(({ onTalentClick }, ref) => {
  // Duplicate the array for a seamless loop
  const duplicatedTalents = [...talents, ...talents];

  return (
    <section ref={ref} className="py-20">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Nuestros <span className="text-purple-500">Talentos</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Conoce a algunos de los creadores increíbles que forman parte de nuestra familia.
          </p>
        </div>
      </AnimatedSection>
      
      <div className="mt-16 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex w-max animate-scroll">
          {[...duplicatedTalents, ...duplicatedTalents].map((talent, index) => (
            <div 
              key={`${talent.name}-${index}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 w-72 h-96 flex-shrink-0 mx-4"
              onClick={() => onTalentClick(talent)}
            >
              <img src={talent.imageUrl} alt={talent.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-xl font-bold text-white truncate">{talent.name}</h3>
                <div className="flex items-center mt-1 text-white">
                  {renderPlatformIcon(talent.platform)}
                  <span className="ml-1 text-sm">{talent.platform}</span>
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