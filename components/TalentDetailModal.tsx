import React from 'react';
import type { Talent } from '../types';

// Icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const VerifiedIcon = () => (
    <svg className="w-6 h-6 ml-2 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

interface TalentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  talent: Talent | null;
}

const FormattedBio: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </p>
  );
};

const TalentDetailModal: React.FC<TalentDetailModalProps> = ({ isOpen, onClose, talent }) => {
  if (!isOpen || !talent) return null;

  // Parse the bio to separate the main description from the key-value stats
  const bioParts = talent.bio.split('\n\n');
  const mainDescription = bioParts[0];
  const stats = bioParts.slice(1)
    .map(line => {
      const splitPoint = line.indexOf(':');
      if (splitPoint === -1) return null;
      const key = line.substring(0, splitPoint).trim();
      const value = line.substring(splitPoint + 1).trim();
      return { key, value };
    })
    .filter((item): item is { key: string; value: string } => item !== null);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] relative flex flex-row animate-scale-in overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 p-2 bg-black/30 rounded-full">
          <CloseIcon />
        </button>

        {/* Left Side: All-Screen Phone Mockup */}
        <div className="w-2/5 flex items-center justify-center p-4 sm:p-8 bg-black/20">
          <div className="w-full max-w-[200px] sm:max-w-[280px] aspect-[9/19.5] bg-black border-2 border-gray-800 rounded-[1.5rem] sm:rounded-[2.25rem] p-1.5 shadow-2xl shadow-purple-900/50">
              <div className="w-full h-full rounded-[1.4rem] sm:rounded-[2rem] overflow-hidden relative">
                  {talent.videoId ? (
                      <video
                          key={talent.videoId}
                          className="w-full h-full object-cover"
                          src={talent.videoId}
                          autoPlay muted loop playsInline
                      />
                  ) : (
                      <img src={talent.imageUrl} alt={talent.name} className="w-full h-full object-cover" />
                  )}
              </div>
          </div>
        </div>


        {/* Right Side: Ficha Técnica */}
        <div className="w-3/5 flex flex-col p-6 sm:p-10 bg-black/60 backdrop-blur-sm relative">
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none"></div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white flex items-center flex-shrink-0 mt-8 mb-4">
              {talent.name}
              {talent.isVerified && <VerifiedIcon />}
            </h2>
            
            <div className="flex-grow min-h-0 overflow-y-auto hide-scrollbar pr-2">
              <FormattedBio text={mainDescription} />
              
              {stats.length > 0 && (
                <div className="mt-8 space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center text-base">
                      <span className="text-gray-400">{stat.key}</span>
                      <span className="font-semibold text-white text-right">{stat.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-auto pt-6 flex justify-start gap-4 flex-shrink-0">
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