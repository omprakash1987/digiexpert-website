import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-primary-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-primary-100">Last updated: January 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Introduction</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                DigiExpert ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website https://www.digiexpert.online or use our services.
              </p>
              <p className="text-secondary-600 leading-relaxed">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-secondary-800 mb-3">Personal Data</h3>
              <p className="text-secondary-600 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-secondary-600 mb-4 space-y-2">
                <li>Fill out a contact form</li>
                <li>Request a quote or consultation</li>
                <li>Subscribe to our newsletter</li>
                <li>Engage with our services</li>
              </ul>
              <p className="text-secondary-600 leading-relaxed mb-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 text-secondary-600 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Project requirements</li>
                <li>Website URLs</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-secondary-600 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Send you promotional communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Protect our rights and interests</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Data Security</h2>
              <p className="text-secondary-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Cookies and Tracking</h2>
              <p className="text-secondary-600 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. Third-Party Services</h2>
              <p className="text-secondary-600 leading-relaxed">
                We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, or assist us in analyzing how our website is used. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Your Rights</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-secondary-600 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. Contact Us</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-secondary-50 rounded-lg p-6">
                <p className="text-secondary-900 font-semibold mb-2">DigiExpert</p>
                <p className="text-secondary-600">Email: om0071987@gmail.com</p>
                <p className="text-secondary-600">Phone: +91 9891113214</p>
                <p className="text-secondary-600">Website: https://www.digiexpert.online</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
