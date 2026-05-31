import { useState, useEffect } from 'react';
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
} from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      console.error('Supabase not configured');
      return;
    }
    setFormSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert([formData]);
      if (error) throw error;
      setFormSubmitted(true);
      setFormData({ name: '', email: '', company: '', website_type: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setFormSubmitting(false);
    }
  };

  const services = [
    {
      icon: Palette,
      title: 'Custom Website Design',
      description: 'Unique, stunning designs tailored to your brand identity and business goals.',
    },
    {
      icon: Smartphone,
      title: 'Responsive Layouts',
      description: 'Perfect display on all devices - mobile, tablet, and desktop.',
    },
    {
      icon: Rocket,
      title: 'Landing Pages',
      description: 'High-converting landing pages optimized for maximum results.',
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Rank higher on search engines and attract more organic traffic.',
    },
    {
      icon: Zap,
      title: 'Fast Loading Speed',
      description: 'Optimized performance ensuring lightning-fast page loads.',
    },
    {
      icon: Sparkles,
      title: 'Professional Content',
      description: 'Well-written content that connects with visitors and builds trust.',
    },
  ];

  const features = [
    {
      icon: Globe,
      title: 'Portfolio Websites',
      description: 'Showcase your work and build your personal brand with elegance.',
    },
    {
      icon: Users,
      title: 'Business Websites',
      description: 'Professional sites that establish credibility and drive growth.',
    },
    {
      icon: ShoppingCart,
      title: 'eCommerce Stores',
      description: 'Full-featured online stores with seamless checkout experiences.',
    },
    {
      icon: Code2,
      title: 'Service-Based Sites',
      description: 'Convert visitors into clients with strategic service presentations.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your needs, target audience, and business goals to create a strategic roadmap.',
    },
    {
      number: '02',
      title: 'Expert Design Process',
      description: 'Our talented design team creates stunning visuals tailored to your brand while ensuring optimal user experience.',
    },
    {
      number: '03',
      title: 'Development & Testing',
      description: 'We build your site with clean code, optimize for speed, and test across all devices.',
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'Your site goes live with ongoing support, updates, and performance monitoring.',
    },
  ];

  const testimonials = [
    {
      quote: "They delivered a stunning website in just 2 weeks. Our conversions increased by 340%. Absolutely incredible work!",
      author: 'Sarah Mitchell',
      role: 'CEO, TechStart Inc.',
      rating: 5,
    },
    {
      quote: "Professional, fast, and the expertly crafted content was perfectly tailored to our brand. Highly recommend!",
      author: 'James Rodriguez',
      role: 'Founder, Artisan Bakery',
      rating: 5,
    },
    {
      quote: "Our new eCommerce store exceeded all expectations. Sales are up 200% and customers love the experience.",
      author: 'Emily Chen',
      role: 'Owner, Luxe Fashion',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '4,999',
      description: 'Perfect for small businesses and personal brands',
      features: [
        '5-page responsive website',
        'Custom design',
        'Mobile optimization',
        'Basic SEO setup',
        'Contact form',
        '2 revision rounds',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '6,999',
      description: 'Ideal for growing businesses and startups',
      features: [
        '10-page responsive website',
        'Custom design with animations',
        'Advanced SEO optimization',
        'Blog integration',
        'Professional content (10 pages)',
        'Analytics dashboard',
        '5 revision rounds',
        'Priority support',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '9,999',
      description: 'Full-featured solution for established businesses',
      features: [
        'Unlimited pages',
        'eCommerce functionality',
        'Custom integrations',
        'Full content creation suite',
        'Performance optimization',
        'Security hardening',
        'Unlimited revisions',
        '24/7 dedicated support',
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'How long does it take to build a website?',
      answer: 'Most projects are completed within 7-10 days. Starter sites can be ready in as little as 5 days, while larger projects may take 2-3 weeks depending on complexity.',
    },
    {
      question: 'What makes your web design approach different?',
      answer: 'We combine expert design with efficient processes to deliver exceptional websites quickly. Our team focuses on user experience, conversion optimization, and brand consistency to ensure your website drives real business results.',
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes! All plans include support. Starter includes 30 days, Professional includes 90 days, and Enterprise includes ongoing support. We also offer maintenance packages for continued updates.',
    },
    {
      question: 'Can I update the website myself after it\'s built?',
      answer: 'Absolutely. We build on user-friendly platforms and provide training so you can make updates. We also offer managed services if you prefer we handle updates for you.',
    },
    {
      question: 'What\'s included in SEO optimization?',
      answer: 'We implement technical SEO (site speed, mobile-friendliness, structure), on-page SEO (meta tags, headings, content optimization), and set up analytics so you can track performance.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg transform rotate-3 opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
              </div>
              <span className="text-xl font-bold text-secondary-900">DigiExpert</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-secondary-600 hover:text-primary-600 transition-colors font-medium">
                Services
              </a>
              <a href="#features" className="text-secondary-600 hover:text-primary-600 transition-colors font-medium">
                Features
              </a>
              <a href="#pricing" className="text-secondary-600 hover:text-primary-600 transition-colors font-medium">
                Pricing
              </a>
              <a href="#testimonials" className="text-secondary-600 hover:text-primary-600 transition-colors font-medium">
                Testimonials
              </a>
              <a
                href="#contact"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/40 hover:-translate-y-0.5"
              >
                Get Started
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-secondary-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-secondary-100 animate-slide-down">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-secondary-600 hover:text-primary-600 font-medium"
              >
                Services
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-secondary-600 hover:text-primary-600 font-medium"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-secondary-600 hover:text-primary-600 font-medium"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-secondary-600 hover:text-primary-600 font-medium"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-primary-600 text-white px-6 py-3 rounded-full font-medium text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Stand Out Online</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                  Digital Excellence Starts Here
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-secondary-600 mb-8 leading-relaxed">
                We create modern, conversion-focused websites for businesses and startups.
                Fast delivery, beautiful designs, and powerful digital experiences that turn visitors into customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-xl shadow-primary-600/30 hover:shadow-primary-600/40 hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#how-it-works"
                  className="border-2 border-secondary-300 hover:border-primary-500 text-secondary-700 hover:text-primary-600 px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>See How It Works</span>
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-secondary-600 font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-secondary-600 font-medium">100% Responsive</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-secondary-600 font-medium">SEO Optimized</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Creative team collaboration workspace"
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center space-x-3 animate-slide-up">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Avg. delivery time</p>
                  <p className="text-lg font-bold text-secondary-900">7-10 Days</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-secondary-900 mt-1">5.0 Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Everything You Need for Online Success
            </h2>
            <p className="text-lg text-secondary-600">
              From stunning designs to powerful functionality, we deliver complete web solutions
              tailored to your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-secondary-100"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">{service.title}</h3>
                <p className="text-secondary-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
                Perfect Solutions for Every Website Type
              </h2>
              <p className="text-lg text-secondary-600 mb-8">
                Whether you need a portfolio, business site, or online store, we have the expertise
                to bring your vision to life with precision and excellence.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900">{feature.title}</h3>
                      <p className="text-secondary-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Creative web design workspace with laptop"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white rounded-xl p-6 shadow-xl">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-primary-100">Websites Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How We Build Your Success
            </h2>
            <p className="text-lg text-primary-100">
              Our streamlined process combines expert design with efficient workflows to deliver
              exceptional results, fast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all">
                  <div className="text-5xl font-bold text-primary-300 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-primary-100 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-28 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Trusted by Businesses Everywhere
            </h2>
            <p className="text-lg text-secondary-600">
              See what our clients say about their experience working with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-secondary-100"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-secondary-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-900">{testimonial.author}</p>
                    <p className="text-sm text-secondary-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-secondary-600">
              Choose the perfect plan for your needs. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl ${
                  plan.popular
                    ? 'bg-primary-600 text-white shadow-2xl shadow-primary-600/30 scale-105'
                    : 'bg-white border border-secondary-200'
                } p-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold mr-1">₹</span>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.popular ? 'text-primary-200' : 'text-secondary-500'}> / project</span>
                </div>
                <p className={`mb-6 ${plan.popular ? 'text-primary-100' : 'text-secondary-600'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle
                        className={`w-5 h-5 flex-shrink-0 ${
                          plan.popular ? 'text-accent-300' : 'text-accent-600'
                        }`}
                      />
                      <span className={plan.popular ? 'text-primary-50' : 'text-secondary-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block text-center py-3 px-6 rounded-full font-semibold transition-all ${
                    plan.popular
                      ? 'bg-white text-primary-600 hover:bg-primary-50'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-secondary-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-secondary-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-secondary-200 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-secondary-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-secondary-500 transition-transform ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-5 text-secondary-600 leading-relaxed animate-slide-down">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Online Presence?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join hundreds of businesses who've accelerated their growth with our professional web solutions.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <span>Start Your Project Today</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-lg text-secondary-600 mb-8">
                Fill out the form and we'll get back to you within 24 hours with a personalized
                proposal for your project.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Fast Response</h3>
                    <p className="text-secondary-600">We respond to all inquiries within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Free Consultation</h3>
                    <p className="text-secondary-600">Discuss your project with no obligation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Secure & Private</h3>
                    <p className="text-secondary-600">Your information is always protected</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary-50 rounded-2xl p-8 lg:p-10">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">
                    Thank You!
                  </h3>
                  <p className="text-secondary-600">
                    We've received your message and will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-secondary-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label htmlFor="website_type" className="block text-sm font-medium text-secondary-700 mb-2">
                        Website Type
                      </label>
                      <select
                        id="website_type"
                        value={formData.website_type}
                        onChange={(e) => setFormData({ ...formData, website_type: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                      >
                        <option value="">Select type...</option>
                        <option value="portfolio">Portfolio</option>
                        <option value="business">Business Website</option>
                        <option value="ecommerce">eCommerce Store</option>
                        <option value="landing">Landing Page</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-4 rounded-lg font-semibold transition-all shadow-lg shadow-primary-600/30 flex items-center justify-center space-x-2"
                  >
                    {formSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg transform rotate-3 opacity-80"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">D</span>
                  </div>
                </div>
                <span className="text-xl font-bold">DigiExpert</span>
              </div>
              <p className="text-secondary-400 leading-relaxed max-w-md">
                We create modern, conversion-focused websites for businesses and startups.
                Fast delivery, beautiful designs, and content that converts.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Website Types</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#features" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Business</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">eCommerce</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Landing Pages</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © 2024 DigiExpert. All rights reserved.
            </p>
            <div className="flex space-x-6 text-secondary-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
