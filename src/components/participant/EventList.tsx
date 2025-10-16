import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllEvents, Event } from '@/lib/mockApi';
import { Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

interface EventListProps {
  onSelectEvent: (event: Event) => void;
}

const EventList = ({ onSelectEvent }: EventListProps) => {
  const events = getAllEvents();

  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No events available at the moment. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {events.map((event) => (
        <Card key={event.id} className="hover:shadow-hover transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </div>
              <Badge variant={event.eventType === 'team' ? 'default' : 'secondary'}>
                {event.eventType === 'team' ? 'Team Event' : 'Individual'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{event.location}</span>
              </div>
              {event.eventType === 'team' && event.maxTeamSize && (
                <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                  <Users className="h-4 w-4" />
                  <span>Max team size: {event.maxTeamSize} members</span>
                </div>
              )}
            </div>

            <Button onClick={() => onSelectEvent(event)} className="w-full">
              Register Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
