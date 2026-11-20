import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phone = '919876543210';
  const message = encodeURIComponent(
    'Hi FASH HUB Concierge! I need assistance with Western sizing, styles, or an existing order.'
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl flex items-center space-x-2 transition-transform duration-300 hover:scale-105 active:scale-95 group"
      title="Chat with FASH HUB Stylist"
      aria-label="Chat with FASH HUB Stylist on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-sm">
        Stylist Support
      </span>
    </a>
  );
};
