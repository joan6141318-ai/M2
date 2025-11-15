import React from 'react';

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

interface FooterProps {
    onCTAClick: () => void;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(({ onCTAClick }, ref) => {
    return (
        <footer ref={ref} className="bg-[#0A090C] py-16 px-4">
            <div className="max-w-7xl mx-auto text-center text-gray-400">
                <div className="flex justify-center space-x-6 mb-8">
                    <div className="text-gray-600 cursor-default" aria-label="Twitter">
                        <TwitterIcon />
                    </div>
                    <div className="text-gray-600 cursor-default" aria-label="Instagram">
                        <InstagramIcon />
                    </div>
                    <div className="text-gray-600 cursor-default" aria-label="TikTok">
                        <TikTokIcon />
                    </div>
                </div>
                <div className="mb-4 space-x-4">
                    <a href="mailto:capacitamoon@gmail.com" className="hover:text-white transition-colors">
                        capacitamoon@gmail.com
                    </a>
                     <span className="text-gray-600">|</span>
                    <button onClick={onCTAClick} className="hover:text-white transition-colors">
                        Trabaja con nosotros
                    </button>
                </div>
                <div>
                    <p className="text-sm">
                        © {new Date().getFullYear()} AGENCIA MOON GROUP.
                    </p>
                    <p className="text-sm">
                        Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
});

export default Footer;