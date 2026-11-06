import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor } from '../types';

/**
 * Referensi minimal dokter untuk preselect modal booking. `id` merujuk ke
 * dokter.json (dipakai halaman /cari-dokter); objek Doctor lengkap (mockData)
 * tetap assignable karena strukturnya menyuplai `id`.
 */
export type BookingDoctorRef = Pick<Doctor, 'id'>;

interface UIModalContextType {
  isBookingOpen: boolean;
  selectedDoctorForBooking: BookingDoctorRef | null;
  openBookingModal: (doctor?: BookingDoctorRef | null) => void;
  closeBookingModal: () => void;
  
  isEmergencyOpen: boolean;
  openEmergencyModal: () => void;
  closeEmergencyModal: () => void;

  activeFloorId: string;
  setActiveFloorId: (floorId: string) => void;

  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const UIModalContext = createContext<UIModalContextType | undefined>(undefined);

export const UIModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<BookingDoctorRef | null>(null);

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [activeFloorId, setActiveFloorId] = useState<string>('G');
  const [activeNav, setActiveNav] = useState<string>('home');

  const openBookingModal = (doctor: BookingDoctorRef | null = null) => {
    setSelectedDoctorForBooking(doctor);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setSelectedDoctorForBooking(null);
  };

  const openEmergencyModal = () => {
    setIsEmergencyOpen(true);
  };

  const closeEmergencyModal = () => {
    setIsEmergencyOpen(false);
  };

  return (
    <UIModalContext.Provider
      value={{
        isBookingOpen,
        selectedDoctorForBooking,
        openBookingModal,
        closeBookingModal,
        isEmergencyOpen,
        openEmergencyModal,
        closeEmergencyModal,
        activeFloorId,
        setActiveFloorId,
        activeNav,
        setActiveNav,
      }}
    >
      {children}
    </UIModalContext.Provider>
  );
};

export const useUIModal = () => {
  const context = useContext(UIModalContext);
  if (!context) {
    throw new Error('useUIModal must be used within a UIModalProvider');
  }
  return context;
};
