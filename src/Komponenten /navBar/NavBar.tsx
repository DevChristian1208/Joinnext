"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Summary", href: "/Summary", icon: "/summary.png" },
  { label: "Add Task", href: "/AddTask", icon: "/addTask.png" },
  { label: "Board", href: "/Board", icon: "/board.png" },
  { label: "Contacts", href: "/Contacts", icon: "/contact.png" },
];

const NavBar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed top-0 left-0 h-screen w-[232px] bg-[#2A3647] flex flex-col justify-between items-center z-50 text-white">
      <div className="pt-16">
        <Image src="/joinlogo2.png" alt="Join Logo" width={100} height={100} />
      </div>
      <nav className="flex flex-col gap-4 mb-16 w-full items-center">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={`flex items-center w-[192px] h-[46px] px-8 gap-3 text-[#CDCDCD] rounded transition-colors ${
                isActive(item.href)
                  ? "bg-[#091931] text-white pointer-events-none"
                  : "hover:bg-[#2A3D59]"
              }`}
            >
              <Image src={item.icon} alt={item.label} width={30} height={30} />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
      <div className="flex flex-col pb-16 text-[#A8A8A8] text-sm font-normal w-full items-start pl-20">
        <Link href="/privacy-policy" className="hover:text-[#29abe2] mb-2">
          Privacy Policy
        </Link>
        <Link href="/legal-notice" className="hover:text-[#29abe2]">
          Legal Notice
        </Link>
      </div>
    </aside>
  );
};

export default NavBar;
