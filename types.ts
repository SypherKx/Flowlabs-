export type View = 'dashboard' | 'prospecting' | 'fulfillment' | 'reporting' | 'settings' | 'pricing';

export interface Lead {
  id: string;
  name: string;
  company: string;
  title: string;
  email: string;
  status: 'New' | 'Enriched' | 'Contacted' | 'Replied' | 'Booked';
  personalizationLine?: string;
  score: number;
  value?: number;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  status: 'Onboarding' | 'Active' | 'Maintenance' | 'Churned';
  automationsRunning: number;
  lastActive: string;
  avatar: string;
}

export interface Metric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface AutomationLog {
  id: string;
  workflow: string;
  client: string;
  status: 'Success' | 'Error' | 'Running';
  timestamp: string;
  details: string;
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
}

export interface AppSettings {
  geminiApiKey: string;
  airtableApiKey: string;
  airtableBaseId: string;
  makeWebhookUrl: string;
  tableNameLeads: string;
  tableNameClients: string;
  tableNameLogs: string;
}
