import { Ghost } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="transition-colors duration-200 text-gray-600
          hover:text-purple-500"
    >
      {children}
    </Link>
  );
};

const Header = () => {
  return (
    <nav
      className="container flex items-center 
    justify-between px-8 py-4 mx-auto"
    >
      <div className="flex lg:flex-1">
        <NavLink href="/">
          <span className="flex items-center shrink-0">
            <Ghost className="hover:rotate-12 transform transition duration-200 ease-in-out" />
            <span className="font-extrabold text-lg ml-2">SpeakEasy.AI</span>
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-2 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <NavLink href="/#posts">Your Posts</NavLink>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <div className="flex gap-2 items-center">
          <NavLink href="/dashboard">Upload a Video</NavLink>
        </div>
        <div>
          <NavLink href="/sign-in">Sign In</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
