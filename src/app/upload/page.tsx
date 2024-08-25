// src/app/upload/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../globals1.css";

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append("video", file);
    } else if (link) {
      formData.append("video_link", link);
    } else {
      alert("Please upload a file or provide a link");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/process_video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      router.push(`/result?video=${encodeURIComponent(result.output_file)}`);
    } catch (error) {
      console.error("Error processing video:", error);
      alert("An error occurred while processing the video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 text-white bg-black">
      <header className="w-full max-w-6xl flex justify-between items-center p-4 absolute top-0 left-0 z-10">
        <div
          className="text-3xl font-bold text-white cursor-pointer"
          onClick={() => router.push('/')}
        >
          ClipWave
        </div>
      </header>

      <div className="w-full max-w-2xl h-[400px] bg-gray-800 p-8 rounded-lg shadow-lg z-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload Your Content</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Upload File</label>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg" 
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Paste Video Link</label>
            <input 
              type="text" 
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg" 
              placeholder="https://example.com/video" 
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg mt-4 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </form>

        {isLoading && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
            <p className="text-purple-400">Processing your content...</p>
          </div>
        )}
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
    </main>
  );
}
