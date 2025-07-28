
import { useState, useEffect } from 'react';
import { Volume2, Monitor, Wifi, Battery, Speaker, AlertTriangle, Shield, Eye } from 'lucide-react';

interface VistaEasterEggsProps {
  showEasterEgg: boolean;
}

const VistaEasterEggs = ({ showEasterEgg }: VistaEasterEggsProps) => {
  const [showBSOD, setShowBSOD] = useState(false);
  const [showKaliSound, setShowKaliSound] = useState(false);
  const [showDevToolsWarning, setShowDevToolsWarning] = useState(false);
  const [hackingMessage, setHackingMessage] = useState({ show: false, message: '' });

  useEffect(() => {
    if (showEasterEgg) {
      // Random Kali Linux easter eggs
      const easterEggs = [
        () => {
          // Fake terminal hack screen
          setShowBSOD(true);
          setTimeout(() => setShowBSOD(false), 4000);
        },
        () => {
          // Kali Linux notification
          setShowKaliSound(true);
          setTimeout(() => setShowKaliSound(false), 3000);
        },
        () => {
          // Hacking warning message
          setHackingMessage({
            show: true,
            message: "⚠️ ALERT: Unauthorized access attempt detected! Just kidding, you found an easter egg! 🐉"
          });
          setTimeout(() => setHackingMessage({ show: false, message: '' }), 5000);
        },
        () => {
          // Dev tools warning
          setShowDevToolsWarning(true);
          setTimeout(() => setShowDevToolsWarning(false), 4000);
        }
      ];

      const randomEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)];
      randomEgg();
    }
  }, [showEasterEgg]);

  return (
    <>
      {/* Fake Terminal Hack Screen */}
      {showBSOD && (
        <div className="fixed inset-0 bg-black text-green-400 z-[9999] flex flex-col justify-center items-center font-mono overflow-hidden">
          <div className="text-center space-y-2 p-8 max-w-4xl">
            <div className="text-green-500 text-2xl mb-4">╔══════════════════════════════════════════════════════════════════════════════════════╗</div>
            <div className="text-green-500 text-2xl mb-4">║                                 KALI LINUX - HACKING MODE                           ║</div>
            <div className="text-green-500 text-2xl mb-4">╚══════════════════════════════════════════════════════════════════════════════════════╝</div>
            <div className="text-left text-sm space-y-1">
              <div className="text-green-400">root@kali:~# nmap -sS -O target_system</div>
              <div className="text-green-300">Starting Nmap 7.91 ( https://nmap.org )</div>
              <div className="text-green-300">Nmap scan report for target_system (192.168.1.100)</div>
              <div className="text-green-300">Host is up (0.00050s latency).</div>
              <div className="text-green-300">PORT     STATE SERVICE</div>
              <div className="text-green-300">22/tcp   open  ssh</div>
              <div className="text-green-300">80/tcp   open  http</div>
              <div className="text-green-300">443/tcp  open  https</div>
              <div className="text-green-400">root@kali:~# </div>
            </div>
            <div className="text-red-400 text-xs mt-8 animate-pulse">
              [EASTER EGG] This is just for fun - no actual hacking here! 😄
            </div>
          </div>
        </div>
      )}

      {/* Kali Linux Notification */}
      {showKaliSound && (
        <div className="fixed bottom-20 right-4 z-50 bg-gray-900 border border-green-500 rounded-lg p-4 max-w-sm">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-green-400" />
            <div>
              <div className="font-semibold text-sm text-green-400">Kali Linux</div>
              <div className="text-xs text-green-300">
                System ready for penetration testing 🐉
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hacking Warning Message */}
      {hackingMessage.show && (
        <div className="fixed bottom-32 right-8 z-50 max-w-xs">
          <div className="bg-gray-900 border border-red-500 rounded-lg p-4 relative">
            <div className="text-sm text-red-400">{hackingMessage.message}</div>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-gray-900 border-b border-r border-red-500 transform rotate-45"></div>
          </div>
          <div className="mt-2 text-right">
            <div className="inline-block text-4xl animate-bounce">🐉</div>
          </div>
        </div>
      )}

      {/* Dev Tools Warning */}
      {showDevToolsWarning && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-900 border border-red-500 rounded-lg p-6 max-w-md">
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="w-8 h-8 text-red-400" />
            <div>
              <div className="font-semibold text-lg text-red-400">Access Denied</div>
              <div className="text-sm text-red-300">Developer Tools Detected</div>
            </div>
          </div>
          <div className="text-sm text-green-300 mb-4">
            Nice try! But just like Samy Kamkar would say: "The source is protected by the spirit of hacking ethics!" 😉
          </div>
          <div className="text-xs text-gray-400">
            This is just an easter egg - feel free to explore the code if you want!
          </div>
        </div>
      )}

      {/* Kali Linux Gadgets */}
      {showEasterEgg && (
        <div className="fixed top-4 right-4 z-40 space-y-2">
          <div className="bg-gray-900 border border-green-500 rounded p-2 text-xs">
            <div className="flex items-center space-x-2">
              <Monitor className="w-4 h-4 text-green-400" />
              <span className="text-green-300">Kali Linux 2024.1</span>
            </div>
          </div>
          <div className="bg-gray-900 border border-green-500 rounded p-2 text-xs">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-green-300">PenTest Mode: ON</span>
            </div>
          </div>
          <div className="bg-gray-900 border border-green-500 rounded p-2 text-xs">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-green-400" />
              <span className="text-green-300">Root Access</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VistaEasterEggs;
