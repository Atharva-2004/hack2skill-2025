import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange }) => {
  return (
    <div
      onClick={() => onChange(!enabled)}
      className={`flex items-center w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${enabled ? 'bg-[#586877]' : 'bg-gray-300'}`}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className="w-5 h-5 bg-white rounded-full shadow-md"
        style={{ marginLeft: enabled ? 'auto' : '2px', marginRight: enabled ? '2px' : 'auto' }}
      />
    </div>
  );
};
