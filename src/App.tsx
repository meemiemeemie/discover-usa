/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from "react";
import { Sparkles, Globe, School, Utensils, Landmark, GraduationCap, BookOpen, ArrowRight, PlaneTakeoff } from "lucide-react";

import PresenterPanel from "./components/PresenterPanel";
import MapSection from "./components/MapSection";
import SchoolDaySection from "./components/SchoolDaySection";
import SnacksSection from "./components/SnacksSection";
import MonumentsSection from "./components/MonumentsSection";
import EnglishBasicsSection from "./components/EnglishBasicsSection";
import CaterpillarStorybook from "./components/CaterpillarStorybook";
import { playPopSound, playSuccessSound } from "./utils/audio";

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  emoji: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("location");
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  // Trigger floating sparkles on the screen
  const triggerSparkles = useCallback(() => {
    const emojis = ["✨", "★", "💖", "🦋", "🍪", "🎈", "🍿", "🍎"];
    const colors = ["text-rose-400", "text-amber-400", "text-emerald-400", "text-sky-400", "text-indigo-400", "text-fuchsia-400"];
    
    // Generate a secure, unique base so we don't need persistent state dependencies
    const randomIdBase = Math.floor(Math.random() * 100000000);
    const newSparkles: SparkleParticle[] = Array.from({ length: 18 }).map((_, idx) => ({
      id: randomIdBase + idx,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    setSparkles((prev) => [...prev, ...newSparkles]);

    // Clean up particles
    setTimeout(() => {
      setSparkles((prev) => prev.filter((item) => !newSparkles.some((n) => n.id === item.id)));
    }, 1800);
  }, []);

  const handleTabChange = (tabId: string) => {
    playPopSound();
    setActiveTab(tabId);
  };

  // Quick navigation helpers (all in English now)
  const slides = [
    { id: "location", label: "The Map 🗺️", icon: Globe, color: "bg-sky-500" },
    { id: "school", label: "School Day 🏫", icon: School, color: "bg-amber-500" },
    { id: "snacks", label: "Yummy Snacks 🍪", icon: Utensils, color: "bg-rose-500" },
    { id: "monuments", label: "Monuments 🗽", icon: Landmark, color: "bg-teal-500" },
    { id: "numbers", label: "English 123 ✨", icon: GraduationCap, color: "bg-indigo-500" },
    { id: "caterpillar", label: "Caterpillar 🐛", icon: BookOpen, color: "bg-emerald-500" }
  ];

  const currentSlideIdx = slides.findIndex((s) => s.id === activeTab);

  const handleNextSlide = () => {
    if (currentSlideIdx < slides.length - 1) {
      handleTabChange(slides[currentSlideIdx + 1].id);
    } else {
      // final wrap-up cheer
      playSuccessSound();
      triggerSparkles();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-indigo-200">
      
      {/* Decorative Sparkles Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
        {sparkles.map((p) => (
          <div
            id={`sparkle-${p.id}`}
            key={p.id}
            className={`absolute font-sans text-2xl select-none animate-bounce transition-transform duration-1000 ${p.color}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: `scale(${Math.random() * 0.5 + 0.8}) rotate(${Math.random() * 360}deg)`,
              transition: "all 1.5s ease-out"
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 md:py-10 space-y-8">
        
        {/* Child-Friendly Header Postcard theme */}
        <header className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 rounded-3xl p-1 shadow-lg overflow-hidden text-white">
          
          {/* Inside Card content */}
          <div className="bg-slate-900/40 rounded-2xl p-6 md:p-8 backdrop-blur-xs relative overflow-hidden">
            
            {/* Stars decoration */}
            <div className="absolute top-2 right-4 text-xs tracking-widest text-white/40 font-mono select-none">★★★★★</div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/25 text-xs font-sans font-black px-3 py-1 rounded-full text-white tracking-wide">
                  <PlaneTakeoff className="h-3.5 w-3.5" />
                  EDEN'S FIRST GRADE CLASS PRESENTATION • UNITED STATES OF AMERICA TRIP 🇺🇸✈️
                </div>
                
                <h1 className="font-sans text-3xl md:text-4xl font-black tracking-tight text-white leading-none">
                  Let's Visit the United States of America!
                </h1>
                
                <p className="font-sans text-sm text-gray-100 font-medium leading-relaxed">
                  Fly away with <strong>Eden 👧</strong> and her Mom to explore America, learn English, and play together!
                </p>
              </div>

              {/* Boarding Pass stamp style */}
              <div className="self-start md:self-center bg-white text-indigo-950 p-3 rounded-2xl border-4 border-dashed border-red-500 flex flex-col items-center text-center shadow-lg rotate-1 select-none flex-shrink-0 min-w-[120px]">
                <span className="font-mono text-[9px] font-black text-red-500 uppercase tracking-widest leading-none">BOARDING PASS</span>
                <span className="font-sans text-base font-black uppercase text-slate-800 leading-tight">EDEN • CP</span>
                <span className="text-[10px] text-gray-500 font-bold">Presentation Day</span>
              </div>
            </div>

          </div>

        </header>

        {/* linear Boarding Slide Track */}
        <div className="bg-white rounded-3xl border border-gray-200 p-4 shadow-sm">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {slides.map((item) => {
              const active = item.id === activeTab;
              const IconComp = item.icon;
              return (
                <button
                  id={`tab-btn-${item.id}`}
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`cursor-pointer flex flex-col items-center p-3 rounded-2xl border transition-all ${
                    active
                      ? "bg-slate-900 border-slate-950 text-white scale-105 shadow-md"
                      : "bg-gray-50 border-gray-150 text-gray-600 hover:bg-slate-100"
                  }`}
                >
                  <IconComp className={`h-5 w-5 ${active ? "text-amber-400 rotate-6" : "text-gray-400"}`} />
                  <span className="font-sans text-[11px] font-black mt-1 leading-none">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN BODY SLIDES Container */}
        <main className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-10 shadow-xl min-h-[460px] relative transition-transform duration-300">
          
          {activeTab === "location" && <MapSection />}
          
          {activeTab === "school" && <SchoolDaySection />}

          {activeTab === "snacks" && <SnacksSection />}

          {activeTab === "monuments" && <MonumentsSection />}

          {activeTab === "numbers" && <EnglishBasicsSection />}

          {activeTab === "caterpillar" && <CaterpillarStorybook onTriggerSparkles={triggerSparkles} />}

          {/* linear Slide bottom bar (encourages sequence) */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
            
            <div className="flex items-center gap-2 font-sans text-xs text-gray-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Slide active: {currentSlideIdx + 1} / {slides.length}</span>
            </div>

            <button
              id="btn-next-slide-seq"
              onClick={handleNextSlide}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 px-6 py-3 font-sans text-xs font-black text-white shadow-md transition-all active:scale-95"
            >
              {currentSlideIdx === slides.length - 1 ? (
                <>Great job, class! 🙌🎉</>
              ) : (
                <>
                  Next step: <strong>{slides[currentSlideIdx + 1].label}</strong>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

          </div>

        </main>

      </div>

      {/* Presenter Footer Helper */}
      <footer className="w-full">
        <PresenterPanel currentSlideId={activeTab} onTriggerSparkles={triggerSparkles} edenName="Eden" />
        
        {/* Humble and Clean credit line */}
        <div className="bg-slate-900 py-3 text-center border-t border-slate-800 text-[10px] text-gray-400 font-mono">
          © 2026 USA Discovery Presentation Applet • Designed with love for Eden & her First Grade Class 🇺🇸🇫🇷
        </div>
      </footer>

    </div>
  );
}
