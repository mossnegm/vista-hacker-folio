import { Clock, User, Wifi, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TaskbarProps {
  openWindows: string[];
  activeWindow: string | null;
  onWindowClick: (windowId: string) => void;
}

const Taskbar = ({ openWindows, activeWindow, onWindowClick }: TaskbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 h-12 flex items-center justify-between px-2 z-50">
      {/* Start Button */}
      <div className="flex items-center space-x-2">
        <button className="vista-button px-4 py-2 h-8 flex items-center space-x-2 text-sm font-medium">
          <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
          <span>Start</span>
        </button>
      </div>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center space-x-1 mx-4">
        {openWindows.map((windowId) => (
          <button
            key={windowId}
            onClick={() => onWindowClick(windowId)}
            className={`vista-button px-3 py-1 h-8 text-sm truncate max-w-48 ${
              activeWindow === windowId 
                ? 'bg-primary-hover shadow-inner' 
                : 'bg-primary'
            }`}
          >
            {windowId.charAt(0).toUpperCase() + windowId.slice(1)}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-3">
        {/* System Icons */}
        <div className="flex items-center space-x-2 text-xs">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
        </div>
        
        {/* Clock */}
        <div className="glass-effect px-3 py-1 rounded text-xs text-center min-w-20">
          <div className="font-medium">{formatTime(currentTime)}</div>
          <div className="text-[10px] opacity-80">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;