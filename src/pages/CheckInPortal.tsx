import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { getParticipantByUUID, updateParticipantStatus, getEventById } from '@/lib/mockApi';
import { ScanLine, CheckCircle2, XCircle, User, Mail, Calendar, Users } from 'lucide-react';
import { toast } from 'sonner';

const CheckInPortal = () => {
  const [uuid, setUuid] = useState('');
  const [participant, setParticipant] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    setParticipant(null);

    if (!uuid.trim()) {
      setError('Please enter an Entry Pass UUID');
      return;
    }

    const found = getParticipantByUUID(uuid.trim());
    if (found) {
      const event = getEventById(found.eventId);
      setParticipant({ ...found, event });
    } else {
      setError('Invalid Entry Pass UUID. Access Denied.');
    }
  };

  const handleCheckIn = () => {
    if (!participant) return;

    const updated = updateParticipantStatus(participant.entryUUID, 'CheckedIn');
    if (updated) {
      setParticipant(updated);
      toast.success('Participant checked in successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-warning to-orange-500 flex items-center justify-center">
            <ScanLine className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Check-In Portal</h1>
          <p className="text-muted-foreground">
            Validate entry passes and mark attendance
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Scan Entry Pass</CardTitle>
            <CardDescription>Enter the UUID from the participant's QR code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="uuid">Entry Pass UUID</Label>
              <div className="flex gap-2">
                <Input
                  id="uuid"
                  placeholder="Enter UUID..."
                  value={uuid}
                  onChange={(e) => setUuid(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} className="gap-2 shrink-0">
                  <ScanLine className="h-4 w-4" />
                  Verify
                </Button>
              </div>
            </div>

            {error && (
              <Card className="border-destructive bg-destructive/10">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-destructive">
                    <XCircle className="h-6 w-6 shrink-0" />
                    <div>
                      <p className="font-semibold">Access Denied</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {participant && (
              <Card className="border-accent bg-accent/10">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                      <span className="font-semibold text-lg">Valid Entry Pass</span>
                    </div>
                    <Badge 
                      variant={participant.checkInStatus === 'CheckedIn' ? 'default' : 'secondary'}
                      className={participant.checkInStatus === 'CheckedIn' ? 'bg-accent text-accent-foreground' : 'bg-warning text-warning-foreground'}
                    >
                      {participant.checkInStatus}
                    </Badge>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Name:</span>
                      <span>{participant.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Email:</span>
                      <span>{participant.email}</span>
                    </div>
                    {participant.event && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Event:</span>
                        <span>{participant.event.name}</span>
                      </div>
                    )}
                    {participant.teamName && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Team:</span>
                        <span>{participant.teamName}</span>
                      </div>
                    )}
                  </div>

                  {participant.checkInStatus === 'Pending' && (
                    <Button 
                      onClick={handleCheckIn} 
                      className="w-full mt-4 bg-accent hover:bg-accent/90"
                      size="lg"
                    >
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Check In Participant
                    </Button>
                  )}

                  {participant.checkInStatus === 'CheckedIn' && (
                    <div className="bg-accent/20 rounded-lg p-3 text-center">
                      <p className="text-sm font-medium text-accent">
                        Already checked in ✓
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckInPortal;
