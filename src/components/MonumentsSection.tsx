/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Landmark, Award, BookOpen, CheckCircle, AlertCircle } from "lucide-react";
import { MONUMENTS_DATA } from "../data";
import { playPopSound, playSuccessSound } from "../utils/audio";

export default function MonumentsSection() {
  const [selectedId, setSelectedId] = useState(MONUMENTS_DATA[0].id);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  const selectedMonument = MONUMENTS_DATA.find((m) => m.id === selectedId) || MONUMENTS_DATA[0];

  const handleSelect = (id: string) => {
    playPopSound();
    setSelectedId(id);
  };

  const handleQuizAnswer = (answer: string) => {
    playPopSound();
    setQuizAnswer(answer);
    if (answer === "liberty") {
      setTimeout(() => {
        playSuccessSound();
      }, 200);
    }
  };

  return (
    <div id="monuments-section" className="space-y-8">
      
      {/* Intro Banner */}
      <div className="text-center space-y-3">
        <h3 className="inline-flex items-center justify-center gap-2 font-sans text-3xl font-black text-teal-950">
          <Landmark className="h-8 w-8 text-teal-605 animate-pulse" />
          Famous Monuments! 🗽🌉
        </h3>
        <p className="font-sans text-xl font-bold text-gray-700 max-w-2xl mx-auto">
          America has giant statues, red bridges, and amazing canyons! Click one to explore:
        </p>
      </div>

      {/* Monument Selection Deck (Huge grids) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MONUMENTS_DATA.map((item) => (
          <button
            id={`monument-btn-${item.id}`}
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={`cursor-pointer flex flex-col items-center p-4 rounded-3xl border-4 transition-all text-center ${
              selectedId === item.id
                ? "bg-teal-100 border-teal-500 scale-105 shadow-md animate-pulse"
                : "bg-white border-slate-900 hover:bg-teal-50"
            }`}
          >
            <span className="text-5xl">{item.emoji}</span>
            <span className="font-sans text-sm font-black text-slate-950 mt-3">
              {item.nameEn}
            </span>
          </button>
        ))}
      </div>

      {/* Active Card Detail Display */}
      <div className={`rounded-4xl border-4 border-slate-900 bg-gradient-to-br ${selectedMonument.colorClass} p-1.5 text-white shadow-xl`}>
        <div className="bg-white rounded-[26px] p-8 text-gray-800 h-full flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <span className="text-5xl bg-teal-50 p-2 rounded-2xl border border-teal-100">{selectedMonument.emoji}</span>
                <div>
                  <h4 className="font-sans text-2xl font-black text-teal-950 leading-none">
                    {selectedMonument.nameEn}
                  </h4>
                  <p className="font-sans text-sm text-slate-500 font-bold mt-2">
                    In the USA
                  </p>
                </div>
              </div>
              <div className="inline-flex self-start sm:self-center items-center gap-1 bg-teal-105 text-teal-900 text-sm font-black px-4 py-2 rounded-full border border-teal-200">
                📍 {selectedMonument.location}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-teal-905 font-black uppercase tracking-wider">
                <BookOpen className="h-5 w-5 text-teal-550" />
                COOL VISUAL SECRET :
              </div>
              <p className="font-sans text-base font-bold text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                {selectedMonument.funFact}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between bg-teal-50 p-3 rounded-xl text-teal-950 border border-teal-100 text-[11px] font-bold">
            <span>PRESENTATION tip :</span>
            <span>Tell kids how high these monuments stand compared to our school building! 🤫</span>
          </div>
        </div>
      </div>

      {/* Quiz For First Graders / CP Students (Clean, simple, big text) */}
      <div className="rounded-[32px] border-4 border-slate-900 bg-indigo-50 p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6 text-indigo-600 animate-bounce" />
          <h4 className="font-sans text-base font-black text-indigo-950 uppercase tracking-widest">
            MINI USA CHALLENGE! 🧠🏆
          </h4>
        </div>
        
        <p className="font-sans text-lg font-black text-indigo-900">
          "Which famous monument was made in France as a friendship gift to America?"
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            id="quiz-btn-gate"
            onClick={() => handleQuizAnswer("goldengate")}
            className={`cursor-pointer rounded-2xl p-4 font-sans text-sm font-black text-left border-3 transition-all flex items-center justify-between ${
              quizAnswer === "goldengate"
                ? "bg-red-50 border-red-500 text-red-955"
                : "bg-white border-slate-900 hover:border-slate-850"
            }`}
          >
            <span>🌉 Golden Gate Bridge (San Francisco)</span>
            {quizAnswer === "goldengate" && <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />}
          </button>

          <button
            id="quiz-btn-liberty"
            onClick={() => handleQuizAnswer("liberty")}
            className={`cursor-pointer rounded-2xl p-4 font-sans text-sm font-black text-left border-3 transition-all flex items-center justify-between ${
              quizAnswer === "liberty"
                ? "bg-emerald-50 border-emerald-550 text-emerald-955 ring-4 ring-emerald-100"
                : "bg-white border-slate-900 hover:border-slate-850"
            }`}
          >
            <span>🗽 Statue of Liberty (New York)</span>
            {quizAnswer === "liberty" && <CheckCircle className="h-5 w-5 text-emerald-650 flex-shrink-0" />}
          </button>
        </div>

        {quizAnswer && (
          <div className="mt-4 font-sans text-sm p-4 rounded-xl border-2 border-dashed bg-white transition-all">
            {quizAnswer === "liberty" ? (
              <div className="text-emerald-900 font-extrabold flex items-center gap-2">
                <span>🎉 CORRECT! France shipped her in 350 big wooden boxes on a giant ocean ship! Gustave Eiffel designed the metal skeleton inside!</span>
              </div>
            ) : (
              <div className="text-red-900 font-bold">
                <span>Oops! That is a super bridge, but not the one made in Paris. Try again!</span>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
