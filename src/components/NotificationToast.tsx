import React from 'react';
import { motion } from 'framer-motion';
import { EventCategory } from '../types';
import { CATEGORY_DETAILS } from '../constants';
import { IconMap } from './icons/IconMap';

interface NotificationToastProps {
  notification: {
    title: string;
    message: string;
    category: EventCategory;
  };
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onClose }) => {
  const categoryDetails = CATEGORY_DETAILS[notification.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="fixed top-24 right-6 z-[100] w-[calc(100%-3rem)] max-w-sm"
    >
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-gray-200/50">
            <div className={`h-1.5 w-full ${categoryDetails.color}`}></div>
            <div className="p-4 flex items-start space-x-3">
                <div className={`p-2 rounded-full flex-shrink-0 ${categoryDetails.color}`}>
                    <IconMap icon={categoryDetails.icon} className={`w-5 h-5 ${categoryDetails.textColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm">{notification.title}</p>
                    <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </motion.div>
  );
};