import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Event, createParticipant, getParticipantsByEventId } from '@/lib/mockApi';
import { QRCodeSVG } from 'qrcode.react';
import { Download, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface RegistrationFormProps {
  event: Event;
  onSuccess: () => void;
}

const RegistrationForm = ({ event, onSuccess }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [participant, setParticipant] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    // Validate required fields
    const missingFields = event.formFields
      .filter((field) => field.required && !formData[field.id])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    // Extract name and email
    const nameField = event.formFields.find((f) => f.type === 'text' && f.label.toLowerCase().includes('name'));
    const emailField = event.formFields.find((f) => f.type === 'email');

    const nameValue = formData[nameField?.id || ''] || 'Unknown';
    const emailValue = (formData[emailField?.id || ''] || '').toString().trim();

    // For team events, try to find a field that contains "team" in its label
    let teamNameValue: string | undefined = undefined;
    if (event.eventType === 'team') {
      const teamField = event.formFields.find((f) => f.label.toLowerCase().includes('team'));
      teamNameValue = teamField ? (formData[teamField.id] || '').toString().trim() : (formData['teamName'] || '').toString().trim();
      if (teamNameValue === '') teamNameValue = undefined;
    }

    // Duplicate checks
    const existing = getParticipantsByEventId(event.id);
    if (emailValue) {
      const emailExists = existing.some((p) => p.email && p.email.toLowerCase() === emailValue.toLowerCase());
      if (emailExists) {
        toast.error('You (or this email) have already registered for this event');
        return;
      }
    }

    if (teamNameValue) {
      const teamExists = existing.some((p) => p.teamName && p.teamName.toLowerCase() === teamNameValue?.toLowerCase());
      if (teamExists) {
        toast.error('A team with this name has already registered for this event');
        return;
      }
    }

    const newParticipant = createParticipant({
      eventId: event.id,
      name: nameValue,
      email: emailValue,
      teamName: teamNameValue,
      formData,
    });

    setParticipant(newParticipant);
    setShowQRDialog(true);
    toast.success('Registration successful!');
    setLoading(false);
  };

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `entry-pass-${participant.name}.png`;
      link.href = url;
      link.click();
    }
  };

  const renderField = (field: typeof event.formFields[0]) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={formData[field.id] || ''}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            required={field.required}
            rows={3}
          />
        );
      case 'select':
        return (
          <Select
            value={formData[field.id] || ''}
            onValueChange={(v) => setFormData({ ...formData, [field.id]: v })}
            required={field.required}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formData[field.id] || false}
              onCheckedChange={(checked) => setFormData({ ...formData, [field.id]: checked })}
              required={field.required}
            />
            <label className="text-sm">{field.label}</label>
          </div>
        );
      default:
        return (
          <Input
            type={field.type}
            value={formData[field.id] || ''}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            required={field.required}
          />
        );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {event.formFields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {renderField(field)}
          </div>
        ))}

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? 'Registering...' : 'Complete Registration'}
        </Button>
      </form>

      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-accent">
              <CheckCircle2 className="h-5 w-5" />
              Registration Complete!
            </DialogTitle>
          </DialogHeader>
          
          {participant && (
            <div className="space-y-4">
              <Card className="bg-secondary/30">
                <CardContent className="pt-6 space-y-3">
                  <p className="text-sm text-muted-foreground">Your Entry Pass</p>
                  <div className="bg-white p-6 rounded-lg flex justify-center">
                    <QRCodeSVG
                      id="qr-code"
                      value={participant.entryUUID}
                      size={200}
                      level="H"
                      includeMargin
                    />
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {participant.name}
                    </p>
                    <p>
                      <span className="font-medium">Event:</span> {event.name}
                    </p>
                    <p className="text-xs text-muted-foreground break-all">
                      UUID: {participant.entryUUID}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button onClick={downloadQR} variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download QR
                </Button>
                <Button
                  onClick={() => {
                    setShowQRDialog(false);
                    onSuccess();
                  }}
                  className="flex-1"
                >
                  Done
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Save this QR code and present it at the event for check-in
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegistrationForm;
