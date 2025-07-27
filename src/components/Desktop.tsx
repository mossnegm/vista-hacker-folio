import { useState, useEffect } from 'react';
import { Folder, FileText, Code, Monitor, User, Github, Youtube, Newspaper, Award, Briefcase, GraduationCap, Mail, Phone, MapPin, Calendar, Coffee, Zap } from 'lucide-react';
import Taskbar from './Taskbar';
import Window from './Window';
import VistaEasterEggs from './VistaEasterEggs';

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
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Easter egg trigger - Konami code or specific key combination
  useEffect(() => {
    let konamiSequence = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    const handleKeyPress = (e: KeyboardEvent) => {
      konamiSequence.push(e.code);
      if (konamiSequence.length > konamiCode.length) {
        konamiSequence = konamiSequence.slice(-konamiCode.length);
      }
      
      if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const desktopIcons: DesktopIcon[] = [
    {
      id: 'about',
      name: 'About Me',
      icon: <User className="w-12 h-12 text-blue-400" />,
      type: 'file',
      position: { x: 50, y: 50 }
    },
    {
      id: 'projects',
      name: 'Security Projects',
      icon: <Folder className="w-12 h-12 text-yellow-400" />,
      type: 'folder',
      position: { x: 50, y: 150 }
    },
    {
      id: 'experience',
      name: 'Work Experience',
      icon: <Briefcase className="w-12 h-12 text-green-400" />,
      type: 'folder',
      position: { x: 50, y: 250 }
    },
    {
      id: 'education',
      name: 'Education',
      icon: <GraduationCap className="w-12 h-12 text-purple-400" />,
      type: 'folder',
      position: { x: 50, y: 350 }
    },
    {
      id: 'skills',
      name: 'Skills & Tools',
      icon: <Code className="w-12 h-12 text-cyan-400" />,
      type: 'folder',
      position: { x: 150, y: 50 }
    },
    {
      id: 'achievements',
      name: 'Awards & Certs',
      icon: <Award className="w-12 h-12 text-orange-400" />,
      type: 'folder',
      position: { x: 150, y: 150 }
    },
    {
      id: 'contact',
      name: 'Contact Info',
      icon: <Mail className="w-12 h-12 text-red-400" />,
      type: 'file',
      position: { x: 150, y: 250 }
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <Github className="w-12 h-12 text-gray-300" />,
      type: 'app',
      position: { x: 150, y: 350 }
    },
    // Easter egg: Recycle Bin
    {
      id: 'recycle',
      name: 'Recycle Bin',
      icon: <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center text-xs">🗑️</div>,
      type: 'app',
      position: { x: window.innerWidth - 120, y: window.innerHeight - 200 }
    }
  ];

  const handleIconDoubleClick = (iconId: string) => {
    // Special handling for external links
    if (iconId === 'github') {
      window.open('https://github.com/mossnegm', '_blank');
      return;
    }
    
    // Easter egg for recycle bin
    if (iconId === 'recycle') {
      setShowEasterEgg(true);
      return;
    }

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
      case 'about':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">About Mostafa Negm</h2>
            <div className="window-chrome p-6">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-16 h-16 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-window-title">Cybersecurity Analyst</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong>A Dynamic Cybersecurity Specialist</strong> with <strong>over five years</strong> of experience in penetration testing, 
                      network security, and incident response. Proven track record in enhancing security measures and reducing vulnerabilities.
                    </p>
                    <p>
                      Passionate about protecting digital assets and improving cybersecurity maturity for organizations by implementing 
                      robust solutions and proactive security strategies.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Dallas, TX</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>mostafaneegm@gmail.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>+1 (469) 988-0328</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Github className="w-4 h-4 text-primary" />
                        <span>@mossnegm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold text-lg mb-4 text-window-title">Personal Interests</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: '📚', title: 'Reading', info: 'Exploring books across various genres' },
                    { icon: '🍳', title: 'Cooking', info: 'Experimenting with new recipes' },
                    { icon: '✈️', title: 'Travelling', info: 'Discovering new cultures' },
                    { icon: '🪁', title: 'Kite Surfing', info: 'Riding the waves with wind power' }
                  ].map((interest, index) => (
                    <div key={index} className="text-center p-3 bg-secondary/20 rounded">
                      <div className="text-2xl mb-1">{interest.icon}</div>
                      <div className="font-semibold text-sm">{interest.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{interest.info}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">Security Projects & Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: 'Key Logger',
                  description: 'Developed a key logger for security analysis and monitoring user activity on test systems.',
                  tech: 'Security, Monitoring, Ethical Hacking',
                  icon: '👁️'
                },
                {
                  name: 'IP Subnetting Tool',
                  description: 'Created a subnetting tool that simplifies IP calculations, providing detailed subnets, network ranges, and broadcast addresses.',
                  tech: 'Networking, IP Subnetting, Automation',
                  icon: '🌐'
                },
                {
                  name: 'Virtualized Security Lab',
                  description: 'Configured a lab using VirtualBox, pfSense, and Active Directory to simulate penetration testing.',
                  tech: 'Virtualization, Penetration Testing, Networking',
                  icon: '🖥️'
                },
                {
                  name: 'MapMyNet',
                  description: 'A network reconnaissance tool that uses Nmap to scan and provide graphical representation of open ports.',
                  tech: 'Nmap, Networking, Visualization',
                  icon: '🗺️'
                }
              ].map((project, index) => (
                <div key={index} className="window-chrome p-4 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{project.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-primary mb-2">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="text-xs text-muted-foreground">
                        <div>Tech: {project.tech}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'experience':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">Work Experience</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Information Technology Security Specialist',
                  company: 'OculusIT (University of Dallas)',
                  location: 'Irving, TX',
                  period: 'July 2025 - Present',
                  description: 'Maintain high-performance endpoint protection using Azure AD, Intune, and Sophos tools. Monitor and apply system security updates using SCCM, contributing to a 40% patch compliance increase.',
                  tags: ['Azure AD', 'Intune', 'Sophos', 'SCCM', 'PKI', 'MFA']
                },
                {
                  title: 'IT Support Engineer',
                  company: 'University of Dallas',
                  location: 'Irving, TX',
                  period: 'January 2023 - July 2025',
                  description: 'Managed IT systems and optimized uptime using SolarWinds and Route53. Deployed SCCM for automated patch management, ensuring system compliance.',
                  tags: ['SolarWinds', 'Route53', 'SCCM', 'Entrust PKI', 'Azure Entra-ID']
                },
                {
                  title: 'Cloud Security Specialist',
                  company: 'Standarduser Cybersecurity',
                  location: 'Denton, TX',
                  period: 'May 2022 - March 2023',
                  description: 'Designed and managed secure Azure environments using NSGs, ASGs, and Azure Firewall. Enhanced cloud IAM policies with RBAC and PIM.',
                  tags: ['Azure Firewall', 'RBAC', 'PIM', 'Azure Sentinel', 'Splunk']
                },
                {
                  title: 'Cybersecurity Analyst',
                  company: 'Standarduser Cybersecurity',
                  location: 'Denton, TX',
                  period: 'July 2021 - May 2022',
                  description: 'Monitored and analyzed SIEM events using Splunk and QRadar. Conducted vulnerability assessments with Tenable and Nessus.',
                  tags: ['Splunk', 'QRadar', 'Nessus', 'Tenable', 'MITRE ATT&CK', 'Python']
                }
              ].map((job, index) => (
                <div key={index} className="window-chrome p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-primary">{job.title}</h3>
                      <h4 className="text-md text-window-title">{job.company}</h4>
                      <p className="text-sm text-muted-foreground">{job.location}</p>
                    </div>
                    <span className="text-sm text-muted-foreground bg-secondary/20 px-2 py-1 rounded">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {job.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'education':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">Educational Background</h2>
            <div className="space-y-6">
              <div className="window-chrome p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-1">Master's in Cybersecurity</h3>
                    <h4 className="text-lg text-window-title mb-2">University of Dallas</h4>
                    <p className="text-sm text-muted-foreground mb-2">September 2022 - June 2025</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Completed a comprehensive Master's program focused on advanced cybersecurity topics including:
                    </p>
                    <ul className="text-sm text-muted-foreground ml-4 space-y-1">
                      <li>• Network Security and Threat Management</li>
                      <li>• Incident Response and Digital Forensics</li>
                      <li>• Cloud Security and Compliance</li>
                      <li>• Penetration Testing and Ethical Hacking</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="window-chrome p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-1">Bachelor in Computer Science</h3>
                    <h4 className="text-lg text-window-title mb-2">London Southbank University</h4>
                    <p className="text-sm text-muted-foreground mb-2">January 2016 - December 2021</p>
                    <p className="text-sm text-muted-foreground">
                      Earned a Bachelor's degree focusing on Software Engineering, Data Analytics, and Artificial Intelligence. 
                      Gained hands-on experience through various programming projects and boot camps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'skills':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">Skills & Tools</h2>
            <div className="space-y-6">
              <div className="window-chrome p-4">
                <h3 className="font-bold text-lg text-primary mb-3">Programming Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'C++', 'Java', 'Bash', 'SQL-server'].map((skill, index) => (
                    <span key={index} className="bg-primary/20 text-primary px-3 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="window-chrome p-4">
                <h3 className="font-bold text-lg text-primary mb-3">Security Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { name: 'Burp Suite', level: 95, description: 'Web application security testing' },
                    { name: 'Metasploit', level: 90, description: 'Exploiting vulnerabilities' },
                    { name: 'Wireshark', level: 85, description: 'Packet analysis' },
                    { name: 'Nessus', level: 90, description: 'Vulnerability scanning' },
                    { name: 'Sophos', level: 85, description: 'Endpoint protection' },
                    { name: 'Global Protect VPN', level: 85, description: 'Secure remote access' }
                  ].map((tool, index) => (
                    <div key={index} className="bg-secondary/20 p-3 rounded">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm">{tool.name}</span>
                        <span className="text-xs text-muted-foreground">{tool.level}%</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2 mb-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${tool.level}%` }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="window-chrome p-4">
                <h3 className="font-bold text-lg text-primary mb-3">Cloud Platforms</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { name: 'AWS', level: 95, icon: '☁️' },
                    { name: 'Azure Entra-ID', level: 85, icon: '🔷' },
                    { name: 'MS365', level: 80, icon: '📧' }
                  ].map((platform, index) => (
                    <div key={index} className="bg-secondary/20 p-3 rounded text-center">
                      <div className="text-2xl mb-1">{platform.icon}</div>
                      <div className="font-semibold text-sm">{platform.name}</div>
                      <div className="text-xs text-muted-foreground">{platform.level}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'achievements':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">Awards & Certifications</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-primary mb-4">Awards</h3>
                <div className="window-chrome p-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">🏆</div>
                    <div>
                      <h4 className="font-bold text-lg text-primary">1st Place - Inspira LLM Hacking Competition</h4>
                      <p className="text-sm text-muted-foreground">DFW University • 2023</p>
                      <p className="text-sm mt-2">
                        Ranked 1st in the 2023 Inspira LLM Hacking Competition by discovering 4 vulnerabilities from the OWASP Top 10 for LLMs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-primary mb-4">Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'CompTIA Security+', year: '2024', icon: '🛡️', color: 'bg-blue-500' },
                    { name: 'AWS Solutions Architect Associate', year: '2024', icon: '☁️', color: 'bg-orange-500' },
                    { name: 'Certified Bug Bounty Hunter', year: '2025', icon: '🐛', color: 'bg-red-500' },
                    { name: 'Hack The Box Certified', year: '2024', icon: '📦', color: 'bg-green-500' },
                    { name: 'EC-Council OWASP Top 10', year: '2023', icon: '🔒', color: 'bg-purple-500' }
                  ].map((cert, index) => (
                    <div key={index} className="window-chrome p-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${cert.color} rounded-full flex items-center justify-center text-white text-lg`}>
                          {cert.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{cert.name}</h4>
                          <p className="text-xs text-muted-foreground">Earned: {cert.year}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'contact':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">Contact Information</h2>
            <div className="window-chrome p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-primary mb-2">Let's Connect!</h3>
                  <p className="text-muted-foreground">
                    Open for full-time remote, hybrid, or on-site cybersecurity roles
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-secondary/20 rounded">
                    <Phone className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <a href="tel:4699880328" className="text-sm text-muted-foreground hover:text-primary">
                        +1 (469) 988-0328
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-secondary/20 rounded">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <a href="mailto:mostafaneegm@gmail.com" className="text-sm text-muted-foreground hover:text-primary">
                        mostafaneegm@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-secondary/20 rounded">
                    <Github className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold">GitHub</div>
                      <a href="https://github.com/mossnegm" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">
                        @mossnegm
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-secondary/20 rounded">
                    <div className="w-6 h-6 text-primary flex items-center justify-center">💼</div>
                    <div>
                      <div className="font-semibold">LinkedIn</div>
                      <a href="https://linkedin.com/in/mossnegm" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">
                        mossnegm
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-4 bg-primary/10 rounded">
                  <p className="text-sm font-semibold text-primary">💡 Fun Fact</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try pressing ↑↑↓↓←→←→BA for a Windows Vista surprise! 🎮
                  </p>
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
      
      {/* Easter Eggs */}
      <VistaEasterEggs showEasterEgg={showEasterEgg} />
    </div>
  );
};

export default Desktop;