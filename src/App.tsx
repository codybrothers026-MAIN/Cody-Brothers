import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { googleSignIn } from './lib/firebase';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
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
  ArrowLeft,
  CheckCircle2, 
  Menu, 
  X, 
  FileSpreadsheet,
  LogOut,
  LogIn,
  RefreshCw,
  ExternalLink,
  Lock,
  Database, 
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
  Sliders,
  Settings,
  AlertTriangle
} from 'lucide-react';

// Interfaces
interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  techStack: string[];
  metrics: string;
  link: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  package: string;
  budget: string;
  message: string;
  date: string;
  sheetSynced: boolean;
  emailSynced: boolean;
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

const TESTIMONIALS = [
  {
    quote: "CodyBrothers completely transformed our gym's digital interface. The custom schedules load instantly on mobile, and clients constantly compliment the glassy design theme. The return on investment was immediate.",
    author: "Arjun Mehta",
    role: "Managing Director",
    company: "Apex Fitness Hub",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    tag: "Apex Gym Demo Blueprint"
  },
  {
    quote: "Highly structured coding layout. The response time from Naksh and Arman was spectacular. They delivered our premium restaurant portal with custom booking and synced lead handling in 48 hours.",
    author: "Sneha Rao",
    role: "Executive Head Chef",
    company: "Verve Gastronomy",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    tag: "Verve Gastronomy Blueprint"
  },
  {
    quote: "Stunning attention to visual typography, shadows, and margins. Better conversion optimization parameters than standard enterprise agencies that charge 10x our budget. Highly recommended!",
    author: "Kabir Malhotra",
    role: "Operations Chief",
    company: "Aura Luxury Store",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120",
    tag: "Aura Commerce Blueprint"
  },
  {
    quote: "Blown away by the speed and responsive animation. We got our entire digital portfolio redesigned and deployed in under 4 days. Google PageSpeed is sitting at a solid 99 on mobile.",
    author: "Rohan Das",
    role: "Principal Architect",
    company: "Aether Studios",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
    tag: "Studio Portfolio Blueprint"
  }
];

export default function App() {
  // Navigation & Routing States
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [adminUser, setAdminUser] = useState(() => localStorage.getItem('codybrothers_admin_session') === 'true');

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Navigation & UI States
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Custom Cursor / Parallax mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHovering, setCursorHovering] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Pricing Toggle (Monthly vs Custom)
  const [pricingCycle, setPricingCycle] = useState<'standard' | 'custom'>('standard');

  // Interactive Project Modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Interactive FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Floating Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin View State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminLeads, setAdminLeads] = useState<Lead[]>([]);
  const [adminConfig, setAdminConfig] = useState({
    googleToken: '',
    linkedSheetId: '',
    googleUser: '',
    autoSync: true
  });
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleGoogleAuthorize = async () => {
    setIsAuthorizing(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setAdminConfig(prev => ({
          ...prev,
          googleToken: result.accessToken,
          googleUser: result.user.email || ''
        }));
        
        // Save the configuration to the backend
        const res = await fetch('/api/admin/save-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            googleToken: result.accessToken,
            googleUser: result.user.email || '',
            linkedSheetId: adminConfig.linkedSheetId,
            autoSync: adminConfig.autoSync
          })
        });
        if (res.ok) {
          setToastMessage("✅ Authorized successfully! Google Workspace linked and configurations applied.");
        } else {
          setToastMessage("⚠️ Authorized, but auto-apply failed. Please apply manually.");
        }
      }
    } catch (err: any) {
      console.error(err);
      setToastMessage(`❌ Google Authorization failed: ${err.message || err}`);
    } finally {
      setIsAuthorizing(false);
    }
  };

  // Contact Form State
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

  // Handle Toast timeout
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Load Admin config & leads
  const fetchAdminData = async () => {
    try {
      const [leadsRes, configRes] = await Promise.all([
        fetch('/api/admin/leads').catch(() => null),
        fetch('/api/admin/config').catch(() => null)
      ]);

      if (leadsRes && leadsRes.ok) {
        const contentType = leadsRes.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const leads = await leadsRes.json().catch(() => null);
          if (leads) {
            setAdminLeads(leads);
          }
        } else {
          console.warn("fetchAdminData: /api/admin/leads returned non-JSON response");
        }
      }

      if (configRes && configRes.ok) {
        const contentType = configRes.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const config = await configRes.json().catch(() => null);
          if (config) {
            setAdminConfig(prev => ({
              ...prev,
              googleToken: config.googleToken || '',
              linkedSheetId: config.linkedSheetId || '',
              googleUser: config.googleUser || '',
              autoSync: config.autoSync !== undefined ? config.autoSync : true
            }));
          }
        } else {
          console.warn("fetchAdminData: /api/admin/config returned non-JSON response");
        }
      }
    } catch (e) {
      console.warn("Error fetching admin metrics gracefully:", e);
    }
  };

  // Poll leads list for automatic refresh in Admin Panel (Requirement 4)
  useEffect(() => {
    fetchAdminData();
    // Fetch initial configuration on mount

    const interval = setInterval(() => {
      fetchAdminData();
    }, 3000); // Poll every 3 seconds for dynamic updates
    return () => clearInterval(interval);
  }, []);

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

  // Custom Cursor tracking & Parallax mouse position
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
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

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

  // Save admin config details
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    try {
      const res = await fetch('/api/admin/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminConfig)
      });
      if (res.ok) {
        setToastMessage("⚙️ Google Workspace configurations saved successfully!");
      } else {
        setToastMessage("❌ Failed to save configuration.");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("❌ Network error saving configuration.");
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Clear leads
  const handleClearLeads = async () => {
    if (window.confirm("Are you sure you want to clear all archived backup leads? This does not delete them from Google Sheets.")) {
      try {
        const res = await fetch('/api/admin/clear-leads', { method: 'POST' });
        if (res.ok) {
          setAdminLeads([]);
          setToastMessage("🗑️ Leads registry cleared successfully.");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Handle Form Submission with synchronization (Requirements 1-10)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormResultMessage('');

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          business: formState.businessName,
          package: formState.package,
          budget: formState.budget,
          message: formState.message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus('success');
        const successMsg = data.message || "✅ Request sent successfully!\nWe'll contact you within 24 hours.";
        setFormResultMessage(successMsg);
        setToastMessage("✅ Request sent successfully!");

        // Reset all fields
        setFormState({
          name: '',
          email: '',
          phone: '',
          businessName: '',
          package: 'Standard - ₹1500',
          budget: '₹1500 - ₹3000',
          message: ''
        });

        // Trigger dynamic refresh on admin state
        fetchAdminData();
      } else {
        setFormStatus('error');
        setFormResultMessage(data.message || "❌ Failed to send request.");
        setToastMessage(data.message || "❌ Failed to send request.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setFormStatus('error');
      setFormResultMessage("❌ Failed to send request.");
      setToastMessage("❌ Failed to send request.");
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
      desc: "Mouth-watering modern interfaces with responsive menus, table booking integrations, and direct WhatsApp ordering support.",
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
      q: "What is Formspree and how do notifications work?",
      a: "Formspree is a secure, high-speed contact form handler. When a client submits a form on your website, you instantly receive an email with their details. No complex server database is needed, keeping your site fast and free from database maintenance fees."
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

  // Mouse Parallax Calculation helper
  const calculateParallax = (factor: number) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  if (currentPath === '/admin') {
    return (
      <AdminLogin 
        onLoginSuccess={() => {
          setAdminUser(true);
          localStorage.setItem('codybrothers_admin_session', 'true');
          navigateTo('/admin/dashboard');
        }}
        navigateTo={navigateTo}
      />
    );
  }

  if (currentPath === '/admin/dashboard') {
    if (!adminUser) {
      // Unauthenticated users are redirected from /admin/dashboard to /admin
      setTimeout(() => {
        navigateTo('/admin');
      }, 0);
      return null;
    }
    return (
      <AdminDashboard 
        adminLeads={adminLeads}
        fetchAdminData={fetchAdminData}
        onLogout={() => {
          setAdminUser(false);
          localStorage.removeItem('codybrothers_admin_session');
          navigateTo('/admin');
        }}
        adminConfig={adminConfig}
        setAdminConfig={setAdminConfig}
        handleGoogleAuthorize={handleGoogleAuthorize}
        isAuthorizing={isAuthorizing}
        isSavingConfig={isSavingConfig}
        setIsSavingConfig={setIsSavingConfig}
        setToastMessage={setToastMessage}
        navigateTo={navigateTo}
      />
    );
  }

  return (
    <div id="app-container" className="min-h-screen bg-[#030205] text-gray-100 font-sans overflow-x-hidden selection:bg-[#00F0FF]/30 selection:text-white relative">
      <div className="noise-overlay" />

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

      {/* 3. FUTURISTIC LAUNCH PRELOADER */}
      {isLoading && (
        <div id="preloader" className="fixed inset-0 bg-[#020204] z-[10000] flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center"
          >
            {/* Pulsing ring */}
            <div className="w-20 h-20 rounded-full border border-white/5 border-t-[#00F0FF] border-b-[#D4AF37] animate-spin mb-8 shadow-[0_0_30px_rgba(0,240,255,0.15)]" />
            
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#00F0FF] to-[#D4AF37] rounded-xl flex items-center justify-center font-black text-black text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)]">CB</div>
              <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 font-display">CODYBROTHERS</span>
            </div>
            <p className="text-[10px] text-[#00F0FF] uppercase tracking-[0.4em] font-mono">Premium Web Architects</p>
          </motion.div>
        </div>
      )}

      {/* 4. PREMIUM BACKGROUND WITH AURORA GRADIENTS, RADIAL GLOWS & GRID (Requirement 1 & 7-10) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Luxury Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '48px 48px' 
          }} 
        />

        {/* Floating Blurred Glow Orbs with Parallax Effect */}
        <motion.div 
          style={{
            x: calculateParallax(0.04).x,
            y: calculateParallax(0.04).y,
          }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tr from-[#007AFF] to-[#00F0FF] opacity-[0.14] blur-[140px] rounded-full mesh-glow-blue" 
        />
        <motion.div 
          style={{
            x: calculateParallax(-0.03).x,
            y: calculateParallax(-0.03).y,
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tr from-[#D4AF37] to-[#F5A623] opacity-[0.09] blur-[140px] rounded-full mesh-glow-gold" 
        />

        {/* Dynamic Glowing Lines / Shooting network lines */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00F0FF]/20 to-transparent" />
        <div className="absolute top-0 left-2/3 w-[1px] h-full bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Premium Rotating Gradient Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full border border-dashed border-[#00F0FF]/10 opacity-30 pointer-events-none" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full border border-dashed border-[#D4AF37]/15 opacity-25 pointer-events-none" 
        />
      </div>

      {/* 5. LUXURY GLASS NAVBAR (Requirement 5) */}
      <header id="navbar" className="sticky top-0 w-full h-20 border-b border-white/5 backdrop-blur-md bg-slate-950/40 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo on Left */}
          <div 
            onClick={() => scrollToSection('home')} 
            onMouseEnter={() => handleLinkHover(true)}
            onMouseLeave={() => handleLinkHover(false)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Luxury Monogram Square Logo */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-950 border border-white/10 group-hover:border-[#00F0FF]/40 transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.15)] group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/15 via-transparent to-[#D4AF37]/15" />
              <span className="relative font-display font-black text-lg tracking-tighter text-white">
                <span className="text-[#00F0FF]">C</span>
                <span className="text-[#D4AF37] -ml-[1px]">B</span>
              </span>
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#D4AF37] rounded-tl-sm" />
              <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#00F0FF] rounded-br-sm" />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 font-display">
                CodyBrothers
              </span>
              <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#00F0FF]">
                Web Architects
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links with animated hover underline */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-gray-400">
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
                  <motion.span 
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00F0FF] to-[#D4AF37]" 
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action buttons on right */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => handleLinkHover(true)}
              onMouseLeave={() => handleLinkHover(false)}
              className="relative px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-[#00F0FF] hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Actions and menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => handleLinkHover(true)}
              onMouseLeave={() => handleLinkHover(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden absolute top-20 left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 z-40"
            >
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
                    className={`text-sm uppercase font-bold tracking-widest transition-colors ${
                      activeSection === link.id ? 'text-[#00F0FF]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('contact')}
                  className="mt-4 w-full py-3.5 bg-white text-black font-bold rounded-xl text-xs uppercase tracking-widest active:scale-95 transition-all shadow-md"
                >
                  Get Free Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 6. HERO SECTION (Requirements 1-3) */}
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center py-12 md:py-20 z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Agency Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-[#00F0FF] mb-6 w-fit shadow-[0_0_15px_rgba(0,240,255,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>We Build Websites That Grow Your Business.</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-8 font-display">
              Build Websites <br />
              That Grow <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-white to-[#D4AF37] drop-shadow-[0_2px_15px_rgba(0,240,255,0.15)] animate-pulse">
                Your Business.
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed mb-10">
              We create premium, high-converting websites that help businesses build trust, generate leads and grow faster online.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#007AFF] to-[#00F0FF] hover:opacity-90 text-white font-extrabold rounded-2xl shadow-[0_8px_30px_rgba(0,122,255,0.35)] hover:scale-[1.02] transition-all duration-300 text-xs uppercase tracking-wider cursor-pointer"
              >
                Get Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/20 text-xs uppercase tracking-wider cursor-pointer"
              >
                View Portfolio
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </div>

          {/* Hero Right Glass Card */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            
            {/* Soft backdrop radial glow */}
            <div className="absolute w-72 h-72 bg-gradient-to-r from-[#00F0FF]/15 to-[#D4AF37]/15 rounded-full blur-3xl -z-10 animate-pulse" />

            {/* Premium Gold & Electric Blue Interactive Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ rotateY: 8, rotateX: -4, scale: 1.01 }}
              className="relative w-full max-w-[360px] p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-[#D4AF37]/30 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <div className="bg-[#0b0a10]/95 backdrop-blur-3xl p-8 rounded-[23px] border border-white/5 flex flex-col relative overflow-hidden">
                
                {/* Glow spots */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F0FF]/10 rounded-full blur-2xl" />

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.2em] mb-1 flex items-center gap-1">
                      <span className="inline-block">⭐</span> MOST POPULAR TIER
                    </p>
                    <h3 className="text-2xl font-bold text-white tracking-tight font-display">Standard</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white tracking-tight">₹1500</span>
                    <p className="text-[9px] text-gray-500 font-mono">One-Time Fee</p>
                  </div>
                </div>

                <div className="h-px bg-white/5 mb-6" />

                <ul className="space-y-3.5 mb-8 flex-1">
                  {[
                    "Multi Page Website Architectures",
                    "Payment Gateway Custom Integration",
                    "WhatsApp Business Messenger Hook",
                    "Secure Lead Tracking System",
                    "Search Engine Schema Optimization",
                    "5 Days Handcrafted Delivery"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF] text-[9px] font-extrabold border border-[#00F0FF]/20 shrink-0">
                        ✓
                      </div>
                      <span className="font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setFormState(prev => ({ ...prev, package: 'Standard - ₹1500', budget: '₹1500 - ₹3000' }));
                    scrollToSection('contact');
                  }}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F5A623] hover:opacity-90 text-black font-extrabold rounded-xl transition-all text-xs uppercase tracking-widest shadow-[0_5px_20px_rgba(212,175,55,0.2)] cursor-pointer"
                >
                  Choose Standard
                </button>
              </div>

              {/* Decorative side badges */}
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-950 border border-[#D4AF37]/40 rounded-full flex items-center justify-center text-lg shadow-xl z-20 animate-bounce duration-[3000ms]">
                ✨
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 7. STATISTICS ROW */}
      <section className="relative border-y border-white/5 py-12 bg-white/[0.01] backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-6 justify-between items-stretch">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 flex-1">
            
            {/* Stat 1 */}
            <div className="flex flex-col justify-center border-l border-[#00F0FF]/40 pl-6 group">
              <span className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1 group-hover:text-[#00F0FF] transition-colors">
                150+
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">
                Designs Handcrafted
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col justify-center border-l border-[#D4AF37]/40 pl-6 group">
              <span className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1 group-hover:text-[#D4AF37] transition-colors">
                98%
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">
                Conversion Success
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col justify-center border-l border-pink-500/40 pl-6 group">
              <span className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1 group-hover:text-pink-500 transition-colors">
                24/7
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">
                Continuous Support
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col justify-center border-l border-emerald-500/40 pl-6 group">
              <span className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1 group-hover:text-emerald-500 transition-colors">
                2 Hours
              </span>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">
                Turnaround Response
              </span>
            </div>

          </div>

          {/* Founders Bio Quick Badge */}
          <div className="border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-10 flex items-center gap-4 shrink-0">
            <div className="flex -space-x-3">
              <div className="w-9 h-9 rounded-full border border-black bg-gradient-to-tr from-gray-800 to-gray-950 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-lg">A</div>
              <div className="w-9 h-9 rounded-full border border-black bg-gradient-to-tr from-zinc-700 to-zinc-950 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-lg">N</div>
            </div>
            <div className="text-left">
              <p className="text-xs text-white font-bold">Founded by Arman & Naksh</p>
              <p className="text-[9px] text-[#00F0FF] font-mono tracking-wider">PREMIUM DIGITAL CRAFTSMEN</p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. SERVICES SECTION */}
      <section id="services" className="py-20 md:py-28 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#00F0FF] bg-[#00F0FF]/5 px-4 py-1.5 rounded-full border border-[#00F0FF]/15">
              EXPERTISE & SOLUTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-6 mb-4 font-display">
              Our Premium Services
            </h2>
            <p className="text-gray-400 text-sm">
              We design and build bespoke high-end digital products tailored strictly for your target conversion goals. Click to view specifics.
            </p>
          </div>

          {/* Services Grid with staggered revealing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((srv, idx) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group relative p-[1px] bg-white/5 border border-white/5 rounded-3xl hover:border-[#00F0FF]/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00F0FF]/5 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-slate-950/80 backdrop-blur-xl p-8 rounded-[23px] h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3.5 bg-white/[0.02] border border-white/10 rounded-2xl group-hover:bg-[#00F0FF]/10 group-hover:border-[#00F0FF]/20 transition-all duration-300">
                        {srv.icon}
                      </div>
                      <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-gray-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00F0FF] transition-colors font-display">
                      {srv.title}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed mb-6">
                      {srv.desc}
                    </p>
                  </div>

                  <div 
                    onClick={() => {
                      setFormState(prev => ({ 
                        ...prev, 
                        package: `${srv.title} Custom Package`,
                        message: `Hi, I am interested in your "${srv.title}" service. Please provide further information.`
                      }));
                      scrollToSection('contact');
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-500 group-hover:text-white transition-colors mt-auto cursor-pointer"
                  >
                    Select this service
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. PRICING TIERS */}
      <section id="pricing" className="py-20 md:py-28 bg-white/[0.01] border-y border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#D4AF37] bg-[#D4AF37]/5 px-4 py-1.5 rounded-full border border-[#D4AF37]/15">
              CLEAR TRANSPARENT PRICING
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-6 mb-4 font-display">
              Invest In Digital Supremacy
            </h2>
            <p className="text-gray-400 text-sm">
              Choose the perfect tier configured with precise capabilities to supercharge your business online. No hidden variables.
            </p>
          </div>

          {/* Pricing Cycle Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 p-1 rounded-full border border-white/10 flex items-center">
              <button
                onClick={() => setPricingCycle('standard')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  pricingCycle === 'standard' 
                    ? 'bg-gradient-to-r from-[#007AFF] to-[#00F0FF] text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Fixed Tiers
              </button>
              <button
                onClick={() => setPricingCycle('custom')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              
              {/* Basic Tier */}
              <div className="bg-slate-950/80 border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                <div>
                  <div className="mb-6">
                    <span className="text-[9px] font-bold font-mono tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded-full uppercase border border-[#00F0FF]/20">
                      Starter Package
                    </span>
                    <h3 className="text-xl font-bold mt-4 mb-2 font-display">Basic</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white">₹1000</span>
                      <span className="text-xs text-gray-500 font-mono">One-Time</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 my-6" />

                  <ul className="space-y-4 mb-8">
                    {[
                      "One Luxury Landing Page Design",
                      "Fully Mobile Responsive Layouts",
                      "Contact Information Display",
                      "Interactive Lead Generation Form",
                      "WhatsApp Floating Link Integration",
                      "3 Days Handcrafted Delivery"
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
                  className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  Get Started
                </button>
              </div>

              {/* Standard Tier */}
              <div className="relative bg-slate-950 border-2 border-[#D4AF37] rounded-3xl p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(212,175,55,0.1)] transform lg:scale-[1.03] transition-all duration-300">
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F5A623] text-black text-[9px] font-black tracking-[0.2em] uppercase px-4 py-1 rounded-full">
                  MOST POPULAR BUILD
                </div>

                <div>
                  <div className="mb-6">
                    <span className="text-[9px] font-bold font-mono tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full uppercase border border-[#D4AF37]/20">
                      Growth Builder
                    </span>
                    <h3 className="text-2xl font-black mt-4 mb-2 font-display">Standard</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white">₹1500</span>
                      <span className="text-xs text-gray-400 font-mono">One-Time</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 my-6" />

                  <ul className="space-y-4 mb-8">
                    {[
                      "Complete Multi-Page Enterprise Setup",
                      "Payment Gateway Custom Integration",
                      "Interactive Leads Sync Form & Gmail Alert",
                      "Google Maps Integration Interface",
                      "Search Engine Schema Optimization",
                      "5 Days Handcrafted Delivery"
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
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#F5A623] hover:opacity-90 text-black font-extrabold rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Lock In Plan
                </button>
              </div>

              {/* Premium Tier */}
              <div className="bg-slate-950/80 border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-white/10 transition-all duration-300">
                <div>
                  <div className="mb-6">
                    <span className="text-[9px] font-bold font-mono tracking-widest text-pink-500 bg-pink-500/10 px-3 py-1 rounded-full uppercase border border-pink-500/20">
                      Ultimate Authority
                    </span>
                    <h3 className="text-xl font-bold mt-4 mb-2 font-display">Premium</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white">₹2000</span>
                      <span className="text-xs text-gray-500 font-mono">One-Time</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/5 my-6" />

                  <ul className="space-y-4 mb-8">
                    {[
                      "Interactive Admin Leads Control Center",
                      "Google Sheets Live-Sync Automated API",
                      "Instant Sync SMTP Email Notifications",
                      "Client Contacts Directory Registry",
                      "Formspree High-Security API Proxying",
                      "30 Days of Handcrafted Tech Support",
                      "7 Days Premium Hand-Off"
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
                  className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  Order Premium
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-slate-950/60 border border-[#D4AF37]/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto backdrop-blur-2xl relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.05)]">
              <Award className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 animate-bounce" />
              <h3 className="text-2xl font-extrabold mb-4 font-display">Need a Custom Developed Masterpiece?</h3>
              <p className="text-gray-400 max-w-xl mx-auto mb-8 text-xs leading-relaxed">
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
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#B8960C] text-black font-extrabold rounded-xl text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                >
                  Discuss Custom Plan
                </button>
                <a
                  href="mailto:codybrothers026@gmail.com"
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider transition-all"
                >
                  Direct Email Inquiry
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 10. PORTFOLIO SHOWCASE */}
      <section id="portfolio" className="py-20 md:py-28 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#00F0FF] bg-[#00F0FF]/5 px-4 py-1.5 rounded-full border border-[#00F0FF]/15">
              OUR WORK GALLERY
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-6 mb-4 font-display">
              Real Craftsmanship Demo
            </h2>
            <p className="text-gray-400 text-sm">
              We focus on building functional digital architectures. Explore our real simulation blueprints below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((proj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProject(proj)}
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                className="group bg-slate-950/80 border border-white/5 rounded-3xl overflow-hidden hover:border-[#00F0FF]/40 cursor-pointer transition-all duration-500 shadow-md"
              >
                <div className="relative aspect-[1.6] overflow-hidden bg-zinc-900 border-b border-white/5">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-white/15 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-white uppercase">
                    Demo Project
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#00F0FF] flex items-center justify-center text-black shadow-lg">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-[10px] text-[#D4AF37] font-mono tracking-wider mb-2 uppercase">
                    {proj.category}
                  </p>
                  <h3 className="text-base font-extrabold text-white group-hover:text-[#00F0FF] transition-colors mb-4 font-display">
                    {proj.title}
                  </h3>
                  
                  <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/15 rounded-xl px-4 py-2 text-xs font-bold text-[#00F0FF] flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    <span>{proj.metrics}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. PORTFOLIO DETAILS DIALOG */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative bg-slate-950 border border-white/10 rounded-3xl max-w-2xl w-full overflow-y-auto max-h-[90vh] shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 transition-colors z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[16/10] bg-zinc-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="text-[9px] text-[#D4AF37] font-mono uppercase tracking-widest bg-black/50 px-2.5 py-1 rounded-full border border-white/10">
                    Demo Simulation Blueprint
                  </span>
                  <h3 className="text-xl font-black text-white tracking-tight mt-2 font-display">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-300 text-xs leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/10 rounded-xl p-4 flex items-center gap-3 text-xs text-[#00F0FF] mb-6 font-bold">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>Verified Client Matrix: {selectedProject.metrics}</span>
                </div>

                <div className="mb-6">
                  <p className="text-[9px] uppercase tracking-wider text-gray-500 font-mono mb-2">Build Tech Stack:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
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
                    className="flex-1 py-3 bg-gradient-to-r from-[#007AFF] to-[#00F0FF] text-white font-bold rounded-xl text-xs uppercase tracking-widest cursor-pointer"
                  >
                    Inquire Similar Build
                  </button>
                  <button
                    onClick={() => {
                      setToastMessage("Live demo is simulated using high-speed edge environments.");
                      setSelectedProject(null);
                    }}
                    className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase text-white cursor-pointer"
                  >
                    Live Demo
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 12. METHODOLOGY / PROCESS */}
      <section id="process" className="py-20 md:py-28 bg-white/[0.01] border-y border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#D4AF37] bg-[#D4AF37]/5 px-4 py-1.5 rounded-full border border-[#D4AF37]/15">
              THE BLUEPRINT OF SUCCESS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-6 mb-4 font-display">
              Our Development Process
            </h2>
            <p className="text-gray-400 text-sm">
              We leverage an agile, rapid launch sequence to ship world-class custom environments safely in days, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processList.map((proc, idx) => (
              <div
                key={idx}
                className="relative bg-slate-950/80 border border-white/5 p-8 rounded-3xl hover:border-[#D4AF37]/30 transition-all duration-300"
              >
                <span className="absolute top-6 right-8 text-5xl font-mono font-black text-white/5 select-none">
                  {proc.step}
                </span>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-[10px] font-mono font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {proc.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. ABOUT & WHY CHOOSE */}
      <section id="about" className="py-20 md:py-28 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
            
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#00F0FF] bg-[#00F0FF]/5 px-4 py-1.5 rounded-full border border-[#00F0FF]/15">
                WHO WE ARE
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-6 mb-6 font-display">
                Pioneering Premium Web Development Tiers
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                CodyBrothers is a dedicated professional web development agency focused on creating premium business websites. We believe that true online value lies in pristine UI styling, high speed load parameters, and solid conversions.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed mb-8">
                Co-founded by Arman & Naksh, our team combines visual layout mastery with technical optimization to build bespoke agency assets that build trust and drive transactions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/80 border border-white/5 p-4 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#00F0FF] to-indigo-600 flex items-center justify-center font-bold text-black font-mono text-sm">A</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Arman</h4>
                    <p className="text-[9px] text-[#00F0FF] font-mono uppercase tracking-wider">Founder & CEO</p>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-white/5 p-4 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#D4AF37] to-amber-600 flex items-center justify-center font-bold text-black font-mono text-sm">N</div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Naksh</h4>
                    <p className="text-[9px] text-[#D4AF37] font-mono uppercase tracking-wider">Manager</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F0FF]/5 rounded-full blur-2xl" />
                
                <h3 className="text-lg font-bold text-white mb-6 font-display">
                  Why Choose CodyBrothers
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { t: "Premium UI Style", d: "Pristine layouts optimized to represent corporate dominance." },
                    { t: "Modern Frameworks", d: "Constructed using lightweight React and clean animations." },
                    { t: "Fast Execution", d: "Receive live staging links in as quick as 3 business days." },
                    { t: "Fluid Responsiveness", d: "Tested across real viewports for fluid mobile styling." },
                    { t: "Value Architecture", d: "Dominant designs starting at ₹1000 - ₹2000 flat rates." },
                    { t: "SEO Readiness", d: "Pre-configured for optimal Google Search Indexing schema." },
                    { t: "High-Grade Security", d: "Highly secure architecture parameters with zero databases." },
                    { t: "Expert Consultation", d: "Direct pathways from our team on marketing scaling." }
                  ].map((adv, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                        <h4 className="font-extrabold text-white text-xs">{adv.t}</h4>
                      </div>
                      <p className="text-gray-400 text-[11px] leading-relaxed">{adv.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Testimonials */}
          <div className="border-t border-white/5 pt-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-pink-500 bg-pink-500/5 px-4 py-1.5 rounded-full border border-pink-500/15">
                CLIENT REVIEWS
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-6 mb-4 font-display">
                Aesthetic Appraisals
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {TESTIMONIALS.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-950/80 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-[#00F0FF]/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-0.5 text-[#D4AF37]">
                        {[...Array(testimonial.rating)].map((_, s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-[#D4AF37] stroke-none" />
                        ))}
                      </div>
                      <span className="text-3xl font-serif text-[#00F0FF]/10 leading-none select-none">“</span>
                    </div>
                    
                    <p className="text-gray-300 text-xs italic leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-auto">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-9 h-9 rounded-full object-cover border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-xs truncate">{testimonial.author}</h4>
                      <p className="text-[10px] text-gray-500 font-mono truncate">
                        {testimonial.role} at <span className="text-[#00F0FF]">{testimonial.company}</span>
                      </p>
                    </div>
                    <span className="text-[9px] text-gray-400 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 14. FAQ ACCORDION */}
      <section id="faq" className="py-20 md:py-28 bg-white/[0.01] border-t border-white/5 z-10 relative">
        <div className="max-w-3xl mx-auto px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#00F0FF] bg-[#00F0FF]/5 px-4 py-1.5 rounded-full border border-[#00F0FF]/15">
              FREQUENTLY ANSWERED INQUIRIES
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-6 mb-4 font-display">
              Answers To Key Queries
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-white hover:text-[#00F0FF] transition-colors cursor-pointer"
                >
                  <span className="text-xs md:text-sm pr-4">{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 text-gray-400 text-xs leading-relaxed border-t border-white/5 pt-4 bg-white/[0.01] animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 15. CONTACT SECTION WITH DYNAMIC SYNC NOTIFICATIONS */}
      <section id="contact" className="py-20 md:py-28 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Details Left */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#D4AF37] bg-[#D4AF37]/5 px-4 py-1.5 rounded-full border border-[#D4AF37]/15">
                START YOUR PROJECT
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-6 mb-4 font-display">
                Get A Free Project Quote
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed mb-10">
                Submit your scope configurations below. Arman & Naksh will review your response and contact you with a customized design blueprint draft.
              </p>

              <div className="space-y-4 mb-10">
                
                <div className="flex items-center gap-4 p-4 bg-slate-950 border border-white/5 rounded-2xl">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] uppercase font-mono tracking-wider text-gray-500">DIRECT EMAIL</p>
                    <a href="mailto:codybrothers026@gmail.com" className="text-white hover:text-[#00F0FF] text-xs font-bold font-mono">
                      codybrothers026@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-950 border border-white/5 rounded-2xl">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-gray-300">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] uppercase font-mono tracking-wider text-gray-500">INSTAGRAM HANDLE</p>
                    <a href="https://instagram.com/codybrothers026" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D4AF37] text-xs font-bold font-mono">
                      @codybrothers026
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-emerald-400 font-bold bg-emerald-500/5 px-4 py-3 rounded-xl border border-emerald-500/15">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Average Response Rate: 2 Hours</span>
                </div>

              </div>
            </div>

            <div className="text-[10px] text-gray-500 font-mono">
              Secured connection protocol enabled. Form submissions automatically stream synchronization commands using modern HTTPS encryption channels.
            </div>
          </div>

          {/* Form on Right */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950/80 border border-white/10 p-8 rounded-3xl shadow-2xl relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl" />

              <h3 className="text-xl font-bold mb-6 tracking-tight font-display">Project Specifications</h3>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Naksh Arman"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="e.g. naksh@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Phone Number (WhatsApp)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      value={formState.businessName}
                      onChange={handleInputChange}
                      placeholder="e.g. CodyBrothers Labs"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Desired Package Option</label>
                    <select
                      name="package"
                      value={formState.package}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00F0FF] transition-colors"
                    >
                      <option value="Basic - ₹1000">Basic Tier — ₹1000</option>
                      <option value="Standard - ₹1500">Standard Tier — ₹1500</option>
                      <option value="Premium - ₹2000">Premium Tier — ₹2000</option>
                      <option value="Custom Architecture Proposal">Bespoke Custom Blueprint</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Approximate Budget (INR)</label>
                    <select
                      name="budget"
                      value={formState.budget}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00F0FF] transition-colors"
                    >
                      <option value="₹1000 - ₹1500">₹1000 - ₹1500</option>
                      <option value="₹1500 - ₹3000">₹1500 - ₹3000</option>
                      <option value="₹3000 - ₹5000">₹3000 - ₹5000</option>
                      <option value="₹5000+">₹5000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Message / Requirements</label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Describe what your business does and any custom features you explicitly require..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00F0FF] transition-colors resize-none"
                  />
                </div>

                {/* Form Result State with detailed error logs support (Requirements 7-8) */}
                <AnimatePresence>
                  {formResultMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 border rounded-xl text-xs flex items-start gap-2.5 ${
                        formStatus === 'success' 
                          ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' 
                          : formResultMessage.includes('saved, but email notification failed') || formResultMessage.includes('sent, but Google Sheets save failed')
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 font-semibold'
                            : 'bg-red-500/10 border-red-500/25 text-red-400'
                      }`}
                    >
                      {formStatus === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      )}
                      <span className="whitespace-pre-line">{formResultMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  className="w-full py-3.5 bg-white text-black font-extrabold rounded-xl hover:bg-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300 disabled:opacity-50 text-[10px] uppercase tracking-widest cursor-pointer"
                >
                  {formStatus === 'submitting' ? 'Transmitting Specifications...' : 'Request Project Blueprint'}
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* 16. DYNAMICALLY REFRESHING ADMIN PANEL DIALOG (Requirement 4-5) */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ scale: 0.98, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 15 }}
              className="bg-[#0b0a11] border border-white/10 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-slate-950/50 border-b border-white/5 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#D4AF37] to-[#F5A623] flex items-center justify-center text-black font-black text-xs">
                    CB
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-wider uppercase font-display">CodyBrothers Lead Center</h2>
                    <p className="text-[9px] text-[#00F0FF] font-mono tracking-widest uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Dynamic Sync Online (Polling active)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchAdminData}
                    className="p-2 border border-white/5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                    title="Manual Refresh"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsAdminOpen(false)}
                    className="p-2 border border-white/5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Content Pane */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Configuration Left Panel */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl">
                    <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold font-display mb-4 flex items-center gap-1.5">
                      <Settings className="w-4 h-4" />
                      API Configurations
                    </h3>

                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={handleGoogleAuthorize}
                        disabled={isAuthorizing}
                        className="w-full flex items-center justify-center gap-3 py-2.5 bg-slate-900 border border-white/10 hover:border-white/20 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 hover:bg-slate-800"
                      >
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4.5 h-4.5 shrink-0">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                        {isAuthorizing ? 'Authorizing Google...' : 'Link Google via OAuth'}
                      </button>
                      <div className="flex items-center gap-2 my-3 select-none">
                        <div className="h-[1px] bg-white/5 flex-1" />
                        <span className="text-[8px] font-mono uppercase text-gray-500">or manual configuration</span>
                        <div className="h-[1px] bg-white/5 flex-1" />
                      </div>
                    </div>

                    <form onSubmit={handleSaveConfig} className="space-y-4">
                      
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-gray-400">Google Sheet ID</label>
                        <input
                          type="text"
                          value={adminConfig.linkedSheetId}
                          onChange={(e) => setAdminConfig({ ...adminConfig, linkedSheetId: e.target.value })}
                          placeholder="Spreadsheet ID string"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-gray-400">Google Access Token</label>
                        <textarea
                          rows={3}
                          value={adminConfig.googleToken}
                          onChange={(e) => setAdminConfig({ ...adminConfig, googleToken: e.target.value })}
                          placeholder="Paste OAuth access token"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF] resize-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase text-gray-400">Admin Email Account</label>
                        <input
                          type="text"
                          value={adminConfig.googleUser}
                          onChange={(e) => setAdminConfig({ ...adminConfig, googleUser: e.target.value })}
                          placeholder="codybrothers026@gmail.com"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSavingConfig}
                        className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F5A623] text-black font-extrabold rounded-lg text-[9px] uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {isSavingConfig ? 'Saving...' : 'Apply API Config'}
                      </button>

                    </form>

                    <div className="mt-4 p-3 border border-white/5 rounded-lg bg-white/[0.01]">
                      <p className="text-[10px] text-gray-400 leading-relaxed font-mono">
                        💡 Admin Credentials cache dynamically on the server. Submit a lead on the live site to test direct Sheets & Gmail updates instantly.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleClearLeads}
                    className="w-full py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 hover:border-red-500/30 text-red-400 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Clear Leads Registry
                  </button>
                </div>

                {/* Submissions Right Panel */}
                <div className="lg:col-span-8 flex flex-col h-full min-h-[300px]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs uppercase tracking-widest text-white font-bold font-display">
                      Submissions Stream ({adminLeads.length})
                    </h3>
                    <p className="text-[9px] text-[#00F0FF] font-mono uppercase tracking-wider">
                      Dynamic Live Update Enabled
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {adminLeads.length === 0 ? (
                      <div className="h-48 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-gray-500 bg-white/[0.01]">
                        <FileSpreadsheet className="w-8 h-8 text-gray-600 mb-2" />
                        <p className="text-xs font-mono uppercase tracking-wider">No Leads Submissions Captured yet.</p>
                      </div>
                    ) : (
                      adminLeads.map((lead) => (
                        <div 
                          key={lead.id}
                          className="bg-slate-950/60 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <div>
                              <h4 className="text-sm font-bold text-white font-display">{lead.name}</h4>
                              <p className="text-[11px] text-gray-400 font-mono mt-0.5">{lead.email} | {lead.phone}</p>
                            </div>
                            <span className="text-[9px] text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 whitespace-nowrap">
                              {lead.date}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 my-2.5 p-3 border border-white/5 rounded-xl bg-slate-950/40 text-xs font-mono">
                            <div>
                              <span className="text-[9px] text-gray-500 uppercase block">Tier</span>
                              <span className="text-white font-semibold">{lead.package}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-gray-500 uppercase block">Budget</span>
                              <span className="text-[#D4AF37] font-semibold">{lead.budget}</span>
                            </div>
                            {lead.business && (
                              <div className="col-span-2">
                                <span className="text-[9px] text-gray-500 uppercase block">Company</span>
                                <span className="text-white">{lead.business}</span>
                              </div>
                            )}
                          </div>

                          {lead.message && (
                            <p className="text-xs text-gray-400 italic bg-white/[0.01] border border-white/5 p-3 rounded-xl mb-3">
                              "{lead.message}"
                            </p>
                          )}

                          {/* Sync status tracks (Requirement 5) */}
                          <div className="flex gap-4 border-t border-white/5 pt-3 mt-1.5 text-[10px] font-mono justify-end">
                            <span className="flex items-center gap-1">
                              Google Sheet: 
                              {lead.sheetSynced ? (
                                <span className="text-emerald-400 font-bold">● Synced</span>
                              ) : (
                                <span className="text-amber-500 font-semibold" title="Unsynced / Config missing">○ Offline</span>
                              )}
                            </span>
                            <span className="flex items-center gap-1">
                              Email Alert: 
                              {lead.emailSynced ? (
                                <span className="text-emerald-400 font-bold">● Sent</span>
                              ) : (
                                <span className="text-amber-500 font-semibold" title="Unsent / Config missing">○ Offline</span>
                              )}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREMIUM TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-6 right-6 md:right-auto md:max-w-md bg-[#0b0a11]/95 backdrop-blur-xl border border-[#00F0FF]/30 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,240,255,0.15)] z-[100] flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-200 font-semibold leading-relaxed">
                {toastMessage}
              </p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-gray-500 hover:text-white p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION CHANNELS */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a
          href="https://wa.me/91codybrothers026"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handleLinkHover(true)}
          onMouseLeave={() => handleLinkHover(false)}
          className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:scale-110 active:scale-95 transition-transform"
          aria-label="Contact via WhatsApp"
        >
          <Phone className="w-4.5 h-4.5 fill-white stroke-none" />
        </a>

        <a
          href="https://instagram.com/codybrothers026"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => handleLinkHover(true)}
          onMouseLeave={() => handleLinkHover(false)}
          className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(238,42,123,0.3)] hover:scale-110 active:scale-95 transition-transform"
          aria-label="Follow CodyBrothers on Instagram"
        >
          <Instagram className="w-4.5 h-4.5" />
        </a>

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onMouseEnter={() => handleLinkHover(true)}
            onMouseLeave={() => handleLinkHover(false)}
            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all cursor-pointer"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </button>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/5 py-16 md:py-20 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-slate-950 border border-white/10 overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/15 via-transparent to-[#D4AF37]/15" />
                <span className="relative font-display font-black text-xs tracking-tighter text-white">
                  <span className="text-[#00F0FF]">C</span>
                  <span className="text-[#D4AF37] -ml-[1px]">B</span>
                </span>
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-display">CodyBrothers</span>
            </div>
            
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
              We design premium business websites that help entities build trust, generate leads and grow online. Crafting custom web assets since 2026.
            </p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-[#00F0FF] font-bold">Quick Links</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer">Services</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors cursor-pointer">Pricing</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors cursor-pointer">Portfolio</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">About</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">Contact</button></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-bold">Architectures</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><button onClick={() => { setFormState(prev => ({ ...prev, package: 'Landing Page' })); scrollToSection('contact'); }} className="hover:text-white transition-colors cursor-pointer">Landing Page Tiers</button></li>
              <li><button onClick={() => { setFormState(prev => ({ ...prev, package: 'Business Website' })); scrollToSection('contact'); }} className="hover:text-white transition-colors cursor-pointer">Corporate Websites</button></li>
              <li><button onClick={() => { setFormState(prev => ({ ...prev, package: 'E-Commerce Website' })); scrollToSection('contact'); }} className="hover:text-white transition-colors cursor-pointer">Stripe E-Commerce</button></li>
              <li><button onClick={() => { setFormState(prev => ({ ...prev, package: 'Website Redesign' })); scrollToSection('contact'); }} className="hover:text-white transition-colors cursor-pointer">Code Revitalizations</button></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] font-bold">Connect Channels</h4>
            <ul className="space-y-3 text-xs text-gray-500">
              <li>
                <p className="text-[8px] uppercase font-mono text-gray-600">INBOX INQUIRY</p>
                <a href="mailto:codybrothers026@gmail.com" className="text-gray-400 hover:text-[#00F0FF] transition-colors font-mono">
                  codybrothers026@gmail.com
                </a>
              </li>
              <li>
                <p className="text-[8px] uppercase font-mono text-gray-600">INSTAGRAM HANDLE</p>
                <a href="https://instagram.com/codybrothers026" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  @codybrothers026
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-600">
          <p className="select-none">© 2026 CodyBrothers. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Security Standards</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Architecture</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
