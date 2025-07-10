
import React from 'react';
import { TrafficIcon } from './TrafficIcon';
import { CivicIcon } from './CivicIcon';
import { EmergencyIcon } from './EmergencyIcon';
import { EventIcon } from './EventIcon';
import { SocialIcon } from './SocialIcon';

interface IconProps {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}

export const IconMap: React.FC<IconProps> = ({ icon, className, style }) => {
  switch (icon) {
    case 'traffic':
      return <TrafficIcon className={className} style={style} />;
    case 'civic':
      return <CivicIcon className={className} style={style} />;
    case 'emergency':
      return <EmergencyIcon className={className} style={style} />;
    case 'event':
      return <EventIcon className={className} style={style} />;
    case 'social':
      return <SocialIcon className={className} style={style} />;
    default:
      return null;
  }
};