import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CLINIC_LOCATIONS } from '../../data/mockData';
import { ClinicLocation } from '../../types';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Calendar, 
  Sparkles, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const LocationsView: React.FC = () => {
  const { openBookingWithTreatment, showToast } = useApp();

  const [selectedLoc, setSelectedLoc] = useState<ClinicLocation>(CLINIC_LOCATIONS[0]);

  return (
    <div id="locations-page" className="bg-[#F7F4EF] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="editorial-badge text-[#9B8778]">Sanctuary Privat Global</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#252525] font-light mt-2 tracking-tight">
            Atelier & Klinik Titis
          </h1>
          <p className="text-xs sm:text-sm text-[#252525]/80 font-light mt-4 leading-relaxed">
            Setiap sanctuary Titis dirancang sebagai oase akustik yang tenang, dilengkapi suite perawatan privat berstandar filtrasi udara medis klinis, dan lounge teh relaksasi pasca-sesi.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Location Selector Tabs on Left */}
          <div className="lg:col-span-4 space-y-4">
            {CLINIC_LOCATIONS.map((loc) => {
              const isSelected = selectedLoc.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  className={`p-6 border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-[#252525] bg-white shadow-md'
                      : 'border-[#E8DDD3] bg-white/60 hover:bg-white'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-widest text-[#9B8778] font-bold block">
                    {loc.city}, {loc.country}
                  </span>
                  <h3 className="font-serif-luxury text-2xl text-[#252525] font-medium mt-1">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-[#252525]/70 mt-1 truncate">
                    {loc.district} • {loc.suitesCount} Suite Privat
                  </p>
                </div>
              );
            })}
          </div>

          {/* Selected Location Deep Dive on Right */}
          <div className="lg:col-span-8 bg-white border border-[#E8DDD3] p-8 sm:p-12 shadow-sm space-y-8">
            <div className="aspect-[16/9] overflow-hidden rounded relative">
              <img 
                src={selectedLoc.image} 
                alt={selectedLoc.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#252525] text-white text-[10px] uppercase tracking-widest font-bold">
                Flagship {selectedLoc.district}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <span className="editorial-badge text-[#9B8778]">Informasi & Kontak Atelier</span>
                <h2 className="font-serif-luxury text-3xl text-[#252525]">{selectedLoc.name}</h2>
                
                <div className="pt-2 space-y-2 text-xs text-[#252525]">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>{selectedLoc.address}, {selectedLoc.city}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-[#9B8778] shrink-0" />
                    <span>{selectedLoc.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[#9B8778] shrink-0" />
                    <span>{selectedLoc.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#9B8778] shrink-0" />
                    <span>{selectedLoc.hours}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-[#F7F4EF] p-6 border border-[#E8DDD3] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#9B8778] block">
                    Fasilitas & Suite Sanctuary
                  </span>
                  <ul className="space-y-2 mt-3 text-xs text-[#252525]">
                    {selectedLoc.features.map((feat, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#9B8778] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E8DDD3] space-y-3">
                  <p className="text-[11px] text-[#9B8778]">
                    Layanan Parkir: <strong>{selectedLoc.parking}</strong>
                  </p>
                  <button
                    onClick={() => openBookingWithTreatment()}
                    className="w-full py-3 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#3d3d3d] flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4 text-[#C4A47C]" />
                    <span>Reservasi Suite di {selectedLoc.city}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
