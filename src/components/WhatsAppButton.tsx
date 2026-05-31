import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    const message = encodeURIComponent('Hi DigiExpert, I want to discuss my project.');
    window.open(`https://wa.me/919891113214?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-secondary-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
        Chat with us
      </span>
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
    </button>
  );
}
