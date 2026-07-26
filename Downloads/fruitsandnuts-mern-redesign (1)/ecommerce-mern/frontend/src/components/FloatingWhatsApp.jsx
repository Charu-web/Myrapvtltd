import { FaWhatsapp } from 'react-icons/fa';

// Real business WhatsApp number (from fruitsandnuts.co.in footer / contact page).
const WHATSAPP_NUMBER = '918368301495';
const DEFAULT_MESSAGE = "Hi! I'd like to know more about your products.";

const FloatingWhatsApp = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 ease-premium animate-pulse-ring"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default FloatingWhatsApp;
