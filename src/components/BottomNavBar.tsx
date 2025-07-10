import React from 'react';
import { motion } from 'framer-motion';
import { MapIcon } from './icons/MapIcon';
import { ListIcon } from './icons/ListIcon';

interface BottomNavBarProps {
    activeView: 'map' | 'list';
    setView: (view: 'map' | 'list') => void;
}

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full h-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-[#586877]' : 'text-gray-400 hover:text-gray-600'}`}>
        {icon}
        <span className={`text-xs mt-1 font-semibold ${isActive ? 'text-[#586877]' : 'text-gray-500'}`}>{label}</span>
    </button>
);


export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, setView }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-[60px] bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex items-center z-40">
            <NavItem
                label="Map"
                icon={<MapIcon className="w-6 h-6" />}
                isActive={activeView === 'map'}
                onClick={() => setView('map')}
            />
            <NavItem
                label="List"
                icon={<ListIcon className="w-6 h-6" />}
                isActive={activeView === 'list'}
                onClick={() => setView('list')}
            />
        </div>
    );
};
