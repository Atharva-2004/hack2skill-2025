import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NewsArticle } from '../../types';
import { getRecentNews } from '../services/geminiService';
import { useTranslation } from '../hooks/useTranslation';

const timeSince = (dateStr: string): string => {
    const date = new Date(dateStr);
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

export const NewsFeed: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                const newsData = await getRecentNews('Bengaluru');
                setArticles(newsData);
                setError(null);
            } catch (err) {
                setError('Failed to fetch news.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-[#586877]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{t('loading_news')}</span>
                </div>
            </div>
        )
    }

    if (error) {
        return <p className="text-red-500 p-4 text-center mt-4">{error}</p>;
    }

    return (
        <div className="bg-transparent flex flex-col h-full">
            <div className="overflow-y-auto flex-grow">
                {articles.length === 0 ? (
                    <p className="text-gray-500 p-4 text-center mt-4">{t('no_news_found')}</p>
                ) : (
                    <ul className="p-2 space-y-2">
                        {articles.map((article, index) => (
                             <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.08 }}
                                className="bg-white rounded-lg overflow-hidden hover:bg-gray-50 transition-colors border border-gray-200"
                            >
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                                    {article.urlToImage && (
                                        <img src={article.urlToImage} alt={article.title} className="w-full h-32 object-cover" />
                                    )}
                                    <div className="p-3">
                                        <p className="font-semibold text-sm text-gray-800 leading-tight">{article.title}</p>
                                        <div className="flex justify-between items-center mt-2 text-xs">
                                            <p className="text-[#586877] font-medium">{article.source.name}</p>
                                            <p className="text-gray-500">{timeSince(article.publishedAt)}</p>
                                        </div>
                                    </div>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};