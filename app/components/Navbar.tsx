"use client"
import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-customblue w-full">
      <div className="flex justify-between items-center max-w-full h-12 px-4 md:px-8">
        {/* Logo */}
        <Link href="/">
          <div className="text-white font-Poppins font-semibold text-lg">
            AI Trip Planner
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-white">Home</Link>
          <Link href="/pricing" className="text-white">Pricing</Link>
          <Link href="/features" className="text-white">Features</Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-2">
          <Link href="/signin">
            <button className="bg-white text-customblue px-3 py-1 rounded-sm">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-white text-customblue px-3 py-1 rounded-sm">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-3 bg-customblue py-4">
          <Link href="/" className="text-white" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/pricing" className="text-white" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="/features" className="text-white" onClick={() => setIsOpen(false)}>Features</Link>
          <Link href="/signin">
            <button className="bg-white text-customblue px-3 py-1 rounded-sm w-full" onClick={() => setIsOpen(false)}>
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-white text-customblue px-3 py-1 rounded-sm w-full" onClick={() => setIsOpen(false)}>
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
