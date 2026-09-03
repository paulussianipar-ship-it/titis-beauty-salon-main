import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TREATMENTS, BEAUTY_EXPERTS } from '../../data/mockData';
import { 
  X, 
  Send, 
  Sparkles, 
  Calendar, 
  User, 
  Clock, 
  Bot,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  timestamp: string;
  suggestedTreatmentId?: string;
}

export const ConciergeChatModal: React.FC = () => {
  const { 
    isConciergeOpen, 
    setIsConciergeOpen, 
    openBookingWithTreatment,
    customer,
    setIsBeautyFinderOpen
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'concierge',
      text: `Selamat datang, ${customer.name.split(' ')[0]}. Saya Élodie, Konsultan Estetika & Concierge Pribadi Titis Anda. Bagaimana saya dapat membantu memandu ritual arsitektur kulit Anda hari ini?`,
      timestamp: 'Baru saja'
    }
  ]);

  if (!isConciergeOpen) return null;

  const quickPrompts = [
    'Rekomendasi facial kilau sebelum acara pesta',
    'Perawatan untuk rahang kencang & relaksasi TMJ',
    'Manfaat 5 Miliar Bio-Eksosom Tumbuhan',
    'Jadwal reservasi dengan dr. Audrey Wardhani di Jakarta'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Baru saja'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // Generate smart concierge response in Indonesian
    setTimeout(() => {
      let reply = '';
      let suggestedTrtId: string | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('acara') || lower.includes('pesta') || lower.includes('kilau') || lower.includes('glow') || lower.includes('event')) {
        reply = 'Untuk kilau instan berdimensi tinggi tanpa kemerahan atau masa pemulihan (zero downtime) sebelum acara penting, ritual Cryo-Hydro Thermal Luminosity atau Sculptural Buccal Architecture kami memberikan efek pantulan cahaya sempurna dan kontur tulang pipi yang tegas.';
        suggestedTrtId = 'trt-cryo-hydro-glow';
      } else if (lower.includes('rahang') || lower.includes('tmj') || lower.includes('buccal') || lower.includes('kencang') || lower.includes('masseter')) {
        reply = 'Ritual signature Sculptural Buccal & Cranial Architecture kami memanfaatkan teknik osteopati intra-oral untuk melemaskan ketegangan otot masseter dan mengalirkan limfatik wajah, menghasilkan garis rahang ramping terdefinisi tanpa prosedur bedah.';
        suggestedTrtId = 'trt-sculptural-buccal';
      } else if (lower.includes('eksosom') || lower.includes('exosome') || lower.includes('kolagen') || lower.includes('penuaan')) {
        reply = 'Formula 5 Miliar Bio-Eksosom Botanika Swiss kami menstimulasi komunikasi antar sel pada lapisan lamina basal, meningkatkan sintesis neokolagen hingga 300% tanpa trauma termal.';
        suggestedTrtId = 'trt-cellular-exosome';
      } else if (lower.includes('audrey') || lower.includes('jakarta') || lower.includes('menteng') || lower.includes('dokter')) {
        reply = 'dr. Audrey Wardhani, Sp.DVE membuka sesi konsultasi dan ritual privat di Flagship Sanctuary Menteng Jakarta dari hari Selasa hingga Sabtu. Apakah Anda ingin saya membukakan kalender reservasinya?';
        suggestedTrtId = 'trt-sculptural-buccal';
      } else {
        reply = 'Terima kasih telah menghubungi Titis. Berdasarkan kebutuhan Anda, saya dapat memandu Anda melalui tes diagnostik kulit pintar 60 detik atau menghubungkan Anda langsung dengan Master Aesthetician kami.';
      }

      const botMsg: ChatMessage = {
        id: `c-${Date.now()}`,
        sender: 'concierge',
        text: reply,
        timestamp: 'Baru saja',
        suggestedTreatmentId: suggestedTrtId
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div id="concierge-modal-backdrop" className="fixed inset-0 z-50 overflow-hidden bg-[#252525]/75 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-[#F7F4EF] w-full sm:max-w-lg h-[80vh] sm:h-[650px] border border-[#E8DDD3] shadow-2xl flex flex-col rounded-t-2xl sm:rounded-lg overflow-hidden"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#252525] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=120&q=80" 
                alt="Élodie"
                className="w-10 h-10 rounded-full object-cover border border-[#C4A47C]" 
              />
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-[#252525]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="font-serif-luxury text-lg text-white">Élodie • Titis Concierge</h4>
              </div>
              <span className="text-[10px] text-[#C4A47C] tracking-widest uppercase font-semibold">
                Konsultan Estetika Kulit Pribadi
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsConciergeOpen(false)}
            className="p-1.5 text-[#E8DDD3] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-4 text-xs font-light leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#252525] text-white rounded-t-lg rounded-bl-lg'
                    : 'bg-white border border-[#E8DDD3] text-[#252525] rounded-t-lg rounded-br-lg shadow-sm'
                }`}
              >
                <p>{m.text}</p>

                {m.suggestedTreatmentId && (
                  <div className="mt-3 pt-3 border-t border-[#E8DDD3] flex items-center justify-between">
                    <span className="text-[10px] text-[#9B8778] uppercase font-bold">Rekomendasi Ritual</span>
                    <button
                      onClick={() => {
                        setIsConciergeOpen(false);
                        openBookingWithTreatment(m.suggestedTreatmentId);
                      }}
                      className="px-3 py-1 bg-[#252525] text-white text-[10px] uppercase tracking-wider font-semibold rounded hover:bg-[#3d3d3d] flex items-center space-x-1"
                    >
                      <span>Reservasi Langsung</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              <span className="text-[9px] text-[#9B8778] mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-white border-t border-[#E8DDD3] overflow-x-auto flex gap-2 whitespace-nowrap">
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 bg-[#F7F4EF] border border-[#E8DDD3] text-[10px] text-[#252525] hover:border-[#252525] rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Field */}
        <div className="p-4 bg-white border-t border-[#E8DDD3] flex items-center space-x-2">
          <input 
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Tanyakan tentang ritual, bahan aktif, atau reservasi..."
            className="flex-1 p-2.5 bg-[#F7F4EF] border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 bg-[#252525] text-white hover:bg-[#3d3d3d] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </motion.div>
    </div>
  );
};
