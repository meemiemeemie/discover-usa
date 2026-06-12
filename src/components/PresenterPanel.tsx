/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sparkles, HelpCircle, Key, Users } from "lucide-react";
import { PRESENTER_NOTES } from "../data";
import { playSuccessSound } from "../utils/audio";

interface PresenterPanelProps {
  currentSlideId: string;
  onTriggerSparkles: () => void;
  edenName?: string;
}

export default function PresenterPanel({
  currentSlideId,
  onTriggerSparkles,
  edenName = "Eden"
}: PresenterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const note = PRESENTER_NOTES.find((n) => n.slideId === currentSlideId);

  const handleCelebrate = () => {
    playSuccessSound();
    onTriggerSparkles();
  };

  return (
    <div id="presenter-panel" className="border-t-4 border-amber-400 bg-amber-50 p-4 transition-all duration-300">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-amber-800">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-black text-amber-950">
              Mom & {edenName}'s Corner 👩‍👧
            </h4>
            <p className="font-sans text-xs text-amber-800">
              Tips and questions for Eden's class presentation!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-trigger-sparkles"
            onClick={handleCelebrate}
            className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1.5 font-sans text-xs font-bold text-white shadow-sm transition hover:bg-emerald-600 active:scale-95 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 animate-spin" />
            Cheer the Class ! 🎉
          </button>
          
          <button
            id="btn-toggle-presenter-tips"
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-lg px-4 py-1.5 font-sans text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer ${
              isOpen ? "bg-amber-800 text-white hover:bg-amber-900" : "bg-amber-200 text-amber-800 hover:bg-amber-300"
            }`}
          >
            {isOpen ? "Hide Presenter Notes" : "Show Presenter Notes"}
          </button>
        </div>
      </div>

      {isOpen && note && (
        <div className="mx-auto mt-4 max-w-5xl rounded-xl border border-amber-205 bg-white p-4 shadow-inner">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 border-r border-amber-100 pr-0 md:pr-4">
              <div className="flex items-center gap-1.5 text-amber-850 font-extrabold text-xs">
                <Key className="h-4 w-4 text-amber-500" />
                PRESENTING TIP FOR MOM :
              </div>
              <p className="font-sans text-xs text-gray-700 leading-relaxed font-medium">
                {note.tip}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-850 font-extrabold text-xs">
                <HelpCircle className="h-4 w-4 text-emerald-500" />
                ASK THE CLASS :
              </div>
              <p className="font-sans text-xs italic text-gray-800 bg-emerald-50 p-3 rounded-lg border border-emerald-100 font-bold">
                “ {note.suggestedQuestion} ”
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
