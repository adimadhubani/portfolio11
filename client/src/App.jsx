import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  GraduationCap,
  FileText,
  Copy,
  Check,
  Phone,
  ExternalLink,
  Briefcase,
  Code,
  Database,
  Server,
  Cpu,
  Layers,
  Award,
  Users,
  Terminal,
  GitBranch,
  Star,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { toast } from 'sonner';
import { ToasterProvider } from './components/ui/toaster';
import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
import { ThemeToggle } from './components/theme-toggle';

/**
 * ---------------------------------------------------------------------------
 * DATA — complete profile from resume
 * ---------------------------------------------------------------------------
 */
const profile = {
  name: 'Aditya Kumar',
  role: 'Full-Stack Developer & AI Engineer',
  school: 'IIIT Bhagalpur',
  batch: '2023 — 2027',
  phone: '+91 8582045005',
  email: 'aditya4.230101010@iiitbh.ac.in',
  linkedin: 'https://www.linkedin.com/in/aditya-kumar-989ba2294/',
  github: 'https://github.com/adimadhubani',
  resumeUrl: 'https://drive.google.com/file/d/1mBKbiTxE6Ie3yxCwbi9KTzKy8A6aKcVL/view',
  avatar: 'https://drive.google.com/file/d/1hgqEvhCHmruvn8KtjBau7O7JBQG_UsC6/view',
};

const coursework = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Database Management Systems',
  'Operating Systems',
  'Computer Networks',
];

const stats = [
  { label: 'DSA Problems', value: '450+' },
  { label: 'Hackathon Rank', value: '#8 / 150+' },
  { label: 'Mentored', value: '250+' },
  { label: 'Projects', value: '8+' },
];

const experience = {
  company: 'Workafy',
  role: 'Frontend Developer Intern',
  period: 'Aug 2025 — Jan 2026',
  description: [
    'Built responsive UI for 50K+ active users using React.js, TypeScript and Tailwind CSS',
    'Improved accessibility and cross-device consistency, reducing bounce rates',
    'Collaborated with cross-functional teams on scalable component-based architecture',
  ],
  tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git'],
};

const education = {
  current: {
    school: 'IIIT Bhagalpur',
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    period: '2023 — 2027',
    cgpa: '7.47/10',
    coursework: coursework,
  },
  previous: {
    school: 'R K College, Madhubani',
    degree: 'Class XII (Higher Secondary)',
    period: 'until 2023',
    score: '75%',
    board: 'BSEB',
  },
};

const stackLayers = [
  { 
    layer: 'Frontend', 
    icon: <Layers className="h-4 w-4" />,
    items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] 
  },
  { 
    layer: 'Backend', 
    icon: <Server className="h-4 w-4" />,
    items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'Auth/Authorization'] 
  },
  { 
    layer: 'Database', 
    icon: <Database className="h-4 w-4" />,
    items: ['MongoDB', 'PostgreSQL', 'Vector DB', 'Prisma', 'Mongoose'] 
  },
  { 
    layer: 'AI / ML', 
    icon: <Cpu className="h-4 w-4" />,
    items: ['OpenAI API', 'Gemini API', 'RAG', 'Vector Embeddings', 'Prompt Engineering'] 
  },
  { 
    layer: 'DevOps & Tools', 
    icon: <Terminal className="h-4 w-4" />,
    items: ['Docker', 'Git', 'Postman', 'Linux', 'Vercel', 'Render'] 
  },
];

const languages = ['C++', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS'];

const projects = [
   {
  title: 'Aeroview 360',
  description: 'Enterprise-grade construction management dashboard with 360° virtual tours, video walkthroughs, progress image galleries, and dynamic admin panel. Built with role-based access, real-time media streaming, and strict client data isolation.',
  tags: ['React.js', 'Node.js', 'PostgreSQL', 'Cloudinary', 'JWT', 'Tailwind CSS'],
  github: 'https://github.com/adimadhubani/freelance3',
  live: 'https://freelance3-theta.vercel.app/login',
  featured: true,
},
{
  title: 'Razorpay IntentGuard',
  description: 'Sub-50ms dual-layer security gateway & firewall for autonomous AI shopping agents. Neutralizes budget overruns, semantic category drift, and indirect prompt injection attacks before reaching Razorpay payment rails, featuring real-time Socket.io telemetry.',
  tags: ['React.js', 'Node.js', 'Express.js', 'Socket.io', 'Gemini 2.0 Flash', 'Groq (Llama 3.1)', 'Razorpay API', 'Tailwind CSS'],
  github: 'https://github.com/adimadhubani/razorpay_hackathon',
  live: 'https://razorpay-hackathon-eight.vercel.app/',
  featured: true,
},
  {
    title: 'Agro Hybrid',
    description: 'ML-driven platform predicting optimal crop hybrids using real-time weather, geo-location and soil data. Built with React and integrated ML models via REST APIs.',
    tags: ['React.js', 'Python', 'REST APIs', 'ML Models', 'Tailwind CSS'],
    github: 'https://github.com/adimadhubani/Team-losers',
    live: 'https://team-losers.vercel.app',
    featured: true,
  },
  {
    title: 'Intelligent Knowledge Assistant',
    description: 'RAG-based Q&A system for PDF/document ingestion using OpenAI API and vector embeddings for semantic search with reduced hallucination.',
    tags: ['OpenAI API', 'Node.js', 'Vector DB', 'RAG', 'Embeddings'],
    github: 'https://github.com/adimadhubani/college_chatbot',
    live: 'https://college-chatbot-kappa.vercel.app',
    featured: true,
  },
  {
    title: 'Chatty — Real-Time Chat',
    description: 'Full-featured chat with group/private messaging, file sharing, secure auth and presence indicators over low-latency WebSocket.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/adimadhubani/chatgpt_clone',
    live: 'https://chat-app-tfbo.onrender.com/login',
    featured: true,
  },
  {
    title: 'Task Management App',
    description: 'Full-stack task tracker with status tracking, priority management, deadlines and dashboard analytics.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    github: 'https://github.com/adimadhubani/task_management',
    live: 'https://task-management-gamma-pink.vercel.app/dashboard',
    featured: false,
  },
  {
    title: 'E-Commerce Platform',
    description: 'Complete online store with product catalog, shopping cart and Stripe payment integration.',
    tags: ['MERN', 'Redux', 'Stripe API', 'JWT Auth'],
    github: 'https://github.com/adimadhubani/complete_cart11',
    live: 'https://complete-cart11-1.onrender.com',
    featured: false,
  },
  {
    title: 'Crypto Trading Chart',
    description: 'Live cryptocurrency price tracker with interactive candlestick charts and WebSocket updates.',
    tags: ['React', 'Node.js', 'WebSocket', 'TradingView API'],
    github: 'https://github.com/adimadhubani/trading_chart',
    live: 'https://trading-chart-kappa.vercel.app',
    featured: false,
  },
  {
    title: 'AI Interview Generator',
    description: 'Generates interview questions with AI and evaluates responses using NLP.',
    tags: ['React', 'Node.js', 'OpenAI API', 'Tailwind CSS'],
    github: 'https://github.com/adimadhubani/ai_interview',
    live: 'https://ai-interview-eight-hazel.vercel.app/sign-in',
    featured: false,
  },
  {
    title: 'Online Clipboard',
    description: 'Cloud-based text sharing platform with expiration timers and syntax highlighting.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/adimadhubani/clipboard',
    live: 'https://clipboard-ui.onrender.com',
    featured: false,
  },
];

const achievements = [
  { icon: <Trophy className="h-4 w-4" />, text: 'Top 10 Finalist — Smart India Internal Hackathon' },
  { icon: <Award className="h-4 w-4" />, text: 'Rank 8 / 150+ — Bit By Bit Hackathon' },
  { icon: <Star className="h-4 w-4" />, text: 'Qualified Round 3 — Tata Imagination Challenge' },
  { icon: <Code className="h-4 w-4" />, text: '450+ DSA problems — LeetCode, CodeChef, Codeforces' },
  { icon: <Badge className="h-4 w-4" />, text: 'ServiceNow Certified Application Developer (CAD)' },
  { icon: <Award className="h-4 w-4" />, text: 'ServiceNow Certified System Administrator (CSA)' },
  { icon: <Users className="h-4 w-4" />, text: 'Mentored 250+ juniors through workshops & bootcamps' },
  { icon: <GitBranch className="h-4 w-4" />, text: 'Club Lead & event organizer at IIIT Bhagalpur' },
];

/**
 * ---------------------------------------------------------------------------
 * COMPONENT
 * ---------------------------------------------------------------------------
 */
const App = () => {
  const [copied, setCopied] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [activeSection, setActiveSection] = useState('hero');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success('Email copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy email');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsSubmitting(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast.success('Opening mail client…');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ToasterProvider />

      {/* --- Header --- */}
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="font-mono text-sm tracking-tight hover:text-primary transition-colors flex items-center gap-2"
          >
            <span className="text-primary">$</span>
            {profile.name.toLowerCase().replace(' ', '.')}
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm px-3 py-1.5 rounded-md transition-all ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs flex items-center gap-1.5 border border-foreground rounded-full px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors"
            >
              <FileText className="h-3.5 w-3.5" /> Resume
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* --- Hero --- */}
      <section id="hero" className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="secondary" className="font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
              Open for internships &amp; freelance
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Final Year
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                {profile.name}
                <span className="block text-primary mt-1">{profile.role}</span>
              </h1>

              <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Final-year CSE student at <span className="text-foreground font-medium">{profile.school}</span>{' '}
                building production-grade web applications with the MERN stack and AI integrations.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {coursework.slice(0, 4).map((course) => (
                  <span key={course} className="text-xs px-2 py-1 bg-secondary rounded-md">
                    {course}
                  </span>
                ))}
                <span className="text-xs px-2 py-1 bg-secondary rounded-md text-muted-foreground">
                  +{coursework.length - 4} more
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => scrollTo('projects')} className="gap-2">
                  View Projects <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => scrollTo('contact')}>
                  Get in Touch
                </Button>
              </div>
            </div>

            <div className="shrink-0">
              <Avatar className="h-32 w-32 ring-4 ring-primary/20">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border rounded-lg overflow-hidden"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background px-5 py-4">
              <div className="font-mono text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* --- About --- */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20 border-t">
        <div className="grid md:grid-cols-[180px_1fr] gap-12">
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">About</div>
            <div className="mt-2 text-xs text-muted-foreground font-mono">/whoami</div>
          </div>
          <div className="space-y-4 max-w-2xl">
            <p className="leading-relaxed text-lg">
              I'm a final-year Computer Science student at <span className="font-medium">{profile.school}</span>, 
              deeply invested in full-stack development and AI-integrated systems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My work spans the MERN stack, but I've recently been drawn to problems at the intersection 
              of backend architecture and applied AI — building retrieval pipelines, vector search, and 
              LLM-backed features that actually work in production.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond coding, I solve 450+ DSA problems across LeetCode, CodeChef and Codeforces, mentor 
              juniors through web development bootcamps, and serve as a club lead organizing technical 
              events at {profile.school}.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <button onClick={copyEmail} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" /> Email
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Experience --- */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-20 border-t">
        <div className="grid md:grid-cols-[180px_1fr] gap-12">
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Experience</div>
            <div className="mt-2 text-xs text-muted-foreground font-mono">/career</div>
          </div>
          <div>
            {/* Work Experience */}
            <div className="border-l-2 border-primary pl-6 pb-8">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-semibold text-lg">{experience.company}</h3>
                <span className="font-mono text-xs text-muted-foreground">{experience.period}</span>
                <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                  {experience.role}
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
                {experience.description.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {experience.tech.map((tech) => (
                  <span key={tech} className="font-mono text-[10px] px-2 py-0.5 bg-secondary rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="border-l-2 border-border pl-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h4 className="font-semibold">{education.current.school}</h4>
                <span className="font-mono text-xs text-muted-foreground">{education.current.period}</span>
                <span className="font-mono text-xs bg-secondary px-2 py-0.5 rounded">
                  CGPA: {education.current.cgpa}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{education.current.degree}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {education.current.coursework.map((course) => (
                  <span key={course} className="text-xs px-2 py-0.5 bg-secondary/50 rounded">
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-l-2 border-border pl-6 mt-4">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h4 className="font-medium">{education.previous.school}</h4>
                <span className="font-mono text-xs text-muted-foreground">{education.previous.period}</span>
                <span className="font-mono text-xs bg-secondary px-2 py-0.5 rounded">
                  {education.previous.score} — {education.previous.board}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{education.previous.degree}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Skills --- */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20 border-t">
        <div className="grid md:grid-cols-[180px_1fr] gap-12">
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Skills</div>
            <div className="mt-2 text-xs text-muted-foreground font-mono">/tech-stack</div>
          </div>
          <div>
            <div className="grid sm:grid-cols-2 gap-4">
              {stackLayers.map((layer) => (
                <div key={layer.layer} className="border rounded-lg p-4 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary">{layer.icon}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {layer.layer}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.items.map((item) => (
                      <span key={item} className="text-sm px-2 py-0.5 bg-secondary rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 p-4 border rounded-lg">
              <span className="font-mono text-xs text-muted-foreground mr-1">Languages:</span>
              {languages.map((lang) => (
                <span key={lang} className="font-mono text-xs px-3 py-1 border rounded-full">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Projects --- */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t">
        <div className="grid md:grid-cols-[180px_1fr] gap-12">
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Projects</div>
            <div className="mt-2 text-xs text-muted-foreground font-mono">/portfolio</div>
          </div>
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="border rounded-lg p-5 hover:shadow-lg transition-all hover:border-primary/30 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{project.title}</h3>
                    <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded shrink-0">
                      featured
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="font-mono text-[9px] px-2 py-0.5 bg-secondary rounded">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="font-mono text-[9px] px-2 py-0.5 text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 border rounded hover:bg-foreground hover:text-background transition-all"
                      aria-label={`${project.title} source`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 border rounded hover:bg-foreground hover:text-background transition-all"
                      aria-label={`${project.title} demo`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="font-mono text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showAllProjects ? '− Show less' : `+ Show ${otherProjects.length} more projects`}
              </button>

              {showAllProjects && (
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  {otherProjects.map((project) => (
                    <div key={project.title} className="border rounded-lg p-4 hover:border-primary/30 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-medium text-sm">{project.title}</h4>
                        <div className="flex gap-1.5 shrink-0">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                          </a>
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                          </a>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 bg-secondary rounded">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="font-mono text-[9px] px-1.5 py-0.5 text-muted-foreground">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- Achievements --- */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t">
        <div className="grid md:grid-cols-[180px_1fr] gap-12">
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Achievements</div>
            <div className="mt-2 text-xs text-muted-foreground font-mono">/recognition</div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div key={achievement.text} className="flex items-center gap-3 text-sm p-3 border rounded-lg hover:border-primary/30 transition-colors">
                <span className="text-primary shrink-0">{achievement.icon}</span>
                <span className="text-muted-foreground">{achievement.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact --- */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20 border-t">
        <div className="grid md:grid-cols-[180px_1fr] gap-12">
          <div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Contact</div>
            <div className="mt-2 text-xs text-muted-foreground font-mono">/reach-out</div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Let's build something</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                Open to full-stack roles, internships, and freelance work. I reply within a day or two.
              </p>
              <div className="mt-6 space-y-3">
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-3 font-mono text-sm group w-full text-left p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{profile.email}</span>
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                  )}
                </button>
                <a href={`tel:${profile.phone}`} className="flex items-center gap-3 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  {profile.phone}
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary">
                  <Linkedin className="h-4 w-4 text-primary shrink-0" />
                  linkedin.com/in/aditya-kumar
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary">
                  <Github className="h-4 w-4 text-primary shrink-0" />
                  github.com/adimadhubani
                </a>
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary">
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                  View full resume
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground font-mono">/name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-mono">/email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-mono">/message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity"
                  rows={4}
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                {isSubmitting ? 'Sending…' : 'Send Message'}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="font-mono text-xs text-primary">available</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
