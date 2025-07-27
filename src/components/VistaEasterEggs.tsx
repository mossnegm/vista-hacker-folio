import { useState, useEffect } from 'react';
import { Volume2, Monitor, Wifi, Battery, Speaker, AlertTriangle } from 'lucide-react';

interface VistaEasterEggsProps {
  showEasterEgg: boolean;
}

const VistaEasterEggs = ({ showEasterEgg }: VistaEasterEggsProps) => {
  const [showBSOD, setShowBSOD] = useState(false);
  const [showVistaSound, setShowVistaSound] = useState(false);
  const [clippy, setClippy] = useState({ show: false, message: '' });

  useEffect(() => {
    if (showEasterEgg) {
      // Random Vista easter eggs
      const easterEggs = [
        () => {
          // Blue Screen of Death (fake)
          setShowBSOD(true);
          setTimeout(() => setShowBSOD(false), 3000);
        },
        () => {
          // Vista sound effect notification
          setShowVistaSound(true);
          setTimeout(() => setShowVistaSound(false), 2000);
        },
        () => {
          // Clippy-style assistant
          setClippy({
            show: true,
            message: "It looks like you're trying to hack something! Would you like help with that? 📎"
          });
          setTimeout(() => setClippy({ show: false, message: '' }), 4000);
        }
      ];

      const randomEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)];
      randomEgg();
    }
  }, [showEasterEgg]);

  return (
    <>
      {/* Fake Blue Screen of Death */}
      {showBSOD && (
        <div className="fixed inset-0 bg-blue-600 text-white z-[9999] flex flex-col justify-center items-center font-mono">
          <div className="text-center space-y-4 p-8">
            <div className="text-4xl mb-8">:(</div>
            <div className="text-xl mb-4">Your PC ran into a problem and needs to restart.</div>
            <div className="text-lg">We're just collecting some error info, and then we'll restart for you.</div>
            <div className="text-sm opacity-80 mt-8">
              STOP: 0x000000C4_DEVELOPER_PORTFOLIO_OVERFLOW
            </div>
            <div className="text-xs opacity-60 mt-4">
              (This is just an easter egg - your computer is fine! 😄)
            </div>
            <div className="mt-8">
              <div className="inline-block w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}

      {/* Vista Sound Notification */}
      {showVistaSound && (
        <div className="fixed bottom-20 right-4 z-50 glass-effect rounded-lg p-4 max-w-sm">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-8 h-8 text-primary" />
            <div>
              <div className="font-semibold text-sm">Windows Vista</div>
              <div className="text-xs text-muted-foreground">
                *plays nostalgic startup sound* 🎵
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clippy-style Assistant */}
      {clippy.show && (
        <div className="fixed bottom-32 right-8 z-50 max-w-xs">
          <div className="glass-effect rounded-lg p-4 relative">
            <div className="text-sm">{clippy.message}</div>
            <div className="absolute -bottom-2 right-4 w-4 h-4 glass-effect transform rotate-45"></div>
          </div>
          <div className="mt-2 text-right">
            <div className="inline-block text-4xl animate-bounce">📎</div>
          </div>
        </div>
      )}

      {/* Random Vista Gadgets floating around */}
      {showEasterEgg && (
        <div className="fixed top-4 right-4 z-40 space-y-2">
          <div className="glass-effect rounded p-2 text-xs">
            <div className="flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span>CPU: 2.4 GHz</span>
            </div>
          </div>
          <div className="glass-effect rounded p-2 text-xs">
            <div className="flex items-center space-x-2">
              <Battery className="w-4 h-4" />
              <span>RAM: 4GB Vista Ready!</span>
            </div>
          </div>
          <div className="glass-effect rounded p-2 text-xs">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4" />
              <span>WiFi: Connected</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VistaEasterEggs;