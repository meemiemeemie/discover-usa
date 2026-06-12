/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, AlertCircle } from "lucide-react";
import { STORY_PAGES } from "../data";
import { playCrunchSound, playPopSound, playSuccessSound } from "../utils/audio";

interface CaterpillarStorybookProps {
  onTriggerSparkles: () => void;
}

export default function CaterpillarStorybook({ onTriggerSparkles }: CaterpillarStorybookProps) {
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [bittenItems, setBittenItems] = useState<Record<string, boolean>>({});

  const currentPage = STORY_PAGES[currentPageIdx];

  const handleNextPage = () => {
    if (currentPageIdx < STORY_PAGES.length - 1) {
      setCurrentPageIdx(currentPageIdx + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      setCurrentPageIdx(currentPageIdx - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPageIdx(0);
    setBittenItems({});
  };

  // Helper key to identify bites
  const getBiteKey = (pageNum: number, foodIndex: number, itemIndex: number) => {
    return `${pageNum}-${foodIndex}-${itemIndex}`;
  };

  // Click handler for eating food
  const handleEatFood = (foodIndex: number, itemIndex: number) => {
    const key = getBiteKey(currentPage.pageNumber, foodIndex, itemIndex);
    if (bittenItems[key]) return; // already eaten

    playCrunchSound();
    
    // Set item as eaten
    setBittenItems({
      ...bittenItems,
      [key]: true
    });
  };

  // Count food status for the current slide
  let totalPageFoods = 0;
  let eatenPageFoods = 0;

  currentPage.foodItems.forEach((foodGroup, foodIndex) => {
    for (let i = 0; i < foodGroup.count; i++) {
      totalPageFoods++;
      if (bittenItems[getBiteKey(currentPage.pageNumber, foodIndex, i)]) {
        eatenPageFoods++;
      }
    }
  });

  const isPageFeedingFinished = eatenPageFoods >= totalPageFoods;

  // Final butterfly celebration trigger - runs for exactly 15 seconds then stops
  useEffect(() => {
    if (currentPage.caterpillarState === "butterfly") {
      playSuccessSound();
      onTriggerSparkles(); // Trigger first burst immediately

      // Then spawn sparkles every 1.5 seconds for a total of 15 seconds (10 bursts)
      let count = 1;
      const intervalId = setInterval(() => {
        if (count < 10) {
          onTriggerSparkles();
          count++;
        } else {
          clearInterval(intervalId);
        }
      }, 1500);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [currentPageIdx, currentPage.caterpillarState, onTriggerSparkles]);

  return (
    <div id="caterpillar-storybook" className="space-y-8">
      
      {/* Introduction */}
      <div className="text-center space-y-3">
        <h3 className="inline-flex items-center justify-center gap-2 font-sans text-3xl font-black text-emerald-950">
          <BookOpen className="h-8 w-8 text-emerald-600 animate-pulse" />
          The Very Hungry Caterpillar 🐛📖
        </h3>
        <p className="font-sans text-xl font-bold text-gray-700 max-w-2xl mx-auto">
          Let's read Eric Carle's famous story together! Help the caterpillar eat delicious foods!
        </p>
      </div>

      {/* Main Book Reader */}
      <div className="relative overflow-hidden rounded-[32px] border-4 border-slate-900 bg-emerald-50/50 shadow-xl min-h-[460px] flex flex-col justify-between">
        
        {/* Top Header Card Info */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white font-sans text-sm font-black">
          <div className="flex items-center gap-2">
            <span>🐛 STORYTIME BOOK</span>
            <span className="bg-emerald-500 text-white px-3 py-0.5 rounded-full text-xs font-mono uppercase tracking-widest pl-2">
              Page {currentPage.pageNumber} / {STORY_PAGES.length}
            </span>
          </div>
          <div className="text-xs text-emerald-400 font-black">Ready to read!</div>
        </div>

        {/* Core Book Body */}
        <div className="p-8 flex-1 flex flex-col justify-between items-center gap-8">
          
          {/* Main Visual Arena */}
          <div className="relative flex flex-col items-center justify-center py-6 w-full text-center">
            
            {/* Background elements (Sun, Moon, flowers) */}
            {currentPage.backgroundEmoji && (
              <span className="absolute top-[5%] text-7xl opacity-20 pointer-events-none select-none animate-pulse">
                {currentPage.backgroundEmoji}
              </span>
            )}

            {/* Custom Caterpillar Visual Presentation */}
            <div className="z-10 flex flex-col items-center gap-4">
              
              {/* Egg on leaf */}
              {currentPage.caterpillarState === "egg" && (
                <div className="relative p-6 animate-pulse">
                  <span className="text-9xl block">🍃</span>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl bg-white border-2 border-yellow-200 rounded-full py-2 px-4 shadow-md">🥚</span>
                  <div className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-widest font-black">An egg lies on a leaf!</div>
                </div>
              )}

              {/* Tiny caterpillar crawls out */}
              {currentPage.caterpillarState === "tiny" && (
                <div className="relative p-4">
                  <div className="text-7xl animate-bounce">🐛☀️</div>
                  <div className="mt-4 text-sm font-black text-amber-900 bg-amber-100 px-4 py-2 rounded-2xl border-2 border-amber-300 uppercase shadow-sm">
                    POP! Out came a tiny caterpillar!
                  </div>
                </div>
              )}

              {/* Sick tummy ache */}
              {currentPage.pageNumber === 8 && (
                <div className="bg-red-50 p-6 rounded-3xl border-4 border-red-200 flex flex-col items-center animate-bounce">
                  <span className="text-7xl">🐛🤢</span>
                  <span className="text-sm font-black text-red-700 uppercase mt-4">Oh no! He has a stomach ache! 😭</span>
                </div>
              )}

              {/* Fat Caterpillar */}
              {currentPage.caterpillarState === "fat" && currentPage.pageNumber !== 8 && (
                <div className="flex flex-col items-center">
                  <span className="text-9xl animate-pulse">🐛🍖</span>
                  <span className="text-sm font-black text-emerald-850 bg-emerald-100 px-4 py-2 rounded-2xl border-2 border-emerald-350 uppercase mt-4">He is a BIG, FAT caterpillar! 😲</span>
                </div>
              )}

              {/* Cocoon cocoon sleep */}
              {currentPage.caterpillarState === "cocoon" && (
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative w-44 h-24 bg-amber-800 rounded-full flex items-center justify-center border-4 border-amber-950 text-white shadow-lg animate-pulse">
                    <span className="text-sm font-black tracking-widest cursor-pointer p-4 uppercase" onClick={() => playPopSound()}>😴 COCOON (Zzz...)</span>
                  </div>
                  <button
                    id="btn-knock-cocoon"
                    onClick={() => { playPopSound(); }}
                    className="cursor-pointer mt-4 bg-amber-200 text-amber-950 border-2 border-slate-900 rounded-full px-6 py-2 font-sans text-xs font-black shadow hover:bg-amber-300 active:scale-95"
                  >
                    ✊ Knock knock! Wake up caterpillar!
                  </button>
                </div>
              )}

              {/* Butterfly final transformation */}
              {currentPage.caterpillarState === "butterfly" && (
                <div className="flex flex-col items-center space-y-4 pb-4">
                  <div className="text-9xl animate-bounce filter drop-shadow-2xl">🦋</div>
                  <div className="text-sm font-mono font-black text-rose-600 tracking-widest bg-pink-100 px-4 py-1.5 rounded-full border border-pink-200 uppercase">
                    He is a beautiful butterfly! ⭐🎉
                  </div>
                </div>
              )}

            </div>

            {/* Food Feeding Grid (Extremely clean & big) */}
            {currentPage.foodItems.length > 0 && (
              <div className="mt-8 w-full max-w-lg bg-white rounded-3xl p-6 border-4 border-slate-900 shadow">
                
                <div className="text-[11px] text-slate-500 font-black uppercase tracking-wider mb-4 block">
                  🍔 FEED THE CATERPILLAR! CLICK ON THE FOODS:
                </div>

                <div className="flex flex-wrap gap-4 justify-center items-center">
                  {currentPage.foodItems.map((foodGroup, foodIndex) => {
                    const itemsArr = Array.from({ length: foodGroup.count });
                    return (
                      <div key={foodIndex} className="flex flex-wrap gap-3 items-center justify-center">
                        {itemsArr.map((_, i) => {
                          const isEaten = bittenItems[getBiteKey(currentPage.pageNumber, foodIndex, i)];
                          return (
                            <button
                              id={`food-chew-${foodIndex}-${i}`}
                              key={i}
                              onClick={() => handleEatFood(foodIndex, i)}
                              className={`cursor-pointer w-16 h-16 rounded-2xl flex items-center justify-center relative border-3 text-4xl shadow-sm transition-all transform hover:scale-110 active:scale-90 ${
                                isEaten
                                  ? "bg-slate-50 border-dashed border-slate-350 opacity-50"
                                  : "bg-white border-slate-900"
                              }`}
                              title={isEaten ? "Eaten!" : `Chew output - click to eat!`}
                            >
                              {isEaten ? (
                                <span className="text-2xl">🕳️</span>
                              ) : (
                                <span className="block animate-pulse">{foodGroup.emoji}</span>
                              )}

                              {isEaten && (
                                <span className="absolute -bottom-1 -right-1 text-base animate-pulse">🐛</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Progress bar info */}
                <div className="mt-4 font-sans text-sm font-black">
                  {isPageFeedingFinished ? (
                    <span className="text-emerald-700">✓ Well done! All food eaten! We can turn the page 🔓</span>
                  ) : (
                    <span className="text-amber-700 animate-pulse">
                      Still hungry! Crunch {totalPageFoods - eatenPageFoods} more item{totalPageFoods - eatenPageFoods > 1 ? "s" : ""}!
                    </span>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Large text card for live reading out loud */}
          <div className="w-full text-center max-w-3xl bg-white rounded-3xl border-4 border-slate-900 p-6 md:p-8 shadow-md space-y-4">
            <h4 className="font-sans text-xl md:text-2xl font-black text-slate-900 leading-relaxed max-w-2xl mx-auto">
              "{currentPage.textEn}"
            </h4>
            <div className="border-t border-dashed border-emerald-200 pt-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-150 mb-2 inline-block">French translation 🇫🇷</span>
              <p className="font-sans text-base md:text-lg font-bold text-slate-600 leading-relaxed max-w-2xl mx-auto italic">
                "{currentPage.textFr}"
              </p>
            </div>
          </div>

        </div>

        {/* Story Controls Toolbar */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-t border-slate-950">
          
          <button
            id="story-btn-prev"
            onClick={handlePrevPage}
            disabled={currentPageIdx === 0}
            className="cursor-pointer flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-sans text-sm font-black text-slate-900 shadow hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Back
          </button>

          {/* Conditional page turns */}
          {!isPageFeedingFinished ? (
            <div className="flex items-center gap-2 bg-amber-500 text-slate-950 text-xs py-1.5 px-4 rounded-full font-black uppercase shadow">
              <AlertCircle className="h-4 w-4" />
              Feed him to unlock!
            </div>
          ) : (
            <div className="text-xs text-emerald-400 font-extrabold animate-bounce">
              Page unlocked! 🌟
            </div>
          )}

          {currentPageIdx === STORY_PAGES.length - 1 ? (
            <button
              id="story-btn-restart"
              onClick={handleFirstPage}
              className="cursor-pointer flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2.5 font-sans text-sm font-black text-white shadow hover:bg-rose-600 active:scale-95"
            >
              🔄 Read Again!
            </button>
          ) : (
            <button
              id="story-btn-next"
              onClick={handleNextPage}
              disabled={!isPageFeedingFinished}
              className={`cursor-pointer flex items-center gap-1.5 rounded-full bg-emerald-500 px-5 py-2.5 font-sans text-sm font-black text-slate-950 shadow active:scale-95 hover:bg-emerald-450 ${
                !isPageFeedingFinished ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              Next →
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
