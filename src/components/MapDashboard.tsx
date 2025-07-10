import React, { useState, useEffect, useRef } from 'react';
import { CityEvent, Location, Sentiment } from '../../types';
import { CATEGORY_DETAILS, SENTIMENT_DETAILS } from '../../constants';
import { HeatmapIcon } from './icons/HeatmapIcon';
import { useTranslation } from '../hooks/useTranslation';

declare global {
  interface Window {
    google: any;
  }
}

// Custom light theme for Google Maps
const mapStyles = [
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] },
    { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] },
    { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] },
    { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] },
    { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] },
    { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] },
    { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] },
    { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] },
    { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
    { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] },
    { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] },
    { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }
];


interface MapDashboardProps {
  events: CityEvent[];
  selectedEventId?: string;
  onSelectEvent: (event: CityEvent) => void;
  onMapClick: (coords: Location) => void;
  highlightedRoute?: Location[] | null;
}

const createMarkerIcon = (event: CityEvent, isSelected: boolean) => {
    const category = CATEGORY_DETAILS[event.category];
    const sentiment = SENTIMENT_DETAILS[event.sentiment];
    
    // Determine the color of the icon inside the marker based on the category's text color
    const iconColor = category.textColor.includes('800') ? '#2d3748' : 'white';
    
    // Generate the SVG path for the icon
    const iconPath = `<svg viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IconMap({ icon: category.icon, raw: true })}</svg>`;

    const ringColor = isSelected ? '#2d3748' : sentiment.hex; // Use a dark ring for selection
    const ringWidth = isSelected ? 4 : 2;
    const categoryColor = category.hex;

    const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="${18}" fill="white" />
      <circle cx="20" cy="20" r="${18 - ringWidth / 2}" fill="transparent" stroke="${ringColor}" stroke-width="${ringWidth}"/>
      <circle cx="20" cy="20" r="14" fill="${categoryColor}" />
      <g transform="translate(12, 12) scale(0.66)">
        ${iconPath}
      </g>
    </svg>`;
    
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

// Temporary IconMap function to return SVG path strings for marker creation
const IconMap = ({ icon, raw }: { icon: string, raw: boolean }): string | null => {
    if (!raw) return null;
    switch(icon) {
        case 'traffic': return `<rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect><path d="M7 17v-4h10v4"></path><path d="M2 12h20"></path><path d="M6 7V5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2"></path>`;
        case 'civic': return `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>`;
        case 'emergency': return `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>`;
        case 'event': return `<path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />`;
        case 'social': return `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`;
        default: return '';
    }
}


export const MapDashboard: React.FC<MapDashboardProps> = ({ events, selectedEventId, onSelectEvent, onMapClick, highlightedRoute }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMapRef = useRef<any | null>(null);
    const markersRef = useRef<{ [key: string]: any }>({});
    const heatmapRef = useRef<any | null>(null);
    const routePolylineRef = useRef<any | null>(null);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (!mapRef.current || !window.google) return;
        
       googleMapRef.current = new window.google.maps.Map(mapRef.current, {
    center: { lat: 12.9716, lng: 77.5946 },
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: true,
});

        googleMapRef.current.addListener('click', (e: any) => {
            if (e.latLng) {
                onMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            }
        });
    }, [onMapClick]);

    // Effect for managing markers
    useEffect(() => {
        const map = googleMapRef.current;
        if (!map) return;

        const currentMarkerIds = Object.keys(markersRef.current);
        const newEventIds = events.map(e => e.id);
        
        currentMarkerIds.forEach(id => {
            if (!newEventIds.includes(id)) {
                markersRef.current[id].setMap(null);
                delete markersRef.current[id];
            }
        });

        events.forEach(event => {
            const isSelected = event.id === selectedEventId;
            const icon = {
                url: createMarkerIcon(event, isSelected),
                anchor: new window.google.maps.Point(20, 20),
                scaledSize: new window.google.maps.Size(40, 40),
            };

            if (markersRef.current[event.id]) {
                markersRef.current[event.id].setIcon(icon);
                markersRef.current[event.id].setZIndex(isSelected ? 100 : 1);
            } else {
                const marker = new window.google.maps.Marker({
                    position: event.location,
                    map: map,
                    title: event.summary,
                    icon: icon,
                    zIndex: isSelected ? 100 : 1,
                    animation: window.google.maps.Animation.DROP,
                });
                marker.addListener('click', () => onSelectEvent(event));
                markersRef.current[event.id] = marker;
            }
        });

    }, [events, selectedEventId, onSelectEvent]);

    // Effect for managing heatmap
    useEffect(() => {
        const map = googleMapRef.current;
        if (!map || !window.google?.maps?.visualization) return;

        if (!heatmapRef.current) {
            heatmapRef.current = new window.google.maps.visualization.HeatmapLayer({
                radius: 40,
                opacity: 0.7,
            });
        }
        
        if (showHeatmap) {
            const sentimentWeights: Record<Sentiment, number> = {
                [Sentiment.Critical]: 4,
                [Sentiment.Negative]: 2,
                [Sentiment.Neutral]: 1,
                [Sentiment.Positive]: 1,
            }
            const data = events.map(event => ({
                location: new window.google.maps.LatLng(event.location.lat, event.location.lng),
                weight: sentimentWeights[event.sentiment]
            }));
            heatmapRef.current.setData(data);
            heatmapRef.current.setMap(map);
        } else {
            heatmapRef.current.setMap(null);
        }
    }, [showHeatmap, events]);

    // Effect for highlighting route
    useEffect(() => {
        const map = googleMapRef.current;
        if (!map) return;

        if (routePolylineRef.current) {
            routePolylineRef.current.setMap(null);
        }

        if (highlightedRoute && highlightedRoute.length > 0) {
            routePolylineRef.current = new window.google.maps.Polyline({
                path: highlightedRoute,
                geodesic: true,
                strokeColor: '#586877',
                strokeOpacity: 0.9,
                strokeWeight: 5,
                icons: [{
                    icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 3 },
                    offset: '0',
                    repeat: '20px'
                }],
            });
            routePolylineRef.current.setMap(map);
        }
    }, [highlightedRoute]);

  return (
 <div className="relative w-[1150px] h-[600px] bg-gray-200 xl:-ml-6">
        <div ref={mapRef} className="w-full h-full" />
        
        <div className="absolute top-4 right-28 flex flex-col space-y-2 z-10">
            <button 
                onClick={(e) => { e.stopPropagation(); setShowHeatmap(!showHeatmap); }}
                className={`p-2 rounded-lg backdrop-blur-sm transition-colors shadow-md ${showHeatmap ? 'bg-[#586877] text-white' : 'bg-white/80 text-gray-600 hover:bg-gray-100'}`}
                aria-label={t('toggle_heatmap')}
                title={t('toggle_heatmap')}
            >
                <HeatmapIcon className="w-5 h-5" />
            </button>
        </div>

        <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded-lg text-xs text-white pointer-events-none z-10">
            {t('map_prompt')}
        </div>
    </div>
  );
};