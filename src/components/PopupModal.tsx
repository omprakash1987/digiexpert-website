import { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle, Clock } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PopupModal({ isOpen, onClose }: PopupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setFormSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert([formData]);

      if (!error) {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', phone: '', service: '' });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
    setFormSubmitting(false);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hi DigiExpert, I want to discuss my project.');
    window.open(`https://wa.me/919891113214?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all animate-[scaleIn_0.3s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-secondary-100 hover:bg-secondary-200 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-secondary-600" />
        </button>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8 pb-6">
          <h2 className="text-2xl font-bold mb-2">Get Priority Support</h2>
          <p className="text-primary-100">
            Special offer for a limited time
          </p>
        </div>

        <div className="p-8">
          {formSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Thank You!</h3>
              <p className="text-secondary-600 mb-6">
                We'll contact you within 24 hours with priority support.
              </p>
              <button onClick={onClose} className="text-primary-600 font-medium hover:text-primary-700">
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl p-5 mb-6 border border-accent-100">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-secondary-900 font-semibold mb-1">Limited Time Offer</p>
                    <p className="text-secondary-600 text-sm leading-relaxed">
                      Get Extra Priority Support & Bonus Consultation if you purchase any plan within 1 hour.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-secondary-600"
                  >
                    <option value="">Select Service Required *</option>
                    <option value="Website Design">Website Design</option>
                    <option value="E-commerce Website">E-commerce Website</option>
                    <option value="SEO Services">SEO Services</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{formSubmitting ? 'Submitting...' : 'Get Priority Support'}</span>
                </button>
              </form>

              <div className="mt-5 pt-5 border-t border-secondary-100">
                <p className="text-center text-secondary-500 text-sm mb-4">Or contact us instantly on WhatsApp</p>
                <button
                  onClick={openWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
