import React from 'react';
import { motion } from 'framer-motion';
import { User, NotificationPreferences, EventCategory } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { ToggleSwitch } from './ToggleSwitch';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
  onUpdatePreferences: (prefs: NotificationPreferences) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onLogout, onUpdatePreferences }) => {
  const { t } = useTranslation();

  const handleToggleCategory = (category: EventCategory) => {
    const currentCategories = user.notificationPreferences.categories;
    const newCategories = currentCategories.includes(category)
        ? currentCategories.filter(c => c !== category)
        : [...currentCategories, category];
    
    onUpdatePreferences({
      ...user.notificationPreferences,
      categories: newCategories,
    });
  };

  const handleToggleMaster = (enabled: boolean) => {
      onUpdatePreferences({
          ...user.notificationPreferences,
          enabled,
      });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md text-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div className="flex flex-col items-center">
                <div className="relative mb-4">
                    <img src={user.avatarUrl} alt="User" className="w-24 h-24 rounded-full object-cover border-4 border-[#586877]" />
                    <div className="absolute -bottom-2 -right-2 bg-[#586877] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        {user.points} {t('points')}
                    </div>
                </div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
            </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
            {/* Notification Preferences */}
            <div className="bg-gray-100/80 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">{t('notification_preferences')}</h3>
                <div className="flex justify-between items-center">
                    <label htmlFor="enable-notifications" className="text-gray-700">{t('enable_notifications')}</label>
                    <ToggleSwitch enabled={user.notificationPreferences.enabled} onChange={handleToggleMaster} />
                </div>
                {user.notificationPreferences.enabled && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                        className="pt-4 border-t border-gray-200 space-y-3 overflow-hidden"
                    >
                        <p className="text-sm text-gray-500">{t('notify_me_for')}</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {Object.values(EventCategory).map(cat => (
                                <div key={cat} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`cat-${cat}`}
                                        checked={user.notificationPreferences.categories.includes(cat)}
                                        onChange={() => handleToggleCategory(cat)}
                                        className="h-4 w-4 rounded bg-gray-200 border-gray-300 text-[#586877] focus:ring-2 focus:ring-offset-0 focus:ring-offset-gray-100 focus:ring-[#586877]"
                                    />
                                    <label htmlFor={`cat-${cat}`} className="text-sm text-gray-600">{t(`category_${cat}`)}</label>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Rewards Section */}
            <div className="bg-gray-100/80 p-4 rounded-lg">
                 <h3 className="font-semibold mb-2">{t('rewards')}</h3>
                 <p className="text-sm text-gray-500 text-center py-4">{t('rewards_placeholder')}</p>
            </div>
            
            <button
                onClick={onLogout}
                className="w-full mt-2 py-2 px-4 rounded-md text-sm font-medium text-white bg-red-600/90 hover:bg-red-600 transition"
            >
                {t('logout')}
            </button>
        </div>
      </motion.div>
    </div>
  );
};