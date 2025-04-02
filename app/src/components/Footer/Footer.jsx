export default function Footer() {
  return (
    <footer className="bg-green-900 text-white space-y-8 px-2 py-2 mt-8 rounded-2xl mb-5 shadow-lg text-center">
      <div className="container mx-auto px-2 w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="space-y-4 rounded-lg p-4 mx-auto">
          <h3 className="text-2xl font-bold text-gray-200">Your Account</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#" className="btn btn-sm btn-outline btn-accent">
              Settings
            </a>
            <a href="#" className="btn btn-sm btn-outline btn-accent">
              Log Out
            </a>
            <a href="#" className="btn btn-sm btn-outline btn-accent">
              Help
            </a>
          </div>
        </div>

        <div className="space-y-4 rounded-lg p-4 mx-auto">
          <h3 className="text-2xl font-bold text-gray-200">Social Media</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#facebook" className="btn btn-sm btn-outline btn-primary">
              Facebook
            </a>
            <a href="#twitter" className="btn btn-sm btn-outline btn-info">
              Twitter
            </a>
            <a href="#instagram" className="btn btn-sm btn-outline btn-secondary">
              Instagram
            </a>
          </div>
        </div>

        <div className="space-y-4 rounded-lg p-4 mx-auto">
          <h3 className="text-2xl font-bold text-gray-200">Report an Issue</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#report" className="btn btn-sm btn-outline btn-warning">
              How to report an issue
            </a>
            <a href="#" className="btn btn-sm btn-outline btn-warning">
              Contact Us
            </a>
            <a href="#faq" className="btn btn-sm btn-outline btn-warning">
              FAQ
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-white mx-auto">
        <p className="text-lg font-light">
          &copy; {new Date().getFullYear()} <span className="font-semibold">Footie Friends</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
