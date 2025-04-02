import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-green-800 text-center">Help Center</h1>

      <div className="space-y-8">
        {/* Quick Start Guide */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Quick Start Guide</h2>
          <div className="space-y-4">
            <div className="pl-4">
              <h3 className="font-medium text-lg mb-2">1. Finding Events</h3>
              <p className="text-gray-600">
                Browse available football events on our home page. Use filters to find events that match your child's age group and skill level.
              </p>
            </div>
            <div className="pl-4">
              <h3 className="font-medium text-lg mb-2">2. Joining Events</h3>
              <p className="text-gray-600">
                Create an account or log in to join events. Add your child's details and confirm your attendance.
              </p>
            </div>
            <div className="pl-4">
              <h3 className="font-medium text-lg mb-2">3. Creating Events</h3>
              <p className="text-gray-600">
                Organizers can create new events by clicking the "Create Event" button and filling out the event details.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium text-lg mb-2">How do I register my child?</h3>
              <p className="text-gray-600">
                After creating an account, go to your profile settings to add your child's details. You can add multiple children if needed.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium text-lg mb-2">What if I need to cancel?</h3>
              <p className="text-gray-600">
                You can cancel your attendance up to 24 hours before the event. Simply go to your registered events and click the cancel button.
              </p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium text-lg mb-2">Are the events supervised?</h3>
              <p className="text-gray-600">
                All events are run by qualified coaches who are DBS checked and first aid trained. Parents are welcome to stay and watch.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Need More Help?</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              If you can't find the answer you're looking for, our support team is here to help:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Email us at: support@footie-friends.com</li>
              <li>Call us: 0800 123 4567 (Mon-Fri, 9am-5pm)</li>
              <li>
                Visit our <Link href="/contact" className="text-green-600 hover:underline">Contact Page</Link> for more options
              </li>
            </ul>
          </div>
        </section>

        {/* Safety Information */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Safety Information</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Your child's safety is our top priority. Here's what we do to ensure a safe environment:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>All coaches are DBS checked and first aid certified</li>
              <li>Events are held at verified locations with proper facilities</li>
              <li>Clear emergency procedures are in place</li>
              <li>Regular equipment safety checks</li>
              <li>Appropriate child-to-coach ratios maintained</li>
            </ul>
          </div>
        </section>

        {/* Useful Links */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Useful Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/faq" 
              className="p-4 border rounded-lg hover:bg-green-50 transition-colors"
            >
              <h3 className="font-medium text-lg mb-2">FAQ Page</h3>
              <p className="text-gray-600">Detailed answers to common questions</p>
            </Link>
            <Link 
              href="/contact" 
              className="p-4 border rounded-lg hover:bg-green-50 transition-colors"
            >
              <h3 className="font-medium text-lg mb-2">Contact Us</h3>
              <p className="text-gray-600">Get in touch with our support team</p>
            </Link>
            <Link 
              href="/terms" 
              className="p-4 border rounded-lg hover:bg-green-50 transition-colors"
            >
              <h3 className="font-medium text-lg mb-2">Terms of Service</h3>
              <p className="text-gray-600">Our terms and conditions</p>
            </Link>
            <Link 
              href="/privacy" 
              className="p-4 border rounded-lg hover:bg-green-50 transition-colors"
            >
              <h3 className="font-medium text-lg mb-2">Privacy Policy</h3>
              <p className="text-gray-600">How we protect your data</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
