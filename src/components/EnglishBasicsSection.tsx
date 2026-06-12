/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { GraduationCap, Award, CheckCircle } from "lucide-react";
import { NUMBERS_DATA, WORDS_DATA } from "../data";
import { playPopSound, playSuccessSound } from "../utils/audio";

export default function EnglishBasicsSection() {
  const [activeNumber, setActiveNumber] = useState<number | null>(null);
  const [pronuncedNumbers, setPronuncedNumbers] = useState<Record<number, boolean>>({});
  const [activeWordId, setActiveWordId] = useState<string | null>(null);

  const handleNumberClick = (item: typeof NUMBERS_DATA[0]) => {
    playPopSound();
    setActiveNumber(item.value);
    
    // Track learning progress
    const newProgress = { ...pronuncedNumbers, [item.value]: true };
    setPronuncedNumbers(newProgress);

    // Trigger celebration chime/sparkle if all 10 numbers are conquered
    if (Object.keys(newProgress).length === 10 && Object.keys(pronuncedNumbers).length === 9) {
      setTimeout(() => {
        playSuccessSound();
      }, 500);
    }
  };

  const handleWordClick = (item: typeof WORDS_DATA[0]) => {
    playPopSound();
    setActiveWordId(item.id);
  };

  const completedCount = Object.keys(pronuncedNumbers).length;

  return (
    <div id="english-basics" className="space-y-10">
      
      {/* Intro Header Banner */}
      <div className="text-center space-y-3">
        <h3 className="inline-flex items-center justify-center gap-2 font-sans text-3xl font-black text-indigo-950">
          <GraduationCap className="h-8 w-8 text-indigo-600 animate-pulse" />
          Let's Learn English together! 🇬🇧✨
        </h3>
        <p className="font-sans text-xl font-bold text-gray-700 max-w-2xl mx-auto">
          Practice speaking like kids in America! Click the number buttons and greeting cards below.
        </p>
      </div>

      {/* Part 1: Counting to 10 */}
      <div className="rounded-[32px] border-4 border-slate-900 bg-white p-6 md:p-8 shadow-lg space-y-6">
        <div>
          <h4 className="font-sans text-2xl font-black text-slate-900">
            🎈 1. Let's Count One to Ten! (1-10)
          </h4>
          <p className="font-sans text-base font-bold text-slate-500 mt-2">
            Click on each colorful balloon and call the number out loud as a class!
          </p>
        </div>

        {/* Huge Balloons Row */}
        <div className="flex flex-wrap gap-4 justify-center py-2">
          {NUMBERS_DATA.map((item) => {
            const isSelected = activeNumber === item.value;
            const isLearned = pronuncedNumbers[item.value];
            
            const colors = [
              "bg-rose-100 text-rose-700 border-rose-400 hover:bg-rose-200",
              "bg-orange-100 text-orange-700 border-orange-400 hover:bg-orange-200",
              "bg-amber-100 text-amber-700 border-amber-400 hover:bg-amber-200",
              "bg-emerald-100 text-emerald-700 border-emerald-400 hover:bg-emerald-200",
              "bg-teal-100 text-teal-700 border-teal-400 hover:bg-teal-200",
              "bg-sky-100 text-sky-700 border-sky-400 hover:bg-sky-200",
              "bg-indigo-100 text-indigo-700 border-indigo-400 hover:bg-indigo-200",
              "bg-violet-100 text-violet-700 border-violet-400 hover:bg-violet-200",
              "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-400 hover:bg-fuchsia-250",
              "bg-red-100 text-red-700 border-red-400 hover:bg-red-200"
            ];
            const colorClass = colors[(item.value - 1) % colors.length];

            return (
              <button
                id={`balloon-btn-${item.value}`}
                key={item.value}
                onClick={() => handleNumberClick(item)}
                className={`cursor-pointer w-16 h-16 rounded-full flex flex-col items-center justify-center border-3 font-mono text-xl font-black transition-all relative ${colorClass} ${
                  isSelected ? "scale-115 ring-4 ring-indigo-300 rotate-6 shadow-md" : "hover:scale-105"
                } active:scale-95`}
              >
                <span>{item.value}</span>
                {isLearned && (
                  <span className="absolute bottom-1.5 text-[8px] bg-emerald-500 text-white rounded px-1.5 py-0.5 scale-90 font-black uppercase">
                    OK
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Progress Tracker (Clean and Simple) */}
        <div className="bg-indigo-50 p-4 rounded-2xl border-2 border-slate-900">
          <div className="flex items-center justify-between font-sans text-sm font-black text-slate-800 mb-2">
            <span>Class Target Progress: Master numbers 1 to 10</span>
            <span>{completedCount} / 10 Numbers</span>
          </div>
          <div className="w-full bg-white h-5 rounded-full overflow-hidden border-2 border-slate-900 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${completedCount * 10}%` }}
            ></div>
          </div>
          {completedCount === 10 && (
            <p className="mt-2 text-center text-base font-black text-indigo-900 animate-bounce">
              🎉 AWESOME JOB! The class counted from ONE to TEN in English! 🤩🏆
            </p>
          )}
        </div>

        {/* Active Number Focus Card */}
        {activeNumber !== null && (
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border-4 border-slate-900 rounded-3xl p-6 transition-all duration-300">
            {(() => {
              const active = NUMBERS_DATA.find((n) => n.value === activeNumber)!;
              return (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <span className="text-7xl bg-white p-4 rounded-3xl border-2 border-slate-900 shadow-sm animate-bounce">
                      {active.emoji}
                    </span>
                    <div>
                      <h5 className="font-sans text-3xl font-black text-slate-900 leading-none">
                        {active.word}
                      </h5>
                      <p className="font-sans text-lg font-bold text-slate-500 mt-2">
                        How to count: <strong className="text-indigo-600">{active.countLabel}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-indigo-305 flex flex-col items-center">
                    <div className="text-[10px] text-indigo-500 font-black uppercase tracking-wider">MOM HELP PRONUNCIATION:</div>
                    <div className="font-sans text-2xl font-black text-indigo-950 mt-1">"{active.phonetic}"</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Part 2: Magic Greetings Words */}
      <div className="rounded-[32px] border-4 border-slate-900 bg-white p-6 md:p-8 shadow-lg space-y-6">
        <div>
          <h4 className="font-sans text-2xl font-black text-slate-900">
            💬 2. Magic Greeting Words!
          </h4>
          <p className="font-sans text-base font-bold text-slate-500 mt-2">
            The values we use to greet each other and be friendly!
          </p>
        </div>

        {/* Word Boxes Grid (Big clear items) */}
        <div className="grid gap-6 md:grid-cols-3">
          {WORDS_DATA.map((item) => {
            const isSelected = activeWordId === item.id;
            
            let animClass = "";
            if (isSelected) {
              if (item.animation === "wave") animClass = "animate-bounce";
              if (item.animation === "run") animClass = "animate-pulse";
              if (item.animation === "heart") animClass = "animate-ping scale-110";
            }

            return (
              <button
                id={`word-btn-${item.id}`}
                key={item.id}
                onClick={() => handleWordClick(item)}
                className={`cursor-pointer flex flex-col items-center p-6 rounded-3xl border-3 text-center transition-all ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-600 scale-105 shadow-md"
                    : "bg-white border-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className={`text-6xl my-3 block ${animClass} duration-700`}>
                  {item.emoji}
                </span>

                <h5 className="font-sans text-3xl font-black text-slate-900 leading-none mt-2">
                  {item.word}
                </h5>

                <span className="text-xs bg-slate-100 text-slate-800 font-extrabold uppercase px-3 py-1 rounded-full mt-3 border border-slate-300">
                  Phonetic: "{item.phonetic}"
                </span>

                <div className="mt-5 space-y-2 text-center w-full border-t-2 border-dashed border-gray-100 pt-4">
                  <div className="text-xs text-indigo-650 font-black uppercase">MEANING:</div>
                  <p className="font-sans text-xl font-black text-pink-600 leading-tight">
                    {item.translation}
                  </p>
                  <p className="font-sans text-sm text-slate-600 font-medium leading-tight">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Fun Tip (Bilingual Helper) */}
        <div className="rounded-2xl border-2 border-slate-900 bg-amber-50 p-6 flex gap-4 items-start">
          <span className="text-4xl">🗣️</span>
          <div>
            <h5 className="font-sans text-lg font-black text-slate-850">Pronunciation Fun: The "TH" sound!</h5>
            <p className="font-sans text-sm font-bold text-slate-700 leading-relaxed mt-1">
              "Thank you" has a magic TH. Tell children to put their tongue gently behind their top teeth and blow out a tiny bit of air! Let's try it together!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
