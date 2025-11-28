import React from 'react';

export interface ProcessMetric {
  label: string;
  value: string | number;
  subValue?: string | number;
  highlight?: boolean;
  description?: string;
}

export interface ProcessPhase {
  id: number;
  title: string;
  subtitle: string;
  icon?: React.ElementType;
  items: ProcessMetric[];
  description?: string;
}