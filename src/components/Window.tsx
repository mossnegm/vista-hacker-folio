import { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

const Window = ({ 
  id, 
  title, 
  children, 
  isActive, 
  onClose, 
  onFocus, 
  zIndex,
  initialPosition = { x: 200, y: 100 },
  initialSize = { width: 800, height: 600 }
}: WindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousState, setPreviousState] = useState({ position, size });

  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: Math.max(0, e.clientY - dragOffset.y)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-titlebar')) {
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        setIsDragging(true);
        onFocus();
      }
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(previousState.position);
      setSize(previousState.size);
      setIsMaximized(false);
    } else {
      setPreviousState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 48 }); // Account for taskbar
      setIsMaximized(true);
    }
  };

  if (isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className={`fixed glass-effect rounded-lg overflow-hidden ${
        isActive ? 'ring-2 ring-glass-accent' : ''
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isActive ? zIndex + 1000 : zIndex,
        minWidth: 400,
        minHeight: 300,
        maxWidth: '95vw',
        maxHeight: '95vh'
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="window-titlebar h-8 flex items-center justify-between px-3 cursor-move select-none"
        style={{
          background: isActive 
            ? 'linear-gradient(to bottom, hsl(var(--glass-accent)), hsl(var(--glass-primary)))' 
            : 'linear-gradient(to bottom, hsl(var(--muted)), hsl(var(--muted-foreground)))'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary-foreground rounded-sm opacity-80"></div>
          <span className="text-sm font-medium text-primary-foreground truncate">
            {title}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={handleMinimize}
            className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded text-primary-foreground"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded text-primary-foreground"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center hover:bg-red-500 rounded text-primary-foreground"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div 
        className="bg-window-bg text-window-title overflow-auto" 
        style={{ height: 'calc(100% - 2rem)' }}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;