'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  PhoneCall, 
  Ambulance, 
  MapPin, 
  Navigation, 
  Clock, 
  ShieldAlert, 
  Radio, 
  CheckCircle,
  Send,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUIModal } from '../context/UIModalContext';
import { mockAmbulances } from '../data/mockData';

/** Label modal ikut bahasa aktif (pola sama seperti BookingModal). */
const L = (lang: string, id: string, en: string) => (lang === 'en' ? en : id);

/** Gelar paramedis Indonesia -> Inggris ("Ns. ..., S.Kep" -> "..., RN"); nama tetap. */
const paramedisLokal = (nama: string, lang: string): string =>
  lang === 'en'
    ? nama.replace(/^Ns\.\s*/, '').replace(/,\s*S\.Kep.*$/, ', RN')
    : nama;

export const EmergencyModal: React.FC = () => {
  const { language, t } = useLanguage();
  const { isEmergencyOpen, closeEmergencyModal } = useUIModal();

  const [activeTab, setActiveTab] = useState<'tracker' | 'call' | 'dispatch'>('tracker');
  const [patientLocation, setPatientLocation] = useState('');
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [conditionBrief, setConditionBrief] = useState('');
  const [dispatched, setDispatched] = useState(false);

  if (!isEmergencyOpen) return null;

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientLocation || !callerPhone) return;
    setDispatched(true);
    setTimeout(() => {
      setDispatched(false);
      setActiveTab('tracker');
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border-2 border-medical-red shadow-glow-red relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={closeEmergencyModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <div className="p-3 rounded-2xl bg-medical-red text-white animate-pulse">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-medical-red text-white">
                {L(language, 'Siaga 24 Jam Non-Stop', '24/7 Standby')}
              </span>
              <span className="text-xs text-red-300 font-medium">{L(language, 'Triage Cepat UGD', 'Rapid ER Triage')}</span>
            </div>
            <h3 className="text-xl font-black text-white mt-0.5">
              {L(language, 'Pusat Komando Gawat Darurat & Ambulans', 'Emergency & Ambulance Command Center')}
            </h3>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 mb-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'tracker' ? 'bg-cyan-500 text-navy-950 font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{L(language, 'Radar Lacak Ambulans', 'Ambulance Radar')}</span>
          </button>
          <button
            onClick={() => setActiveTab('call')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'call' ? 'bg-medical-red text-white shadow-glow-red' : 'text-slate-300 hover:text-white'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{L(language, 'Hotline Cepat (Telepon)', 'Direct Hotline (Call)')}</span>
          </button>
          <button
            onClick={() => setActiveTab('dispatch')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'dispatch' ? 'bg-cyan-500 text-navy-950 font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Ambulance className="w-3.5 h-3.5" />
            <span>{L(language, 'Panggil ke Lokasi', 'Dispatch to Location')}</span>
          </button>
        </div>

        {/* Tab 1: Tracker View */}
        {activeTab === 'tracker' && (
          <div className="space-y-4">
            <div className="p-3 bg-cyan-500/10 border border-cyan-400/20 rounded-xl text-xs text-cyan-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-ping" />
                <span>{L(language, '3 Armada Ambulans Terkoneksi GPS Satelit Medan', '3 Ambulance Fleet Units Linked to Medan Satellite GPS')}</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-400">{L(language, 'Pembaruan Live', 'Live Update')}</span>
            </div>

            <div className="space-y-3">
              {mockAmbulances.map((amb) => (
                <div
                  key={amb.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all text-xs"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="font-bold text-sm text-cyan-300 block">{amb.code}</span>
                      <span className="text-[11px] text-slate-400">Driver: {amb.driverName} • {paramedisLokal(amb.paramedicName, language)}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      amb.status === 'responding' 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : amb.status === 'en_route_to_patient'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {amb.status === 'responding' && L(language, 'Menuju Lokasi', 'En Route to Location')}
                      {amb.status === 'en_route_to_patient' && L(language, 'Dalam Perjalanan Cepat', 'Rapid Response Under Way')}
                      {amb.status === 'standby' && L(language, 'Siaga di UGD Lt G', 'On Standby at ER Ground Floor')}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-slate-300 bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="truncate">{amb.currentStreet}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-right">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>ETA: <strong className="text-white">{amb.etaMinutes > 0 ? L(language, `${amb.etaMinutes} Menit`, `${amb.etaMinutes} min`) : L(language, 'Standby Base', 'At Base')}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>{L(language, 'Koordinat Pangkalan: RS Medistra Horizon Lt Ground', 'Base Coordinates: Medistra Horizon Hospital, Ground Floor')}</span>
              <button
                onClick={() => setActiveTab('dispatch')}
                className="text-cyan-400 hover:text-cyan-300 font-bold underline"
              >
                {L(language, 'Butuh jemputan darurat? Klik di sini', 'Need an emergency pickup? Click here')}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Call Hotline */}
        {activeTab === 'call' && (
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 rounded-full bg-medical-red/20 text-medical-red flex items-center justify-center mx-auto border-2 border-medical-red/50 animate-pulse-red">
              <PhoneCall className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-red-300 font-bold">
                {L(language, 'Hotline Gawat Darurat & Trauma Center', 'Emergency & Trauma Center Hotline')}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-wider mt-1">
                (061) 456 7890
              </div>
              <div className="text-sm font-semibold text-cyan-300 mt-1">
                {L(language, 'Atau Hotline Bebas Pulsa Nasional: 119', 'Or national toll-free hotline: 119')}
              </div>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 text-left space-y-2">
              <strong className="text-white block font-semibold">{L(language, 'Saat Menghubungi Operator UGD, Siapkan:', 'When calling the ER operator, prepare:')}</strong>
              <p>{L(language, '1. Lokasi penjemputan spesifik (nama jalan, nomor rumah, patokan terdekat di Medan).', '1. The exact pickup location (street name, house number, nearest landmark in Medan).')}</p>
              <p>{L(language, '2. Kondisi pasien: Tingkat kesadaran, sesak napas berat, nyeri dada, atau luka pendarahan.', '2. The patient condition: level of consciousness, severe shortness of breath, chest pain, or bleeding wounds.')}</p>
              <p>{L(language, '3. Nomor telepon yang selalu aktif dapat dihubungi oleh tim ambulans.', '3. An always-active phone number the ambulance team can reach.')}</p>
            </div>

            <a
              href="tel:0614567890"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-medical-red hover:bg-medical-darkRed text-white font-extrabold text-sm shadow-glow-red transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{L(language, 'Tekan Untuk Memanggil Sekarang', 'Tap to Call Now')}</span>
            </a>
          </div>
        )}

        {/* Tab 3: Dispatch Form */}
        {activeTab === 'dispatch' && (
          <div>
            {dispatched ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-3 animate-bounce" />
                <h4 className="text-xl font-bold text-white">{L(language, 'Ambulans Telah Diberangkatkan!', 'Ambulance Dispatched!')}</h4>
                <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
                  {L(language, 'Unit Trauma Ambulans RS Medistra Horizon sedang meluncur ke alamat Anda dengan sirene prioritas. Petugas ALS akan menghubungi Anda segera.', 'The Medistra Horizon trauma ambulance unit is racing to your address with priority siren. An ALS officer will contact you shortly.')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleDispatchSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {L(language, 'Alamat Lengkap Penjemputan di Medan & Sekitarnya *', 'Full Pickup Address in Medan & Surroundings *')}
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder={L(language, 'Contoh: Jl. Brigjend Katamso No. 42 (Dekat Istana Maimun), Kel. Kampung Baru, Medan Kota', 'e.g. Brigjend Katamso St. No. 42 (near Maimun Palace), Kampung Baru, Medan Kota')}
                    value={patientLocation}
                    onChange={(e) => setPatientLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      {L(language, 'Nama Pelapor / Keluarga *', 'Reporter / Family Name *')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={L(language, 'Nama Anda', 'Your name')}
                      value={callerName}
                      onChange={(e) => setCallerName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      {L(language, 'Nomor Telepon Pemanggil *', 'Caller Phone Number *')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812 xxxx xxxx"
                      value={callerPhone}
                      onChange={(e) => setCallerPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {L(language, 'Keluhan / Kondisi Pasien Secara Singkat *', 'Brief Patient Complaint / Condition *')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={L(language, 'Contoh: Nyeri dada mendadak & pingsan / Kecelakaan lalu lintas / Kejang', 'e.g. sudden chest pain & fainting / traffic accident / seizures')}
                    value={conditionBrief}
                    onChange={(e) => setConditionBrief(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-[11px] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{L(language, 'Ambulans gawat darurat dilengkapi ventilator portabel, defibrillator AED, oksigen sentral, dan perawat Advance Life Support (ALS).', 'The emergency ambulance is equipped with a portable ventilator, AED defibrillator, central oxygen, and an Advance Life Support (ALS) nurse.')}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-medical-red hover:bg-medical-darkRed text-white font-extrabold text-xs shadow-glow-red transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{L(language, 'Kirim Sinyal Panggilan Ambulans Cepat', 'Send Emergency Ambulance Signal')}</span>
                </button>
              </form>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
