import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EventFeed } from './EventFeed';
import { NewsFeed } from './NewsFeed';
import { CityEvent } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface LeftPanelProps {
    events: CityEvent[];
    selectedEventId?: string;
    onSelectEvent: (event: CityEvent) => void;
}

type ActiveTab = 'events' | 'news';

const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className="relative flex-1 py-3 text-sm font-semibold text-center transition-colors focus:outline-none"
    >
        <span className={isActive ? 'text-[#586877]' : 'text-gray-500 hover:text-[#586877]'}>{label}</span>
        {isActive && (
            <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#586877]"
            />
        )}
    </button>
);


export const LeftPanel: React.FC<LeftPanelProps> = ({ events, selectedEventId, onSelectEvent }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('events');
    const { t } = useTranslation();

    return (
        <div className="bg-white/50 flex flex-col h-full">
            <div className="flex border-b border-gray-200 flex-shrink-0">
                <TabButton label={t('live_events')} isActive={activeTab === 'events'} onClick={() => setActiveTab('events')} />
                <TabButton label={t('local_news')} isActive={activeTab === 'news'} onClick={() => setActiveTab('news')} />
            </div>
            <div className="flex-grow overflow-hidden relative">
                {activeTab === 'events' ? (
                     <EventFeed
                        events={events}
                        selectedEventId={selectedEventId}
                        onSelectEvent={onSelectEvent}
                    />
                ) : (
                    <NewsFeed />
                )}
            </div>
        </div>
    );
}