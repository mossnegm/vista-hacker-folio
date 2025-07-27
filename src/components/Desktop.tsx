import { useState } from 'react';
import { Folder, FileText, Code, Monitor, User, Github, Youtube, Newspaper } from 'lucide-react';
import Taskbar from './Taskbar';
import Window from './Window';

interface DesktopIcon {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: 'folder' | 'file' | 'app';
  content?: React.ReactNode;
  position: { x: number; y: number };
}

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const desktopIcons: DesktopIcon[] = [
    {
      id: 'projects',
      name: 'Projects',
      icon: <Folder className="w-12 h-12 text-yellow-400" />,
      type: 'folder',
      position: { x: 50, y: 50 }
    },
    {
      id: 'code',
      name: 'Code & Tools',
      icon: <Code className="w-12 h-12 text-green-400" />,
      type: 'folder',
      position: { x: 50, y: 150 }
    },
    {
      id: 'talks',
      name: 'Talks & Videos',
      icon: <Youtube className="w-12 h-12 text-red-400" />,
      type: 'folder',
      position: { x: 50, y: 250 }
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: <Newspaper className="w-12 h-12 text-blue-400" />,
      type: 'folder',
      position: { x: 50, y: 350 }
    },
    {
      id: 'about',
      name: 'About Me',
      icon: <User className="w-12 h-12 text-purple-400" />,
      type: 'file',
      position: { x: 50, y: 450 }
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <Github className="w-12 h-12 text-gray-300" />,
      type: 'app',
      position: { x: 150, y: 50 }
    }
  ];

  const handleIconDoubleClick = (iconId: string) => {
    if (!openWindows.includes(iconId)) {
      setOpenWindows([...openWindows, iconId]);
    }
    setActiveWindow(iconId);
  };

  const handleCloseWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(openWindows.length > 1 ? openWindows[openWindows.length - 2] : null);
    }
  };

  const getWindowContent = (iconId: string) => {
    const icon = desktopIcons.find(icon => icon.id === iconId);
    
    switch (iconId) {
      case 'projects':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">Hacking Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: 'PoisonTap',
                  description: 'Exploits locked machines via USB HID, siphons cookies & installs backdoor',
                  date: 'November 2016',
                  tech: 'Hardware, JavaScript, USB HID'
                },
                {
                  name: 'NAT Slipstreaming',
                  description: 'Remotely access any TCP/UDP services on a victim via web page',
                  date: 'October 2020',
                  tech: 'Network Security, HTTP/2'
                },
                {
                  name: 'MagSpoof',
                  description: 'Wireless credit card skimmer / MagStripe spoofer',
                  date: 'August 2015',
                  tech: 'Arduino, Electromagnetic'
                },
                {
                  name: 'KeySweeper',
                  description: 'Stealthy Arduino-based device for harvesting keystrokes',
                  date: 'December 2014',
                  tech: 'Arduino, RF, Wireless'
                },
                {
                  name: 'QuickJack',
                  description: 'Hijack HTTP-to-HTTPS redirects for session theft',
                  date: 'September 2010',
                  tech: 'Web Security, MITM'
                }
              ].map((project, index) => (
                <div key={index} className="window-chrome p-4 hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="font-bold text-lg text-primary mb-2">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <div>Released: {project.date}</div>
                    <div>Tech: {project.tech}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'code':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">Code & Tools</h2>
            <div className="space-y-4">
              <div className="window-chrome p-4">
                <h3 className="font-bold text-lg text-primary mb-2">Open Source Projects</h3>
                <p className="text-sm">Security tools, exploits, and research code available on GitHub</p>
              </div>
              <div className="window-chrome p-4">
                <h3 className="font-bold text-lg text-primary mb-2">Vulnerability Research</h3>
                <p className="text-sm">Latest security research and proof-of-concept code</p>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">About Mostafa Negm</h2>
            <div className="window-chrome p-6">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-window-title">Security Researcher & Developer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Passionate about security research, hardware hacking, and creating innovative tools 
                    that push the boundaries of cybersecurity. I develop open-source projects that 
                    demonstrate vulnerabilities and help improve security awareness.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div><strong>Focus Areas:</strong> Hardware Security, Web Vulnerabilities, Wireless Hacking</div>
                    <div><strong>Tools:</strong> Arduino, Python, JavaScript, Hardware Design</div>
                    <div><strong>Research:</strong> Network Security, USB Exploits, RFID/NFC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-window-title">{icon?.name}</h2>
            <p className="text-muted-foreground">Content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="desktop-wallpaper relative">
      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <div
          key={icon.id}
          className="desktop-icon absolute w-20 text-center"
          style={{ left: icon.position.x, top: icon.position.y }}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
        >
          {icon.icon}
          <span className="text-xs mt-1 block truncate">{icon.name}</span>
        </div>
      ))}

      {/* Windows */}
      {openWindows.map((windowId, index) => {
        const icon = desktopIcons.find(i => i.id === windowId);
        return (
          <Window
            key={windowId}
            id={windowId}
            title={icon?.name || 'Window'}
            isActive={activeWindow === windowId}
            onClose={() => handleCloseWindow(windowId)}
            onFocus={() => setActiveWindow(windowId)}
            zIndex={index + 10}
          >
            {getWindowContent(windowId)}
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar openWindows={openWindows} activeWindow={activeWindow} onWindowClick={setActiveWindow} />
    </div>
  );
};

export default Desktop;