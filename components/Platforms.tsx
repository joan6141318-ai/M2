import React from 'react';
import AnimatedSection from './AnimatedSection';

// A curated list of partner logos that are confirmed to work.
const uniquePlatforms = [
  { name: 'Poppo Live', imageUrl: 'https://i.postimg.cc/tTBYyRQm/1763094168746.png' },
  { name: 'Tango', imageUrl: 'https://i.postimg.cc/5yjjtcbB/1763094203370.png' },
  { name: 'Uplive', imageUrl: 'https://i.postimg.cc/SRjjK0kL/1763094224766.png' },
  { name: 'Livu', imageUrl: 'https://i.postimg.cc/B6mXsZ97/1763094236481.png' },
];

// To ensure the carousel is always full and loops smoothly, we repeat the list of logos.
const platforms = [...uniquePlatforms, ...uniquePlatforms];

const Platforms = React.forwardRef<HTMLElement>((props, ref) => {
    return (
        <section ref={ref} className="py-20">
          <AnimatedSection>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-16">
                    Nuestros <span className="text-purple-500">Socios</span>
                </h2>
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                    <div className="flex w-max animate-scroll">
                        {/* The list is duplicated again here to create the seamless scrolling effect */}
                        {[...platforms, ...platforms].map((platform, index) => (
                          <div key={index} className="mx-12 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center h-12" title={platform.name}>
                            <img 
                              src={platform.imageUrl} 
                              alt={platform.name} 
                              className="max-h-full w-auto object-contain"
                            />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
          </AnimatedSection>
        </section>
    );
});

export default Platforms;