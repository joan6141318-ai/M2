import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { getChatbotResponse, startChat } from '../services/geminiService';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
);

const MonetizationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.5A6.5 6.5 0 1012 5.5a6.5 6.5 0 000 13z" />
    </svg>
);
const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const GrowthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const benefitIcons: { [key: string]: React.FC } = {
  '100% de tus ganancias': MonetizationIcon,
  'Soporte Dedicado': SupportIcon,
  'Monetización Efectiva': GrowthIcon,
};

const parseBenefits = (text: string): { title: string; description: string }[] => {
  const benefits = [];
  const benefitBlocks = text.split('[BENEFIT]').slice(1);
  for (const block of benefitBlocks) {
    const titleMatch = block.match(/\[TITLE\](.*?)\[\/TITLE\]/s);
    const descMatch = block.match(/\[DESC\](.*?)\[\/DESC\]/s);
    if (titleMatch && descMatch) {
      benefits.push({
        title: titleMatch[1].trim(),
        description: descMatch[1].trim(),
      });
    }
  }
  return benefits;
};

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <p className="text-sm whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </p>
  );
};

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lunaAvatar = "https://i.postimg.cc/1fn8L8N1/IMG_20251107_163305.png";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    let timer: number;
    if (isOpen) {
      setError(null); // Clear previous errors
      try {
        startChat(); // Creates a new chat session in the service
        
        // Set the very first message immediately
        setMessages([
          { role: 'model', text: 'Hola gracias por comunicarte a Agencia Moon en breve uno de nuestros asesores te responderá' }
        ]);

        // After 4 seconds, add Luna's introduction
        timer = window.setTimeout(() => {
          const lunaMessage: Message = { 
              role: 'model', 
              text: 'Hola mi nombre es Luna asesor oficial de Agencia Moon estoy aquí para ayudarte con todas tus dudas el día de hoy. Me podrías decir tu nombre por favor?' 
          };
          setMessages(prev => [...prev, lunaMessage]);
        }, 4000);
      } catch (e) {
          console.error("Failed to start chat:", e);
          const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error desconocido.';
          setError(`El chatbot no está disponible. Causa: ${errorMessage}`);
          setMessages([]); // Ensure no messages are shown on error
      }
    }

    // Cleanup function
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      setMessages([]); // Clear messages when chat is closed
    };
  }, [isOpen]);
  
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
        const imageUrl = "https://i.postimg.cc/8zccpBdH/NIVEL_20251030_155750_0001.png";
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'tabla-de-pagos-agencia-moon.png';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading the image:', error);
        const errorMessage: Message = { role: 'model', text: 'Lo siento, hubo un problema al descargar la imagen.' };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsDownloading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getChatbotResponse(input);
      // Check for special commands from the model
      if (responseText.includes('[BENEFITS_LIST_START]')) {
          const benefits = parseBenefits(responseText);
          const benefitsMessage: Message = {
              role: 'model',
              text: '¡Claro! Estos son los beneficios clave al unirte:',
              benefitsList: benefits,
          };
          setMessages(prev => [...prev, benefitsMessage]);
      } else if (responseText.includes('[SHOW_PAYMENT_TABLE]')) {
        const tableMessage: Message = { 
            role: 'model', 
            text: '¡Claro! Aquí tienes la tabla de remuneración.',
            isPaymentTable: true 
        };
        setMessages(prev => [...prev, tableMessage]);
      } else if (responseText.includes('[SHOW_CONTACT_CARD]')) {
        const contactMessage: Message = {
            role: 'model',
            text: '¡Claro! Puedes contactarnos directamente a través de WhatsApp.',
            isContactCard: true,
        };
        setMessages(prev => [...prev, contactMessage]);
      } else {
        const modelMessage: Message = { role: 'model', text: responseText };
        setMessages(prev => [...prev, modelMessage]);
      }
    } catch (error) {
      console.error('Error fetching response from Gemini:', error);
      const errorMessage: Message = { role: 'model', text: 'Lo siento, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo más tarde.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleSend();
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 w-full max-w-sm h-[60vh] bg-[#1C1B22]/80 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col text-white z-50 origin-bottom-right animate-chat-in border border-white/10">
          <header className="bg-white/10 p-4 flex justify-between items-center rounded-t-2xl flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src={lunaAvatar} alt="Luna Avatar" className="w-10 h-10 rounded-full" />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-[#1C1B22]"></span>
              </div>
              <div>
                <h2 className="font-bold text-lg">Luna</h2>
                {isLoading && !error && (
                  <p className="text-xs text-purple-300 animate-pulse">está escribiendo...</p>
                )}
                {error && (
                  <p className="text-xs text-red-400">Desconectado</p>
                )}
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
                <CloseIcon />
            </button>
          </header>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {error ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div className="bg-red-900/50 border border-red-500/50 text-red-300 rounded-lg p-4 max-w-xs">
                      <h3 className="font-bold text-lg text-white">Error de Conexión</h3>
                      <p className="mt-2 text-sm">{error}</p>
                    </div>
                  </div>
              ) : (
                <>
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'model' && (
                          <img src={lunaAvatar} alt="Luna Avatar" className="w-8 h-8 rounded-full flex-shrink-0" />
                      )}

                      {msg.benefitsList ? (
                        <div className="w-full max-w-xs md:max-w-sm">
                          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-4">
                            <p className="text-sm text-gray-200 px-1 font-semibold">{msg.text}</p>
                            {msg.benefitsList.map((benefit, bIndex) => {
                              const Icon = benefitIcons[benefit.title] || MonetizationIcon;
                              return (
                                <div key={bIndex} className="flex items-start space-x-4 text-left">
                                  <div className="flex-shrink-0 pt-1">
                                    <Icon />
                                  </div>
                                  <div>
                                    <h4 className="text-md font-semibold text-white">{benefit.title}</h4>
                                    <p className="text-gray-400 text-sm mt-1">{benefit.description}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : msg.isPaymentTable ? (
                          <div className="w-full max-w-xs md:max-w-sm">
                              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                                  <p className="text-sm text-gray-200 mb-2 px-1">{msg.text}</p>
                                  <img 
                                      src="https://i.postimg.cc/8zccpBdH/NIVEL_20251030_155750_0001.png" 
                                      alt="Tabla de Pagos" 
                                      className="rounded-lg w-full h-auto cursor-pointer"
                                      onClick={() => setIsImageModalOpen(true)}
                                  />
                                  <div className="flex justify-end items-center space-x-2 mt-3">
                                      <button 
                                          onClick={() => setIsImageModalOpen(true)}
                                          className="px-4 py-1.5 bg-gray-700 text-white text-xs font-semibold rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1C1B22] focus:ring-purple-500 transition-colors"
                                      >
                                          Ver
                                      </button>
                                      <button
                                          onClick={handleDownload}
                                          disabled={isDownloading}
                                          className="px-4 py-1.5 bg-gray-700 text-white text-xs font-semibold rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1C1B22] focus:ring-purple-500 transition-colors disabled:bg-gray-500 disabled:opacity-70 disabled:cursor-wait"
                                      >
                                          {isDownloading ? 'Descargando...' : 'Descargar'}
                                      </button>
                                  </div>
                              </div>
                          </div>
                      ) : msg.isContactCard ? (
                        <div className="w-full max-w-xs md:max-w-sm">
                            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                                <p className="text-sm text-gray-200 mb-2 px-1">{msg.text}</p>
                                <a 
                                  href="https://wa.me/528118807625" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-gray-800/50 hover:bg-gray-700/70 transition-colors duration-300 rounded-lg p-3 flex items-center space-x-3"
                                >
                                  <WhatsAppIcon />
                                  <div className="text-left">
                                    <span className="font-semibold text-white block">Contacto Directo</span>
                                    <span className="text-gray-300 text-sm">+52 8118807625</span>
                                  </div>
                                </a>
                            </div>
                        </div>
                      ) : (
                          <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                              <FormattedText text={msg.text} />
                          </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
          </div>

          <div className="p-4 border-t border-white/10">
              <div className="flex items-center bg-white/10 rounded-full px-2">
                  <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={error ? "Chat no disponible" : "Pregúntame lo que sea..."}
                      className="flex-1 bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none"
                      disabled={isLoading || !!error}
                  />
                  <button onClick={handleSend} disabled={isLoading || !input.trim() || !!error} className="p-2 text-white bg-purple-600 rounded-full hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
                      <SendIcon />
                  </button>
              </div>
          </div>
      </div>
      
      {isImageModalOpen && (
          <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
              onClick={() => setIsImageModalOpen(false)}
          >
              <div 
                  className="bg-[#1C1B22]/90 border border-white/10 rounded-2xl w-full max-w-2xl relative animate-scale-in flex flex-col overflow-hidden"
                  onClick={e => e.stopPropagation()}
              >
                  <div className="flex justify-between items-center p-4 border-b border-white/10 flex-shrink-0">
                      <h3 className="text-lg font-bold text-white">Tabla de Pagos</h3>
                      <button 
                          onClick={() => setIsImageModalOpen(false)} 
                          className="p-1.5 bg-white/10 rounded-full text-gray-300 hover:text-white"
                          aria-label="Cerrar vista de imagen"
                      >
                          <CloseIcon />
                      </button>
                  </div>
                  <div className="p-4 overflow-auto">
                    <img 
                        src="https://i.postimg.cc/8zccpBdH/NIVEL_20251030_155750_0001.png" 
                        alt="Tabla de Pagos Detallada" 
                        className="rounded-lg w-full h-auto max-h-[75vh] object-contain"
                    />
                  </div>
              </div>
          </div>
      )}
    </>
  );
};

export default Chatbot;