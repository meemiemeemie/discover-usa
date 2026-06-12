/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Plane, Compass, Globe, Map, ChevronDown, ChevronUp } from "lucide-react";
import { playPopSound } from "../utils/audio";

export default function MapSection() {
  const [isFlying, setIsFlying] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  const [showUsaMap, setShowUsaMap] = useState(false);
  const [mapSourceIdx, setMapSourceIdx] = useState(0);

  const MAP_SOURCES = [
    "https://upload.wikimedia.org/wikipedia/commons/1/1a/US_map_with_states_and_names.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a5/Map_of_USA_with_state_names.svg",
    "https://upload.wikimedia.org/wikipedia/commons/3/32/Map_of_USA_with_state_names.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Map_of_the_United_States_highlighting_the_50_states.svg"
  ];

  const triggerFlight = () => {
    if (isFlying) return;
    playPopSound();
    setIsFlying(true);
    setHasLanded(false);
    setTimeout(() => {
      setIsFlying(false);
      setHasLanded(true);
    }, 2800); // match plane slide timing
  };

  const toggleUsaMap = () => {
    playPopSound();
    setShowUsaMap(!showUsaMap);
  };

  const handleMapError = () => {
    if (mapSourceIdx < MAP_SOURCES.length - 1) {
      setMapSourceIdx(prev => prev + 1);
    }
  };

  return (
    <div id="map-section" className="space-y-8">
      <div className="text-center space-y-3">
        <h3 className="inline-flex items-center justify-center gap-2 font-sans text-3xl font-black text-sky-950">
          <Globe className="h-8 w-8 text-sky-500 animate-spin-slow" />
          Where is the USA? 🇺🇸
        </h3>
        <p className="font-sans text-xl font-bold text-gray-700 max-w-2xl mx-auto">
          We cross the big blue <strong className="text-sky-600">Atlantic Ocean</strong> to go from France to America!
        </p>
      </div>

      {/* Postcard Map Container */}
      <div className="relative overflow-hidden rounded-[32px] border-4 border-slate-900 bg-sky-100 p-8 shadow-xl min-h-[360px] flex flex-col justify-between">
        
        {/* Clouds decoration */}
        <div className="absolute top-8 left-8 text-4xl opacity-30 select-none animate-bounce delay-100">☁️</div>
        <div className="absolute top-16 right-12 text-5xl opacity-30 select-none animate-bounce delay-300">☁️</div>
        <div className="absolute bottom-8 left-1/3 text-4xl opacity-25 select-none animate-bounce delay-700">☁️</div>

        {/* Map Elements */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 py-6 z-10">
          
          {/* USA Side (now on the left) */}
          <div className="relative flex flex-col items-center text-center bg-white p-6 rounded-3xl border-2 border-slate-900 shadow-md w-48 font-bold">
            <span className="text-6xl">🇺🇸</span>
            <span className="mt-3 font-sans text-lg font-black text-slate-900">USA</span>
            <span className="mt-1 font-mono text-xs text-red-600 font-extrabold uppercase">We Land Here!</span>
            <span className="text-xs text-red-600 mt-2 bg-red-100/60 px-3 py-1 rounded-full font-bold">Hello!</span>

            {/* Pulsing beacon */}
            <div className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </div>
          </div>

          {/* Ocean Middle with Plane animation */}
          <div className="flex-1 w-full flex flex-col items-center justify-center relative min-h-[120px]">
            <div className="w-full border-t-4 border-dashed border-sky-400 relative">
              
              {/* Airplane holding standard translate style (flying right-to-left) */}
              <div
                className={`absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-[2800ms] ease-in-out ${
                  isFlying
                    ? "left-[-15px] scale-150 -rotate-6"
                    : hasLanded
                    ? "left-[-15px] rotate-0 scale-125"
                    : "left-[85%] rotate-0 scale-125"
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-5xl filter drop-shadow inline-block scale-x-[-1]">✈️</span>
                  {isFlying && (
                    <span className="animate-pulse text-[11px] bg-amber-400 text-slate-950 font-black rounded px-2 py-0.5 mt-2 shadow">ZOOM!</span>
                  )}
                </div>
              </div>

              {/* Water waves */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center text-sm text-sky-600 select-none font-black tracking-wide">
                🌊 ATLANTIC OCEAN 🐳
              </div>
            </div>

            <div className="mt-14 text-center">
              <button
                id="btn-play-plane"
                onClick={triggerFlight}
                disabled={isFlying}
                className={`cursor-pointer flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-650 px-8 py-4 font-sans text-base font-black text-white shadow-lg transition active:scale-95 ${
                  isFlying ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Plane className={`h-5 w-5 ${isFlying ? "animate-spin" : ""}`} />
                {isFlying ? "Flying across..." : "Fly the Airplane! ✈️"}
              </button>
            </div>
          </div>

          {/* France Side (now on the right) */}
          <div className="relative flex flex-col items-center text-center bg-white p-6 rounded-3xl border-2 border-slate-900 shadow-md w-48 font-bold">
            <span className="text-6xl">🇫🇷</span>
            <span className="mt-3 font-sans text-lg font-black text-slate-900">France</span>
            <span className="mt-1 font-mono text-xs text-blue-600 font-extrabold uppercase">We Start Here!</span>
            <span className="text-xs text-gray-700 mt-2 bg-blue-100/60 px-3 py-1 rounded-full font-bold">Bonjour!</span>
            
            {/* Pulsing beacon */}
            <div className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
            </div>
          </div>

        </div>

        {/* Flight Details Card */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3 bg-white rounded-2xl p-4 border-2 border-slate-900">
          <div className="flex items-center gap-3 rounded-xl bg-sky-50 p-3">
            <Compass className="h-6 w-6 text-sky-600 flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 font-sans">DISTANCE</div>
              <div className="font-sans text-base font-black text-slate-900">3,600 miles (5,800 km)!</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-3">
            <span className="text-2xl flex-shrink-0">✈️</span>
            <div>
              <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 font-sans">FLIGHT TIME</div>
              <div className="font-sans text-base font-black text-slate-900">8 hours by airplane!</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-3">
            <span className="text-2xl flex-shrink-0">⏰</span>
            <div>
              <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 font-sans">TIME CHANGE</div>
              <div className="font-sans text-base font-black text-slate-900">6 hours backward!</div>
            </div>
          </div>
        </div>

      </div>

      {/* Expandable 50 States Map Section */}
      <div className="rounded-[32px] border-4 border-slate-950 bg-white shadow-lg overflow-hidden">
        <button
          id="btn-toggle-usa-map"
          onClick={toggleUsaMap}
          className="cursor-pointer w-full flex items-center justify-between p-6 bg-slate-900 text-white hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Map className="h-6 w-6 text-amber-400 animate-pulse" />
            <div className="text-left">
              <h4 className="font-sans text-lg font-black leading-none">🗺️ Explore the 50 States Map!</h4>
              <p className="font-sans text-xs text-slate-350 mt-1">Click to expand and see every state in America!</p>
            </div>
          </div>
          {showUsaMap ? (
            <ChevronUp className="h-6 w-6 text-slate-400" />
          ) : (
            <ChevronDown className="h-6 w-6 text-slate-400" />
          )}
        </button>

        {showUsaMap && (
          <div className="p-6 md:p-8 bg-slate-50 border-t-4 border-slate-950 space-y-6">
            <div className="text-center space-y-1">
              <h5 className="font-sans text-xl font-black text-slate-900">The 50 States Puzzle of America</h5>
              <p className="font-sans text-sm text-slate-600 font-bold">
                Each state is like an individual piece of a giant country puzzle! Find where Eden is visiting!
              </p>
            </div>

            <div className="flex justify-center bg-white p-4 rounded-3xl border-2 border-slate-900 shadow-inner">
              <img
                src={MAP_SOURCES[mapSourceIdx]}
                alt="Colorful educational Map of the United States of America with its 50 States listed"
                onError={handleMapError}
                className="max-h-[480px] object-contain rounded-2xl cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-amber-100/60 rounded-2xl border-2 border-slate-950 p-4 font-sans text-xs font-bold text-slate-900 flex items-start gap-3">
              <span className="text-2xl">👧💡</span>
              <div>
                <strong className="block uppercase text-[10px] tracking-wider text-amber-900 mb-1">EDEN'S PRESENTATION TIP FOR THE CLASS:</strong>
                Can you find Texas, the huge state towards the south? Or California on the west coast next to the ocean? The USA is bounded by two gigantic oceans: the Atlantic on the right, and the Pacific on the left!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comparisons and Fun facts (Much simpler, larger text, less clutter) */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-slate-900 bg-amber-100/50 p-6 flex gap-4 items-start">
          <div className="text-3xl">🇺🇸</div>
          <div>
            <h4 className="font-sans text-lg font-black text-slate-900">America is HUGE!</h4>
            <p className="mt-2 font-sans text-sm font-semibold text-slate-700 leading-relaxed">
              It is so big that France can fit inside the USA <strong>17 times</strong>! There are 50 puzzle pieces called "States".
            </p>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-900 bg-indigo-100/50 p-6 flex gap-4 items-start">
          <div className="text-3xl">🗣️</div>
          <div>
            <h4 className="font-sans text-lg font-black text-slate-900">We Speak English!</h4>
            <p className="mt-2 font-sans text-sm font-semibold text-slate-700 leading-relaxed">
              In France you say <strong>"Bonjour"</strong>. In the USA, everyone waves and says <strong className="text-indigo-600">"Hello!"</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
