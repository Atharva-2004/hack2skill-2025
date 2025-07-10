export enum EventCategory {
  Traffic = 'TRAFFIC',
  Civic = 'CIVIC_ISSUE',
  Emergency = 'EMERGENCY',
  Event = 'EVENT',
  
}

export enum Sentiment {
  Positive = 'POSITIVE',
  Neutral = 'NEUTRAL',
  Negative = 'NEGATIVE',
  Critical = 'CRITICAL',
}

export enum Status {
  Reported = 'REPORTED',
  InProgress = 'IN_PROGRESS',
  Resolved = 'RESOLVED',
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface CityEvent {
  id: string;
  category: EventCategory;
  summary: string;
  description: string;
  location: Location;
  timestamp: Date;
  sentiment: Sentiment;
  status: Status;
  imageUrl?: string;
  resolutionTimeline?: string;
  source?: string;
}

export interface NewReport {
  description: string;
  category: EventCategory;
  location: Location;
  imageFile?: File;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type Language = 'en' | 'hi';

export interface NotificationPreferences {
  enabled: boolean;
  categories: EventCategory[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  points: number;
  notificationPreferences: NotificationPreferences;
}

export interface ChatResponseAction {
    type: 'HIGHLIGHT_ROUTE';
    payload: unknown;
}

export interface StructuredChatResponse {
    text: string;
    action?: ChatResponseAction;
}

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string; // ISO 8601 format
  content: string | null;
}