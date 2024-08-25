// src/app/result/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import "../globals1.css"; 

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const video = searchParams.get("video");
    if (video) {
      setVideoUrl(`http://127.0.0.1:5000/uploads/${video}`);
    }
  }, [searchParams]);

  const handleRedirectHome = () => {
    router.push('/');
  };

  const handleDownload = () => {
    if (videoUrl) {
      window.open(videoUrl, "_blank");
    }
  };


  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 text-white bg-black">
      <header className="w-full max-w-6xl flex justify-between items-center p-4 absolute top-0 left-0 z-10">
        <div className="text-3xl font-bold text-white cursor-pointer" onClick={handleRedirectHome}>
          ClipWave
        </div>
      </header>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div className="absolute top-10 right-0 z-0 w-[300px] h-[300px] bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("/result.gif")' }}></div>

      <div className="w-full max-w-2xl h-[400px] bg-gray-800 p-8 rounded-lg shadow-lg z-10 flex flex-col items-center relative">
        <h1 className="text-3xl font-bold mb-6 text-center">Here is Your Video</h1>
        <p className="mb-6 text-center">Thank you for using ClipWave!</p>

        {videoUrl && (
          <video controls className="w-full mb-4">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <div className="flex flex-col space-y-4 w-full max-w-md">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
            onClick={() => window.open("https://instagram.com", "_blank")}
          >
            Upload to Instagram
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
            onClick={() => window.open("https://tiktok.com", "_blank")}
          >
            Upload to TikTok
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
            onClick={() => navigator.clipboard.writeText("Your Video Link")}
          >
            Copy Link
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
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
    </main>
  );
}
