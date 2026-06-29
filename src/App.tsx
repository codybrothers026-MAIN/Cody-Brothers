import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Layers, 
  DollarSign, 
  Briefcase, 
  Workflow, 
  Info, 
  HelpCircle, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Clock, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  Code, 
  Utensils, 
  Dumbbell, 
  GraduationCap, 
  ShoppingBag, 
  Palette, 
  Wrench, 
  ArrowUpRight, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Instagram, 
  Phone, 
  ArrowUp,
  Award,
  MousePointer,
  Play
} from 'lucide-react';

// Demo project details for interactive showcase modal
interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  techStack: string[];
  metrics: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    title: "Apex Fitness Hub",
    category: "Gym & Wellness Website",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    description: "A high-end responsive portal for a luxury gym chain, featuring interactive class schedules, personal trainer booking engines, and dynamic membership management.",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Stripe API"],
    metrics: "+42% online bookings in 30 days",
    link: "https://apex-fitness-demo.example.com"
  },
  {
    title: "Verve Gastronomy",
    category: "Premium Restaurant Portal",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
    description: "An elegant, interactive restaurant web application equipped with dynamic visual menus, table reservations, and seamless custom catering order forms.",
    techStack: ["React", "Tailwind CSS", "Lucide Icons", "Web3Forms"],
    metrics: "10k+ monthly page views",
    link: "https://verve-gastronomy-demo.example.com"
  },
  {
    title: "Aura Commerce",
    category: "E-Commerce Luxury Platform",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    description: "A secure, lightning-fast storefront for a boutique watch manufacturer. Featuring full catalog searching, 3D product view simulations, and integrated Stripe payments.",
    techStack: ["React", "Tailwind CSS", "Stripe Checkout", "Responsive Frame"],
    metrics: "₹8.5 Lakh sales during launch week",
    link: "https://aura-commerce-demo.example.com"
  },
  {
    title: "Aether Architecture Portfolio",
    category: "Studio Portfolio Website",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    description: "A visually cinematic image-heavy portfolio with smooth micro-interactions, dark aesthetic layouts, and interactive layout blueprints.",
    techStack: ["React", "Tailwind CSS", "High-res Optimization"],
    metrics: "Lighthouse Performance Score of 99",
    link: "https://aether-architects-demo.example.com"
  },
  {
    title: "Stellar Academy",
    category: "Educational Institution Website",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    description: "A feature-rich academic portal for progressive schools, introducing interactive course syllabi, staff databases, admissions request forms, and multi-page resources.",
    techStack: ["React", "Tailwind CSS", "Booking Management", "Lucide CSS"],
    metrics: "99% parent satisfaction rating",
    link: "https://stellar-academy-demo.example.com"
  },
  {
    title: "Novus Web Redesign",
    category: "Enterprise Website Overhaul",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "A comprehensive digital transformation of an established business website, boosting speed, restructuring page copy, and implementing lead magnet captures.",
    techStack: ["React", "Tailwind CSS", "SEO Tuning", "Google Maps"],
    metrics: "Bounce rate dropped from 64% to 22%",
    link: "https://novus-redesign-demo.example.com"
  }
];

export default function App() {
  // Navigation & UI States
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Custom Cursor state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHovering, setCursorHovering] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Pricing Toggle (Monthly vs Custom)
  const [pricingCycle, setPricingCycle] = useState<'standard' | 'custom'>('standard');

  // Interactive Project Modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Interactive FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Web3Forms Form State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    package: 'Standard - ₹1500',
    budget: '₹1500 - ₹3000',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formResultMessage, setFormResultMessage] = useState('');

  // Handle Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      // Scroll Progress Bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // Back to Top button visibility
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Active Section Highlight
      const sections = ['home', 'services', 'pricing', 'portfolio', 'process', 'about', 'faq', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom Cursor tracking
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!cursorVisible) setCursorVisible(true);
    };

    const handleMouseLeave = () => setCursorVisible(false);
    const handleMouseEnter = () => setCursorVisible(true);

    window.addEventListener('mousemove', updateMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorVisible]);

  // Loading Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Set cursor hovering class on clickable items
  const handleLinkHover = (hovering: boolean) => {
    setCursorHovering(hovering);
  };

  // Scroll smoothly to section
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle Form Submission with Web3Forms
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormResultMessage('');

    // Fetch the Access Key from environment variables (client-side) or fallback placeholder
    // Web3Forms accepts standard POST request
    const accessKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      // Friendly mock success with custom log if user has not set up their real Web3Forms key yet
      console.warn("CodyBrothers Warning: Web3Forms access key is not set in env variables. Demonstrating simulated premium flow.");
      
      setTimeout(() => {
        setFormStatus('success');
        setFormResultMessage("Thank you, " + formState.name + "! Your request was submitted successfully. (Demo Mode - Please configure WEB3FORMS_ACCESS_KEY in env for real mail delivery).");
        // Reset form
        setFormState({
          name: '',
          email: '',
          phone: '',
          businessName: '',
          package: 'Standard - ₹1500',
          budget: '₹1500 - ₹3000',
          message: ''
        });
      }, 1500);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("name", formState.name);
      formData.append("email", formState.email);
      formData.append("phone", formState.phone);
      formData.append("business_name", formState.businessName);
      formData.append("package", formState.package);
      formData.append("budget", formState.budget);
      formData.append("message", formState.message);
      formData.append("subject", `New CodyBrothers Lead from ${formState.name}`);
      formData.append("from_name", "CodyBrothers Agency");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        setFormResultMessage("Your quote request has been transmitted! Arman & Naksh will contact you within 2 hours.");
        setFormState({
          name: '',
          email: '',
          phone: '',
          businessName: '',
          package: 'Standard - ₹1500',
          budget: '₹1500 - ₹3000',
          message: ''
        });
      } else {
        setFormStatus('error');
        setFormResultMessage(data.message || "Something went wrong submitting to Web3Forms. Please check your Access Key.");
      }
    } catch (err) {
      console.error("Web3Forms submission error:", err);
      setFormStatus('error');
      setFormResultMessage("Failed to reach Web3Forms server. Please check your internet connection.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const servicesList = [
    {
      id: "srv-1",
      title: "Landing Page",
      icon: <Layers className="w-6 h-6 text-[#00F0FF]" />,
      desc: "High-converting, laser-focused single page websites optimized to drive immediate action, ideal for marketing campaigns and single-product launches.",
      badge: "Fast Delivery"
    },
    {
      id: "srv-2",
      title: "Business Website",
      icon: <Briefcase className="w-6 h-6 text-[#D4AF37]" />,
      desc: "A polished and highly authoritative web presence designed to build corporate trust, educate target clients, and capture prospective pipeline leads.",
      badge: "Enterprise Grade"
    },
    {
      id: "srv-3",
      title: "Portfolio Website",
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      desc: "A sleek, highly creative digital showcase for designers, architects, photographers, and consultants looking to command premium freelance rates.",
      badge: "Creative"
    },
    {
      id: "srv-4",
      title: "Restaurant Website",
      icon: <Utensils className="w-6 h-6 text-emerald-400" />,
      desc: "Mouth-watering modern interfaces with responsive menus, dynamic table booking integrations, and direct WhatsApp ordering support.",
      badge: "Mouthwatering UI"
    },
    {
      id: "srv-5",
      title: "Gym Website",
      icon: <Dumbbell className="w-6 h-6 text-red-400" />,
      desc: "High-octane aesthetic interfaces for athletic centers, gym chains, or private trainers, featuring schedule databases and membership sign-ups.",
      badge: "Dynamic"
    },
    {
      id: "srv-6",
      title: "School Website",
      icon: <GraduationCap className="w-6 h-6 text-indigo-400" />,
      desc: "Organized, clean, and accessible multi-page systems featuring staff listings, dynamic schedules, admission forms, and resource libraries.",
      badge: "Highly Structured"
    },
    {
      id: "srv-7",
      title: "E-Commerce Website",
      icon: <ShoppingBag className="w-6 h-6 text-[#00F0FF]" />,
      desc: "Scale your revenue with full custom catalogs, lightning-fast instant checkout funnels, secure payment gateways, and backend inventory structures.",
      badge: "Sales Machine"
    },
    {
      id: "srv-8",
      title: "Website Redesign",
      icon: <Zap className="w-6 h-6 text-[#D4AF37]" />,
      desc: "Transform your outdated website into a fast, beautiful, and secure revenue driver. Keep your brand identity while upgrading performance.",
      badge: "High ROI"
    },
    {
      id: "srv-9",
      title: "Website Maintenance",
      icon: <Wrench className="w-6 h-6 text-sky-400" />,
      desc: "Never worry about security patches, downtime, or content changes again. We handle technical updates so you focus on running your business.",
      badge: "Peace of Mind"
    }
  ];

  const processList = [
    {
      step: "01",
      title: "Discovery",
      desc: "We analyze your target market, deeply study your business model, define specific conversion funnels, and draft the project wireframe blueprint."
    },
    {
      step: "02",
      title: "Planning",
      desc: "We map out navigation architectures, write persuasive headlines, choose premium color schemes, and establish high-speed tech stacks."
    },
    {
      step: "03",
      title: "Design",
      desc: "We engineer pixel-perfect glassmorphic user interfaces using custom typography, beautiful imagery, and highly optimized fluid visual layouts."
    },
    {
      step: "04",
      title: "Development",
      desc: "Our senior developers craft the frontend using React and Tailwind CSS, keeping the code modular, lightweight, and blazing-fast."
    },
    {
      step: "05",
      title: "Testing",
      desc: "We perform strict cross-device layouts verification, Lighthouse speed audits, security scans, and cross-browser response testing."
    },
    {
      step: "06",
      title: "Launch",
      desc: "We deploy your premium application to cloud servers, configure customized domain setups, optimize SEO indexing, and hand over access keys."
    }
  ];

  const faqs = [
    {
      q: "How long does it take to design and launch my website?",
      a: "Our standard delivery takes 5 business days for standard projects, while custom landing pages can be shipped in just 3 days. Premium advanced portals require 7 days of precise crafting. Quality is never compromised."
    },
    {
      q: "What is Web3Forms and how do notifications work?",
      a: "Web3Forms is a secure, high-speed contact form handler. When a client submits a form on your website, you instantly receive an email with their details. No complex server database is needed, keeping your site fast and free from database maintenance fees."
    },
    {
      q: "Will my website look beautiful and work flawlessly on mobile?",
      a: "Absolutely. 100% of our code uses a mobile-first fluid layout standard. Your digital agency-grade workspace automatically adjusts layout grids, typography, and interactive button sizing for iPhones, Android tablets, and ultra-wide screens."
    },
    {
      q: "Do I get post-launch customer support?",
      a: "Yes! Every standard project includes initial deployment warranty. Our Premium tier packages come with 30 days of direct premium tech support from Arman & Naksh. We also offer dedicated Maintenance tiers to handle modifications."
    },
    {
      q: "Are there any hidden costs involved?",
      a: "Zero hidden fees. We believe in absolute transparency. You pay exactly what is quoted in the tier. External costs (domain registration or custom hosting fees if you require paid servers) are discussed clearly beforehand."
    }
  ];

  return (
    <div id="app-container" className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-[#00F0FF]/30 selection:text-white relative">
      
      {/* 1. CUSTOM CURSOR */}
      {cursorVisible && (
        <div 
          className={`fixed pointer-events-none z-[9999] hidden md:block transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 ${
            cursorHovering 
              ? 'w-14 h-14 bg-[#00F0FF]/15 border-2 border-[#D4AF37] scale-110' 
              : 'w-6 h-6 bg-[#00F0FF]/20 border border-white/20'
          } rounded-full`}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        >
          <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]"></div>
        </div>
      )}

      {/* 2. TOP SCROLL PROGRESS BAR */}
      <div 
        id="scroll-progress" 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#00F0FF] via-white to-[#D4AF37] z-[100] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 3. FUTURISTIC LAUNCH SCREEN / PRELOADER */}
      {isLoading && (
        <div id="preloader" className="fixed inset-0 bg-[#020202] z-[10000] flex flex-col items-center justify-center">
          <div className="relative flex flex-col items-center">
            {/* Pulsing ring */}
            <div className="w-24 h-24 rounded-full border border-white/5 border-t-[#00F0FF] border-b-[#D4AF37] animate-spin mb-8 shadow-[0_0_30px_rgba(0,240,255,0.15)]"></div>
            
            <div className="flex items-center gap-2 mb-2 animate-pulse">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#00F0FF] to-[#D4AF37] rounded-lg flex items-center justify-center font-bold text-black text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)]">CB</div>
              <span className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 font-mono">CODYBROTHERS</span>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono">Premium Web Architects</p>
            <div className="absolute -bottom-16 text-[9px] text-[#00F0FF] font-mono tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
              INITIALIZING CORE ENGINE...
            </div>
          </div>
        </div>
      )}

      {/* 4. DECORATIVE BACKGROUND GLOWS & AURORAS (IMMERSIVE THEME) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* High quality slow drifting glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tr from-[#007AFF] to-[#00F0FF] opacity-[0.12] blur-[150px] rounded-full animate-pulse duration-[10000ms]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-gradient-to-tr from-[#D4AF37] to-[#F5A623] opacity-[0.08] blur-[150px] rounded-full animate-pulse duration-[12000ms]"></div>
        <div className="absolute top-[35%] right-[10%] w-[35vw] h-[35vw] bg-gradient-to-tr from-[#00F0FF] to-indigo-600 opacity-[0.06] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[30%] left-[15%] w-[30vw] h-[30vw] bg-gradient-to-tr from-purple-900 to-pink-900 opacity-[0.05] blur-[100px] rounded-full"></div>
      </div>

      {/* 5. STICKY NAV BAR */}
      <header id="navbar" className="sticky top-0 w-full h-20 border-b border-white/5 backdrop-blur-xl bg-black/50 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo on Left */}
          <div 
            onClick={() => scrollToSection('home')} 
            onMouseEnter={() => handleLinkHover(true)}
            onMouseLeave={() => handleLinkHover(false)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-[#00F0FF] via-white to-[#D4AF37] rounded-xl flex items-center justify-center font-extrabold text-black text-base shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-500 group-hover:rotate-12 group-hover:scale-105">
              CB
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
                CodyBrothers
              </span>
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#00F0FF]">
                Web Architects
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-400">
            {[
              { id: 'services', label: 'Services' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'process', label: 'Process' },
              { id: 'about', label: 'About' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                className={`relative py-2 transition-colors duration-300 hover:text-white ${
                  activeSection === link.id ? 'text-white font-bold' : ''
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00F0FF] to-[#D4AF37] rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          {/* Action button on right */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => handleLinkHover(true)}
              onMouseLeave={() => handleLinkHover(false)}
              className="relative px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-[#00F0FF] hover:text-black hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all duration-300 active:scale-95"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onMouseEnter={() => handleLinkHover(true)}
            onMouseLeave={() => handleLinkHover(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 z-40 transition-all duration-300">
            <div className="px-6 py-8 flex flex-col gap-6 text-center">
              {[
                { id: 'services', label: 'Services' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'process', label: 'Process' },
                { id: 'about', label: 'About' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-lg font-bold tracking-wide transition-colors ${
                    activeSection === link.id ? 'text-[#00F0FF]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-4 w-full py-4 bg-gradient-to-r from-[#007AFF] to-[#00F0FF] text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 6. HERO SECTION */}
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center py-16 md:py-24 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Agency Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-[0.2em] text-[#00F0FF] font-bold mb-8 w-fit shadow-[0_0_15px_rgba(0,240,255,0.05)]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
              ⭐⭐⭐ PREMIUM WEB AGENCY 2026 ⭐⭐⭐
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-8">
              Modern Websites <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-white to-[#D4AF37] drop-shadow-[0_2px_15px_rgba(0,240,255,0.15)]">
                That Grow Businesses.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12">
              We design premium websites that help businesses build trust, generate leads and grow online. Elevate your brand with digital engineering worth over ₹10 Lakh.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => scrollToSection('contact')}
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                className="group flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-[#007AFF] to-[#00F0FF] hover:from-[#00F0FF] hover:to-[#007AFF] text-white font-bold rounded-2xl shadow-[0_10px_35px_rgba(0,122,255,0.3)] hover:scale-105 transition-all duration-300"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                className="flex items-center justify-center gap-3 px-8 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl backdrop-blur transition-all duration-300 hover:border-white/20"
              >
                View Portfolio
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>

          {/* Hero Right 3D Pricing Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            
            {/* Decorative background glow behind the card */}
            <div className="absolute w-80 h-80 bg-gradient-to-r from-[#00F0FF]/20 to-[#D4AF37]/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

            {/* Standard Tier Mockup Glass Card */}
            <div className="relative w-full max-w-[380px] p-[1.5px] bg-gradient-to-b from-white/20 via-white/5 to-[#D4AF37]/30 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:rotate-3 transition-transform duration-500">
              
              <div className="bg-[#0b0b0d]/95 backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-white/5 flex flex-col relative overflow-hidden">
                
                {/* Glow spot */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-[#00F0FF]/15 to-transparent rounded-full blur-2xl"></div>

                {/* Popular Badge */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5 animate-pulse">
                      <span className="inline-block text-[10px]">⭐</span> MOST POPULAR <span className="inline-block text-[10px]">⭐</span>
                    </p>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">Standard</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-black text-white tracking-tight">₹1500</span>
                    <p className="text-[10px] text-gray-500 font-mono">One-Time Fee</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-8"></div>

                {/* Features included */}
                <ul className="space-y-4 mb-10 flex-1">
                  {[
                    "Multi Page Website",
                    "Payment Gateway Integration",
                    "WhatsApp Integration",
                    "Booking Form & Google Maps",
                    "Basic SEO Setup",
                    "5 Days High-Speed Delivery"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF] text-xs font-bold border border-[#00F0FF]/20 shrink-0">
                        ✓
                      </div>
                      <span className="font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={() => {
                    setFormState(prev => ({ ...prev, package: 'Standard - ₹1500', budget: '₹1500 - ₹3000' }));
                    scrollToSection('contact');
                  }}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  className="w-full py-4.5 bg-gradient-to-r from-[#D4AF37] to-[#F5A623] text-black font-extrabold rounded-xl transition-all hover:scale-[1.02] shadow-[0_8px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.45)]"
                >
                  Choose Standard
                </button>
              </div>

              {/* Absolutely Positioned High-fidelity Badges on Card */}
              <div className="absolute -top-5 -right-5 w-14 h-14 bg-[#111] border border-[#D4AF37]/50 rounded-full flex items-center justify-center text-2xl shadow-xl z-20 animate-bounce duration-[3000ms]">
                ⭐
              </div>
              <div className="absolute -bottom-4 -left-4 bg-black/90 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold text-[#00F0FF] tracking-wider uppercase backdrop-blur-md">
                ⚡ FAST LOAD SPEEDS
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. STATISTICS ROW */}
      <section className="relative border-y border-white/5 py-12 md:py-16 bg-white/[0.01] backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-6 justify-between items-stretch">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 flex-1">
            
            {/* Stat 1 */}
            <div className="flex flex-col justify-center border-l-2 border-[#00F0FF]/40 pl-6 group">
              <span className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 group-hover:text-[#00F0FF] transition-colors">
                150+
              </span>
              <span className="text-[11px] uppercase tracking-widest text-gray-500 font-mono">
                Projects Completed
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col justify-center border-l-2 border-[#D4AF37]/40 pl-6 group">
              <span className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                98%
              </span>
              <span className="text-[11px] uppercase tracking-widest text-gray-500 font-mono">
                Happy Clients
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col justify-center border-l-2 border-pink-500/40 pl-6 group">
              <span className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 group-hover:text-pink-500 transition-colors">
                24/7
              </span>
              <span className="text-[11px] uppercase tracking-widest text-gray-500 font-mono">
                Expert Support
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col justify-center border-l-2 border-emerald-500/40 pl-6 group">
              <span className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 group-hover:text-emerald-500 transition-colors">
                2hr
              </span>
              <span className="text-[11px] uppercase tracking-widest text-gray-500 font-mono">
                Response Time
              </span>
            </div>

          </div>

          {/* Founders Bio Quick Badge */}
          <div className="border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10 flex items-center gap-4 shrink-0">
            <div className="flex -space-x-3">
              <div className="w-11 h-11 rounded-full border-2 border-black bg-gradient-to-tr from-gray-800 to-gray-900 flex items-center justify-center text-xs font-bold font-mono text-white shadow-lg">
                A
              </div>
              <div className="w-11 h-11 rounded-full border-2 border-black bg-gradient-to-tr from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-bold font-mono text-white shadow-lg">
                N
              </div>
              <div className="w-11 h-11 rounded-full border-2 border-black bg-gradient-to-tr from-[#00F0FF] to-[#D4AF37] flex items-center justify-center text-xs font-black text-black shadow-lg">
                +
              </div>
            </div>
            <div className="text-left">
              <p className="text-xs text-white font-extrabold tracking-tight">Founded by Arman & Naksh</p>
              <p className="text-[10px] text-[#00F0FF] font-mono tracking-wider">EXPERTISE YOU CAN TRUST</p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#00F0FF] bg-[#00F0FF]/5 px-4 py-1.5 rounded-full border border-[#00F0FF]/15">
              EXPERTISE & SOLUTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 mb-4">
              Our Premium Services
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              We design and build bespoke high-end digital products tailored strictly for your target conversion goals. Click to view specifics.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((srv) => (
              <div
                key={srv.id}
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                className="group relative p-1 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-[#00F0FF]/40 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,240,255,0.05)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Visual Accent Glow on Hover */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00F0FF]/5 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-[#09090b]/90 p-8 rounded-[22px] h-full flex flex-col justify-between">
                  <div>
                    {/* Header: Icon & Badge */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl group-hover:bg-[#00F0FF]/10 group-hover:border-[#00F0FF]/20 transition-all duration-300">
                        {srv.icon}
                      </div>
                      <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        {srv.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                      {srv.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Pricing trigger link */}
                  <div 
                    onClick={() => {
                      setFormState(prev => ({ 
                        ...prev, 
                        package: `${srv.title} Custom Package`,
                        message: `Hi, I am interested in your "${srv.title}" service. Please provide further information.`
                      }));
                      scrollToSection('contact');
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-white/40 group-hover:text-white transition-colors mt-auto cursor-pointer"
                  >
                    Select this service
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. PRICING TIERS */}
      <section id="pricing" className="py-24 md:py-32 bg-white/[0.01] border-y border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#D4AF37] bg-[#D4AF37]/5 px-4 py-1.5 rounded-full border border-[#D4AF37]/15">
              CLEAR TRANSPARENT PRICING
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 mb-4">
              Invest In Digital Supremacy
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Choose the perfect tier configured with precise capabilities to supercharge your business online. No hidden variables.
            </p>
          </div>

          {/* Pricing Cycle Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-white/5 p-1 rounded-full border border-white/10 flex items-center">
              <button
                onClick={() => setPricingCycle('standard')}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  pricingCycle === 'standard' 
                    ? 'bg-gradient-to-r from-[#007AFF] to-[#00F0FF] text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Fixed Tiers
              </button>
              <button
                onClick={() => setPricingCycle('custom')}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  pricingCycle === 'custom' 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5A623] text-black shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Custom Blueprint
              </button>
            </div>
          </div>

          {pricingCycle === 'standard' ? (
            /* Side by Side Fixed Tiers */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              
              {/* Basic Tier */}
              <div className="bg-[#09090b] border border-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded-full uppercase border border-[#00F0FF]/20">
                      Starter Package
                    </span>
                    <h3 className="text-2xl font-bold mt-4 mb-2">Basic</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white">₹1000</span>
                      <span className="text-xs text-gray-500">One-Time</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 my-6" />

                  <ul className="space-y-4 mb-8">
                    {[
                      "One Landing Page Design",
                      "Fully Mobile Responsive Layout",
                      "Contact Information Display",
                      "Interactive Contact Form",
                      "WhatsApp Floating Button",
                      "Free Deployment Assistance",
                      "3 Days Guaranteed Delivery"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-gray-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setFormState(prev => ({ 
                      ...prev, 
                      package: 'Basic - ₹1000', 
                      budget: '₹1000 - ₹1500',
                      message: 'I want to build a Basic single landing page. Please send me the project details.'
                    }));
                    scrollToSection('contact');
                  }}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all"
                >
                  Get Started
                </button>
              </div>

              {/* Standard Tier (Most Popular) */}
              <div className="relative bg-[#0b0b0d] border-2 border-[#D4AF37] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-[0_15px_40px_rgba(212,175,55,0.15)] transform hover:scale-[1.02] transition-all duration-300">
                {/* Popular Ribbon overlay */}
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F5A623] text-black text-[9px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-lg">
                  ⭐⭐ MOST POPULAR ⭐⭐
                </div>

                <div>
                  <div className="mb-6">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold font-mono tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full uppercase border border-[#D4AF37]/20">
                        Growth Builder
                      </span>
                    </div>
                    <h3 className="text-3xl font-extrabold mt-4 mb-2">Standard</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-white">₹1500</span>
                      <span className="text-xs text-gray-400">One-Time</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 my-6" />

                  {/* Plan list */}
                  <div className="text-xs text-[#D4AF37] font-bold tracking-wider uppercase mb-4">
                    Everything in Basic Plus:
                  </div>

                  <ul className="space-y-4 mb-10">
                    {[
                      "Complete Multi Page Website Setup",
                      "Payment Gateway Integration Setup",
                      "Interactive Contact & Booking Forms",
                      "Google Maps Embed Setup",
                      "Basic Optimization for Google SEO",
                      "Full WhatsApp Business Integration",
                      "5 Days Express Delivery"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span className="font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setFormState(prev => ({ 
                      ...prev, 
                      package: 'Standard - ₹1500', 
                      budget: '₹1500 - ₹3000',
                      message: 'I want to lock in the Standard Package for my business. Let’s map out the plan.'
                    }));
                    scrollToSection('contact');
                  }}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  className="w-full py-4.5 bg-gradient-to-r from-[#D4AF37] to-[#F5A623] hover:opacity-90 text-black font-extrabold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  Lock In Plan
                </button>
              </div>

              {/* Premium Tier */}
              <div className="bg-[#09090b] border border-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-pink-500 bg-pink-500/10 px-3 py-1 rounded-full uppercase border border-pink-500/20">
                      Ultimate Authority
                    </span>
                    <h3 className="text-2xl font-bold mt-4 mb-2">Premium</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white">₹2000</span>
                      <span className="text-xs text-gray-500">One-Time</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 my-6" />

                  <div className="text-xs text-pink-400 font-bold tracking-wider uppercase mb-4">
                    Everything in Standard Plus:
                  </div>

                  <ul className="space-y-4 mb-8">
                    {[
                      "Interactive Admin Dashboard Panel",
                      "Owner Booking & Customer Control",
                      "Instant Automated Email Notifications",
                      "Client Contacts Dashboard Database",
                      "Web3Forms Professional Integration",
                      "Advanced Lifetime SEO Optimization",
                      "30 Days of Dedicated Support",
                      "7 Days Ultra-Premium Delivery"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setFormState(prev => ({ 
                      ...prev, 
                      package: 'Premium - ₹2000', 
                      budget: '₹2000+',
                      message: 'I am ready to establish absolute authority with the Premium portal. Let’s start design.'
                    }));
                    scrollToSection('contact');
                  }}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all"
                >
                  Order Premium
                </button>
              </div>

            </div>
          ) : (
            /* Custom Tier Form Callout */
            <div className="bg-[#09090c] border border-[#D4AF37]/30 rounded-[2rem] p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-2xl relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.05)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl"></div>
              
              <Award className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
              <h3 className="text-3xl font-extrabold mb-4">Need a Custom Developed Masterpiece?</h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
                If you require highly specific integrations, relational database backends, unique multi-tenant portals, custom CRM synchronization, or complex Web3 parameters, get in touch for a bespoke agency proposal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    setFormState(prev => ({ 
                      ...prev, 
                      package: 'Custom Architecture Proposal',
                      budget: '₹5000+',
                      message: 'Requesting a fully custom enterprise-level architect blueprint for our business.'
                    }));
                    scrollToSection('contact');
                  }}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B8960C] text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  Discuss Custom Plan
                </button>
                <a
                  href="mailto:codybrothers026@gmail.com"
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  Direct Email Inquiry
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 10. PORTFOLIO SHOWCASE */}
      <section id="portfolio" className="py-24 md:py-32 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#00F0FF] bg-[#00F0FF]/5 px-4 py-1.5 rounded-full border border-[#00F0FF]/15">
              OUR WORK GALLERY
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 mb-4">
              Real Craftsmanship Demo
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              We focus on building functional digital architectures. Explore our real simulation blueprints below.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((proj, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedProject(proj)}
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                className="group bg-[#09090b] border border-white/5 rounded-3xl overflow-hidden hover:border-[#00F0FF]/40 cursor-pointer transition-all duration-500 shadow-md hover:shadow-[0_15px_30px_rgba(0,240,255,0.03)]"
              >
                {/* Visual Image container with hover zoom */}
                <div className="relative aspect-[1.6] overflow-hidden bg-zinc-900 border-b border-white/5">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  {/* Floating Marker Badge */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-white/15 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-white uppercase">
                    Demo Project
                  </div>

                  {/* Play/Simulate overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#00F0FF] flex items-center justify-center text-black shadow-lg">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-6 md:p-8">
                  <p className="text-xs text-[#D4AF37] font-mono tracking-wider mb-2">
                    {proj.category}
                  </p>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-[#00F0FF] transition-colors mb-4">
                    {proj.title}
                  </h3>
                  
                  {/* Performance metric tag */}
                  <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/15 rounded-xl px-4 py-2.5 text-xs font-bold text-[#00F0FF] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    <span>{proj.metrics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. PORTFOLIO DETAIL DRAWER / MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="relative bg-[#0b0b0d] border border-white/10 rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            
            {/* Header Close */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Project Cover */}
            <div className="relative aspect-[1.8] bg-zinc-900">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-xs text-[#D4AF37] font-mono uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-white/10">
                  Demo Project Simulation
                </span>
                <h3 className="text-3xl font-black text-white tracking-tight mt-3">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-8">
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Stats Highlight */}
              <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/10 rounded-2xl p-4 flex items-center gap-3 text-sm text-[#00F0FF] mb-6 font-bold">
                <TrendingUp className="w-5 h-5" />
                <span>Simulated Client Impact: {selectedProject.metrics}</span>
              </div>

              {/* Tech stack */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-mono mb-3">Implemented Stack:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setFormState(prev => ({
                      ...prev,
                      package: `Standard - ₹1500`,
                      message: `I would like to build a project similar to "${selectedProject.title}". Let’s setup a discovery call.`
                    }));
                    setSelectedProject(null);
                    scrollToSection('contact');
                  }}
                  className="flex-1 py-4 bg-gradient-to-r from-[#007AFF] to-[#00F0FF] text-white font-bold rounded-xl text-center shadow-lg text-xs uppercase tracking-wider"
                >
                  Inquire For Similar Build
                </button>
                <button
                  onClick={() => {
                    alert("This is a live high-fidelity demo representation. Ready to host on your real domain!");
                  }}
                  className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-white"
                >
                  Live Preview
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 12. METHODOLOGY / PROCESS */}
      <section id="process" className="py-24 md:py-32 bg-white/[0.01] border-y border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#D4AF37] bg-[#D4AF37]/5 px-4 py-1.5 rounded-full border border-[#D4AF37]/15">
              THE BLUEPRINT OF SUCCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 mb-4">
              Our Development Process
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              We leverage an agile, rapid launch sequence to ship world-class custom environments safely in days, not months.
            </p>
          </div>

          {/* Process timeline cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processList.map((proc, idx) => (
              <div
                key={idx}
                className="relative bg-[#09090c] border border-white/5 p-8 rounded-[2rem] hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                {/* Floating step step number */}
                <span className="absolute top-6 right-8 text-5xl font-mono font-black text-white/5 select-none">
                  {proc.step}
                </span>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xs font-mono font-extrabold">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {proc.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. ABOUT & WHY CHOOSE */}
      <section id="about" className="py-24 md:py-32 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
            
            {/* About left text */}
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#00F0FF] bg-[#00F0FF]/5 px-4 py-1.5 rounded-full border border-[#00F0FF]/15">
                WHO WE ARE
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 mb-8">
                Pioneering Premium Web Development Tiers
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                CodyBrothers is a dedicated professional web development agency focused on creating premium business websites. We believe that true online value lies in pristine UI styling, high speed load parameters, and solid conversions.
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                Co-founded by Arman & Naksh, our team combines visual layout mastery with technical optimization to build bespoke agency assets that build trust and drive transactions.
              </p>

              {/* Founders cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Founder 1 */}
                <div className="bg-[#09090b] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#00F0FF] to-indigo-600 flex items-center justify-center font-bold text-black font-mono">
                    A
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">Arman</h4>
                    <p className="text-xs text-[#00F0FF] font-mono uppercase tracking-wider">Founder & CEO</p>
                  </div>
                </div>

                {/* Founder 2 */}
                <div className="bg-[#09090b] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-amber-600 flex items-center justify-center font-bold text-black font-mono">
                    N
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">Naksh</h4>
                    <p className="text-xs text-[#D4AF37] font-mono uppercase tracking-wider">Manager</p>
                  </div>
                </div>

              </div>
            </div>

            {/* About Right Why Choose Grid of 8 key advantages */}
            <div className="lg:col-span-6">
              <div className="bg-white/[0.01] border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/5 rounded-full blur-2xl"></div>
                
                <h3 className="text-2xl font-black tracking-tight text-white mb-8">
                  Why Choose CodyBrothers
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {[
                    { t: "Premium UI", d: "Pristine Apple and Stripe-inspired layouts optimized to represent high value." },
                    { t: "Modern Technologies", d: "We construct using lightweight React, modern Tailwind v4, and clean animations." },
                    { t: "Fast Delivery", d: "Get live deployment preview links in as quick as 3 business days." },
                    { t: "Responsive Design", d: "Tested across multiple physical viewport breakpoints for optimal touch targets." },
                    { t: "Affordable Pricing", d: "Agency-grade production starting from ₹1000 - ₹2000 flat one-time rate." },
                    { t: "SEO Friendly", d: "Pre-structured for optimal schema.org search engine semantic recognition." },
                    { t: "Secure Websites", d: "Static frameworks with zero database attack vectors for peace of mind." },
                    { t: "Lifetime Guidance", d: "Get direct consultation guidance pathways on scaling your business infrastructure." }
                  ].map((adv, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"></span>
                        <h4 className="font-extrabold text-white text-sm">{adv.t}</h4>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{adv.d}</p>
                    </div>
                  ))}

                </div>
              </div>
            </div>

          </div>

          {/* Testimonials Block */}
          <div className="border-t border-white/5 pt-24">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-pink-500 bg-pink-500/5 px-4 py-1.5 rounded-full border border-pink-500/15">
                CLIENT FEEDBACK
              </span>
              <h3 className="text-3xl font-bold tracking-tight mt-6">
                Aesthetic Appraisals
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "CodyBrothers completely transformed our gym's digital interface. The custom schedules load instantly on mobile, and clients constantly compliment the glassy design theme.",
                  author: "Fitness Hub Director",
                  stars: 5,
                  tag: "Apex Gym Demo Blueprint"
                },
                {
                  quote: "Highly structured coding layout. The response time from Naksh and Arman was spectacular. They delivered our restaurant portal with Web3Forms in 48 hours.",
                  author: "Culinary Group Owner",
                  stars: 5,
                  tag: "Verve Gastronomy Blueprint"
                },
                {
                  quote: "Stunning attention to visual typography, shadows, and margins. Better conversion optimization parameters than standard agencies that charge 10x the budget.",
                  author: "E-Commerce Venture Capitalist",
                  stars: 5,
                  tag: "Aura Commerce Blueprint"
                }
              ].map((rev, i) => (
                <div key={i} className="bg-[#09090c] border border-white/5 p-8 rounded-3xl flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-[#D4AF37] mb-6">
                      {[...Array(rev.stars)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm italic leading-relaxed mb-6">
                      "{rev.quote}"
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white mb-1">{rev.author}</p>
                    <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase bg-white/5 px-2 py-1 rounded-md border border-white/5">
                      Sample Review • {rev.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 14. INTERACTIVE FAQ ACCORDION */}
      <section id="faq" className="py-24 md:py-32 bg-white/[0.01] border-t border-white/5 z-10 relative">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#00F0FF] bg-[#00F0FF]/5 px-4 py-1.5 rounded-full border border-[#00F0FF]/15">
              FREQUENTLY ANSWERED INQUIRIES
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight mt-6 mb-4">
              Answers To Key Queries
            </h2>
          </div>

          {/* Accordion container */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#09090b] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  className="w-full p-6 text-left flex items-center justify-between font-bold text-white hover:text-[#00F0FF] transition-colors"
                >
                  <span className="text-sm md:text-base pr-4">{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#D4AF37]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {/* Collapsible details content */}
                {openFaqIndex === idx && (
                  <div className="px-6 pb-6 text-gray-400 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4 bg-white/[0.01] animate-in slide-in-from-top-2 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 15. CONTACT SECTION WITH WEB3FORMS INTEGRATION */}
      <section id="contact" className="py-24 md:py-32 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Contact details on Left */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#D4AF37] bg-[#D4AF37]/5 px-4 py-1.5 rounded-full border border-[#D4AF37]/15">
                START YOUR PROJECT
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 mb-4">
                Get A Free Project Quote
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12">
                Submit your scope configurations below. Arman & Naksh will review your response and contact you with a customized design blueprint draft.
              </p>

              {/* Direct Channels */}
              <div className="space-y-6 mb-12">
                
                {/* Email detail */}
                <div className="flex items-center gap-4 p-4 bg-[#09090b] border border-white/5 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">DIRECT EMAIL</p>
                    <a 
                      href="mailto:codybrothers026@gmail.com" 
                      className="text-white hover:text-[#00F0FF] text-sm font-bold font-mono transition-colors"
                    >
                      codybrothers026@gmail.com
                    </a>
                  </div>
                </div>

                {/* Instagram detail */}
                <div className="flex items-center gap-4 p-4 bg-[#09090b] border border-white/5 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-300">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">INSTAGRAM</p>
                    <a 
                      href="https://instagram.com/codybrothers026" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-[#D4AF37] text-sm font-bold transition-colors"
                    >
                      @codybrothers026
                    </a>
                  </div>
                </div>

                {/* Response time notice */}
                <div className="flex items-center gap-3 text-xs text-emerald-400 font-bold bg-emerald-500/5 px-4 py-3 rounded-xl border border-emerald-500/15">
                  <Clock className="w-4 h-4 shrink-0 animate-pulse" />
                  <span>Average discovery response rate: 2 Hours</span>
                </div>

              </div>
            </div>

            {/* Aesthetic Trust Badge */}
            <div className="text-xs text-gray-500 font-mono">
              Designed securely with full client data encryption. Submission streams are handled directly through standard TLS transport protocols.
            </div>
          </div>

          {/* Form on Right */}
          <div className="lg:col-span-7">
            <div className="bg-[#09090c] border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl"></div>

              <h3 className="text-2xl font-extrabold mb-8 tracking-tight">Project Spec Sheets</h3>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Your Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Arman Naksh"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="e.g. details@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Phone Number (WhatsApp)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>

                  {/* Business Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      value={formState.businessName}
                      onChange={handleInputChange}
                      placeholder="e.g. CodyBrothers Enterprises"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Package Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Desired Tier Package</label>
                    <select
                      name="package"
                      value={formState.package}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00F0FF] transition-colors"
                    >
                      <option value="Basic - ₹1000">Basic Tier — ₹1000</option>
                      <option value="Standard - ₹1500">Standard Tier — ₹1500 (Most Popular)</option>
                      <option value="Premium - ₹2000">Premium Tier — ₹2000</option>
                      <option value="Custom Architecture Proposal">Bespoke Custom Project</option>
                    </select>
                  </div>

                  {/* Budget Slider Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Approximate Budget (INR)</label>
                    <select
                      name="budget"
                      value={formState.budget}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00F0FF] transition-colors"
                    >
                      <option value="₹1000 - ₹1500">₹1000 - ₹1500</option>
                      <option value="₹1500 - ₹3000">₹1500 - ₹3000</option>
                      <option value="₹3000 - ₹5000">₹3000 - ₹5000</option>
                      <option value="₹5000+">₹5000+</option>
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-gray-400">Describe Your Requirements</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Describe what your business does and any design features or tabs you explicitly require..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Form Status Notifications */}
                {formStatus === 'success' && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{formResultMessage}</span>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs">
                    {formResultMessage}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  className="w-full py-4.5 bg-white text-black font-extrabold rounded-xl hover:bg-[#00F0FF] transition-all duration-300 disabled:opacity-50 text-xs uppercase tracking-widest"
                >
                  {formStatus === 'submitting' ? 'Transmitting Specs...' : 'Request Project Blueprint'}
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* 16. FLOATING QUICK ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        {/* WhatsApp Channel */}
        <a
          href="https://wa.me/91codybrothers026"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handleLinkHover(true)}
          onMouseLeave={() => handleLinkHover(false)}
          className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_4px_15px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-transform"
          aria-label="Contact via WhatsApp"
        >
          <Phone className="w-5 h-5 fill-white" />
        </a>

        {/* Instagram Channel */}
        <a
          href="https://instagram.com/codybrothers026"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handleLinkHover(true)}
          onMouseLeave={() => handleLinkHover(false)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(238,42,123,0.4)] hover:scale-110 active:scale-95 transition-transform"
          aria-label="Follow CodyBrothers on Instagram"
        >
          <Instagram className="w-5 h-5" />
        </a>

        {/* Scroll Back to Top */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onMouseEnter={() => handleLinkHover(true)}
            onMouseLeave={() => handleLinkHover(false)}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 17. FOOTER */}
      <footer className="bg-black border-t border-white/5 py-16 md:py-24 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Footer Logo Block */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#00F0FF] to-[#D4AF37] rounded-xl flex items-center justify-center font-black text-black">
                CB
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CodyBrothers</span>
            </div>
            
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-sm">
              We design premium business websites that help entities build trust, generate leads and grow online. Crafting custom web assets since 2026.
            </p>
          </div>

          {/* Quick Links Map */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#00F0FF] font-bold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Services</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors">Portfolio</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Services Links Map */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-gray-400 font-bold">Architectures</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button onClick={() => { setFormState(prev => ({ ...prev, package: 'Landing Page' })); scrollToSection('contact'); }} className="hover:text-white transition-colors">Landing Page Tiers</button></li>
              <li><button onClick={() => { setFormState(prev => ({ ...prev, package: 'Business Website' })); scrollToSection('contact'); }} className="hover:text-white transition-colors">Corporate Websites</button></li>
              <li><button onClick={() => { setFormState(prev => ({ ...prev, package: 'E-Commerce Website' })); scrollToSection('contact'); }} className="hover:text-white transition-colors">Stripe E-Commerce</button></li>
              <li><button onClick={() => { setFormState(prev => ({ ...prev, package: 'Website Redesign' })); scrollToSection('contact'); }} className="hover:text-white transition-colors">Code Revitalizations</button></li>
            </ul>
          </div>

          {/* Direct channels links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-bold">Connect Channels</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <p className="text-[10px] uppercase font-mono text-gray-600">INBOX INQUIRY</p>
                <a href="mailto:codybrothers026@gmail.com" className="text-gray-400 hover:text-[#00F0FF] transition-colors font-mono">
                  codybrothers026@gmail.com
                </a>
              </li>
              <li>
                <p className="text-[10px] uppercase font-mono text-gray-600">INSTAGRAM HANDLE</p>
                <a href="https://instagram.com/codybrothers026" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  @codybrothers026
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright notice row */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2026 CodyBrothers. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Security Standards</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Architecture</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
