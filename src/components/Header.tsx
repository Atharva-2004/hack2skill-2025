import React from 'react';
import { User } from '../../types';
import { useTranslation } from '../hooks/useTranslation';
import { GlobeIcon } from './icons/GlobeIcon';
import { SOSIcon } from './icons/SOSIcon';
import { AstreyaLogo } from './icons/AstreyaLogo';

interface HeaderProps {
  user: User | null;
  onReportClick: () => void;
  onProfileClick: () => void;
  onHelplineClick: () => void;
}


export const Header: React.FC<HeaderProps> = ({ user, onReportClick, onProfileClick, onHelplineClick }) => {
  const { t, language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <header className="bg-[#EAE8E4]/80 backdrop-blur-sm border-b border-gray-300/80 p-3 md:p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 h-[60px] md:h-[72px]">
      <div className="flex items-center space-x-2 md:space-x-3">
        <AstreyaLogo width={40} height={40}/>
        <h1 className="text-xl font-bold text-[#586877] tracking-wider">
          Astreya <span className="font-normal opacity-80">AI</span>
        </h1>
      </div>
      <div className="flex items-center space-x-1 md:space-x-4">
        <button 
          onClick={onReportClick}
          className="bg-[#586877] hover:bg-[#4a5a69] text-white font-bold py-2 px-3 md:px-4 rounded-lg transition-colors duration-300 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline">{t('report_issue')}</span>
        </button>
        
        <button onClick={toggleLanguage} className="p-2 text-gray-500 hover:text-[#586877] hover:bg-gray-300/50 rounded-full transition-colors">
          <GlobeIcon className="w-6 h-6" />
        </button>

        <button onClick={onHelplineClick} className="p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-colors animate-pulse">
           <SOSIcon className="w-6 h-6" />
        </button>

        {user && (
          <button onClick={onProfileClick} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-200 border-2 border-transparent hover:border-[#586877] transition-colors">
            <img src={user.avatarUrl} alt="User" className="w-full h-full rounded-full object-cover" />
          </button>
        )}
      </div>
    </header>
  );
};