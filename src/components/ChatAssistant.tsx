import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, CityEvent, ChatResponseAction } from '../types';
import { getChatResponse } from '../services/geminiService';
import { useTranslation } from '../hooks/useTranslation';

interface ChatAssistantProps {
    events: CityEvent[];
    onAiAction: (action: ChatResponseAction) => void;
}

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.role === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`max-w-xs md:max-w-sm rounded-2xl px-4 py-2 text-sm shadow-sm ${isUser ? 'bg-[#586877] text-white rounded-br-lg' : 'bg-white text-gray-800 rounded-bl-lg'}`}
            >
                {message.content}
            </motion.div>
        </div>
    );
};

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ events, onAiAction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (isOpen) {
            setMessages([{ role: 'assistant', content: t('chat_greeting') }]);
            setTimeout(() => inputRef.current?.focus(), 300);
        } else {
             setMessages([]);
        }
    }, [isOpen, t]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userInput = inputRef.current?.value;
        if (!userInput || isTyping) return;

        const newUserMessage: ChatMessage = { role: 'user', content: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        if(inputRef.current) inputRef.current.value = '';
        setIsTyping(true);

        const aiResponse = await getChatResponse(userInput, events);
        
        const newAiMessage: ChatMessage = { role: 'assistant', content: aiResponse.text };
        setMessages(prev => [...prev, newAiMessage]);
        
        if (aiResponse.action) {
            onAiAction(aiResponse.action);
        }
        
        setIsTyping(false);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-[#586877] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
                    aria-label={t('open_ai_assistant')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 12.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[60vh] bg-[#EAE8E4]/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col z-40 border border-gray-200"
                    >
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-bold text-[#586877] text-lg">{t('chat_title')}</h3>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
                             {isTyping && (
                                <motion.div initial={{opacity:0}} animate={{opacity: 1}} className="flex justify-start">
                                    <div className="bg-white rounded-2xl rounded-bl-lg px-4 py-2 flex items-center space-x-1">
                                        <motion.div animate={{y: [0, -3, 0]}} transition={{duration: 0.8, repeat: Infinity}} className="w-2 h-2 bg-gray-400 rounded-full"/>
                                        <motion.div animate={{y: [0, -3, 0]}} transition={{duration: 0.8, delay: 0.1, repeat: Infinity}} className="w-2 h-2 bg-gray-400 rounded-full"/>
                                        <motion.div animate={{y: [0, -3, 0]}} transition={{duration: 0.8, delay: 0.2, repeat: Infinity}} className="w-2 h-2 bg-gray-400 rounded-full"/>
                                    </div>
                                </motion.div>
                             )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder={t('chat_placeholder')}
                                    className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#586877]"
                                    disabled={isTyping}
                                />
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};