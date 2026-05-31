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
    phone: '',
    service: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

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

  // Countdown timer
  useEffect(() => {
    if (!isOpen || formSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, formSubmitted]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase credentials');
      alert('Please contact us via WhatsApp for now.');
      return;
    }

    setFormSubmitting(true);
    try {
      const { error } = await supabase.from('contacts').insert([{
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        email: '',
        message: 'Popup form submission - Priority Support Request'
      }]);

      if (error) {
        console.error('Database error:', error);
        alert('Error submitting form. Please try WhatsApp.');
        setFormSubmitting(false);
        return;
      }

      setFormSubmitted(true);
      setFormData({ name: '', phone: '', service: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Error submitting form. Please try WhatsApp.');
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xs w-full overflow-hidden transform transition-all animate-[scaleIn_0.3s_ease-out]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 w-7 h-7 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3">
          <h2 className="text-base font-bold">Special Offer</h2>
          <p className="text-xs text-primary-100">Limited time only</p>
        </div>

        <div className="p-4">
          {formSubmitted ? (
            <div className="text-center py-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-base font-bold text-secondary-900 mb-1">Success!</h3>
              <p className="text-xs text-secondary-600 mb-3">
                We'll contact you shortly.
              </p>
              <button onClick={onClose} className="text-primary-600 font-medium hover:text-primary-700 text-xs">
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Countdown Timer */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-2.5 mb-3 border border-red-100 text-center">
                <div className="flex items-center justify-center space-x-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-red-600 font-bold text-lg font-mono">{formatTime(timeLeft)}</span>
                </div>
                <p className="text-xs text-secondary-600">Hurry! Offer expires soon</p>
              </div>

              {/* Offer Text */}
              <div className="bg-primary-50 rounded-lg p-2.5 mb-3 border border-primary-100">
                <p className="text-xs text-secondary-700 leading-relaxed text-center font-medium">
                  Get Extra Priority Support + Bonus Consultation if you purchase any plan within 1 hour.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 outline-none transition-all text-secondary-600"
                  >
                    <option value="">Service Required *</option>
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
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{formSubmitting ? 'Submitting...' : 'Claim Offer'}</span>
                </button>
              </form>

              <div className="mt-3 pt-3 border-t border-secondary-100">
                <p className="text-center text-secondary-400 text-xs mb-2">Quick contact</p>
                <button
                  onClick={openWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
