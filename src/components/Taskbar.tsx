
import { Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TaskbarProps {
  openWindows: string[];
  activeWindow: string | null;
  onWindowClick: (windowId: string) => void;
  onStartMenuClick: () => void;
}

const Taskbar = ({ openWindows, activeWindow, onWindowClick, onStartMenuClick }: TaskbarProps) => {
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
        <button 
          onClick={onStartMenuClick}
          className="kali-button px-4 py-2 h-8 flex items-center space-x-2 text-sm font-medium"
        >
          <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
            <span className="text-xs text-black font-bold">🐉</span>
          </div>
          <span>Start</span>
        </button>
      </div>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center space-x-1 mx-4">
        {openWindows.map((windowId) => (
          <button
            key={windowId}
            onClick={() => onWindowClick(windowId)}
            className={`kali-button px-3 py-1 h-8 text-sm truncate max-w-48 ${
              activeWindow === windowId 
                ? 'bg-green-600 shadow-inner' 
                : 'bg-gray-700'
            }`}
          >
            {windowId.charAt(0).toUpperCase() + windowId.slice(1)}
          </button>
        ))}
      </div>

      {/* System Tray - Only Clock */}
      <div className="flex items-center space-x-3">
        <div className="kali-glass px-3 py-1 rounded text-xs text-center min-w-20">
          <div className="font-medium text-green-300">{formatTime(currentTime)}</div>
          <div className="text-[10px] text-green-400">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
