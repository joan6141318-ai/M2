import React from 'react';

interface NavItem {
  name: string;
  ref?: React.RefObject<HTMLElement>;
  action?: () => void;
}

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

// Icons for Navigation Items
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const AboutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0L7 3m3 3L7 3m3 3l3-3m-3 3v6m0 0l-3 3m3-3l3 3" /></svg>;
const PartnersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const TalentsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const TipsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const JoinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>;
const FAQIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PodcastIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>;

const TwitterIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
const InstagramIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 012.127 2.127c.248.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-2.127 2.127c-.636.248-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-2.127-2.127c-.248-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 012.127-2.127c.636-.248 1.363.416 2.427.465C9.53 2.013 9.884 2 12.315 2zM12 8.118a3.882 3.882 0 100 7.764 3.882 3.882 0 000-7.764zM12 14.333A2.333 2.333 0 1112 9.667a2.333 2.333 0 010 4.666zm5.85-6.837a1.4 1.4 0 100-2.8 1.4 1.4 0 000 2.8z" clipRule="evenodd" /></svg>;
const TikTokIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.95-6.43-2.88-1.57-1.92-2.31-4.43-2.1-6.81.21-2.36 1.35-4.59 3.19-6.05 1.83-1.45 4.14-2.19 6.31-2.02v3.91c-.66-.01-1.32.02-1.98.07-1.29.1-2.47.67-3.21 1.6-1.08 1.31-1.57 3.15-1.25 4.88.32 1.75 1.77 3.2 3.48 3.82.97.33 1.98.43 3.01.32.95-.09 1.85-.43 2.61-1.02.6-.46.98-1.11 1.19-1.84.07-.25.11-.51.11-.77v-8.74c-2.02.16-3.93.96-5.26 2.25-.01.01-.02.01-.02.02z" /></svg>;

const navIcons: { [key: string]: React.FC } = {
  'Inicio': HomeIcon,
  'Quiénes somos': AboutIcon,
  'Socios': PartnersIcon,
  'Talentos': TalentsIcon,
  'Tips': TipsIcon,
  'Únete': JoinIcon,
  'FAQ': FAQIcon,
  'Podcast': PodcastIcon,
};

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose, navItems }) => {
  const handleItemClick = (item: NavItem) => {
    if (item.ref && item.ref.current) {
      item.ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (item.action) {
      item.action();
    }
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 right-0 bottom-0 w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
            <div className="p-6 flex justify-between items-center border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Menú</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <CloseIcon />
                </button>
            </div>
            <nav className="flex-1 p-6">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = navIcons[item.name] || HomeIcon;
                        return (
                        <li key={item.name}>
                            <button
                            onClick={() => handleItemClick(item)}
                            className="w-full flex items-center p-3 text-lg text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                            >
                            <Icon />
                            <span className="ml-4">{item.name}</span>
                            </button>
                        </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="mt-auto p-6">
                <div className="flex justify-center space-x-6">
                    <a href="https://x.com/AgenciaMoon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                        <TwitterIcon />
                    </a>
                    <a href="https://instagram.com/AgenciaMoon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                        <InstagramIcon />
                    </a>
                    <a href="https://tiktok.com/@AgenciaMoon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="TikTok">
                        <TikTokIcon />
                    </a>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;