import React from 'react';
import type { Talent } from '../types';

// Icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 012.127 2.127c.248.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-2.127 2.127c-.636.248-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-2.127-2.127c-.248-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 012.127-2.127c.636-.248 1.363.416 2.427.465C9.53 2.013 9.884 2 12.315 2zM12 8.118a3.882 3.882 0 100 7.764 3.882 3.882 0 000-7.764zM12 14.333A2.333 2.333 0 1112 9.667a2.333 2.333 0 010 4.666zm5.85-6.837a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8z" clipRule="evenodd"></path>
    </svg>
);

const TikTokIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.95-6.43-2.88-1.57-1.92-2.31-4.43-2.1-6.81.21-2.36 1.35-4.59 3.19-6.05 1.83-1.45 4.14-2.19 6.31-2.02v3.91c-.66-.01-1.32.02-1.98.07-1.29.1-2.47.67-3.21 1.6-1.08 1.31-1.57 3.15-1.25 4.88.32 1.75 1.77 3.2 3.48 3.82.97.33 1.98.43 3.01.32.95-.09 1.85-.43 2.61-1.02.6-.46.98-1.11 1.19-1.84.07-.25.11-.51.11-.77v-8.74c-2.02.16-3.93.96-5.26 2.25-.01.01-.02.01-.02.02z"></path>
    </svg>
);

const TwitchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.714 0h1.715v5.143h-1.715zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0H6zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714v9.429z"/></svg>
);

const YouTubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);

const PoppoLiveIcon = () => (
    <img src="https://i.postimg.cc/tTBYyRQm/1763094168746.png" alt="Poppo Live" className="h-6 w-auto" />
);

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


interface TalentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  talent: Talent | null;
}

const TalentDetailModal: React.FC<TalentDetailModalProps> = ({ isOpen, onClose, talent }) => {
  if (!isOpen || !talent) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-black/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-4xl relative flex flex-col md:flex-row gap-8 animate-scale-in" 
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20">
          <CloseIcon />
        </button>

        {/* Phone Mockup */}
        <div className="w-full md:w-[300px] flex-shrink-0 flex items-center justify-center rounded-lg">
          <div className="relative mx-auto border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl">
            <div className="w-[120px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[13px] top-[64px] rounded-s-lg"></div>
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[13px] top-[115px] rounded-s-lg"></div>
            <div className="h-[50px] w-[3px] bg-gray-800 absolute -end-[13px] top-[100px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black relative">
              {talent.videoId ? (
                <>
                  <video
                    key={talent.videoId}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={talent.videoId}
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                  {/* This div prevents any interaction with the video */}
                  <div className="absolute top-0 left-0 w-full h-full"></div>
                </>
              ) : (
                <img src={talent.imageUrl} alt={talent.name} className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="w-full flex flex-col justify-center text-center md:text-left py-8 px-8 bg-gradient-to-t from-purple-900/20 to-transparent rounded-lg">
          <div className="flex items-center justify-center md:justify-start text-purple-400">
            {renderPlatformIcon(talent.platform)}
            <span className="ml-2 font-semibold tracking-wider uppercase">{talent.platform}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4">{talent.name}</h2>
          <p className="mt-6 text-gray-300 leading-relaxed">
            {talent.bio}
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
             {talent.socials.twitter && <a href={talent.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><TwitterIcon /></a>}
             {talent.socials.instagram && <a href={talent.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><InstagramIcon /></a>}
             {talent.socials.tiktok && <a href={talent.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><TikTokIcon /></a>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDetailModal;