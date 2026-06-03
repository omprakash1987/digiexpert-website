import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-primary-100 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-lg text-primary-100">Last updated: January 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-secondary-600 leading-relaxed">
                By accessing and using the services provided by DigiExpert through our website https://www.digiexpert.online, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. Services</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                DigiExpert provides web design, web development, and digital marketing services. Our services include but are not limited to:
              </p>
              <ul className="list-disc pl-6 text-secondary-600 space-y-2">
                <li>Website design and development</li>
                <li>E-commerce solutions</li>
                <li>Search Engine Optimization (SEO)</li>
                <li>Content creation and copywriting</li>
                <li>Website maintenance and support</li>
                <li>Digital marketing services</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. Project Scope and Deliverables</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                The scope of each project will be defined in a project proposal or agreement before work begins. Any changes to the agreed scope may result in additional charges and timeline adjustments. Client must approve all deliverables within 7 days of submission.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Payment Terms</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                Payment terms are as follows:
              </p>
              <ul className="list-disc pl-6 text-secondary-600 space-y-2">
                <li>50% advance payment required to start the project</li>
                <li>Remaining 50% due upon project completion</li>
                <li>Payment methods: Bank transfer, UPI, or online payment</li>
                <li>Late payments may incur additional charges</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Client Responsibilities</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                The client agrees to:
              </p>
              <ul className="list-disc pl-6 text-secondary-600 space-y-2">
                <li>Provide necessary content and materials in a timely manner</li>
                <li>Provide feedback and approvals within agreed timeframes</li>
                <li>Ensure all provided content does not infringe on third-party rights</li>
                <li>Make timely payments as per the agreement</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. Intellectual Property</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                Upon full payment, the client receives ownership of the final deliverables. DigiExpert retains the right to use the completed work in our portfolio unless otherwise agreed. Any third-party assets used in the project remain the property of their respective owners.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Revisions and Modifications</h2>
              <p className="text-secondary-600 leading-relaxed">
                Each project includes a specified number of revision rounds. Additional revisions beyond the agreed scope will be charged at our standard hourly rate. Major changes to the project scope after work has begun may require a new project quote.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. Timeline and Delivery</h2>
              <p className="text-secondary-600 leading-relaxed">
                Project timelines are estimates based on the agreed scope. Delays caused by client feedback, content provision, or third-party services may extend the timeline. We are not liable for delays caused by factors beyond our control.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">9. Confidentiality</h2>
              <p className="text-secondary-600 leading-relaxed">
                Both parties agree to keep confidential any sensitive information shared during the project. This includes business strategies, customer data, and proprietary information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-secondary-600 leading-relaxed">
                DigiExpert shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with our services. Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">11. Termination</h2>
              <p className="text-secondary-600 leading-relaxed">
                Either party may terminate the agreement with written notice. If terminated by the client, payment for work completed to date is required. Refunds are subject to our Refund Policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">12. Governing Law</h2>
              <p className="text-secondary-600 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be resolved in the courts of appropriate jurisdiction in India.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">13. Contact Information</h2>
              <p className="text-secondary-600 leading-relaxed mb-4">
                For questions about these Terms & Conditions, please contact us:
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
