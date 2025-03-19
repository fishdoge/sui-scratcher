'use client';

import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <div className="bg-white/70 backdrop-blur-md border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Sui Scratcher
                </span>
              </div>
              <p className="text-gray-600">
                The most transparent and fair lottery platform on SUI.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    Past Results
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  Discord
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  Telegram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Sui Scratcher. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
