import React from 'react';
import { motion } from 'framer-motion';
import { CityEvent } from '../../types';
import { CATEGORY_DETAILS, SENTIMENT_DETAILS } from '../../constants';
import { IconMap } from './icons/IconMap';

interface StoryFeedProps {
    events: CityEvent[];
    selectedEventId?: string | null;
    onSelectEvent: (event: CityEvent) => void;
}

const StoryItem: React.FC<{
    event: CityEvent;
    isSelected: boolean;
    onSelect: () => void;
}> = ({ event, isSelected, onSelect }) => {
    const category = CATEGORY_DETAILS[event.category];
    const sentiment = SENTIMENT_DETAILS[event.sentiment];

    return (
        <div
            onClick={onSelect}
            className="flex flex-col items-center justify-center space-y-2 cursor-pointer flex-shrink-0 w-24 text-center group"
        >
            <div
                className={`relative w-16 h-16 rounded-full flex items-center justify-center p-0.5 transition-all duration-300 ${isSelected ? 'bg-gradient-to-tr from-gray-400 to-gray-600' : 'bg-gray-300 group-hover:bg-gray-400'}`}
            >
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <div className={`p-2 rounded-full ${category.color}`}>
                       <IconMap icon={category.icon} className={`w-6 h-6 ${category.textColor}`} />
                    </div>
                </div>
                 <div 
                    className="absolute inset-0 rounded-full ring-2"
                    style={{ borderColor: sentiment.hex }}
                />
            </div>
            <p className={`text-xs text-gray-600 group-hover:text-black transition-colors truncate w-full ${isSelected ? 'font-semibold text-gray-800' : ''}`}>
                {event.summary}
            </p>
        </div>
    );
};

export const StoryFeed: React.FC<StoryFeedProps> = ({ events, selectedEventId, onSelectEvent }) => {
    // Show the most recent/important events as stories
    const storyEvents = events.slice(0, 10);

    return (
        <div className="w-full bg-white/60 border-b border-t border-gray-200 flex-shrink-0">
            <div className="px-4 py-3 flex items-center space-x-4 overflow-x-auto">
                {storyEvents.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                    >
                        <StoryItem
                            event={event}
                            isSelected={selectedEventId === event.id}
                            onSelect={() => onSelectEvent(event)}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};