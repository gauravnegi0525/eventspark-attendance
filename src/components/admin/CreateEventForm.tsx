import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { PlusCircle, Trash2, GripVertical } from 'lucide-react';
import { createEvent, FormField } from '@/lib/mockApi';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface CreateEventFormProps {
  onCancel: () => void;
}

const CreateEventForm = ({ onCancel }: CreateEventFormProps) => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState<'individual' | 'team'>('individual');
  const [maxTeamSize, setMaxTeamSize] = useState('4');
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: uuidv4(), label: 'Full Name', type: 'text', required: true },
    { id: uuidv4(), label: 'Email', type: 'email', required: true },
  ]);

  const addField = () => {
    setFormFields([
      ...formFields,
      { id: uuidv4(), label: '', type: 'text', required: false },
    ]);
  };

  const removeField = (id: string) => {
    setFormFields(formFields.filter((f) => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventName || !date || !location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const event = createEvent({
      name: eventName,
      description,
      date,
      location,
      eventType,
      maxTeamSize: eventType === 'team' ? parseInt(maxTeamSize) : undefined,
      formFields: formFields.filter((f) => f.label.trim() !== ''),
    });

    toast.success(`Event "${event.name}" created successfully!`);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="eventName">Event Name *</Label>
          <Input
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Tech Conference 2025"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Convention Center, Main Hall"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event description..."
          rows={3}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="eventType">Event Type</Label>
          <Select value={eventType} onValueChange={(v: any) => setEventType(v)}>
            <SelectTrigger id="eventType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="team">Team-based</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {eventType === 'team' && (
          <div className="space-y-2">
            <Label htmlFor="maxTeamSize">Max Team Size</Label>
            <Input
              id="maxTeamSize"
              type="number"
              value={maxTeamSize}
              onChange={(e) => setMaxTeamSize(e.target.value)}
              min="2"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg">Registration Form Fields</Label>
          <Button type="button" onClick={addField} variant="outline" size="sm" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Field
          </Button>
        </div>

        <div className="space-y-3">
          {formFields.map((field, index) => (
            <Card key={field.id} className="p-4">
              <div className="flex gap-3">
                <div className="flex items-center text-muted-foreground">
                  <GripVertical className="h-5 w-5" />
                </div>
                
                <div className="flex-1 grid md:grid-cols-3 gap-3">
                  <Input
                    placeholder="Field label"
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                  />
                  
                  <Select
                    value={field.type}
                    onValueChange={(v: any) => updateField(field.id, { type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="textarea">Text Area</SelectItem>
                      <SelectItem value="select">Dropdown</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                        className="rounded"
                      />
                      Required
                    </label>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeField(field.id)}
                  disabled={index < 2}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">Create Event</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreateEventForm;
