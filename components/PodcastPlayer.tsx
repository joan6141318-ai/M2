import React, { useState, useRef, useEffect } from 'react';

interface PodcastPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const PlayIcon = () => <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>;
const PauseIcon = () => <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>;

const RewindIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path d="M8.445 14.832A1 1 0 0 0 10 14.118V5.882a1 1 0 0 0-1.555-.832L2.618 9.168a1 1 0 0 0 0 1.664l5.827 4.001zM14.445 14.832A1 1 0 0 0 16 14.118V5.882a1 1 0 0 0-1.555-.832L8.618 9.168a1 1 0 0 0 0 1.664l5.827 4.001z"/>
    </svg>
);

const FastForwardIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5.555 5.168A1 1 0 0 0 4 5.882v8.236a1 1 0 0 0 1.555.832l5.827-4.001a1 1 0 0 0 0-1.664L5.555 5.168zM11.555 5.168A1 1 0 0 0 10 5.882v8.236a1 1 0 0 0 1.555.832l5.827-4.001a1 1 0 0 0 0-1.664l-5.827-4.001z"/>
    </svg>
);

const VolumeUpIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
const SpotifyIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 14.12c-.22.36-.67.48-1.03.27-2.9-1.78-6.52-2.17-10.82-.9- .4.11-.8-.13-.9-.53s.13-.8.52-.9c4.64-1.35 8.61-.92 11.78.98.36.21.48.66.25 1.02zm1.2-2.31c-.27.45-.82.6-1.27.33-3.23-1.98-8.15-2.58-11.83-1.4c-.45.14-.95-.14-1.09-.59s.14-.95.59-1.09c4.12-1.28 9.42-.62 13.03 1.55.45.27.6.82.33 1.27zm.1-2.54C8.28 9.53 5.4 9.32 5.25 9.3c-.53-.08-1-.48-.92-.98s.48-1 .98-.92c.23.04 3.4.27 7.02 1.83.5.21.8.76.59 1.26-.21.5-.76.8-1.26.59z"/></svg>;
const ApplePodcastsIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v8h-2zm-3 4h2v4h-2zm6 0h2v4h-2z"/></svg>;

const audioSrc = "https://joan6141318-ai.github.io/Podcasts-/audio.mp3";
const playbackRates = [1, 1.25, 1.5, 2];

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ isOpen, onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  
  useEffect(() => {
    if (isOpen) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.load();

      const audio = audioRef.current;
      
      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      }

      const setAudioTime = () => setCurrentTime(audio.currentTime);

      const handleCanPlay = () => setIsReady(true);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('loadedmetadata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('canplaythrough', handleCanPlay);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handlePause);

      return () => {
        audio.pause();
        audio.removeEventListener('loadedmetadata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('canplaythrough', handleCanPlay);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handlePause);
        audioRef.current = null;
        // Reset state on close
        setIsReady(false);
        setIsPlaying(false);
      };
    }
  }, [isOpen]);

  const togglePlayPause = () => {
    if (!isReady || !audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    } else {
      audioRef.current.pause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReady && audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };
  
  const handleSkip = (amount: number) => {
    if (isReady && audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + amount));
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newVolume = Number(e.target.value);
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handlePlaybackRateChange = () => {
    if (isReady && audioRef.current) {
      const currentIndex = playbackRates.indexOf(playbackRate);
      const nextIndex = (currentIndex + 1) % playbackRates.length;
      const newRate = playbackRates[nextIndex];
      audioRef.current.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  }
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-gradient-to-br from-[#100F13]/90 to-purple-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-2xl relative animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <CloseIcon />
        </button>

        {/* Album Art & Info */}
        <div className="flex items-center space-x-6">
          <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 relative flex items-center justify-center">
            <div className={`w-full h-full transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-full h-full relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <img 
                  src="https://i.postimg.cc/5jdktGmL/20251031_091735_0000.png" 
                  alt="Podcast Cover Art" 
                  className="w-full h-full object-cover rounded-full shadow-2xl"
                />
                {/* Vinyl record hole */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#100F13] rounded-full border-2 border-gray-700 shadow-[inset_0_2px_3px_rgba(0,0,0,0.5)]"></div>
              </div>
            </div>

            {/* Loading indicator */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isReady ? 'opacity-0' : 'opacity-100'} pointer-events-none`}>
                <div className="w-10 h-10 border-4 border-white/50 border-t-white rounded-full animate-spin"></div>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm text-purple-400 font-semibold tracking-wider uppercase">Episodio 01</p>
            <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">El Futuro del Streaming</h2>
            <p className="text-gray-400 mt-2">Con nuestro CEO</p>
          </div>
        </div>

        {/* Seek Bar */}
        <div className="mt-8">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              disabled={!isReady}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-purple-500 [&::-moz-range-thumb]:bg-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
        
        {/* Controls */}
        <div className="mt-4 flex items-center justify-center space-x-6">
            <button onClick={handlePlaybackRateChange} className="w-10 h-10 flex items-center justify-center text-sm font-bold text-gray-300 hover:text-white transition-colors">{playbackRate}x</button>
            <button onClick={() => handleSkip(-15)} className="text-gray-300 hover:text-white transition-colors"><RewindIcon /></button>
            <button onClick={togglePlayPause} disabled={!isReady} className="w-16 h-16 flex items-center justify-center bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={() => handleSkip(15)} className="text-gray-300 hover:text-white transition-colors"><FastForwardIcon /></button>
             <div className="group relative flex items-center">
                <button className="text-gray-300 hover:text-white transition-colors"><VolumeUpIcon /></button>
                 <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 p-2 bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={volume} 
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-purple-500 [&::-moz-range-thumb]:bg-purple-500"
                    />
                </div>
            </div>
        </div>

        {/* External Links */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">Escúchalo en tu plataforma favorita:</p>
            <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-gray-600 cursor-default"><SpotifyIcon /> <span>Spotify</span></div>
                <div className="flex items-center space-x-2 text-gray-600 cursor-default"><ApplePodcastsIcon /> <span>Apple Podcasts</span></div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default PodcastPlayer;