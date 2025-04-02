"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const publicNavItems = [
  { href: "/", label: "Home" },
  { href: "/#event-list", label: "Events" },
  { href: "/help", label: "Help" },
];

const authenticatedNavItems = [
  { href: "/", label: "Home" },
  { href: "/#event-list", label: "Events" },
  { href: "/create", label: "Create Event" },
  { href: "/help", label: "Help" },
  { href: "/settings", label: "Settings" }
];

export default function Header({ fontClass }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const navItems = session ? authenticatedNavItems : publicNavItems;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className={`flex items-center justify-between px-4 py-2 mb-8 ${fontClass}`}>
      <div className="flex items-center">
        <h1 className="text-4xl text-green-900 font-bold lg:hidden">Footie Friends</h1>
        <Image
          src="/logo_ff.png"
          alt="Footie Friends Logo"
          width={150}
          height={100}
          className="w-25 h-25 hidden lg:block"
        />
      </div>

      <button
        className="lg:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav
        className={`${
          menuOpen ? "fixed inset-0 bg-white z-50" : "hidden"
        } lg:flex lg:items-center lg:space-x-4`}
      >
        {menuOpen && (
          <button
            className="absolute top-4 right-4 lg:hidden text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        )}
        <div
          className={`flex flex-col items-center justify-center h-full space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="btn btn-ghost text-green-600 hover:bg-green-500 hover:text-white text-lg py-2 px-4"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {loading ? (
            <div className="animate-pulse bg-gray-200 h-10 w-20 rounded"></div>
          ) : session ? (
            <>
              <div className="flex items-center space-x-4">
                <span className="text-green-600 text-lg">👋 Welcome, {session.user.name}</span>
                <button
                  onClick={handleSignOut}
                  className="btn bg-red-500 text-white hover:bg-red-600 text-lg py-2 px-4"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="btn bg-green-500 text-white hover:bg-green-600 text-lg py-2 px-4"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="btn bg-blue-500 text-white hover:bg-blue-600 text-lg py-2 px-4"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
