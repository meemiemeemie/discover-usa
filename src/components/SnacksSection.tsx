/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Utensils, Laugh } from "lucide-react";
import { SNACKS_DATA } from "../data";
import { playCrunchSound, playSuccessSound } from "../utils/audio";

export default function SnacksSection() {
  const [selectedId, setSelectedId] = useState(SNACKS_DATA[0].id);
  const [bitesCount, setBitesCount] = useState<Record<string, number>>({});

  const snack = SNACKS_DATA.find((s) => s.id === selectedId) || SNACKS_DATA[0];
  const currentBites = bitesCount[snack.id] || 0;
  const isEaten = currentBites >= 5;

  const handleSelectSnack = (id: string) => {
    setSelectedId(id);
  };

  const handleBite = () => {
    if (isEaten) return;
    
    playCrunchSound();
    
    const newBites = currentBites + 1;
    setBitesCount({
      ...bitesCount,
      [snack.id]: newBites
    });

    if (newBites === 5) {
      setTimeout(() => {
        playSuccessSound();
      }, 350);
    }
  };

  const handleResetPlate = () => {
    setBitesCount({
      ...bitesCount,
      [snack.id]: 0
    });
  };

  return (
    <div id="snacks-section" className="space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <h3 className="inline-flex items-center justify-center gap-2 font-sans text-3xl font-black text-rose-950">
          <Utensils className="h-8 w-8 text-rose-500 animate-bounce" />
          Yummy American Snacks! 🍪🥪
        </h3>
        <p className="font-sans text-xl font-bold text-gray-700 max-w-2xl mx-auto">
          What do kids in school eat for their afternoon snack? Click one to put it on our magic plate!
        </p>
      </div>

      {/* Buffet Counter Selection (Huge responsive grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {SNACKS_DATA.map((item) => {
          const itemBites = bitesCount[item.id] || 0;
          const finished = itemBites >= 5;
          return (
            <button
              id={`snack-btn-${item.id}`}
              key={item.id}
              onClick={() => handleSelectSnack(item.id)}
              className={`cursor-pointer flex flex-col items-center p-4 rounded-3xl border-4 transition-all relative ${
                selectedId === item.id
                  ? "bg-rose-100 border-rose-500 scale-105 shadow-md"
                  : "bg-white border-slate-900 hover:bg-rose-50/50"
              }`}
            >
              <span className={`text-5xl transition-transform ${selectedId === item.id ? "scale-110" : ""}`}>
                {finished ? "🍽️" : item.emoji}
              </span>
              <span className="font-sans text-sm font-black text-slate-950 mt-3 text-center leading-tight">
                {item.nameEn}
              </span>
              
              {/* Bite counter bubble */}
              {itemBites > 0 && !finished && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-650 text-xs font-black text-white animate-pulse shadow">
                  {5 - itemBites}
                </span>
              )}
              {finished && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white shadow">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Plate & Info Side-by-Side Area */}
      <div className="grid gap-8 md:grid-cols-2 align-stretch">
        
        {/* Dynamic Interactive Plate */}
        <div className="flex flex-col items-center justify-center bg-slate-100 rounded-3xl border-4 border-slate-900 p-8 min-h-[320px] relative overflow-hidden shadow-inner">
          
          <div className="mb-4 font-mono text-[11px] font-black text-slate-500 tracking-widest uppercase">THE MAGIC PLATE 🍽️</div>

          {/* Table background circle as the plate rim */}
          <div className="w-56 h-56 rounded-full bg-white border-16 border-slate-205 flex flex-col items-center justify-center relative shadow-lg">
            
            {/* Inner Plate Line */}
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-slate-300"></div>

            {/* Snack display inside plate */}
            <div className="z-10 text-center select-none flex flex-col items-center justify-center">
              {isEaten ? (
                <div className="animate-bounce">
                  <span className="text-6xl">😋✨🎉</span>
                  <p className="font-sans text-base font-black text-rose-600 mt-2">All Eaten Up!</p>
                </div>
              ) : (
                <div className="relative group cursor-pointer transition-transform duration-100" onClick={handleBite}>
                  <span
                    className="text-8xl block transition-transform active:scale-90"
                    style={{
                      clipPath:
                        currentBites === 1
                          ? "polygon(0 0, 100% 0, 100% 80%, 80% 80%, 75% 100%, 0 100%)"
                          : currentBites === 2
                          ? "polygon(0 0, 100% 0, 100% 60%, 70% 60%, 65% 90%, 0 90%)"
                          : currentBites === 3
                          ? "polygon(0 0, 75% 0, 70% 50%, 50% 60%, 0 100%)"
                          : currentBites === 4
                          ? "polygon(0 0, 40% 0, 30% 60%, 0 80%)"
                          : "none"
                    }}
                  >
                    {snack.emoji}
                  </span>

                  {/* Bite mark overlay */}
                  {currentBites > 0 && (
                    <div className="absolute top-4 right-2 text-2xl rotate-12 select-none pointer-events-none opacity-90 font-black bg-white px-2 py-0.5 rounded-full text-rose-600 shadow-sm border border-rose-150">
                      {currentBites === 1 && "CRUNCH!"}
                      {currentBites === 2 && "YUM!"}
                      {currentBites === 3 && "SLURP!"}
                      {currentBites === 4 && "LAST BITE!"}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Action Buttons for Plate */}
          <div className="mt-6 flex gap-4 z-10">
            {!isEaten ? (
              <button
                id="btn-bite-snack"
                onClick={handleBite}
                className="cursor-pointer flex items-center gap-2 rounded-full bg-rose-500 hover:bg-rose-600 px-6 py-3 font-sans text-sm font-black text-white shadow-md transition active:scale-95"
              >
                🍴 Crunch it!
              </button>
            ) : (
              <button
                id="btn-reset-snack"
                onClick={handleResetPlate}
                className="cursor-pointer flex items-center gap-2 rounded-full bg-slate-800 hover:bg-slate-900 px-6 py-3 font-sans text-sm font-black text-white shadow-md transition active:scale-95"
              >
                🔄 Put More Snack!
              </button>
            )}
          </div>

          {!isEaten && (
            <p className="mt-3 font-sans text-xs font-bold text-slate-500">
              {currentBites === 0
                ? "Click on the food to take a giant bite!"
                : `${5 - currentBites} bites left!`}
            </p>
          )}
        </div>

        {/* Snack Info Card */}
        <div className="flex flex-col justify-between rounded-3xl border-4 border-slate-900 bg-white p-6 shadow-md">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{snack.emoji}</span>
                <div>
                  <h4 className="font-sans text-2xl font-black text-rose-950 leading-none">
                    {snack.nameEn}
                  </h4>
                  <p className="font-sans text-sm font-bold text-slate-500 mt-2">
                    Let's practice saying the name together!
                  </p>
                </div>
              </div>

              {/* Huge Pronunciation block so kids can chant */}
              <div className="mt-4 bg-rose-50 p-4 rounded-2xl border-2 border-dashed border-rose-200">
                <div className="text-[10px] text-rose-605 font-black uppercase tracking-widest">HOW TO SAY EN ANGLAIS:</div>
                <div className="font-sans text-2xl font-black text-rose-950 mt-1">
                  "{snack.soundPronunciation}"
                </div>
              </div>
            </div>

            <p className="font-sans text-base font-bold text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl">
              {snack.description}
            </p>

            <div className="bg-amber-100/50 p-4 rounded-2xl border-2 border-slate-900 flex gap-3">
              <Laugh className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-sans text-xs font-black text-amber-900 block uppercase tracking-wider">FUN FACT FOR EDEN'S CLASS:</span>
                <p className="font-sans text-sm text-slate-800 font-bold leading-relaxed mt-1">
                  {snack.funFact}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
