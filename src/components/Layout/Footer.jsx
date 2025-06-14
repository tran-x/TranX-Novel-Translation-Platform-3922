import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">TranX</h3>
            <p className="text-gray-600 text-sm">
              The premier platform for translated Chinese, Japanese, and Korean novels.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-black mb-4">For Readers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-black">Browse Novels</Link></li>
              <li><Link to="/register" className="text-gray-600 hover:text-black">Create Account</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-black mb-4">For Translators</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/become-translator" className="text-gray-600 hover:text-black">Apply Now</Link></li>
              <li><Link to="/translator-tools" className="text-gray-600 hover:text-black">Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-black mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-black">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 TranX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;