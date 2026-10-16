/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden select-none">
      {/* Background Video (mouse-scrub controlled) */}
      <BackgroundVideo />

      {/* Fixed Navbar (z-index: 10) & Mobile Overlay (z-index: 9) */}
      <Navbar />

      {/* Main Hero Section (z-index: 1) */}
      <main>
        <Hero />
      </main>
    </div>
  );
}
