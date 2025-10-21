import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-10">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Flexbox Layout */}
        <div className="flex sm:flex-row flex-wrap justify-between border-b border-gray-700 pb-8 gap-8">
          
          {/* Section 1 */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="md:text-xl font-bold mb-3 text-white">Auction Central</h2>
            <ul className="space-y-1 text-gray-300">
              <li className="hover:text-white transition text-sm md:text-base">Live Auctions</li>
              <li className="hover:text-white transition text-sm md:text-base">Past Auctions</li>
              <li className="hover:text-white transition text-sm md:text-base">Categories</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="md:text-xl font-semibold mb-3 text-white ">About Us</h2>
            <ul className="space-y-1 text-gray-300">
              <li className="hover:text-white transition text-sm md:text-base">Our Story</li>
              <li className="hover:text-white transition text-sm md:text-base">Careers</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="md:text-xl font-semibold mb-3 text-white">Support</h2>
            <ul className="space-y-1 text-gray-300">
              <li className="hover:text-white transition text-sm md:text-base">FAQ</li>
              <li className="hover:text-white transition text-sm md:text-base">Contact Us</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="md:text-xl font-semibold mb-3 text-white">Follow Us</h2>
            <div className="flex gap-5 text-3xl">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-400 text-sm">
          <p>© 2025 Auction Central. All Rights Reserved.</p>
          {/* <p className="mt-2 sm:mt-0">
            Built with ❤️ by <span className="text-amber-400">us</span>
          </p> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
