import { EventCategory, Sentiment, Status } from './types';

export const CATEGORY_DETAILS: Record<EventCategory, { name: string; icon: string; color: string; textColor: string; hex: string; }> = {
  [EventCategory.Traffic]: { name: 'Traffic Jam', icon: 'traffic', color: 'bg-amber-100', textColor: 'text-amber-800', hex: '#fbbf24' },
  [EventCategory.Civic]: { name: 'Civic Issue', icon: 'civic', color: 'bg-sky-100', textColor: 'text-sky-800', hex: '#38bdf8' },
  [EventCategory.Emergency]: { name: 'Emergency', icon: 'emergency', color: 'bg-red-200', textColor: 'text-red-800', hex: '#f87171' },
  [EventCategory.Event]: { name: 'Public Event', icon: 'event', color: 'bg-indigo-100', textColor: 'text-indigo-800', hex: '#818cf8' },
  [EventCategory.Social]: { name: 'Social Pulse', icon: 'social', color: 'bg-teal-100', textColor: 'text-teal-800', hex: '#5eead4' },
};

export const SENTIMENT_DETAILS: Record<Sentiment, { name: string; color: string; ringColor: string; hex: string; }> = {
  [Sentiment.Positive]: { name: 'Positive', color: 'bg-green-500', ringColor: 'ring-green-400', hex: '#22c55e' },
  [Sentiment.Neutral]: { name: 'Neutral', color: 'bg-gray-400', ringColor: 'ring-gray-300', hex: '#9ca3af' },
  [Sentiment.Negative]: { name: 'Negative', color: 'bg-amber-500', ringColor: 'ring-amber-400', hex: '#f59e0b' },
  [Sentiment.Critical]: { name: 'Critical', color: 'bg-red-600', ringColor: 'ring-red-500', hex: '#dc2626' },
};

export const STATUS_DETAILS: Record<Status, { name: string; color: string; }> = {
  [Status.Reported]: { name: 'Reported', color: 'bg-blue-100 text-blue-800' },
  [Status.InProgress]: { name: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
  [Status.Resolved]: { name: 'Resolved', color: 'bg-green-100 text-green-800' },
};