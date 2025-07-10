import React from 'react';
import { motion } from 'framer-motion';
import { CityEvent } from '../../types';
import { CATEGORY_DETAILS, SENTIMENT_DETAILS, STATUS_DETAILS } from '../constants';
import { IconMap } from './icons/IconMap';
import { useTranslation } from '../hooks/useTranslation';

interface EventDetailProps {
  event: CityEvent;
  onClose: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onClose }) => {
  const category = CATEGORY_DETAILS[event.category];
  const sentiment = SENTIMENT_DETAILS[event.sentiment];
  const status = STATUS_DETAILS[event.status];
  const { t } = useTranslation();

  const variants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }
  }

  const mobileVariants = {
    hidden: { y: '100%' },
    visible: { y: 0 },
    exit: { y: '100%' }
  }

  return (
    <>
      {/* Backdrop for mobile */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/30 z-30 md:hidden"
      />

      <motion.div
        variants={window.innerWidth < 768 ? mobileVariants : variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white/80 backdrop-blur-xl border-l border-gray-200 shadow-2xl flex flex-col z-40 pt-[60px] md:pt-[72px]
                   md:top-0 md:right-0 md:h-full
                   bottom-0 inset-x-0 max-h-[85vh] rounded-t-2xl md:rounded-none"
      >
        <button onClick={onClose} className="absolute top-[76px] md:top-[88px] right-4 text-gray-500 hover:text-black transition-colors z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

      <div className="p-6 flex-grow overflow-y-auto">
        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.summary} className="w-full h-48 object-cover rounded-lg mb-4" />
        )}
        
        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-3 rounded-full ${category.color}`}>
            <IconMap icon={category.icon} className={`w-6 h-6 ${category.textColor}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{event.summary}</h2>
            <p className="text-sm text-gray-500">{event.location.address}</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700">
            <div className="bg-gray-100/80 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-1">{t('description')}</h3>
                <p className="text-sm">{event.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div className="bg-gray-100/80 p-3 rounded-lg">
                    <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-1">{t('status')}</h3>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${status.color}`}>{t(`status_${event.status}`)}</span>
                </div>
                 <div className="bg-gray-100/80 p-3 rounded-lg">
                    <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-1">{t('sentiment')}</h3>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full text-white ${sentiment.color}`}>{t(`sentiment_${event.sentiment}`)}</span>
                </div>
            </div>

             <div className="bg-gray-100/80 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-1">{t('resolution_timeline')}</h3>
                <p className="text-sm">{event.resolutionTimeline || t('not_available')}</p>
            </div>

             <div className="bg-gray-100/80 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-1">{t('source')}</h3>
                <p className="text-sm">{event.source || 'Unknown'}</p>
            </div>

            <div className="bg-gray-100/80 p-3 rounded-lg text-xs text-gray-500">
                {t('reported_at')}: {event.timestamp.toLocaleString()}
            </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};
