import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="bg-gray-100 text-gray-700">
        <div className="max-w-screen-xl p-6 py-8 mx-auto lg:py-12 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900">VILU GENIUS.</h3>
              <p className="mb-2 text-sm text-gray-500">
                The genesis of VILU Genius Private Limited is traced to Mr. Prakasha H for his decade of experience in the retail banking industry, primarily in housing loans and financial services.
              </p>
              <p className="text-sm text-gray-500">
                Leveraging his experience and unique ideas, he aims to create a lasting organization in the affordable home loans and finance business.
              </p>
            </div>

           
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="/register" className="hover:text-blue-500">
                    Get Started
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-blue-500">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/features" className="hover:text-blue-500">
                    Our Features
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-blue-500">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

          
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900">Contact Us</h3>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Email:</strong> vilugenius@gmail.com
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Phone:</strong> +91 9620795762<br />+91 9900541268
              </p>
              <p className="text-sm text-gray-500">
                <strong>Address:</strong> Registered address of Vilu Genius is 26832/20/3A, Someshwara Extension, 1st Main, Doddaballapur, Karnataka, India-561203.
              </p>
            </div>

           
            <div >
              <h3 className="mb-4 text-lg font-bold text-gray-900">Follow Us</h3>
              <ul className="flex space-x-4 ">
                <li>
                  <a href="#" className="text-gray-500 hover:text-blue-500">
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-pink-500">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-green-500">
                    <FaWhatsapp className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-500 hover:text-blue-400">
                    <FaTwitter className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto" />
          <div className="text-center">
            <span className="text-sm text-gray-500">
              © 2022-2023 VILU GENIUS™. All Rights Reserved. | <a href="#" className="hover:text-blue-500">Terms & Conditions</a> | <a href="#" className="hover:text-blue-500">Privacy Policy</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
