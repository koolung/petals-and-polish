'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">Petals & Polish</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gorgeous Press-On Nails. Express Yourself.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-[#f7c5d8] transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-[#f7c5d8] transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Petals & Polish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
