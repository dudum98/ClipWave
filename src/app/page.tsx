// src/app/page.tsx
"use client";

import { useRef } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+ using the app directory
import Image from 'next/image';
import './globals.css'; // Import your CSS file if needed

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleGetStarted = () => {
    playSound();
    router.push('/upload');
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-20 p-8 text-white">
      {/* Upper Part with Black Background */}
      <div className="w-full bg-black flex flex-col items-center">
        {/* Header with Logo */}
        <header className="w-full max-w-6xl flex justify-between items-center p-4 absolute top-0 left-0 z-10">
          <div className="text-3xl font-bold text-white">ClipWave</div>
        </header>

        {/* Content Wrapper */}
        <div className="w-full max-w-6xl mt-24 flex">
          {/* Animated GIF Section */}
          <div className="flex-none mr-8">
            <Image src="/Uploading.gif" width={300} height={150} alt="Uploading" />
          </div>

          {/* Hero Section */}
          <div className="flex-grow text-center">
            <h1 className="text-5xl font-bold mb-6 animate-slideIn">Effortlessly Create Stunning Clips with AI</h1>
            <p className="text-xl mb-8">Transform your content into engaging videos for social media in seconds.</p>
            <button
              onClick={handleGetStarted}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section with Gradient Background */}
      <div className="relative w-full bg-gradient-to-b from-black via-purple-900 to-black text-white mt-40">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-900 to-black -z-10"></div>
        <div className="w-full max-w-6xl mx-auto text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-8 bg-purple-800 rounded-lg hover:bg-purple-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 card-text">AI-Powered Clip Generation</h2>
              <p className="card-text">Create clips optimized for different social media platforms automatically.</p>
            </div>
            <div className="p-8 bg-purple-800 rounded-lg hover:bg-purple-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 card-text">Customizable Templates</h2>
              <p className="card-text">Choose from a variety of styles and formats to suit your brand.</p>
            </div>
            <div className="p-8 bg-purple-800 rounded-lg hover:bg-purple-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 card-text">Fast & Easy</h2>
              <p className="card-text">Generate and download clips in just a few clicks.</p>
            </div>
            <div className="p-8 bg-purple-800 rounded-lg hover:bg-purple-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-4 card-text">Social Media Integration</h2>
              <p className="card-text">Directly share your clips to Instagram, TikTok, YouTube, and more.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 w-full max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#about" className="text-purple-400 hover:text-white">About Us</a>
            <a href="#privacy" className="text-purple-400 hover:text-white">Privacy Policy</a>
            <a href="#terms" className="text-purple-400 hover:text-white">Terms of Service</a>
            <a href="#contact" className="text-purple-400 hover:text-white">Contact Us</a>
          </div>
          <p className="mt-8 text-sm text-purple-400">© 2024 ClipWave. All rights reserved.</p>
        </footer>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src="/sound.mp3" />
    </main>
  );
}
