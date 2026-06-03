import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import {
  Menu,
  X,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Search,
  Rocket,
  CheckCircle,
  Star,
  ChevronDown,
  ArrowRight,
  Palette,
  Code2,
  Megaphone,
  ShoppingCart,
  Users,
  Clock,
  MessageCircle,
  Send,
  Play,
  Award,
  TrendingUp,
  FileText,
  HeadphonesIcon,
} from 'lucide-react';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import RefundPolicy from './pages/RefundPolicy';
import ContactUs from './pages/ContactUs';
import WhatsAppButton from './components/WhatsAppButton';
import PopupModal from './components/PopupModal';
import { useCounterAnimation } from './hooks/useCounterAnimation';
import { StatItem } from './components/StatItem';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function for WhatsApp
const openWhatsApp = () => {
  const message = encodeURIComponent('Hi DigiExpert, I want to discuss my project.');
  window.open(`https://wa.me/919891113214?text=${message}`, '_blank');
};

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website_type: '',
    message: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-show popup after 5 seconds on every page load
  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setPopupOpen(true);
    }, 5000);

    return () => clearTimeout(popupTimer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validate
    if (!formData.name.trim()) {
      setFormError('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      setFormError('Please enter your email');
      return;
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase client not initialized');
      setFormError('Service unavailable. Please try WhatsApp or email.');
      return;
    }

    setFormSubmitting(true);
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([formData]);

      if (error) {
        console.error('Supabase error:', error);
        setFormError('Failed to send message. Please try WhatsApp or email.');
        setFormSubmitting(false);
        return;
      }

      setFormSubmitted(true);
      setFormData({ name: '', email: '', company: '', website_type: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setFormError('Failed to send message. Please try WhatsApp or email.');
    }
    setFormSubmitting(false);
  };

  const services = [
    {
      icon: Palette,
      title: 'Professional Content',
      description: 'Well-written content that connects with visitors and builds trust.',
    },
    {
      icon: Code2,
      title: 'Expert Design Process',
      description: 'Our talented design team creates stunning visuals tailored to your brand while ensuring optimal user experience.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Every website is built to work flawlessly on all devices, from smartphones to desktops.',
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Built-in search engine optimization to help your website rank higher on Google.',
    },
    {
      icon: Zap,
      title: 'Fast Loading Speed',
      description: 'Optimized for lightning-fast performance to keep visitors engaged.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security to protect your website and customer data.',
    },
  ];

  const features = [
    {
      icon: Palette,
      title: 'Custom Design',
      description: 'Unique, brand-aligned designs that stand out from the competition.',
    },
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Well-structured, maintainable code that performs exceptionally.',
    },
    {
      icon: Smartphone,
      title: 'Responsive Layout',
      description: 'Perfect display across all screen sizes and devices.',
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Optimized for speed with lazy loading and efficient caching.',
    },
    {
      icon: Shield,
      title: 'SSL Security',
      description: 'Free SSL certificate for secure data transmission.',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Dedicated support team available to help you anytime.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Rs 4,999',
      description: 'Perfect for small businesses and personal projects',
      features: [
        '5-page responsive website',
        'Mobile-friendly design',
        'Basic SEO setup',
        'Contact form',
        'Professional content (5 pages)',
        '1 month support',
        'WhatsApp integration',
      ],
      popular: false,
    },
    {
      name: 'Business',
      price: 'Rs 6,999',
      description: 'Ideal for growing businesses and startups',
      features: [
        '10-page responsive website',
        'Custom design',
        'Advanced SEO optimization',
        'Blog integration',
        'Professional content (10 pages)',
        'Social media integration',
        '3 months support',
        'WhatsApp integration',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Rs 9,999',
      description: 'Complete solution for established businesses',
      features: [
        'Unlimited pages',
        'E-commerce functionality',
        'Custom features',
        'Full content creation suite',
        'Priority support',
        '6 months maintenance',
        'Custom integrations',
        'WhatsApp integration',
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Restaurant Owner, Mumbai',
      content: 'DigiExpert delivered exactly what we needed for our restaurant website. The design is modern, and we started getting online orders within the first week!',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
    },
    {
      name: 'Priya Patel',
      role: 'Fashion Boutique, Delhi',
      content: 'Professional, fast, and the expertly crafted content was perfectly tailored to our brand. Highly recommend!',
      avatar: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
    },
    {
      name: 'Amit Kumar',
      role: 'Tech Startup Founder, Bangalore',
      content: 'The team understood our startup needs perfectly. They delivered a website that perfectly represents our innovative approach.',
      avatar: 'https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'How long does it take to build a website?',
      answer: 'Most projects are completed within 7-10 days. Starter sites can be ready in as little as 5 days, while larger projects may take 2-3 weeks depending on complexity.',
    },
    {
      question: 'What is included in your pricing?',
      answer: 'Our pricing includes design, development, responsive layout, basic SEO, content creation, and support. Domain and hosting are separate.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes! All packages include support periods. Extended maintenance plans are available for ongoing updates and security.',
    },
    {
      question: 'What makes your web design approach different?',
      answer: 'We combine expert design with efficient processes to deliver exceptional websites quickly. Our team focuses on user experience, conversion optimization, and brand consistency to ensure your website drives real business results.',
    },
    {
      question: 'Can I update the website myself?',
      answer: 'Absolutely! We build websites on user-friendly platforms and provide training so you can easily update content.',
    },
  ];

  const workflowSteps = [
    {
      icon: MessageCircle,
      title: 'Requirement Discussion',
      description: 'We discuss your project needs, goals, and vision in detail.',
    },
    {
      icon: Palette,
      title: 'Design Preview',
      description: 'See mockups and designs before development begins.',
    },
    {
      icon: Code2,
      title: 'Development',
      description: 'Expert coding to bring your design to life.',
    },
    {
      icon: FileText,
      title: 'Testing & Revisions',
      description: 'Thorough testing and unlimited revisions until you\'re satisfied.',
    },
    {
      icon: Rocket,
      title: 'Final Launch',
      description: 'Your website goes live with full support.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Popup Modal */}
      <PopupModal isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10 group">
                <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="headerAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#headerLogoGradient)"/>
                  <path d="M10 10C10 8.89543 10.8954 8 12 8H20C24.4183 8 28 11.5817 28 16C28 20.4183 24.4183 24 20 24H12C10.8954 24 10 23.1046 10 22V10Z" fill="white"/>
                  <circle cx="20" cy="16" r="5" fill="url(#headerAccentGradient)"/>
                  <circle cx="20" cy="16" r="2.5" fill="white"/>
                  <path d="M14 12L26 24" stroke="url(#headerAccentGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-secondary-900 leading-tight">DigiExpert</span>
                <span className="text-xs text-secondary-500 hidden sm:block">Web Design Solutions</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('services')} className="text-secondary-600 hover:text-primary-600 transition-colors font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection('features')} className="text-secondary-600 hover:text-primary-600 transition-colors font-medium">
                Features
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-secondary-600 hover:text-primary-600 transition-colors font-medium">
                Pricing
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-secondary-600 hover:text-primary-600 transition-colors font-medium">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-secondary-600 hover:text-primary-600 transition-colors font-medium">
                Contact
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all"
              >
                Get Free Quote
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-secondary-600 hover:text-primary-600">
                Services
              </button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-secondary-600 hover:text-primary-600">
                Features
              </button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 text-secondary-600 hover:text-primary-600">
                Pricing
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left py-2 text-secondary-600 hover:text-primary-600">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-secondary-600 hover:text-primary-600">
                Contact
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-primary-600 text-white py-3 rounded-full font-semibold mt-4"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-slide-in-up">
                <Sparkles className="w-4 h-4" />
                <span>Stand Out Online</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                  Digital Excellence Starts Here
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-secondary-600 mb-8 leading-relaxed">
                Affordable Website & Digital Marketing Solutions for Indian Businesses. Fast delivery, beautiful designs, and powerful digital experiences that turn visitors into customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={openWhatsApp}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-xl shadow-primary-600/30 hover:shadow-primary-600/40 hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection('workflow')}
                  className="border-2 border-secondary-300 hover:border-primary-500 text-secondary-700 hover:text-primary-600 px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>See How It Works</span>
                </button>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-8 mt-8">
                <div>
                  <p className="text-sm text-secondary-500">Avg. delivery time</p>
                  <p className="text-lg font-bold text-secondary-900">7-10 Days</p>
                </div>
                <div className="w-px h-12 bg-secondary-200"></div>
                <div>
                  <p className="text-sm text-secondary-500">Starting price</p>
                  <p className="text-lg font-bold text-secondary-900">Rs 4,999</p>
                </div>
                <div className="w-px h-12 bg-secondary-200"></div>
                <div>
                  <p className="text-sm text-secondary-500">Support</p>
                  <p className="text-lg font-bold text-secondary-900">24/7</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-secondary-900 flex items-center space-x-2 px-4 py-3">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-white/10"></div>
                  <img
  src="/digi.jpeg"
  alt="DigiExpert"
  className="w-full h-full object-cover"
/>



                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem icon={Users} value="200" label="Happy Clients" />
            <StatItem icon={Globe} value="350" label="Projects Delivered" />
            <StatItem icon={Star} value="4.8" label="Average Rating" />
            <StatItem icon={Clock} value="7-10" label="Days Delivery" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">Why Choose DigiExpert?</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              We deliver professional websites that help Indian businesses grow online
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-secondary-100 group hover:border-primary-200"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                  <service.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">{service.title}</h3>
                <p className="text-secondary-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 lg:py-24 bg-secondary-50" id="workflow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">Our Process</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Simple, transparent workflow to bring your website to life
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6 lg:gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-secondary-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-secondary-600">{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Everything You Need for a Perfect Website
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              All essential features included in every website we build
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-2">{feature.title}</h3>
                  <p className="text-secondary-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24 bg-secondary-50" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Affordable Pricing for Indian Businesses
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Transparent pricing with no hidden costs. Choose the plan that suits your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-primary-600 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary-600 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">{plan.name}</h3>
                  <p className="text-secondary-600 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-secondary-900">{plan.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-secondary-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={openWhatsApp}
                    className={`w-full py-4 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-secondary-100 hover:bg-secondary-200 text-secondary-900'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Trusted by Indian Businesses
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              See what our clients say about us
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 border border-secondary-100"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-secondary-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-secondary-900">{testimonial.name}</p>
                    <p className="text-sm text-secondary-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">Trusted by 200+ Indian Businesses</h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { icon: Shield, label: 'Secure & Reliable' },
                { icon: Award, label: 'Quality Assured' },
                { icon: TrendingUp, label: 'Growth Focused' },
                { icon: Users, label: '200+ Happy Clients' },
              ].map((badge, index) => (
                <div key={index} className="flex items-center space-x-2 text-secondary-600">
                  <badge.icon className="w-6 h-6 text-primary-600" />
                  <span className="font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-secondary-200 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between"
                >
                  <span className="font-semibold text-secondary-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-secondary-600 transition-transform ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-secondary-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Grow Your Business Online?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of businesses who've accelerated their growth with our professional web solutions.
          </p>
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <span>Start Your Project Today</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-secondary-50" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Get in Touch</h2>
              <p className="text-lg text-secondary-600 mb-8">
                Ready to start your project? Fill out the form or contact us directly.
              </p>

              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">Thank You!</h3>
                  <p className="text-secondary-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {formError}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <select
                        value={formData.website_type}
                        onChange={(e) => setFormData({ ...formData, website_type: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                      >
                        <option value="">Select Website Type</option>
                        <option value="Business Website">Business Website</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Blog">Blog</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{formSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Website 1 - Tech Startup Landing Page */}
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <div className="h-48 flex flex-col">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/40"></div>
                      <div className="w-2 h-2 rounded-full bg-white/60"></div>
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <p className="text-white text-xs font-semibold">TechFlow.io</p>
                  </div>
                  {/* Hero Section */}
                  <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg mb-2 flex items-center justify-center">
                      <Rocket className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-blue-900 font-bold text-sm">Build Your Next Big Idea</p>
                    <p className="text-blue-600 text-xs mt-1">Modern SaaS Solution</p>
                    <div className="mt-3 flex gap-1">
                      <div className="h-1 w-6 bg-blue-600 rounded-full"></div>
                      <div className="h-1 w-3 bg-blue-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <p className="text-white font-bold text-sm">Tech Startup</p>
                    <p className="text-white/90 text-xs">Responsive Landing Page</p>
                  </div>
                </div>
              </div>

              {/* Website 2 - E-commerce Store Landing Page */}
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <div className="h-48 flex flex-col">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2 flex items-center justify-between">
                    <div className="w-6 h-6 bg-white/80 rounded flex items-center justify-center text-xs font-bold text-emerald-700">S</div>
                    <div className="flex gap-2">
                      <div className="w-1 h-1 rounded-full bg-white/60"></div>
                      <div className="w-1 h-1 rounded-full bg-white/60"></div>
                      <div className="w-1 h-1 rounded-full bg-white/60"></div>
                    </div>
                  </div>
                  {/* Product Grid Preview */}
                  <div className="flex-1 bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 flex flex-col">
                    <div className="flex gap-2 flex-1">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex-1 bg-white rounded-lg shadow-sm flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-emerald-600" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 h-1 bg-white/40 rounded-full"></div>
                    <div className="mt-1 flex gap-1">
                      <div className="h-px flex-1 bg-emerald-300"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <p className="text-white font-bold text-sm">E-commerce Store</p>
                    <p className="text-white/90 text-xs">Responsive Product Showcase</p>
                  </div>
                </div>
              </div>

              {/* Website 3 - Portfolio Landing Page */}
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
                <div className="h-48 flex flex-col">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-orange-600 to-red-600 px-4 py-3 flex items-center justify-between">
                    <p className="text-white text-xs font-bold">PORTFOLIO</p>
                    <div className="w-5 h-5 border border-white/60 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    </div>
                  </div>
                  {/* Portfolio Grid */}
                  <div className="flex-1 bg-gradient-to-br from-orange-50 to-red-50 p-3 grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="bg-gradient-to-br from-orange-200 to-red-200 rounded-lg flex items-center justify-center">
                        <Palette className="w-4 h-4 text-orange-700" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <p className="text-white font-bold text-sm">Creative Portfolio</p>
                    <p className="text-white/90 text-xs">Responsive Gallery Showcase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-10 h-10">
                  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                      <linearGradient id="footerAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#footerLogoGradient)"/>
                    <path d="M10 10C10 8.89543 10.8954 8 12 8H20C24.4183 8 28 11.5817 28 16C28 20.4183 24.4183 24 20 24H12C10.8954 24 10 23.1046 10 22V10Z" fill="white"/>
                    <circle cx="20" cy="16" r="5" fill="url(#footerAccentGradient)"/>
                    <circle cx="20" cy="16" r="2.5" fill="white"/>
                    <path d="M14 12L26 24" stroke="url(#footerAccentGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold leading-tight">DigiExpert</span>
                  <span className="text-xs text-secondary-400">Web Design Solutions</span>
                </div>
              </div>
              <p className="text-secondary-400 leading-relaxed max-w-md">
                We create modern, conversion-focused websites for businesses and startups.
                Fast delivery, beautiful designs, and content that converts.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-secondary-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/contact" className="text-secondary-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#pricing" className="text-secondary-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#services" className="text-secondary-400 hover:text-white transition-colors">Services</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-secondary-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-secondary-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/refund" className="text-secondary-400 hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © 2026 DigiExpert. All rights reserved.
            </p>
            <div className="flex space-x-6 text-secondary-400 text-sm">
              <span>support.digiexpert@gmail.com</span>
              <span>+91 9891113214</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <WhatsAppButton />
      <PopupModal isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </Router>
  );
}

export default App;
