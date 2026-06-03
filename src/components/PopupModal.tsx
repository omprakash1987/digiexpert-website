import { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle, Clock, AlertCircle, Zap, Lightbulb } from 'lucide-react';

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
  const [timeLeft, setTimeLeft] = useState(3600);
  const [formError, setFormError] = useState('');
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || claimSuccess) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, claimSuccess]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('Please enter your name');
      return false;
    }
    if (formData.name.trim().length < 2) {
      setFormError('Name must be at least 2 characters');
      return false;
    }
    if (!formData.phone.trim()) {
      setFormError('Please enter your phone number');
      return false;
    }
    if (formData.phone.trim().length < 10) {
      setFormError('Phone number must be at least 10 digits');
      return false;
    }
    if (!formData.service) {
      setFormError('Please select a service');
      return false;
    }
    return true;
  };

  const handleClaimOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const dateTime = now.toLocaleString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const message = encodeURIComponent(
      `Hello DigiExpert,\nI want to claim the Special Offer.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nOffer Claimed At: ${dateTime}\n\nPlease contact me.`
    );

    const whatsappUrl = `https://wa.me/919891113214?text=${message}`;

    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setClaimSuccess(true);
      setIsSubmitting(false);
    }, 500);
  };

  const handleMaybeLater = () => {
    setFormData({ name: '', phone: '', service: '' });
    setFormError('');
    setClaimSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleMaybeLater} />

      {/* Popup Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl transform transition-all animate-[scaleIn_0.3s_ease-out] flex flex-col lg:flex-row lg:h-[600px]">
        {claimSuccess ? (
          // Success State
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center min-h-96 flex flex-col items-center justify-center w-full">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-[scaleIn_0.5s_ease-out]">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">Success!</h2>
            <p className="text-secondary-600 mb-6">
              Offer claimed successfully. Continue the conversation on WhatsApp to discuss your project with our team.
            </p>
            <button
              onClick={handleMaybeLater}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Left Side - Form */}
            <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMaybeLater();
                }}
                className="absolute top-3 right-3 z-20 w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                aria-label="Close popup"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-secondary-900">Special Offer</h2>
                <p className="text-sm text-secondary-500 mt-1">Limited Time Only</p>
              </div>

              {/* Countdown Timer */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-3 mb-4 border-2 border-red-200">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="font-bold text-red-600 text-sm">Offer Expires:</span>
                  </div>
                  <span className="text-lg font-mono font-bold text-red-600">{formatTime(timeLeft)}</span>
                </div>
                <p className="text-xs text-red-700 font-medium">Hurry! Limited slots available</p>
              </div>

              {/* Offer Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <p className="text-sm text-secondary-700"><span className="font-semibold">Priority WhatsApp Support</span> - Get instant responses</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-primary-600 flex-shrink-0 mt-1" />
                  <p className="text-sm text-secondary-700"><span className="font-semibold">Custom Website Recommendations</span> - Tailored solutions</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleClaimOffer} className="space-y-3 flex-1 flex flex-col">
                {/* Error Message */}
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs flex items-start space-x-2">
                    <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setFormError('');
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      setFormError('');
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-1">
                    Service Required *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => {
                      setFormData({ ...formData, service: e.target.value });
                      setFormError('');
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm text-secondary-600 bg-white"
                  >
                    <option value="">Select a service...</option>
                    <option value="Business Website">Business Website</option>
                    <option value="E-commerce Website">E-commerce Website</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Website Redesign">Website Redesign</option>
                    <option value="SEO Service">SEO Service</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex-1" />

                {/* Buttons */}
                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-primary-400 disabled:to-primary-400 text-white py-2.5 rounded-lg font-bold transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Opening WhatsApp...' : 'Claim Offer Now'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleMaybeLater}
                    className="w-full bg-secondary-100 hover:bg-secondary-200 text-secondary-700 py-2 rounded-lg font-semibold transition-all text-sm"
                  >
                    Maybe Later
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side - Website Showcase */}
            <div className="hidden lg:flex flex-col bg-gradient-to-br from-primary-50 to-primary-100 p-6 border-l border-secondary-200 w-80">
              <h3 className="text-sm font-bold text-secondary-900 mb-4">Our Best Work</h3>

              {/* Website 1 */}
              <div className="mb-4 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-1">TechCorp</div>
                    <p className="text-xs">Enterprise Solutions</p>
                  </div>
                </div>
                <div className="bg-white p-3">
                  <p className="text-xs text-secondary-600">Modern business website with AI chatbot integration</p>
                </div>
              </div>

              {/* Website 2 */}
              <div className="mb-4 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 h-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-1">ShopHub</div>
                    <p className="text-xs">E-commerce Platform</p>
                  </div>
                </div>
                <div className="bg-white p-3">
                  <p className="text-xs text-secondary-600">Full-featured store with payment integration</p>
                </div>
              </div>

              {/* Website 3 */}
              <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-orange-400 to-red-600 h-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-1">Startup Lab</div>
                    <p className="text-xs">Landing Page</p>
                  </div>
                </div>
                <div className="bg-white p-3">
                  <p className="text-xs text-secondary-600">High-converting landing page with video</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
