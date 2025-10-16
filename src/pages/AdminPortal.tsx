import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import CreateEventForm from '@/components/admin/CreateEventForm';
import EventsList from '@/components/admin/EventsList';
import { PlusCircle, Calendar } from 'lucide-react';

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Create and manage events, build custom forms, and track registrations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            {!showCreateForm ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Your Events</CardTitle>
                        <CardDescription>Manage your event registrations and forms</CardDescription>
                      </div>
                      <Button onClick={() => setShowCreateForm(true)} className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Create Event
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <EventsList />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Event</CardTitle>
                  <CardDescription>Set up your event and build a custom registration form</CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateEventForm onCancel={() => setShowCreateForm(false)} />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPortal;
