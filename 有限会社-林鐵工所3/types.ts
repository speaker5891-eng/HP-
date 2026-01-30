import React from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  groundingMetadata?: any; // For search results
  generatedImageUrl?: string; // For generated images
}

export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  WORKS = 'works',
  RECRUIT = 'recruit',
  CONTACT = 'contact',
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}