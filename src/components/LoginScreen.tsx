import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { AstreyaLogo } from './icons/AstreyaLogo';

interface LoginScreenProps {
  onLogin: (method: 'Google' | 'Facebook' | 'Guest') => void;
}

const SocialButton: React.FC<{
  provider: 'Google' | 'Facebook';
  onClick: () => void;
  children: React.ReactNode;
}> = ({ provider, onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-300 ${provider === 'Google' ? 'bg-[#4285F4] hover:bg-[#357ae8]' : 'bg-[#1877F2] hover:bg-[#166fe5]'}`}
  >
    {children}
  </motion.button>
);

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#EAE8E4] p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-block mb-6">
          <AstreyaLogo width={100} height={100} />
        </div>
        <h1 className="text-4xl font-bold text-[#586877] mb-2">
          {t('login_title')}
        </h1>
        <p className="text-gray-500 mb-8">{t('login_subtitle')}</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-sm space-y-4"
      >
        <SocialButton provider="Google" onClick={() => onLogin('Google')}>
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.904,36.218,44,30.608,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            {t('login_with_google')}
        </SocialButton>
        <SocialButton provider="Facebook" onClick={() => onLogin('Facebook')}>
            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.99,3.657,9.128,8.438,9.878V14.89h-2.54V12h2.54V9.797c0-2.506,1.492-3.89,3.777-3.89c1.094,0,2.238,0.195,2.238,0.195v2.46h-1.26c-1.24,0-1.628,0.772-1.628,1.562V12h2.773l-0.443,2.89h-2.33V21.878C18.343,21.128,22,16.99,22,12Z"/></svg>
            {t('login_with_facebook')}
        </SocialButton>
        <button
            onClick={() => onLogin('Guest')}
            className="w-full text-center py-3 text-sm font-semibold text-gray-500 hover:text-[#586877] hover:bg-gray-300/50 rounded-lg transition-colors"
        >
            {t('continue_as_guest')}
        </button>
      </motion.div>
    </div>
  );
};