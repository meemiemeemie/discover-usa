/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { School } from "lucide-react";
import { SCHOOL_DAY_DATA } from "../data";
import { playPopSound } from "../utils/audio";

export default function SchoolDaySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const selectTab = (index: number) => {
    playPopSound();
    setActiveIndex(index);
  };

  const selectedData = SCHOOL_DAY_DATA[activeIndex];

  return (
    <div id="school-day-section" className="space-y-8">
      
      {/* Header Info Banner */}
      <div className="text-center space-y-3">
        <h3 className="inline-flex items-center justify-center gap-2 font-sans text-3xl font-black text-amber-950">
          <School className="h-8 w-8 text-amber-500 animate-pulse" />
          School Day Comparison 🎒
        </h3>
        <p className="font-sans text-xl font-bold text-gray-700 max-w-2xl mx-auto">
          Let's compare school life in <strong className="text-blue-600">France</strong> versus the <strong className="text-red-600">USA</strong>!
        </p>
      </div>

      {/* Navigation Buttons for CP / First Graders (Huge easy-to-click controls) */}
      <div className="flex flex-wrap gap-3 justify-center">
        {SCHOOL_DAY_DATA.map((item, idx) => (
          <button
            key={idx}
            onClick={() => selectTab(idx)}
            className={`cursor-pointer rounded-2xl px-6 py-4 font-sans text-sm font-black transition-all shadow-md active:scale-95 ${
              activeIndex === idx
                ? "bg-amber-500 text-white ring-4 ring-amber-200 scale-105"
                : "bg-white text-slate-800 hover:bg-amber-100/50 border-2 border-slate-900"
            }`}
          >
            <span className="mr-2 text-base">✨ {idx + 1}.</span> {item.title}
          </button>
        ))}
      </div>

      {/* Comparison Columns Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        
        {/* France Column Card */}
        <div className="relative overflow-hidden rounded-[32px] border-4 border-slate-950 bg-white p-8 shadow-lg">
          <div className="absolute top-0 right-0 h-16 w-28 bg-blue-100 rounded-bl-3xl flex items-center justify-center text-center font-black text-blue-800 text-sm border-l-2 border-b-2 border-slate-950">
            FRANCE 🇫🇷
          </div>

          <div className="flex items-center gap-4">
            <span className="text-5xl">{selectedData.france.icon}</span>
            <div>
              <h4 className="font-sans text-xl font-black text-slate-900">In France</h4>
              <p className="font-sans text-xs text-blue-600 font-extrabold tracking-widest uppercase">CP CLASS habits</p>
            </div>
          </div>

          <p className="mt-6 font-sans text-lg font-bold text-slate-800 bg-blue-50/50 p-4 border-2 border-dashed border-blue-200 rounded-2xl leading-relaxed">
            {selectedData.france.description}
          </p>

          <div className="mt-6 space-y-3">
            <p className="font-sans text-[11px] font-black tracking-wider text-gray-500 uppercase">COOL FACTS :</p>
            <ul className="space-y-2">
              {selectedData.france.items.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 font-sans text-sm font-semibold text-slate-700">
                  <span className="text-blue-500 text-lg mt-[-3px]">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* USA Column Card */}
        <div className="relative overflow-hidden rounded-[32px] border-4 border-slate-950 bg-white p-8 shadow-lg">
          <div className="absolute top-0 right-0 h-16 w-16 bg-red-100 rounded-bl-3xl flex items-center justify-center font-black text-red-800 text-sm border-l-2 border-b-2 border-slate-950">
            USA 🇺🇸
          </div>

          <div className="flex items-center gap-4">
            <span className="text-5xl">{selectedData.usa.icon}</span>
            <div>
              <h4 className="font-sans text-xl font-black text-slate-900">In America</h4>
              <p className="font-sans text-xs text-red-600 font-extrabold tracking-widest uppercase">1ST GRADE habits</p>
            </div>
          </div>

          <p className="mt-6 font-sans text-lg font-bold text-slate-800 bg-red-50/40 p-4 border-2 border-dashed border-red-200 rounded-2xl leading-relaxed">
            {selectedData.usa.description}
          </p>

          <div className="mt-6 space-y-3">
            <p className="font-sans text-[11px] font-black tracking-wider text-gray-500 uppercase">COOL FACTS :</p>
            <ul className="space-y-2">
              {selectedData.usa.items.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 font-sans text-sm font-semibold text-slate-700">
                  <span className="text-red-500 text-lg mt-[-3.5px]">★</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Highlights Box */}
      <div className="rounded-[24px] border-2 border-slate-950 bg-amber-50 p-6">
        {activeIndex === 0 && (
          <div className="flex items-center gap-5">
            <span className="text-5xl animate-bounce select-none">🚌</span>
            <div>
              <p className="font-sans text-lg font-black text-amber-950">The Yellow School Bus is Special!</p>
              <p className="font-sans text-sm font-bold text-amber-900 leading-relaxed mt-1">
                When the Yellow Bus stops to pick up kids, all cars in both directions MUST STOP to keep kids safe!
              </p>
            </div>
          </div>
        )}

        {activeIndex === 1 && (
          <div className="flex items-center gap-5">
            <span className="text-5xl select-none">🙋🇺🇸</span>
            <div>
              <p className="font-sans text-lg font-black text-amber-950">Morning Star Salute!</p>
              <p className="font-sans text-sm font-bold text-amber-900 leading-relaxed mt-1">
                Every single morning, students stand up, place their hand over their heart, and say hello to the American Flag!
              </p>
            </div>
          </div>
        )}

        {activeIndex === 2 && (
          <div className="flex items-center gap-5">
            <span className="text-5xl select-none">🍎🥪</span>
            <div>
              <p className="font-sans text-lg font-black text-amber-950">The Teacher's Apple!</p>
              <p className="font-sans text-sm font-bold text-amber-900 leading-relaxed mt-1">
                It is a famous old American tradition for students to bring a big red crunchy apple to hand to the teacher on the first day of school!
              </p>
            </div>
          </div>
        )}

        {activeIndex === 3 && (
          <div className="flex items-center gap-5">
            <span className="text-5xl select-none">☀️🏕️</span>
            <div>
              <p className="font-sans text-lg font-black text-amber-950">Super Long Summer Break & Summer Camps!</p>
              <p className="font-sans text-sm font-bold text-amber-900 leading-relaxed mt-1">
                American kids get a massive 10 to 12 weeks of summer vacation! Most kids spend their summer going to "Summer Camp" in the woods, sleeping in wooden cabins, swimming in lakes, and singing around campfires!
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
