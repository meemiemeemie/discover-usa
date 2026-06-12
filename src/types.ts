/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SchoolDetail {
  title: string;
  france: {
    description: string;
    items: string[];
    icon: string;
  };
  usa: {
    description: string;
    items: string[];
    icon: string;
  };
}

export interface Snack {
  id: string;
  nameEn: string;
  nameFr: string;
  emoji: string;
  description: string;
  funFact: string;
  soundPronunciation: string;
}

export interface Monument {
  id: string;
  nameFr: string;
  nameEn: string;
  location: string;
  emoji: string;
  funFact: string;
  colorClass: string;
  svgIcon?: string;
}

export interface StoryPage {
  pageNumber: number;
  textEn: string;
  textFr: string;
  emoji: string;
  foodItems: {
    nameEn: string;
    nameFr: string;
    emoji: string;
    count: number;
    color: string;
  }[];
  caterpillarState: "egg" | "tiny" | "hungry" | "fat" | "cocoon" | "butterfly";
  backgroundEmoji?: string;
}

export interface PresenterNote {
  slideId: string;
  tip: string;
  suggestedQuestion: string;
}
