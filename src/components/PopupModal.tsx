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

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase credentials');
      alert('Please contact us via WhatsApp or email for now.');
      return;
    }

    setFormSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert([formData]);

      if (error) {
        console.error('Database error:', error);
        alert('Error submitting form. Please try WhatsApp or email.');
        setFormSubmitting(false);
        return;
      }

      setFormSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Error submitting form. Please try WhatsApp or email.');
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

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all animate-[scaleIn_0.3s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-4">
          <h2 className="text-lg font-bold mb-1">Priority Support</h2>
          <p className="text-xs text-primary-100">
            Limited time offer
          </p>
        </div>

        <div className="p-5">
          {formSubmitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-secondary-900 mb-2">Thank You!</h3>
              <p className="text-sm text-secondary-600 mb-4">
                We'll contact you within 24 hours.
              </p>
              <button onClick={onClose} className="text-primary-600 font-medium hover:text-primary-700 text-sm">
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="bg-accent-50 rounded-lg p-3 mb-4 border border-accent-100">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-accent-100 rounded flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-secondary-900 font-semibold text-sm mb-1">1 Hour Special Offer</p>
                    <p className="text-secondary-600 text-xs leading-relaxed">
                      Get Extra Priority Support & Bonus Consultation if you purchase within 1 hour.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 outline-none transition-all text-sm text-secondary-600"
                  >
                    <option value="">Select Service *</option>
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
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-2.5 rounded font-semibold transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{formSubmitting ? 'Submitting...' : 'Get Priority Support'}</span>
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-secondary-100">
                <p className="text-center text-secondary-500 text-xs mb-3">Or contact us instantly</p>
                <button
                  onClick={openWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded font-semibold transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Quick Contact</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
