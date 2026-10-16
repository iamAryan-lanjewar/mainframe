import { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const INTRO_LINE_1 = 'Hey there, meet A.R.I.A,';
const INTRO_LINE_2 = "Mainframe's Adaptive Response Interface Agent";
const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

const ACTION_PILLS = [
  { label: 'Pitch us an idea', href: '#pitch' },
  { label: 'Come work here', href: '#careers' },
  { label: 'Send a brief hello', href: '#hello' },
  { label: 'See how we operate', href: '#operate' },
];

export function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Action pills become visible 400ms after page load, independent of typewriter
  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText('hello@mainframe.co');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      className="relative z-[1] w-full h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
      aria-label="Hero"
    >
      <div className="max-w-xl relative z-10">
        {/* 1. Blurred intro label */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#fff',
            filter: 'blur(4px)',
            WebkitFilter: 'blur(4px)',
          }}
          aria-hidden="true"
        >
          {INTRO_LINE_1}
          <br />
          {INTRO_LINE_2}
        </div>

        {/* 2. Typewriter text */}
        <p
          className="text-white mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
          aria-live="polite"
        >
          <span>{displayed}</span>
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          className={`flex flex-wrap gap-y-1 transition-all duration-400 ease-out ${
            pillsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[8px]'
          }`}
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '0.4s',
            transitionTimingFunction: 'ease',
          }}
        >
          {/* 4 white pill buttons */}
          {ACTION_PILLS.map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {pill.label}
            </a>
          ))}

          {/* 1 outline pill button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="relative inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer group"
            title="Click to copy email address"
            aria-label="Reach us: hello@mainframe.co. Click to copy email address"
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">
                hello@mainframe.co
              </span>
            </span>

            {/* 12x12 copy icon of two overlapping rectangles */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block shrink-0 transition-transform group-hover:scale-105"
              aria-hidden="true"
            >
              <path
                d="M3.75 2.25H9.75V8.25"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="1.75"
                y="3.75"
                width="6.5"
                height="6.5"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>

            {/* Copied tooltip indicator */}
            {copied && (
              <span className="absolute -top-7 right-2 bg-white text-black text-[11px] font-medium px-2 py-0.5 rounded shadow-lg pointer-events-none transition-all">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
