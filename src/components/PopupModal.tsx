import { useState, useEffect } from 'react';
import { X, Send, MessageCircle, CheckCircle, Clock, AlertCircle } from 'lucide-react';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleMaybeLater} />

      {/* Popup Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-[scaleIn_0.3s_ease-out]">
        {/* Close Button */}
        <button
          onClick={handleMaybeLater}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {claimSuccess ? (
          // Success State
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center min-h-96 flex flex-col items-center justify-center">
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
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white px-6 py-4">
              <h2 className="text-2xl font-bold">Special Offer</h2>
              <p className="text-sm text-primary-100 mt-1">Limited Time Only</p>
            </div>

            <div className="p-6">
              {/* Countdown Timer */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 mb-4 border-2 border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-red-600" />
                    <span className="font-bold text-red-600">Offer Expires In:</span>
                  </div>
                  <span className="text-2xl font-mono font-bold text-red-600">{formatTime(timeLeft)}</span>
                </div>
                <p className="text-xs text-red-700 font-medium">Hurry! Limited slots available</p>
              </div>

              {/* Offer Details */}
              <div className="bg-primary-50 rounded-xl p-4 mb-5 border border-primary-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-secondary-900 text-sm mb-1">Get Extra Priority Support</p>
                    <p className="text-xs text-secondary-600 leading-relaxed">
                      Bonus Consultation + Priority Support if you claim this offer within 1 hour.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleClaimOffer} className="space-y-4">
                {/* Error Message */}
                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
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
                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
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
                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Service Required *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => {
                      setFormData({ ...formData, service: e.target.value });
                      setFormError('');
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm text-secondary-600 bg-white"
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

                {/* Claim Offer Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-primary-400 disabled:to-primary-400 text-white py-3.5 rounded-lg font-bold transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-base"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'Opening WhatsApp...' : 'Claim Offer Now'}</span>
                </button>

                {/* Maybe Later Button */}
                <button
                  type="button"
                  onClick={handleMaybeLater}
                  className="w-full bg-secondary-100 hover:bg-secondary-200 text-secondary-700 py-3 rounded-lg font-semibold transition-all text-base"
                >
                  Maybe Later
                </button>
              </form>

              {/* Quick Contact Alternative */}
              <div className="mt-5 pt-5 border-t border-secondary-100 text-center">
                <p className="text-xs text-secondary-500 mb-3">Prefer direct chat?</p>
                <button
                  onClick={() =>
                    window.open(
                      'https://wa.me/919891113214?text=Hi DigiExpert, I want to discuss the special offer.',
                      '_blank'
                    )
                  }
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
