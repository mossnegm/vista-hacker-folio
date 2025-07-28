
import { useState, useEffect } from 'react';
import { Folder, FileText, Code, Monitor, User, Github, Youtube, Newspaper, Award, Briefcase, GraduationCap, Mail, Phone, MapPin, Calendar, Coffee, Zap, X } from 'lucide-react';
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
  removable: boolean;
}

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [desktopIcons, setDesktopIcons] = useState<DesktopIcon[]>([]);

  // Initialize desktop icons
  useEffect(() => {
    const initialIcons: DesktopIcon[] = [
      {
        id: 'about',
        name: 'About Me',
        icon: <User className="w-12 h-12 text-green-400" />,
        type: 'file',
        position: { x: 50, y: 50 },
        removable: true
      },
      {
        id: 'projects',
        name: 'Security Projects',
        icon: <Folder className="w-12 h-12 text-green-400" />,
        type: 'folder',
        position: { x: 50, y: 150 },
        removable: true
      },
      {
        id: 'experience',
        name: 'Work Experience',
        icon: <Briefcase className="w-12 h-12 text-green-400" />,
        type: 'folder',
        position: { x: 50, y: 250 },
        removable: true
      },
      {
        id: 'education',
        name: 'Education',
        icon: <GraduationCap className="w-12 h-12 text-green-400" />,
        type: 'folder',
        position: { x: 50, y: 350 },
        removable: true
      },
      {
        id: 'skills',
        name: 'Skills & Tools',
        icon: <Code className="w-12 h-12 text-green-400" />,
        type: 'folder',
        position: { x: 150, y: 50 },
        removable: true
      },
      {
        id: 'achievements',
        name: 'Awards & Certs',
        icon: <Award className="w-12 h-12 text-green-400" />,
        type: 'folder',
        position: { x: 150, y: 150 },
        removable: true
      },
      {
        id: 'updates',
        name: 'Recent Updates',
        icon: <Newspaper className="w-12 h-12 text-green-400" />,
        type: 'folder',
        position: { x: 150, y: 250 },
        removable: true
      },
      {
        id: 'contact',
        name: 'Contact Info',
        icon: <Mail className="w-12 h-12 text-green-400" />,
        type: 'file',
        position: { x: 150, y: 350 },
        removable: true
      },
      {
        id: 'github',
        name: 'GitHub',
        icon: <Github className="w-12 h-12 text-green-400" />,
        type: 'app',
        position: { x: 250, y: 50 },
        removable: true
      },
      {
        id: 'recycle',
        name: 'Recycle Bin',
        icon: <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center text-xs">🗑️</div>,
        type: 'app',
        position: { x: window.innerWidth - 120, y: window.innerHeight - 200 },
        removable: false
      }
    ];
    setDesktopIcons(initialIcons);
  }, []);

  // Easter egg trigger - Konami code
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

  // Dev tools protection
  useEffect(() => {
    const detectDevTools = () => {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 5000);
    };

    // Detect F12
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'C') || (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        detectDevTools();
      }
    };

    // Detect right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      detectDevTools();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleIconDoubleClick = (iconId: string) => {
    if (iconId === 'github') {
      window.open('https://github.com/mossnegm', '_blank');
      return;
    }
    
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

  const handleStartMenuClick = () => {
    setShowStartMenu(!showStartMenu);
  };

  const handleStartMenuItemClick = (iconId: string) => {
    setShowStartMenu(false);
    handleIconDoubleClick(iconId);
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
                <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src="/lovable-uploads/92420ed8-5838-4aaa-823b-e73fb5582f4e.png" 
                    alt="Mostafa Negm"
                    className="w-full h-full object-cover"
                  />
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
                  tags: ['Azure AD', 'Intune', 'Sophos', 'SCCM', 'PKI', 'MFA'],
                  logo: '/lovable-uploads/cb954233-ae9d-402e-8854-5c2fa07af5bd.png'
                },
                {
                  title: 'IT Support Engineer',
                  company: 'University of Dallas',
                  location: 'Irving, TX',
                  period: 'January 2023 - July 2025',
                  description: 'Managed IT systems and optimized uptime using SolarWinds and Route53. Deployed SCCM for automated patch management, ensuring system compliance.',
                  tags: ['SolarWinds', 'Route53', 'SCCM', 'Entrust PKI', 'Azure Entra-ID'],
                  logo: '/lovable-uploads/5ab24774-41ac-4950-8ec1-4a8f0c7ce514.png'
                },
                {
                  title: 'Cloud Security Specialist',
                  company: 'Standarduser Cybersecurity',
                  location: 'Denton, TX',
                  period: 'May 2022 - March 2023',
                  description: 'Designed and managed secure Azure environments using NSGs, ASGs, and Azure Firewall. Enhanced cloud IAM policies with RBAC and PIM.',
                  tags: ['Azure Firewall', 'RBAC', 'PIM', 'Azure Sentinel', 'Splunk'],
                  logo: '🔐'
                },
                {
                  title: 'Cybersecurity Analyst',
                  company: 'Standarduser Cybersecurity',
                  location: 'Denton, TX',
                  period: 'July 2021 - May 2022',
                  description: 'Monitored and analyzed SIEM events using Splunk and QRadar. Conducted vulnerability assessments with Tenable and Nessus.',
                  tags: ['Splunk', 'QRadar', 'Nessus', 'Tenable', 'MITRE ATT&CK', 'Python'],
                  logo: '🔐'
                }
              ].map((job, index) => (
                <div key={index} className="window-chrome p-4">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="w-16 h-16 flex items-center justify-center bg-secondary/20 rounded">
                      {typeof job.logo === 'string' && job.logo.startsWith('/') ? (
                        <img src={job.logo} alt={job.company} className="w-12 h-12 object-contain" />
                      ) : (
                        <div className="text-2xl">{job.logo}</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-primary">{job.title}</h3>
                          <h4 className="text-md text-window-title">{job.company}</h4>
                          <p className="text-sm text-muted-foreground">{job.location}</p>
                        </div>
                        <span className="text-sm text-muted-foreground bg-secondary/20 px-2 py-1 rounded">
                          {job.period}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {job.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="/lovable-uploads/5ab24774-41ac-4950-8ec1-4a8f0c7ce514.png" 
                      alt="University of Dallas"
                      className="w-full h-full object-contain"
                    />
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

      case 'updates':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-window-title">Recent Updates</h2>
            <div className="space-y-6">
              {[
                {
                  date: '01/01/2025',
                  title: 'Launched my personal website!',
                  description: 'Created a personal website to showcase my projects, share my journey in programming, and provide resources for fellow developers.'
                },
                {
                  date: '11/01/2024',
                  title: 'Preparing for OSCP Certification',
                  description: 'Dedicated time to enhancing penetration testing skills and studying advanced offensive security techniques.'
                },
                {
                  date: '12/01/2024',
                  title: 'AWS Certified Solutions Architect',
                  description: 'Earned the AWS Certified Solutions Architect credential demonstrating expertise in AWS services and cloud security.'
                },
                {
                  date: '12/01/2024',
                  title: 'Cyber Operations Graduate',
                  description: 'Completed a graduate program in Cyber Operations at The University of Dallas, gaining advanced knowledge in cybersecurity practices.'
                },
                {
                  date: '10/01/2024',
                  title: 'Sigma Iota Epsilon Membership',
                  description: 'Became a member of Sigma Iota Epsilon\'s Sigma Zeta Chapter, developing skills in leadership, team building, and business management.'
                },
                {
                  date: '04/01/2024',
                  title: 'CompTIA Security+ ce Certification',
                  description: 'Achieved the CompTIA Security+ ce Certification, covering network security, digital forensics, and ISO standards.'
                },
                {
                  date: '04/01/2024',
                  title: 'SOC Member',
                  description: 'Joined LetsDefend as a SOC member, focusing on threat monitoring and incident response.'
                },
                {
                  date: '01/01/2024',
                  title: 'ISC2 Candidate',
                  description: 'Enrolled as an ISC2 Candidate, working toward advanced certifications in information security.'
                },
                {
                  date: '05/01/2023',
                  title: 'Studied OWASP Top 10',
                  description: 'Completed a course on OWASP Top 10 vulnerabilities to strengthen application security expertise.'
                },
                {
                  date: '04/01/2023',
                  title: 'Python for Cybersecurity',
                  description: 'Completed Infosec\'s Python for Cybersecurity course, learning how to apply Python in penetration testing and automation.'
                }
              ].map((update, index) => (
                <div key={index} className="window-chrome p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-primary">{update.title}</h3>
                        <span className="text-sm text-muted-foreground bg-secondary/20 px-2 py-1 rounded">
                          {update.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{update.description}</p>
                    </div>
                  </div>
                </div>
              ))}
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
                    Try the Konami code (↑↑↓↓←→←→BA) for a surprise! 🎮
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
    <div 
      className="desktop-wallpaper relative"
      style={{
        backgroundImage: `url('/lovable-uploads/d6c3dbce-0df2-45ac-a026-b0181a4e3a3b.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Desktop Icons */}
      <div className="absolute top-6 left-6 flex flex-col gap-4 z-10">
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="macos-icon group relative w-20 flex flex-col items-center cursor-pointer transform transition-all duration-200 hover:scale-105 hover:brightness-110"
            onDoubleClick={() => handleIconDoubleClick(icon.id)}
          >
            <div className="w-16 h-16 mb-1 flex items-center justify-center relative">
              {/* Icon Base - Skeuomorphic Style */}
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-600 via-slate-700 to-slate-900 shadow-2xl border border-slate-500/30 relative overflow-hidden">
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30 rounded-lg"></div>
                {/* Inner shadow for depth */}
                <div className="absolute inset-0.5 bg-gradient-to-br from-slate-500 via-slate-600 to-slate-800 rounded-lg shadow-inner"></div>
                {/* Icon content */}
                <div className="absolute inset-0 flex items-center justify-center text-primary text-2xl z-10">
                  {icon.icon}
                </div>
                {/* Reflection highlight */}
                <div className="absolute top-1 left-1 right-1 h-4 bg-gradient-to-b from-white/30 to-transparent rounded-t-lg"></div>
              </div>
            </div>
            <span className="text-xs text-white text-center font-medium drop-shadow-lg max-w-20 leading-tight">
              {icon.name}
            </span>
          </div>
        ))}
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div className="fixed bottom-12 left-2 w-80 max-h-96 bg-gray-900 border border-green-500 rounded-lg overflow-hidden z-40">
          <div className="p-4 bg-gray-800 border-b border-green-500">
            <h3 className="text-green-400 font-bold">Start Menu</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {desktopIcons.filter(icon => icon.id !== 'recycle').map((icon) => (
              <div
                key={icon.id}
                className="flex items-center space-x-3 p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
                onClick={() => handleStartMenuItemClick(icon.id)}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {icon.icon}
                </div>
                <span className="text-green-300 text-sm">{icon.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Click overlay to close start menu */}
      {showStartMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowStartMenu(false)}
        />
      )}

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
      <Taskbar 
        openWindows={openWindows} 
        activeWindow={activeWindow} 
        onWindowClick={setActiveWindow}
        onStartMenuClick={handleStartMenuClick}
      />
      
      {/* Easter Eggs */}
      <VistaEasterEggs showEasterEgg={showEasterEgg} />
    </div>
  );
};

export default Desktop;
