import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CityEvent, EventCategory } from '../../types';
import { CATEGORY_DETAILS } from '../../constants';
import { IconMap } from './icons/IconMap';
import { useTranslation } from '../hooks/useTranslation';

interface EventFeedProps {
  events: CityEvent[];
  selectedEventId?: string;
  onSelectEvent: (event: CityEvent) => void;
}

const timeSince = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return "just now";
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
}

const FilterButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${isActive ? 'bg-[#586877] text-white font-semibold' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
    >
        {label}
    </button>
);

export const EventFeed: React.FC<EventFeedProps> = ({ events, selectedEventId, onSelectEvent }) => {
  const [activeFilter, setActiveFilter] = useState<EventCategory | 'ALL'>('ALL');
  const { t } = useTranslation();
  
  const filteredEvents = events.filter(event => 
    activeFilter === 'ALL' || event.category === activeFilter
  );

  return (
    <div className="bg-transparent flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-3">{t('live_feed')}</h2>
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
                <FilterButton label={t('all')} isActive={activeFilter === 'ALL'} onClick={() => setActiveFilter('ALL')} />
                {Object.values(EventCategory).map(cat => (
                    <FilterButton 
                        key={cat}
                        label={t(`category_${cat}`)} 
                        isActive={activeFilter === cat} 
                        onClick={() => setActiveFilter(cat)} 
                    />
                ))}
            </div>
        </div>
        <div className="overflow-y-auto flex-grow">
            {filteredEvents.length === 0 ? (
                <p className="text-gray-500 p-4 text-center mt-4">{t('no_events_filter')}</p>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {filteredEvents.map((event, index) => {
                        const details = CATEGORY_DETAILS[event.category];
                        return (
                             <motion.li
                                key={event.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                onClick={() => onSelectEvent(event)}
                                className={`p-4 cursor-pointer transition-all duration-200 ${selectedEventId === event.id ? 'bg-gray-200' : 'hover:bg-gray-100/60'}`}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className={`p-2 rounded-full ${details.color} flex-shrink-0`}>
                                        <IconMap icon={details.icon} className={`w-5 h-5 ${details.textColor}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-sm text-gray-900 truncate">{event.summary}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 truncate">{event.location.address}</p>
                                        <p className="text-xs text-[#586877] font-semibold mt-1">{timeSince(event.timestamp)}</p>
                                    </div>
                                </div>
                            </motion.li>
                        )
                    })}
                </ul>
            )}
        </div>
    </div>
  );
};