"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Section";

// =============================================================================
// HEADER COMPONENT
// =============================================================================
// Responsive header with logo, navigation, and mobile menu.
// Dark teal background with light text.
// =============================================================================

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "Trips" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#121E1E]/70 backdrop-blur-xl shadow-lg border-b border-white/10"
          : "bg-[#121E1E]/80 backdrop-blur-lg border-b border-white/5"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Jibal Adventures"
              className="w-40 md:w-48"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "text-[#BABCA7]"
                    : "text-[#F2F2F2]/80 hover:text-[#F2F2F2]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/trips"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 bg-[#BABCA7] text-[#121E1E] hover:bg-[#D1D3C4] h-11 px-6 text-base"
            >
              Browse Trips
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-[#F2F2F2]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </Container>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed left-0 right-0 bottom-0 z-50"
          style={{
            top: "64px",
            backgroundColor: "#121E1E",
            minHeight: "100vh",
          }}
        >
          <Container className="py-8">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xl font-medium py-2 transition-colors duration-200",
                    pathname === link.href
                      ? "text-[#BABCA7]"
                      : "text-[#F2F2F2] hover:text-[#BABCA7]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-[#F2F2F2]/20">
                <Link
                  href="/trips"
                  className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 bg-[#BABCA7] text-[#121E1E] hover:bg-[#D1D3C4] h-14 px-10 text-lg w-full"
                >
                  Browse Trips
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}{" "}
    </header>
  );
}
