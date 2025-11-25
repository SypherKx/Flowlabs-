import { Lead, Client, AutomationLog, Metric } from './types';

export const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Alice Chen', company: 'TechFlow', title: 'CEO', email: 'alice@techflow.io', status: 'New', score: 85 },
  { id: '2', name: 'Bob Smith', company: 'RealtyPro', title: 'Founder', email: 'bob@realtypro.com', status: 'Enriched', score: 92 },
  { id: '3', name: 'Carol Davis', company: 'GrowthLabs', title: 'Marketing Director', email: 'carol@gl.co', status: 'Contacted', score: 78, personalizationLine: 'Loved your recent post on LinkedIn about scalable automation.' },
  { id: '4', name: 'David Wilson', company: 'EcomBoost', title: 'Owner', email: 'david@ecomboost.net', status: 'Replied', score: 95, personalizationLine: 'Congrats on hitting the Inc 5000 list!' },
  { id: '5', name: 'Eve Miller', company: 'DesignStudio', title: 'Creative Lead', email: 'eve@ds.com', status: 'Booked', score: 99, personalizationLine: 'Your portfolio redesign looks incredible.' },
];

export const MOCK_CLIENTS: Client[] = [
  { id: '101', name: 'Alpha Agency', company: 'Alpha Co', status: 'Active', automationsRunning: 5, lastActive: '2 mins ago', avatar: 'https://picsum.photos/40/40?random=1' },
  { id: '102', name: 'Beta Realty', company: 'Beta Group', status: 'Onboarding', automationsRunning: 1, lastActive: '1 hour ago', avatar: 'https://picsum.photos/40/40?random=2' },
  { id: '103', name: 'Gamma Consult', company: 'Gamma LLC', status: 'Maintenance', automationsRunning: 8, lastActive: '1 day ago', avatar: 'https://picsum.photos/40/40?random=3' },
];

export const MOCK_LOGS: AutomationLog[] = [
  { id: 'L1', workflow: 'Lead Enrichment', client: 'Internal', status: 'Success', timestamp: '10:42 AM', details: 'Processed 50 leads via Apollo API' },
  { id: 'L2', workflow: 'Client Onboarding', client: 'Beta Realty', status: 'Running', timestamp: '10:40 AM', details: 'Creating Notion folder structure' },
  { id: 'L3', workflow: 'Daily Report', client: 'Alpha Agency', status: 'Error', timestamp: '09:15 AM', details: 'Google Slides API timeout (504)' },
  { id: 'L4', workflow: 'Invoice Gen', client: 'Gamma Consult', status: 'Success', timestamp: 'Yesterday', details: 'Sent via Stripe' },
];

export const KPI_METRICS: Metric[] = [
  { label: 'Leads Processed', value: '1,240', change: 12.5, trend: 'up' },
  { label: 'Reply Rate', value: '8.4%', change: 1.2, trend: 'up' },
  { label: 'Active Workflows', value: '24', change: 4, trend: 'up' },
  { label: 'Calls Booked', value: '18', change: -2, trend: 'down' },
];
