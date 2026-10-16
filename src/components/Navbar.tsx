import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex row justify-between items-center"
        aria-label="Main Navigation"
      >
        {/* Logo (left) */}
        <a
          href="/"
          className="flex flex-row items-center gap-3 text-white group"
          aria-label="Mainframe Home"
        >
          <span
            className="text-[21px] sm:text-[26px] tracking-tight font-medium"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] select-none text-white leading-none inline-block"
            style={{
              letterSpacing: '-0.02em',
              color: '#ffffff',
              filter: 'brightness(0) invert(1)',
            }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        {/* Desktop nav links (center, hidden below md) */}
        <div className="hidden md:flex flex-row items-center text-[23px] text-white">
          <a href="#labs" className="hover:opacity-60 transition-opacity">
            Labs
          </a>
          <span>,&nbsp;</span>
          <a href="#studio" className="hover:opacity-60 transition-opacity">
            Studio
          </a>
          <span>,&nbsp;</span>
          <a href="#openings" className="hover:opacity-60 transition-opacity">
            Openings
          </a>
          <span>,&nbsp;</span>
          <a href="#shop" className="hover:opacity-60 transition-opacity">
            Shop
          </a>
        </div>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:block">
          <a
            href="mailto:hello@mainframe.co"
            className="text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none cursor-pointer z-20"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center px-8 gap-8 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <a
          href="#labs"
          onClick={closeMenu}
          className="text-[32px] font-medium text-white hover:opacity-70 transition-opacity"
        >
          Labs
        </a>
        <a
          href="#studio"
          onClick={closeMenu}
          className="text-[32px] font-medium text-white hover:opacity-70 transition-opacity"
        >
          Studio
        </a>
        <a
          href="#openings"
          onClick={closeMenu}
          className="text-[32px] font-medium text-white hover:opacity-70 transition-opacity"
        >
          Openings
        </a>
        <a
          href="#shop"
          onClick={closeMenu}
          className="text-[32px] font-medium text-white hover:opacity-70 transition-opacity"
        >
          Shop
        </a>
        <a
          href="mailto:hello@mainframe.co"
          onClick={closeMenu}
          className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
