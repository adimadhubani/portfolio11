import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
  ChevronDown,
  Briefcase,
  Code,
  Palette,
  User,
  GraduationCap,
  ExternalLink,
  FileText
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { toast } from 'sonner';
import { ToasterProvider } from './components/ui/toaster';

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Contact form handling with Sonner toasts
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const toastId = toast.loading('Sending your message...', {
      description: 'Please wait while we submit your form',
    });
  
    try {
      // ✅ Updated with Render backend URL
      const response = await axios.post(
        'https://portfolio11-jhur.onrender.com/api/contact',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      toast.success('Message sent successfully!', {
        id: toastId,
        description: 'I will get back to you soon',
        action: {
          label: 'Dismiss',
          onClick: () => console.log('Dismissed'),
        },
      });
  
      // Clear form
      setFormData({ name: '', email: '', message: '' });
  
    } catch (error) {
      console.error('Submission error:', error); // For debugging
      
      toast.error('Failed to send message', {
        id: toastId,
        description:
          error.response?.data?.error || 
          error.message || 
          'Please try again later',
        action: {
          label: 'Retry',
          onClick: () => handleSubmit(e),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };


  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
    { id: 'education', label: 'Education' }
  ];

  const skills = [
    { category: 'Frontend', items: ['React', 'JavaScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Mongoose', 'Express Js', 'PostMan', 'Restful Api', 'Node.js'] },
    { category: 'Other', items: ['MYSQL', 'Git', 'AI Interigation', 'C++ Programming', 'Storybook'] }
  ];


  const education = [
    {
      institution: "Indian Institute Of Information Technology Bhagalpur",
      degree: "Bachlor of Technology in Computer Science",
      period: "2023 - 2027",
      description: "Specialized in Backend and Frontend Development With AI Interigation."
    }
  ];

  const projects = [
    {
      title: "Real-Time Chat Application",
      description: "A full-stack chat app with real-time messaging, user authentication, and group chats using Socket.IO",
      tags: ["MERN Stack", "Socket.IO", "JWT Auth", "Tailwind CSS"],
      year: "2024",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhdCUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      githubUrl: "https://github.com/adimadhubani/chatgpt_clone",
      liveUrl: "https://chat-app-tfbo.onrender.com/login"
    },
    {
      title: "Video Conference Platform",
      description: "Zoom-like video calling app with screen sharing and chat functionality",
      tags: ["WebRTC", "Socket.IO", "Node.js", "React"],
      year: "2023",
      imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlkZW8lMjBjYWxsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "E-Commerce Website",
      description: "Complete online store with product catalog, cart, and payment integration",
      tags: ["MERN", "Redux", "Stripe API", "JWT Auth"],
      year: "2023",
      githubUrl: "#",
      liveUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZS1jb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      title: "Online Clipboard (Pastebin Clone)",
      description: "Cloud-based text sharing platform with expiration timers and syntax highlighting",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      year: "2024",
      githubUrl: "#",
      liveUrl: "#",
      imageUrl: "https://media.gettyimages.com/id/183304802/photo/young-team-working-on-laptop-computers-and-writing.jpg?s=612x612&w=0&k=20&c=-rUlt2Q2d174iB9_dPXZsDvrceORKe4TY43ektSDqnk="
    },
    {
      title: "AI Image Generator",
      description: "Web app that generates images from text prompts using OpenAI's DALL-E API",
      tags: ["React", "Node.js", "OpenAI API", "Tailwind CSS"],
      year: "2024",
      githubUrl: "#",
      liveUrl: "#",
      imageUrl: "https://c4.wallpaperflare.com/wallpaper/238/832/888/artificial-intelligence-binary-digital-art-glowing-wallpaper-preview.jpg"
    }

  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ToasterProvider />
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage onClick={() => scrollToSection('hero')} src="https://avatars.githubusercontent.com/u/163722256?…00&u=c1e9c99d11229e54c739fdbedb3ecc0d929aef68&v=4" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="font-medium cursor-pointer" onClick={() => scrollToSection('hero')}>Aditya Kumar</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'secondary' : 'ghost'}
                className="px-2"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </Button>
            ))}
            <Button variant="default" onClick={() => scrollToSection('contact')}>
              Hire Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"
          style={{ y: yBg }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                Frontend & Backend Developer
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                I build <span className="text-primary">digital experiences</span> that solve the real problems
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Passionate CS student blending design and code to create seamless,
                scalable applications. Currently mastering modern stacks like MERN & Next.js.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={() => scrollToSection('projects')}>
                  View My Work
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')}>
                  Contact Me
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="animate-bounce"
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </section>

      <main ref={ref} className="container mx-auto px-6 py-20 space-y-32">
        {/* About Section */}
        <section id="about" className="scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Avatar className="h-64 w-64 mx-auto">
                <AvatarImage src="https://avatars.githubusercontent.com/u/163722256?…00&u=c1e9c99d11229e54c739fdbedb3ecc0d929aef68&v=4" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">
                About Me
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                MERN Stack Developer | IIIT Bhagalpur ’23-27
              </h2>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate UI/UX specialist with a strong technical background in frontend development. This unique combination allows me to not only design beautiful interfaces but also implement them with precision.
                </p>
                <p>
                  Currently working as a Senior Product Designer at TechCorp, where I lead design initiatives for our flagship SaaS platform serving over 10,000 businesses worldwide.
                </p>
                <p>
                  My approach combines user-centered design principles with modern development practices to create products that are both visually stunning and technically robust.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Button variant="outline" asChild>
                  <a href="https://github.com/adimadhubani" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.linkedin.com/in/aditya-kumar-989ba2294/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1Zat3MNyckdi0pHa5Ayo88nzb3k7t1sB0dMxa08qriPo/edit?gid=599358521#gid=599358521"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View CV
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Education Section */}
        <section id="education" className="scroll-mt-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              My Education
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Academic Background
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Formal education and continuous learning
            </p>
          </div>
          <div className="grid gap-8 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{edu.institution}</CardTitle>
                        <CardDescription className="mt-1">{edu.degree}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span className="text-sm">{edu.period}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {edu.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              My Expertise
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Skills & Technologies
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A versatile skill set that covers the entire product development lifecycle
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      {skillGroup.category === 'Frontend' && <Code className="h-6 w-6 text-primary" />}
                      {skillGroup.category === 'Design' && <Palette className="h-6 w-6 text-primary" />}
                      {skillGroup.category === 'Other' && <Briefcase className="h-6 w-6 text-primary" />}
                      <CardTitle>{skillGroup.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              AI & Full-Stack Projects
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              My Technical Creations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Building solutions that blend AI with modern web development
            </p>
          </div>
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 group">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 p-6">
                      <CardHeader className="p-0 mb-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                            {project.title}
                          </CardTitle>
                          <span className="text-sm text-muted-foreground">
                            {project.year}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-muted-foreground mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="hover:bg-primary/10"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-0 gap-4">
                        {project.githubUrl && (
                          <Button variant="outline" asChild>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              className="flex items-center"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button asChild>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              className="flex items-center"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </CardFooter>
                    </div>
                    <div className="hidden md:block relative overflow-hidden rounded-r-lg">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml;base64,[YOUR_FALLBACK_IMAGE]";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">
                Get In Touch
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Let's work together
              </h2>
              <p className="text-muted-foreground mb-8">
                I'm currently available for freelance projects and finding full stack webdevelopment internship program. If you have an opportunity that matches my skills and experience, don't hesitate to reach out.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>adaryadhav2489@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <span>https://www.linkedin.com/in/aditya-kumar-989ba2294/</span>
                </div>
                <div className="flex items-center gap-4">
                  <Twitter className="h-5 w-5 text-primary" />
                  <span>twitter.com/adaryadhav</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send me a message</CardTitle>
                  <CardDescription>
                    I typically respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="font-medium">Aditya Kumar</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <a
                  href="https://github.com/adimadhubani"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <a
                  href="https://www.linkedin.com/in/aditya-kumar-989ba2294/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon">
                <a
                  href="mailto:adaryadhav2489@gmail.com"
                  aria-label="Send email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aditya Kumar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;