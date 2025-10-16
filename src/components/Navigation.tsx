import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, UserPlus, ScanLine, LayoutDashboard } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const links = [
    { to: '/', label: 'Home', icon: LayoutDashboard },
    { to: '/admin', label: 'Admin Portal', icon: Calendar },
    { to: '/register', label: 'Register', icon: UserPlus },
    { to: '/checkin', label: 'Check-In', icon: ScanLine },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EventFlow
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              
              return (
                <Button
                  key={link.to}
                  asChild
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  <Link to={link.to}>
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{link.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
