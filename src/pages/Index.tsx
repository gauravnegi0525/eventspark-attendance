import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, UserPlus, ScanLine, CheckCircle2, Users, FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Index = () => {
  const portals = [
    {
      title: 'Admin Portal',
      description: 'Create events, build custom registration forms, and manage attendees',
      icon: Calendar,
      link: '/admin',
      gradient: 'from-primary to-primary-glow',
    },
    {
      title: 'Participant Portal',
      description: 'Browse events, register with ease, and get your QR entry pass',
      icon: UserPlus,
      link: '/register',
      gradient: 'from-accent to-green-500',
    },
    {
      title: 'Check-In Portal',
      description: 'Validate QR codes and mark real-time attendance at the venue',
      icon: ScanLine,
      link: '/checkin',
      gradient: 'from-warning to-orange-500',
    },
  ];

  const features = [
    {
      icon: FileText,
      title: 'Dynamic Forms',
      description: 'Create custom registration forms for any event type',
    },
    {
      icon: Users,
      title: 'Team & Individual',
      description: 'Support both solo and team-based registrations',
    },
    {
      icon: CheckCircle2,
      title: 'QR Check-In',
      description: 'Fast and secure attendance validation',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Smart Event Management
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Streamline your event workflow from registration to attendance with dynamic forms, 
              QR codes, and real-time validation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/admin">
                  <Calendar className="h-5 w-5" />
                  Get Started
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/register">
                  <UserPlus className="h-5 w-5" />
                  Register for Event
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Portal</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {portals.map((portal, index) => {
            const Icon = portal.icon;
            return (
              <Card 
                key={portal.title} 
                className="group hover:shadow-hover transition-all duration-300 animate-slide-up border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${portal.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{portal.title}</CardTitle>
                  <CardDescription>{portal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={portal.link}>Access Portal</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title} 
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 EventFlow. Streamlining event management with smart technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
