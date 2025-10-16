import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import EventList from '@/components/participant/EventList';
import RegistrationForm from '@/components/participant/RegistrationForm';
import { Event } from '@/lib/mockApi';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ParticipantPortal = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Participant Portal
          </h1>
          <p className="text-muted-foreground">
            Browse events and register to get your entry pass
          </p>
        </div>

        {!selectedEvent ? (
          <Card>
            <CardHeader>
              <CardTitle>Available Events</CardTitle>
              <CardDescription>Select an event to register</CardDescription>
            </CardHeader>
            <CardContent>
              <EventList onSelectEvent={setSelectedEvent} />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedEvent(null)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
            <Card>
              <CardHeader>
                <CardTitle>{selectedEvent.name}</CardTitle>
                <CardDescription>{selectedEvent.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <RegistrationForm 
                  event={selectedEvent} 
                  onSuccess={() => setSelectedEvent(null)}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantPortal;
