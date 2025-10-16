import { v4 as uuidv4 } from 'uuid';

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  options?: string[];
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  eventType: 'individual' | 'team';
  maxTeamSize?: number;
  formFields: FormField[];
  createdAt: string;
}

export interface Participant {
  id: string;
  eventId: string;
  entryUUID: string;
  name: string;
  email: string;
  teamId?: string;
  teamName?: string;
  formData: Record<string, any>;
  checkInStatus: 'Pending' | 'CheckedIn';
  registeredAt: string;
}

// Storage keys
const EVENTS_KEY = 'eventflow_events';
const PARTICIPANTS_KEY = 'eventflow_participants';

// Initialize with sample data if empty
const initializeData = () => {
  if (!sessionStorage.getItem(EVENTS_KEY)) {
    const sampleEvents: Event[] = [
      {
        id: uuidv4(),
        name: 'Tech Conference 2025',
        description: 'Annual technology conference featuring industry leaders',
        date: '2025-03-15',
        location: 'Convention Center, Main Hall',
        eventType: 'individual',
        formFields: [
          { id: uuidv4(), label: 'Full Name', type: 'text', required: true },
          { id: uuidv4(), label: 'Email', type: 'email', required: true },
          { id: uuidv4(), label: 'Company', type: 'text', required: false },
          { id: uuidv4(), label: 'Dietary Restrictions', type: 'textarea', required: false },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: 'Hackathon 2025',
        description: '48-hour coding competition',
        date: '2025-04-20',
        location: 'Innovation Hub',
        eventType: 'team',
        maxTeamSize: 4,
        formFields: [
          { id: uuidv4(), label: 'Team Name', type: 'text', required: true },
          { id: uuidv4(), label: 'Team Leader Name', type: 'text', required: true },
          { id: uuidv4(), label: 'Team Leader Email', type: 'email', required: true },
          { id: uuidv4(), label: 'Team Size', type: 'number', required: true },
          { id: uuidv4(), label: 'Project Category', type: 'select', required: true, options: ['AI/ML', 'Web Dev', 'Mobile', 'IoT', 'Other'] },
        ],
        createdAt: new Date().toISOString(),
      },
    ];
    sessionStorage.setItem(EVENTS_KEY, JSON.stringify(sampleEvents));
    sessionStorage.setItem(PARTICIPANTS_KEY, JSON.stringify([]));
  }
};

// Event Management
export const getAllEvents = (): Event[] => {
  initializeData();
  const data = sessionStorage.getItem(EVENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getEventById = (id: string): Event | null => {
  const events = getAllEvents();
  return events.find(e => e.id === id) || null;
};

export const createEvent = (event: Omit<Event, 'id' | 'createdAt'>): Event => {
  const events = getAllEvents();
  const newEvent: Event = {
    ...event,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  events.push(newEvent);
  sessionStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  return newEvent;
};

export const updateEvent = (id: string, updates: Partial<Event>): Event | null => {
  const events = getAllEvents();
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return null;
  
  events[index] = { ...events[index], ...updates };
  sessionStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  return events[index];
};

export const deleteEvent = (id: string): boolean => {
  const events = getAllEvents();
  const filtered = events.filter(e => e.id !== id);
  if (filtered.length === events.length) return false;
  
  sessionStorage.setItem(EVENTS_KEY, JSON.stringify(filtered));
  return true;
};

// Participant Management
export const getAllParticipants = (): Participant[] => {
  initializeData();
  const data = sessionStorage.getItem(PARTICIPANTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getParticipantsByEventId = (eventId: string): Participant[] => {
  return getAllParticipants().filter(p => p.eventId === eventId);
};

export const getParticipantByUUID = (uuid: string): Participant | null => {
  const participants = getAllParticipants();
  return participants.find(p => p.entryUUID === uuid) || null;
};

export const createParticipant = (participant: Omit<Participant, 'id' | 'entryUUID' | 'registeredAt' | 'checkInStatus'>): Participant => {
  const participants = getAllParticipants();
  const newParticipant: Participant = {
    ...participant,
    id: uuidv4(),
    entryUUID: uuidv4(),
    checkInStatus: 'Pending',
    registeredAt: new Date().toISOString(),
  };
  participants.push(newParticipant);
  sessionStorage.setItem(PARTICIPANTS_KEY, JSON.stringify(participants));
  return newParticipant;
};

export const updateParticipantStatus = (uuid: string, status: 'Pending' | 'CheckedIn'): Participant | null => {
  const participants = getAllParticipants();
  const index = participants.findIndex(p => p.entryUUID === uuid);
  if (index === -1) return null;
  
  participants[index].checkInStatus = status;
  sessionStorage.setItem(PARTICIPANTS_KEY, JSON.stringify(participants));
  return participants[index];
};

// Statistics
export const getEventStats = (eventId: string) => {
  const participants = getParticipantsByEventId(eventId);
  const checkedIn = participants.filter(p => p.checkInStatus === 'CheckedIn').length;
  
  return {
    total: participants.length,
    checkedIn,
    pending: participants.length - checkedIn,
  };
};
