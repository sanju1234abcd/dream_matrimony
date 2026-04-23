import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
import OtpVerification from '../components/OtpVerification';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';
import { Phone, MessageCircle, Mail, MapPin, Heart, CheckCircle2, LogOut, LayoutDashboard, User, Clock, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLUListElement>(null);
  const profilesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLUListElement>(null);

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  
  // Navbar scroll state
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Handle scroll for navbar
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsNavVisible(false); // scrolling down
      } else {
        setIsNavVisible(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // 0. Parallax Hero Background
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroBgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // 1. Staggered reveal for Hero Title
    if (heroTextRef.current) {
      const split = new SplitType(heroTextRef.current, { types: 'chars,words' });
      gsap.fromTo(split.chars, 
        { opacity: 0, y: 80, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: 'back.out(1.5)',
          delay: 0.3
        }
      );
    }

    // 2. ScrollTrigger for "Our Services"
    if (servicesRef.current) {
      const items = servicesRef.current.querySelectorAll('.service-item');
      gsap.fromTo(items, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    }

    // 3. Entrance animation for Profile circles
    if (profilesRef.current) {
      const profiles = profilesRef.current.querySelectorAll('.profile-circle');
      gsap.fromTo(profiles, 
        { scale: 0.8, y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: profilesRef.current,
            start: 'top 85%',
          },
          scale: 1,
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'elastic.out(1, 0.7)'
        }
      );
    }

    // 4. About Us text fade in up
    if (aboutRef.current) {
      const paragraphs = aboutRef.current.querySelectorAll('p');
      gsap.fromTo(paragraphs, 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }

    // 5. Contact info staggered entrance
    if (contactRef.current) {
      const items = contactRef.current.querySelectorAll('.contact-item');
      gsap.fromTo(items, 
        { x: -30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 85%',
          },
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    }

    // 5.5 Offers staggered entrance
    if (offersRef.current) {
      const items = offersRef.current.querySelectorAll('.offer-item');
      gsap.fromTo(items, 
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: offersRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'power4.out'
        }
      );
    }

    // 6. Terms staggered entrance
    if (termsRef.current) {
      const items = termsRef.current.querySelectorAll('li');
      gsap.fromTo(items, 
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: termsRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power1.out'
        }
      );
    }

    // 7. Magnetic Effect on Buttons
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e: any) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      });
    });

  }, { scope: container, dependencies: [] });

  const handleRegistrationSuccess = (email: string) => {
    setIsRegisterOpen(false);
    setPendingEmail(email);
    setIsOtpOpen(true);
  };

  const handleOtpSuccess = () => {
    setIsOtpOpen(false);
    setPendingEmail('');
  };

  const openRegisterFromLogin = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <div ref={container} className="bg-gray-50 flex flex-col font-sans min-h-screen selection:bg-primary/30 selection:text-primary">
      
      {/* Header - Floating Pill Design */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out pt-4 px-4 md:px-8 ${isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(194,24,91,0.08)] rounded-full px-4 py-2 md:px-8 md:py-3 flex justify-between items-center">
          
          <div className="flex items-center gap-3 cursor-pointer group">
            <Logo size={48} className="transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-md" />
            <h1 className="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-600 tracking-wide hidden md:block font-serif">
              Dream Matrimony
            </h1>
          </div>
          
          <nav className="hidden lg:flex gap-8 text-[13px] font-bold text-gray-700 uppercase tracking-widest">
            <Link to="/profiles" className="hover:text-primary transition-colors relative group py-2">
              Profiles
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <a href="#services" className="hover:text-primary transition-colors relative group py-2">
              Our Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className="hover:text-primary transition-colors relative group py-2">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="hover:text-primary transition-colors relative group py-2">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          <div className="flex gap-4 items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-full transition-all"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-bold hidden md:block">{user.name ? user.name.split(' ')[0] : 'Admin'}</span>
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span className="font-semibold text-sm">My Dashboard</span>
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button 
                      onClick={async () => { setIsUserDropdownOpen(false); await logout(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-semibold text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="btn-magnetic bg-gradient-to-r from-primary to-pink-600 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(194,24,91,0.4)] transition-all uppercase tracking-widest text-xs md:text-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 pt-20">
        <div ref={heroBgRef} className="absolute inset-0 w-full h-[130%] -top-[15%] opacity-40">
           <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" alt="Wedding Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900/80"></div>
        
        <div className="relative z-10 text-center px-4 flex flex-col items-center mt-12">
          <h2 className="text-pink-200 text-lg md:text-xl mb-4 font-medium tracking-[0.4em] uppercase">Welcome To</h2>
          <h1 ref={heroTextRef} className="text-6xl md:text-8xl font-bold text-white mb-8 font-serif drop-shadow-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
            Dream Matrimony
          </h1>
          <p className="text-gray-200 text-lg md:text-2xl font-light mb-10 max-w-3xl mx-auto leading-relaxed">
            Your one stop destination for ideal life partner according to your choice.
          </p>
          <div className="flex flex-col items-center gap-6">
            {!user ? (
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="btn-magnetic relative overflow-hidden group bg-gradient-to-r from-primary to-pink-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-[0_0_40px_rgba(194,24,91,0.4)] hover:shadow-[0_0_60px_rgba(194,24,91,0.6)] transition-all uppercase tracking-widest"
              >
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              </button>
            ) : (
              <Link
                to="/dashboard"
                className="btn-magnetic relative overflow-hidden group bg-gradient-to-r from-primary to-pink-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-[0_0_40px_rgba(194,24,91,0.4)] hover:shadow-[0_0_60px_rgba(194,24,91,0.6)] transition-all uppercase tracking-widest"
              >
                <span className="relative z-10">My Dashboard</span>
                <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              </Link>
            )}
            <p className="text-white/80 text-lg font-medium italic tracking-wide">
              By Mr. Sanjay Sen
            </p>
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section id="profiles" className="py-32 bg-white relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4 font-serif">Featured Profiles</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div ref={profilesRef} className="flex flex-wrap justify-center gap-12">
            {[1, 2, 3].map((item) => (
              <div key={item} className="profile-circle group flex flex-col items-center bg-gray-50 rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20 w-80 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-150"></div>
                
                <div className="w-52 h-52 rounded-full p-2 bg-gradient-to-br from-primary to-pink-300 mb-6 group-hover:rotate-12 transition-transform duration-700">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white relative">
                    <img src={`https://i.pravatar.cc/300?img=${item + 20}`} alt={`Profile ${item}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
                    <Link to="/profiles" className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm cursor-pointer">
                      <span className="text-white font-bold tracking-widest text-sm uppercase">View Profile</span>
                    </Link>
                  </div>
                </div>
                
                <div className="text-left text-gray-700 space-y-2 w-full px-4 relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Sample User {item}</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500">ID No</span>
                    <span className="font-semibold text-right">DM{1000 + item}</span>
                    
                    <span className="text-gray-500">Age</span>
                    <span className="font-semibold text-right">{25 + item}</span>
                    
                    <span className="text-gray-500">Height</span>
                    <span className="font-semibold text-right">5' {item + 3}"</span>
                    
                    <span className="text-gray-500">Education</span>
                    <span className="font-semibold text-right truncate">B.Tech</span>
                    
                    <span className="text-gray-500">Occupation</span>
                    <span className="font-semibold text-right truncate">Engineer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-32 bg-gray-50 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4 font-serif">Our Services</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Comprehensive matrimonial and event management services tailored to make your special day perfect.</p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
          </div>
          
          <ul ref={servicesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <li className="service-item bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30 group">
              <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Heart className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-primary transition-colors">Pre Marriage</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Match Making</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Astrology consulting</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Background verification (We ensure complete background check and verified profiles)</span>
                </li>
              </ul>
            </li>
            
            <li className="service-item bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30 group relative -translate-y-4">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-pink-500 rounded-t-3xl"></div>
              <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 mt-2">
                <Heart className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-primary transition-colors">Marriage</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Venue Booking & Management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Catering and Menu selection</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Wedding Photography & Videography</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Bridal Makeup</span>
                </li>
              </ul>
            </li>

            <li className="service-item bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30 group">
              <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Heart className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-primary transition-colors">Post Marriage</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Honeymoon Packages</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Marriage Registration assistance</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      {/* About us & Contact us Side-by-Side on Desktop */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-pink-50 rounded-full blur-[100px] opacity-60 -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* About Us */}
            <div id="about" ref={aboutRef} className="space-y-8">
              <div>
                <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">Our Story</h2>
                <h3 className="text-5xl font-extrabold text-gray-900 font-serif leading-tight">About Us</h3>
              </div>
              <div className="w-20 h-1 bg-primary rounded-full"></div>
              <div className="text-gray-600 leading-relaxed space-y-6 text-lg font-light">
                <p>
                  <span className="text-6xl font-serif text-primary float-left mr-3 mt-1 leading-none">F</span>inding a perfect life partner is the dream of every individual. In today's fast-paced world, it is very difficult to find a compatible partner for marriage. A marriage is not merely the union of two individuals, but the coming together of two families. It requires careful consideration of various factors like family background, education, culture, and most importantly, the compatibility between the couple.
                </p>
                <p>
                  Dream Matrimony, established with the vision of bringing people together, offers a dedicated platform for individuals seeking a meaningful relationship leading to marriage. We understand the importance of trust and transparency in this journey. Our team works tirelessly to ensure that every profile is verified, providing a safe and secure environment for our members.
                </p>
                <p className="border-l-4 border-primary pl-6 py-2 italic font-medium text-gray-800 bg-gray-50/50 rounded-r-xl">
                  We pride ourselves on our personalized approach, understanding the unique preferences of each individual and assisting them in finding their perfect match. Let Dream Matrimony be your guide in this beautiful journey of finding your soulmate.
                </p>
              </div>
            </div>

            {/* Contact Us */}
            <div id="contact" ref={contactRef} className="space-y-8 lg:pl-10">
              <div>
                <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">Get in Touch</h2>
                <h3 className="text-5xl font-extrabold text-gray-900 font-serif leading-tight">Contact Us</h3>
              </div>
              <div className="w-20 h-1 bg-primary rounded-full"></div>
              
              <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 space-y-8 mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
                
                <div className="contact-item flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Feel free to call 24/7</p>
                    <p className="text-lg text-gray-900 font-bold">Mr. Sanjay Sen - 7980025070</p>
                  </div>
                </div>

                <div className="contact-item flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">WhatsApp</p>
                    <p className="text-lg text-gray-900 font-bold">7980025070</p>
                  </div>
                </div>

                <div className="contact-item flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Email</p>
                    <p className="text-lg text-gray-900 font-bold break-all">contact@dreammatrimony.com</p>
                  </div>
                </div>

                <div className="contact-item flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Visit</p>
                    <p className="text-lg text-gray-900 font-bold leading-snug">18/16/2B, Fern Road, Ballygunge,<br/>Kolkata - 700019</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Special Offer Packages Section */}
      <section id="offers" className="py-32 bg-white relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-100/30 rounded-full blur-[100px] -z-10 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-3">Exclusive Opportunities</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-serif mb-6 leading-tight">Special Offer Package</h3>
            <div className="flex flex-col items-center gap-3">
              <span className="bg-gradient-to-r from-primary to-pink-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest animate-pulse shadow-lg shadow-primary/20">Limited Time Offer</span>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 mx-auto rounded-full mt-2"></div>
            </div>
          </div>

          <div ref={offersRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Package 1 */}
            <div className="offer-item flex flex-col bg-gray-50/50 backdrop-blur-sm rounded-[2.5rem] p-10 border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_20px_rgba(0,0,0,0.03)] group-hover:bg-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Clock className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Basic Plan</h4>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">Perfect for getting started and exploring potential matches quickly.</p>
              
              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">Rs.</span>
                  <span className="text-5xl font-black text-gray-900 font-serif">1000</span>
                  <span className="text-gray-400 font-bold text-sm ml-1 uppercase tracking-tighter">/ 6 Months</span>
                </div>
              </div>

              <div className="space-y-5 mb-10 flex-grow">
                <div className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-gray-700 font-medium">Full Profile Access</span>
                </div>
                <div className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-gray-700 font-medium">Verified Contacts</span>
                </div>
              </div>
              
              <a href="#contact" className="w-full py-4 rounded-2xl bg-white border border-gray-200 text-gray-900 font-bold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 text-center">
                Contact to Purchase
              </a>
            </div>

            {/* Package 2 - Featured */}
            <div className="offer-item flex flex-col bg-gray-900 rounded-[2.5rem] p-10 border border-primary/30 shadow-[0_30px_60px_rgba(194,24,91,0.25)] relative transition-all duration-500 md:scale-110 z-10 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="absolute top-6 right-6">
                <div className="bg-gradient-to-r from-primary to-pink-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">Popular</div>
              </div>

              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(194,24,91,0.4)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Standard Plan</h4>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">Our most balanced plan for those serious about finding their life partner.</p>
              
              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">Rs.</span>
                  <span className="text-5xl font-black text-white font-serif">1500</span>
                  <span className="text-gray-400 font-bold text-sm ml-1 uppercase tracking-tighter">/ 12 Months</span>
                </div>
              </div>

              <div className="space-y-5 mb-10 flex-grow">
                <div className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-200 font-medium">1 Year Validity</span>
                </div>
                
                <div className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-gray-200 font-medium">Priority Support</span>
                </div>
              </div>
              
              <a href="#contact" className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-white hover:text-primary shadow-lg shadow-primary/30 transition-all duration-300 text-center">
                Contact to Purchase
              </a>
            </div>

            {/* Package 3 */}
            <div className="offer-item flex flex-col bg-gray-50/50 backdrop-blur-sm rounded-[2.5rem] p-10 border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_20px_rgba(0,0,0,0.03)] group-hover:bg-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Heart className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Lifetime Plan</h4>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">Ultimate peace of mind. We stand by you until your wedding bells ring.</p>
              
              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">Rs.</span>
                  <span className="text-5xl font-black text-gray-900 font-serif">2000</span>
                  <span className="text-gray-400 font-bold text-sm ml-1 uppercase tracking-tighter">/ Settlement</span>
                </div>
              </div>

              <div className="space-y-5 mb-10 flex-grow">
                <div className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-gray-700 font-medium">Valid Till Success</span>
                </div>
                <div className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-gray-700 font-medium">No Success Fee</span>
                </div>
                <div className="flex items-center gap-3 group/item">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-gray-700 font-medium">Elite Matchmaking</span>
                </div>
              </div>
              
              <a href="#contact" className="w-full py-4 rounded-2xl bg-white border border-gray-200 text-gray-900 font-bold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 text-center">
                Contact to Purchase
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section id="terms" className="py-32 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 font-serif">Terms & Conditions</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
            <p className="text-gray-700 text-lg mb-8 font-medium italic">
              Welcome to Dream Matrimony & Event Management and its affiliates. They provide their services to you subject to the following conditions: Please read them carefully.
            </p>
            <ul ref={termsRef} className="space-y-6 text-gray-600">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="leading-relaxed">Women must be 18 years old and men must be 21 years old to register.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="leading-relaxed">Kindly note that, your membership in Dream Matrimony is for your sole, personal use. You may not authorize others to use your membership, and you may not assign or transfer your account to any other person or entity.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="leading-relaxed">Dream Matrimony will not vary the information provided by the candidate, and as such, Dream Matrimony will not be held liable in any way; Dream Matrimony will file the information as true.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="leading-relaxed">Dream Matrimony will maintain the confidentiality of all personal information furnished by members.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="leading-relaxed">The party will be informed over the phone, WhatsApp, or email by our executive as soon as a suitable match is identified. The party can also search for suitable brides or grooms on our website.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="leading-relaxed">If you choose to terminate your membership, the <span className="font-bold text-gray-800">MEMBERSHIP FEES ARE NOT REFUNDABLE</span> under any circumstances. Dream matrimony does not guarantee marriage but only assists in the search for partners.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="leading-relaxed"><span className="font-bold text-gray-800">Validity:</span> The validity of your paid membership is 6 months, 1 year, or a lifetime membership.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="leading-relaxed">Once a month, we will send you information on suitable grooms or brides without including their addresses. After your approval of this, we shall contact them for you; if they approve your photo and biodata, then we will give you the address and phone number for further proceeding.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="leading-relaxed">You are requested to inform us immediately after the final settlement of your candidate's marriage if it occurs.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <p className="leading-relaxed">Our marriage settlement charge is <span className="font-bold text-gray-800">Rs. 5,000</span>. There is no settlement charge required for lifetime members.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10 border-t-4 border-primary">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Logo size={56} className="shadow-lg" />
                <h1 className="text-2xl font-bold tracking-wider font-serif">Dream Matrimony</h1>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Your one stop destination for ideal life partner according to your choice. We bring souls together with trust, transparency, and tradition.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/profiles" className="text-gray-400 hover:text-primary transition-colors">Featured Profiles</Link></li>
                <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Our Services</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#terms" className="text-gray-400 hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Dream Matrimony. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-primary" fill="currentColor" /> in Kolkata
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all">
          <LoginForm 
            onClose={() => setIsLoginOpen(false)} 
            onSwitchToRegister={openRegisterFromLogin} 
          />
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto transition-all">
          <div className="relative w-full max-w-2xl my-8">
            <RegistrationForm 
              onClose={() => setIsRegisterOpen(false)} 
              onSuccess={handleRegistrationSuccess} 
            />
          </div>
        </div>
      )}

      {isOtpOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all">
          <div className="relative w-full max-w-md">
            <OtpVerification 
              email={pendingEmail} 
              onClose={() => setIsOtpOpen(false)} 
              onSuccess={handleOtpSuccess} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
