"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userInitials = "JD"; // TODO: Dynamisch ersetzen, z. B. aus Context/Auth

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-24 bg-white shadow-md z-40 flex items-center justify-between px-6">
      {/* Logo (nur für Mobile) */}
      <div className="block lg:hidden">
        <Image src="/joinlogo.png" alt="Join Logo" width={40} height={40} />
      </div>

      {/* Headline */}
      <div className="hidden lg:block ml-[348px] text-lg font-normal">
        Kanban Project Management Tool
      </div>

      {/* Help + User */}
      <div className="flex items-center gap-4 cursor-pointer">
        {/* Help Button */}
        <button onClick={() => (window.location.href = "/help")}>
          <Image
            className="cursor-pointer"
            src="/help.png"
            alt="Help"
            width={24}
            height={24}
          />
        </button>

        {/* User Profile / Dropdown */}
        <div className="relative">
          <button
            className="w-14 h-14 border-[3px] border-[#2a3647] rounded-full flex items-center justify-center"
            onClick={toggleMenu}
          >
            <span className="text-[#29abe2] font-bold text-xl cursor-pointer">
              {userInitials}
            </span>
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-40 bg-[#2a3647] text-[#cdcdcd] rounded-bl-2xl rounded-tr-2xl shadow-md z-50 flex flex-col overflow-hidden">
              <Link href="/help" className="px-6 py-3 hover:bg-[#091931]">
                Help
              </Link>
              <Link
                href="/privacy-policy"
                className="px-6 py-3 hover:bg-[#091931]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal-notice"
                className="px-6 py-3 hover:bg-[#091931]"
              >
                Legal Notice
              </Link>
              <button
                onClick={() => {
                  // TODO: Add logout logic (z. B. via Supabase/Auth)
                  console.log("Logout clicked");
                }}
                className="px-6 py-3 text-left hover:bg-[#091931]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
