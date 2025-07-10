import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

interface HelplineModalProps {
  onClose: () => void;
}

const HelplineButton: React.FC<{
    service: string;
    number: string;
    icon: JSX.Element;
    color: string;
    callNowText: string;
}> = ({ service, number, icon, color, callNowText }) => {
    return (
    <a href={`tel:${number}`} className="w-full">
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-4 rounded-lg flex items-center space-x-4 transition-colors shadow-sm ${color}`}
        >
            <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
            <div className="flex-1">
                <p className="font-bold text-white text-lg">{service}</p>
                <p className="text-gray-200">{number}</p>
            </div>
            <div className="text-xs font-semibold uppercase bg-white/20 text-white py-1 px-2 rounded-full">{callNowText}</div>
        </motion.div>
    </a>
    );
};

export const HelplineModal: React.FC<HelplineModalProps> = ({ onClose }) => {
    const { t } = useTranslation();
  
    const services = [
      { service: t('police'), number: '100', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.348 2 5.684 2 6v6c0 1.105.895 2 2 2h1.172l.928 2.32a1 1 0 001.78-.788l-.53-1.325a1 1 0 01.442-.988l2.757-1.654a1 1 0 000-1.782l-2.757-1.654a1 1 0 01-.442-.988l.53-1.325a1 1 0 00-1.78-.788l-.928 2.32H4a1 1 0 01-1-1V6c0-1.105.895-2 2-2h6c1.105 0 2 .895 2 2v6c0 1.105-.895 2-2 2h-1.172l-.928 2.32a1 1 0 001.78-.788l.53-1.325a1 1 0 01.442-.988l2.757-1.654a1 1 0 000-1.782l-2.757-1.654a1 1 0 01-.442-.988l.53-1.325a1 1 0 00-1.78-.788l-.928 2.32H12a1 1 0 01-1-1V6c0-1.105-.895-2-2-2z" clipRule="evenodd" /></svg>, color: 'bg-blue-500 hover:bg-blue-600' },
      { service: t('ambulance'), number: '102', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>, color: 'bg-green-500 hover:bg-green-600' },
      { service: t('fire_brigade'), number: '101', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>, color: 'bg-orange-500 hover:bg-orange-600' },
    ]
    
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-sm"
            onClick={e => e.stopPropagation()}
        >
            <div className="p-6 text-center border-b border-gray-200">
                <h2 className="text-2xl font-bold text-red-600">{t('helpline_title')}</h2>
                <p className="text-sm text-gray-500 mt-1">{t('helpline_subtitle')}</p>
            </div>
            <div className="p-6 space-y-4">
                {services.map((service, i) => (
                    <motion.div
                        key={service.number}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                        <HelplineButton {...service} callNowText={t('call_now')} />
                    </motion.div>
                ))}
            </div>
             <div className="px-6 pb-6">
                <button 
                    onClick={onClose} 
                    className="w-full py-2 px-4 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                >
                    {t('cancel')}
                </button>
            </div>
        </motion.div>
        </div>
    );
};