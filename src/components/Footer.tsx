import Image from "next/image";
import Link from "next/link";

export function CustomFooter() {
  return (
    <footer className="bg-black text-white py-8 px-4 font-work-sans">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center mb-3 sm:mb-0 ">
            <Image
              src="/logo.png"
              alt="Hour Zero Logo"
              width={100}
              height={100}
              className="hover:opacity-90"
            />
            <div className="flex flex-col ">
              <span className="ml-3 text-lg font-semibold ">
                Hour <span className="text-purple-400">Zero</span>
              </span>

              <div className="text-gray-400 text-sm mt-2 text-center">
                <p>Because Every Mark Counts</p>
              </div>
            </div>
          </Link>

          {/* Links Section */}
          <div className="flex gap-10 justify-around mr-6">
            <Link href="/about" className="hover:text-purple-300">
              About
            </Link>
            <Link href="/privacy" className="hover:text-purple-300">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-purple-300">
              Contact
            </Link>
            <Link href="/admin" className="hover:text-purple-300">
              Admin
            </Link>
          </div>
        </div>

        {/* <div className="text-left text-gray-400 text-sm my-4">
          <p>Because Every Mark Counts</p>
        </div> */}

        {/* Divider */}
        <div className="border-t border-gray-800 my-6" />

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} Hour Zero. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
