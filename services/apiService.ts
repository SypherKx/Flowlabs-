import { Lead, Client, AutomationLog, AppSettings } from '../types';
import { MOCK_LEADS, MOCK_CLIENTS, MOCK_LOGS } from '../constants';

// DEPRECATED: Settings are now stored in Supabase user_settings table
// This function is kept for backwards compatibility only
export const getSettings = (): AppSettings => {
  console.warn('⚠️ getSettings() is deprecated. API keys should be in .env file.');
  return {
    geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
    airtableApiKey: import.meta.env.VITE_AIRTABLE_API_KEY || '',
    airtableBaseId: import.meta.env.VITE_AIRTABLE_BASE_ID || '',
    makeWebhookUrl: import.meta.env.VITE_MAKE_WEBHOOK_URL || '',
    tableNameLeads: 'Leads',
    tableNameClients: 'Clients',
    tableNameLogs: 'Logs'
  };
};

// DEPRECATED: Use Supabase user_settings table instead
export const saveSettings = (settings: AppSettings) => {
  console.warn('⚠️ saveSettings() is deprecated. Use Supabase user_settings table instead.');
};

// --- Airtable Integration ---

const fetchAirtable = async (tableName: string) => {
  const settings = getSettings();
  if (!settings.airtableApiKey || !settings.airtableBaseId) {
    throw new Error('Missing Configuration');
  }

  const url = `https://api.airtable.com/v0/${settings.airtableBaseId}/${tableName}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${settings.airtableApiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Airtable Error: ${response.statusText}`);
  }

  return response.json();
};

export const getLeads = async (): Promise<Lead[]> => {
  try {
    const data = await fetchAirtable(getSettings().tableNameLeads);
    // Map Airtable records to our internal Lead type
    // This assumes your Airtable columns match these names exactly, or you map them here.
    return data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.Name || 'Unknown',
      company: record.fields.Company || 'Unknown',
      title: record.fields.Title || '',
      email: record.fields.Email || '',
      status: record.fields.Status || 'New',
      score: record.fields.Score || 0,
      personalizationLine: record.fields.PersonalizationLine
    }));
  } catch (error) {
    console.warn("Using Mock Data for Leads due to:", error);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_LEADS), 800));
  }
};

export const getClients = async (): Promise<Client[]> => {
  try {
    const data = await fetchAirtable(getSettings().tableNameClients);
    return data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.Name,
      company: record.fields.Company,
      status: record.fields.Status,
      automationsRunning: record.fields.AutomationsRunning || 0,
      lastActive: record.fields.LastActive || 'Recently',
      avatar: record.fields.Avatar?.[0]?.url || `https://ui-avatars.com/api/?name=${record.fields.Name}`
    }));
  } catch (error) {
    console.warn("Using Mock Data for Clients due to:", error);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_CLIENTS), 800));
  }
};

export const getLogs = async (): Promise<AutomationLog[]> => {
  try {
    const data = await fetchAirtable(getSettings().tableNameLogs);
    return data.records.map((record: any) => ({
      id: record.id,
      workflow: record.fields.Workflow,
      client: record.fields.Client,
      status: record.fields.Status,
      timestamp: record.fields.Timestamp,
      details: record.fields.Details
    }));
  } catch (error) {
    console.warn("Using Mock Data for Logs due to:", error);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_LOGS), 800));
  }
};

// --- Make.com Integration ---

export const triggerCampaignWebhook = async (leadIds: string[]) => {
  const settings = getSettings();
  if (!settings.makeWebhookUrl) {
    // Simulate success if no URL is present (Demo Mode)
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  try {
    const response = await fetch(settings.makeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'start_campaign',
        leadIds: leadIds,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) throw new Error('Webhook failed');
    return true;
  } catch (error) {
    console.error("Webhook Error:", error);
    throw error;
  }
};
