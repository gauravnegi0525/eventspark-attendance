import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllEvents, getEventStats } from '@/lib/mockApi';
import { Calendar, MapPin, Users, UserCheck, Clock } from 'lucide-react';
import { format } from 'date-fns';

const EventsList = () => {
  const events = getAllEvents();

  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No events created yet. Create your first event to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => {
        const stats = getEventStats(event.id);
        
        return (
          <Card key={event.id} className="hover:shadow-hover transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{event.name}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </div>
                <Badge variant={event.eventType === 'team' ? 'default' : 'secondary'}>
                  {event.eventType === 'team' ? 'Team Event' : 'Individual'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{stats.total} registered</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCheck className="h-4 w-4" />
                  <span>{stats.checkedIn} checked in</span>
                </div>
              </div>

              {stats.total > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Check-in Progress</span>
                    <span className="font-medium">
                      {Math.round((stats.checkedIn / stats.total) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-success transition-all"
                      style={{ width: `${(stats.checkedIn / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EventsList;
