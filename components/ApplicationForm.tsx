import React, { useState } from 'react';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const ApplicationForm: React.FC<ApplicationFormProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the WhatsApp message
    const phoneNumber = "528118807625"; // The target phone number
    const message = `¡Hola! Me gustaría aplicar para ser talento.\n\n*Nombre:* ${name}\n*Edad:* ${age}\n*Contacto:* ${contact}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    
    // Close modal after a delay
    setTimeout(() => {
        onClose();
        // Reset form for next time
        setSubmitted(false);
        setName('');
        setAge('');
        setContact('');
    }, 3000);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#100F13]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-lg relative animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <CloseIcon />
        </button>
        
        {submitted ? (
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-purple-400">¡Gracias!</h2>
                <p className="text-gray-300">Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.</p>
            </div>
        ) : (
            <>
                <h2 className="text-3xl font-bold mb-2 text-white">Formulario de Solicitud</h2>
                <p className="text-gray-400 mb-6">Completa tus datos para comenzar.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#2A2931] border border-gray-600 text-white rounded-lg p-3 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Tu nombre completo"
                    />
                </div>
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">Edad</label>
                    <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full bg-[#2A2931] border border-gray-600 text-white rounded-lg p-3 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="25"
                    />
                </div>
                <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-300 mb-1">Contacto (Teléfono o Red Social)</label>
                    <input
                    type="text"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    className="w-full bg-[#2A2931] border border-gray-600 text-white rounded-lg p-3 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="@tuusuario / 55-1234-5678"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-6 w-full px-10 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    Enviar
                </button>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;