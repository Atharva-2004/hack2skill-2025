import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './src/components/Header';
import { LeftPanel } from './src/components/LeftPanel';
import { MapDashboard } from './src/components/MapDashboard';
import { EventDetail } from './src/components/EventDetail';
import { ReportForm } from './src/components/ReportForm';
import { CityEvent, NewReport, Location, User, ChatResponseAction, NotificationPreferences, EventCategory } from './types';
import { getEvents, submitReport as apiSubmitReport, getNotificationSummary } from './src/services/geminiService';
import { StoryFeed } from './src/components/StoryFeed';
import { ChatAssistant } from './src/components/ChatAssistant';
import { LoginScreen } from './src/components/LoginScreen';
import { ProfileModal } from './src/components/ProfileModal';
import { HelplineModal } from './src/components/HelplineModal';
import { useTranslation } from './src/hooks/useTranslation';
import { NotificationToast } from './src/components/NotificationToast';
import { AstreyaLogo } from './src/components/icons/AstreyaLogo';
import { BottomNavBar } from './src/components/BottomNavBar';

const App: React.FC = () => {
    const [events, setEvents] = useState<CityEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<CityEvent | null>(null);
    const [isEventsLoading, setEventsLoading] = useState<boolean>(true);
    const [isReportModalOpen, setReportModalOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [reportLocation, setReportLocation] = useState<Location | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const [isHelplineModalOpen, setHelplineModalOpen] = useState(false);
    const [highlightedRoute, setHighlightedRoute] = useState<Location[] | null>(null);
    const { t, isReady: isTranslationsReady } = useTranslation();
    const [notification, setNotification] = useState<{ title: string; message: string; category: EventCategory } | null>(null);
    const [mobileView, setMobileView] = useState<'map' | 'list'>('map');


    useEffect(() => {
        const fetchInitialEvents = async () => {
            try {
                const fetchedEvents = await getEvents();
                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setEventsLoading(false);
            }
        };

        fetchInitialEvents();
    }, []);

    const handleSelectEvent = useCallback((event: CityEvent) => {
        setSelectedEvent(event);
        setHighlightedRoute(null); 
        setMobileView('map');
    }, []);

    const handleCloseDetail = useCallback(() => {
        setSelectedEvent(null);
    }, []);
    
    const handleOpenReportModal = useCallback(() => {
        if (!currentUser) return;
        setReportModalOpen(true);
    }, [currentUser]);
    
    const handleCloseReportModal = useCallback(() => {
        setReportModalOpen(false);
        setReportLocation(null);
    }, []);

    const handleMapClick = useCallback((coords: Location) => {
        if (!currentUser) return;
        setReportLocation(coords);
        setReportModalOpen(true);
    }, [currentUser]);

    const handleSubmitReport = async (report: NewReport) => {
        if (!currentUser) return;
        setIsSubmitting(true);
        try {
            const { newEvent, pointsAwarded } = await apiSubmitReport(report);
            setEvents(prevEvents => [newEvent, ...prevEvents]);
            setCurrentUser(prevUser => prevUser ? { ...prevUser, points: prevUser.points + pointsAwarded } : null);
            handleCloseReportModal();
            setSelectedEvent(newEvent);
            
            if (currentUser?.notificationPreferences.enabled && currentUser.notificationPreferences.categories.includes(newEvent.category)) {
                const notificationMessage = await getNotificationSummary(newEvent);
                setNotification({
                    title: `${t(`category_${newEvent.category}`)} ${t('alert')}`,
                    message: notificationMessage,
                    category: newEvent.category,
                });
                setTimeout(() => setNotification(null), 7000);
            }

        } catch (error) {
            console.error("Failed to submit report:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogin = (method: 'Google' | 'Facebook' | 'Guest') => {
        const baseUser = {
            id: 'guest',
            name: 'Guest User',
            email: '',
            avatarUrl: 'https://i.pravatar.cc/150?u=guest',
            points: 0,
            notificationPreferences: {
                enabled: true,
                categories: Object.values(EventCategory),
            }
        };

        if (method === 'Guest') {
            setCurrentUser(baseUser);
        } else {
            setCurrentUser({
                ...baseUser,
                id: 'user_123',
                name: 'Pranjal Ghuge',
                email: 'pranjal.ghuge@gmail.com',
                avatarUrl: `data:image/jpeg;base64,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`,
                points: 50,
            });
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setProfileModalOpen(false);
    };

    const handleAiAction = (action: ChatResponseAction) => {
        if (action.type === 'HIGHLIGHT_ROUTE') {
            setHighlightedRoute(action.payload as Location[]);
            setMobileView('map');
        }
    };

    const handleUpdateNotificationPreferences = (prefs: NotificationPreferences) => {
        setCurrentUser(prevUser => prevUser ? { ...prevUser, notificationPreferences: prefs } : null);
    };

    const isLoading = isEventsLoading || !isTranslationsReady;
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#EAE8E4] text-[#586877]">
                <div className="flex flex-col items-center space-y-6">
                     <AstreyaLogo width={80} height={80} />
                     <div className="flex items-center space-x-3">
                        <svg className="animate-spin h-6 w-6 text-[#586877]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-lg font-semibold tracking-wider">{t('loading')}</p>
                     </div>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <div className="h-screen w-screen flex flex-col bg-[#EAE8E4] text-gray-800">
            <Header 
                user={currentUser}
                onReportClick={handleOpenReportModal}
                onProfileClick={() => setProfileModalOpen(true)}
                onHelplineClick={() => setHelplineModalOpen(true)}
            />
            <div className="flex flex-1 flex-col pt-[60px] md:pt-[72px] overflow-hidden">
                <StoryFeed 
                    events={events}
                    onSelectEvent={handleSelectEvent}
                    selectedEventId={selectedEvent?.id}
                />
                <main className="flex flex-1 overflow-hidden">
                    <div className={`w-[400] md:w-[400px] md:flex-shrink-0 h-full border-r border-gray-300 ${mobileView === 'list' ? 'block' : 'hidden'} md:flex`}>
                        <LeftPanel 
                            events={events} 
                            selectedEventId={selectedEvent?.id} 
                            onSelectEvent={handleSelectEvent} 
                        />
                    </div>
                    <div className={`flex-1 h-full ${mobileView === 'map' ? 'block' : 'hidden'} md:block`}>
                        <MapDashboard 
                            events={events}
                            selectedEventId={selectedEvent?.id}
                            onSelectEvent={handleSelectEvent}
                            onMapClick={handleMapClick}
                            highlightedRoute={highlightedRoute}
                        />
                    </div>
                </main>
            </div>
            
            <ChatAssistant events={events} onAiAction={handleAiAction} />

            <AnimatePresence>
                {selectedEvent && <EventDetail event={selectedEvent} onClose={handleCloseDetail} />}
                {isProfileModalOpen && currentUser && (
                  <ProfileModal 
                    user={currentUser} 
                    onClose={() => setProfileModalOpen(false)} 
                    onLogout={handleLogout} 
                    onUpdatePreferences={handleUpdateNotificationPreferences}
                  />
                )}
                {isHelplineModalOpen && <HelplineModal onClose={() => setHelplineModalOpen(false)} />}
                {isReportModalOpen && (
                    <ReportForm 
                        location={reportLocation}
                        onClose={handleCloseReportModal} 
                        onSubmit={handleSubmitReport}
                        isSubmitting={isSubmitting}
                    />
                )}
                {notification && (
                  <NotificationToast
                    notification={notification}
                    onClose={() => setNotification(null)}
                  />
                )}
            </AnimatePresence>
             <div className="md:hidden">
                <BottomNavBar activeView={mobileView} setView={setMobileView} />
            </div>
        </div>
    );
};

export default App;