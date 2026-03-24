"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import GlobalHeader from './GlobalHeader';
import SOSFab from './SOSFab';
import { TranslationModal, FoodModal, EmergencyModal } from './Modals';
import { useLocation } from '@/lib/hooks/useLocation';

export const ModalContext = createContext({ activeModal: null, setActiveModal: () => {} });
export const useModal = () => useContext(ModalContext);

export default function GlobalUIWrapper({ children }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'translate', 'food', 'police', 'hospital', null
    const { location, getLocation } = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        getLocation(); // init location
        return () => window.removeEventListener('scroll', handleScroll);
    }, [getLocation]);

    const closeModal = () => setActiveModal(null);

    return (
        <ModalContext.Provider value={{ activeModal, setActiveModal }}>
            <div className="relative font-sans text-slate-900 bg-slate-50 min-h-screen">
            <GlobalHeader isScrolled={isScrolled} openModal={setActiveModal} />
            
            <main className="w-full min-h-screen">
                {children}
            </main>
            
            <SOSFab openModal={setActiveModal} />

            {/* Modals */}
            {activeModal === 'translate' && <TranslationModal onClose={closeModal} />}
            {activeModal === 'food' && <FoodModal onClose={closeModal} location={location} />}
            {(activeModal === 'police' || activeModal === 'hospital') && (
                <EmergencyModal type={activeModal} onClose={closeModal} location={location} />
            )}
        </div>
        </ModalContext.Provider>
    );
}
