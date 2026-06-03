import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-primary-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="text-lg text-primary-100">Last updated: January 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">Introduction</h2>
              <p className="text-secondary-600 leading-relaxed">
                At DigiExpert, we strive to deliver exceptional web design and digital marketing services. This Refund Policy outlines the terms and conditions for refunds on our services. By engaging our services, you agree to this policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Advance Payment Refunds</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                For standard projects:
              </p>
              <ul className="list-disc pl-6 text-secondary-600 space-y-2">
                <li>Full refund of advance payment if cancelled within 24 hours of booking</li>
                <li>50% refund of advance payment if cancelled before work begins (after 24 hours)</li>
                <li>No refund once work has commenced on the project</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. Project Cancellation</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                If a project is cancelled mid-way:
              </p>
              <ul className="list-disc pl-6 text-secondary-600 space-y-2">
                <li>Client will be charged for work completed up to the cancellation date</li>
                <li>Unused portion of advance payment may be refunded after deducting completed work charges</li>
                <li>Third-party costs (hosting, domains, premium plugins) are non-refundable</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. Refund Request Process</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                To request a refund:
              </p>
              <ol className="list-decimal pl-6 text-secondary-600 space-y-2">
                <li>Send a written request to support.digiexpert@gmail.com</li>
                <li>Include your project details and reason for refund request</li>
                <li>Refund requests will be reviewed within 3-5 business days</li>
                <li>Approved refunds will be processed within 7-10 business days</li>
              </ol>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Non-Refundable Services</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                The following are non-refundable:
              </p>
              <ul className="list-disc pl-6 text-secondary-600 space-y-2">
                <li>Completed projects that have been delivered and approved</li>
                <li>Domain registration fees</li>
                <li>Hosting fees (if purchased through DigiExpert)</li>
                <li>Third-party software or plugin licenses</li>
                <li>Consultation services already provided</li>
                <li>Custom software development work completed</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Dissatisfaction with Services</h2>
              <p className="text-secondary-600 leading-relaxed">
                If you are not satisfied with our services, we will work with you to address your concerns through revisions. We offer reasonable revision rounds included in each project. If after reasonable revisions you are still unsatisfied, we may provide a partial refund based on the work completed and deliverables provided.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. Refund Method</h2>
              <p className="text-secondary-600 leading-relaxed">
                Refunds will be processed using the same payment method used for the original payment. Bank transfer refunds may take 7-10 business days to reflect in your account.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Disputes</h2>
              <p className="text-secondary-600 leading-relaxed">
                In case of disputes regarding refunds, our decision will be final and binding. We commit to fair assessment of all refund requests and will provide written explanation for any denied requests.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. Modifications to Policy</h2>
              <p className="text-secondary-600 leading-relaxed">
                DigiExpert reserves the right to modify this refund policy at any time. Changes will be effective immediately upon posting on our website. For ongoing projects, the policy in effect at the time of project commencement will apply.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">9. Contact Us</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                For any questions about our Refund Policy, please contact us:
              </p>
              <div className="bg-secondary-50 rounded-lg p-6">
                <p className="text-secondary-900 font-semibold mb-2">DigiExpert</p>
                <p className="text-secondary-600">Email: support.digiexpert@gmail.com</p>
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
