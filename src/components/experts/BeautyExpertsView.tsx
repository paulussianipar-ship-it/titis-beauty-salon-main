import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BEAUTY_EXPERTS, CLINIC_LOCATIONS, TREATMENTS } from '../../data/mockData';
import { 
  Star, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Sparkles,
  Quote
} from 'lucide-react';

export const BeautyExpertsView: React.FC = () => {
  const { 
    openBookingWithTreatment, 
    setSelectedTreatmentId, 
    setActivePage 
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const filteredExperts = BEAUTY_EXPERTS.filter((exp) => {
    if (selectedRole !== 'all' && exp.role !== selectedRole) return false;
    if (selectedLocation !== 'all' && !exp.clinicLocationIds.includes(selectedLocation)) return false;
    return true;
  });

  return (
    <div id="experts-page-container" className="bg-[#F7F4EF] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="editorial-badge text-[#9B8778]">Dewan Praktisi & Pakar Klinis</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#252525] font-light mt-2 tracking-tight">
            Para Maestro & Dokter Titis
          </h1>
          <p className="text-xs sm:text-sm text-[#252525]/80 font-light mt-4 leading-relaxed">
            Tim kami terdiri dari dokter spesialis kulit lulusan Eropa, terapis fasia osteopati berlisensi Inggris, dan trikologis rambut Swiss. Setiap praktisi membawa dedikasi anatomis minimal satu dekade ke ruang perawatan Anda.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white border border-[#E8DDD3] p-4 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#9B8778]">
            <span>Filter Praktisi:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 bg-[#F7F4EF] border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
            >
              <option value="all">Semua Spesialisasi</option>
              <option value="Dermatologist">Dokter Spesialis Kulit & Kelamin</option>
              <option value="Master Aesthetician">Master Aesthetician</option>
              <option value="Trichologist">Trikologis Rambut & Kulit Kepala</option>
              <option value="Holistic Facialist">Fasialis Holistik Osteopati</option>
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 bg-[#F7F4EF] border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
            >
              <option value="all">Semua Lokasi Sanctuary</option>
              {CLINIC_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.city} ({loc.district})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Experts List */}
        <div className="space-y-12">
          {filteredExperts.map((expert) => {
            const signatureTrt = TREATMENTS.find(t => t.id === expert.signatureTreatmentId);
            return (
              <div 
                key={expert.id}
                className="bg-white border border-[#E8DDD3] p-6 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Portrait */}
                  <div className="lg:col-span-4 aspect-[3/4] overflow-hidden rounded relative">
                    <img 
                      src={expert.avatar} 
                      alt={expert.name}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-3 left-3 right-3 p-3 bg-[#252525]/85 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest text-center border border-white/10">
                      {expert.role} • {expert.experienceYears} Tahun Pengalaman Klinis
                    </div>
                  </div>

                  {/* Middle: Details & Credentials */}
                  <div className="lg:col-span-5 space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-[#C4A47C] mb-1">
                        <Star className="w-4 h-4 fill-[#C4A47C]" />
                        <span className="text-xs font-bold text-[#252525]">{expert.rating}</span>
                        <span className="text-[11px] text-[#9B8778]">({expert.reviewCount} ulasan tamu terverifikasi)</span>
                      </div>

                      <h3 className="font-serif-luxury text-3xl font-medium text-[#252525]">
                        {expert.name}
                      </h3>
                      <p className="text-xs font-medium text-[#9B8778] tracking-wider uppercase mt-0.5">
                        {expert.title}
                      </p>
                    </div>

                    {/* Bio & Philosophy Quote */}
                    <p className="text-xs text-[#252525]/80 font-light leading-relaxed">
                      {expert.bio}
                    </p>

                    <div className="p-4 bg-[#F7F4EF] border-l-2 border-[#9B8778] space-y-1">
                      <Quote className="w-4 h-4 text-[#9B8778]" />
                      <p className="text-xs italic text-[#252525]/90">
                        "{expert.quote}"
                      </p>
                    </div>

                    {/* Credentials */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#9B8778] block">
                        Sertifikasi & Kualifikasi Internasional
                      </span>
                      <ul className="space-y-1">
                        {expert.credentials.map((cred, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-[11px] text-[#252525]">
                            <CheckCircle2 className="w-3 h-3 text-[#C4A47C] shrink-0" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Right: Availability & Booking Action */}
                  <div className="lg:col-span-3 bg-[#F7F4EF] p-6 border border-[#E8DDD3] flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#9B8778] block">
                          Praktik di Sanctuary
                        </span>
                        <div className="mt-1 space-y-1">
                          {expert.clinicLocationIds.map(locId => {
                            const loc = CLINIC_LOCATIONS.find(l => l.id === locId);
                            return (
                              <div key={locId} className="flex items-center space-x-1.5 text-xs text-[#252525]">
                                <MapPin className="w-3 h-3 text-[#9B8778]" />
                                <span>{loc?.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#9B8778] block">
                          Hari Praktik Mingguan
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {expert.availableDays.map((day, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white border border-[#E8DDD3] text-[10px] font-semibold text-[#252525]">
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>

                      {signatureTrt && (
                        <div>
                          <span className="text-[10px] uppercase tracking-widest font-bold text-[#9B8778] block">
                            Ritual Keahlian Khusus
                          </span>
                          <button
                            onClick={() => {
                              setSelectedTreatmentId(signatureTrt.id);
                              setActivePage('treatment-detail');
                            }}
                            className="text-xs font-serif-luxury text-[#252525] hover:text-[#9B8778] underline text-left mt-0.5 block"
                          >
                            {signatureTrt.name}
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => openBookingWithTreatment(expert.signatureTreatmentId, expert.id)}
                      className="w-full py-3 bg-[#252525] text-white hover:bg-[#3d3d3d] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center space-x-2 shadow-sm"
                    >
                      <Calendar className="w-4 h-4 text-[#C4A47C]" />
                      <span>Reservasi Sesi Bersama {expert.name.split(' ')[0]}</span>
                    </button>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
