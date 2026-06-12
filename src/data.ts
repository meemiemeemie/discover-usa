/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SchoolDetail, Snack, Monument, StoryPage, PresenterNote } from "./types";

export const SCHOOL_DAY_DATA: SchoolDetail[] = [
  {
    title: "How We Go to School",
    france: {
      description: "Walk, go by car or bike, or take public transit with family.",
      items: ["Walking on the sidewalk", "Riding in the family car", "No school buses!"],
      icon: "🚶‍♂️"
    },
    usa: {
      description: "Jump on a magical, big yellow School Bus!",
      items: ["Iconic big yellow bus!", "It stops traffic with a STOP sign", "Ride to school with classmates!"],
      icon: "🚌"
    }
  },
  {
    title: "Starting the Day",
    france: {
      description: "Hang your coat, walk in, and say Hello to the teacher.",
      items: ["Hang backpack on a peg", "Say 'Bonjour' quietly", "Start working right away"],
      icon: "🎒"
    },
    usa: {
      description: "Pledge of Allegiance to the flag every single morning!",
      items: ["Stand up together", "With right hand over heart", "Greet the flag: Stars & Stripes!"],
      icon: "🇺🇸"
    }
  },
  {
    title: "Lunchtime: Cafeteria vs Lunchbox",
    france: {
      description: "A warm multi-course meal served at tables in school.",
      items: ["Warm, healthy hot meals", "Eat calmly with your friends", "Learn to try all foods!"],
      icon: "🍽️"
    },
    usa: {
      description: "Bring a personal Lunchbox packed with delicious snacks!",
      items: ["Colorful fun lunchbox", "Classic peanut butter & jelly", "Sip fruit juice box!"],
      icon: "🥪"
    }
  },
  {
    title: "School Hours & Free Time",
    france: {
      description: "Half days on Wednesdays!",
      items: [
        "Class from 8:30 to 15:00 most days",
        "Finish at noon on Wednesdays!",
        "Four two-week vacations: All Saints, Christmas, winter and Easter!"
      ],
      icon: "⏰"
    },
    usa: {
      description: "Finish every day at 15:00",
      items: [
        "Class ends around 15:00 every day",
        "Only three one-week vacations: Christmas, mid-winter and spring."
      ],
      icon: "🕒"
    }
  }
];

export const SNACKS_DATA: Snack[] = [
  {
    id: "cookie",
    nameEn: "Chocolate Chip Cookies",
    nameFr: "Chocolate Chip Cookie",
    emoji: "🍪",
    description: "Golden warm cookies filled with melting sweet chocolate chips.",
    funFact: "Invented in America! The creator traded the recipe for a lifetime supply of chocolate!",
    soundPronunciation: "Choc-o-late Chip Coo-kie"
  },
  {
    id: "pbj",
    nameEn: "Peanut Butter & Jelly",
    nameFr: "PB&J Sandwich",
    emoji: "🥪",
    description: "Creamy peanut butter paired with sweet strawberry jelly on bread.",
    funFact: "The ultimate American school kid classic comfort food!",
    soundPronunciation: "Pea-nut But-ter and Jel-ly"
  },
  {
    id: "mac",
    nameEn: "Mac & Cheese",
    nameFr: "Macaroni and Cheese",
    emoji: "🧀",
    description: "Soft elbow macaroni pasta coated with creamy, bright cheddar cheese sauce.",
    funFact: "Brought back and made famous by US President Thomas Jefferson!",
    soundPronunciation: "Mac and Cheese"
  },
  {
    id: "smores",
    nameEn: "S'mores",
    nameFr: "S'mores",
    emoji: "🔥",
    description: "Roasted melted marshmallow and sweet chocolate between crunchy graham cookies.",
    funFact: "Named 'S'more' because everyone always begs for 'Some More'!",
    soundPronunciation: "S'morz"
  },
  {
    id: "popcorn",
    nameEn: "Popcorn",
    nameFr: "Popcorn",
    emoji: "🍿",
    description: "Heat kernels until they make a loud POP! into fluffy clouds.",
    funFact: "Native Americans popped corn over fire 5,000 years ago!",
    soundPronunciation: "Pop-corn"
  }
];

export const MONUMENTS_DATA: Monument[] = [
  {
    id: "liberty",
    nameFr: "The Statue of Liberty",
    nameEn: "The Statue of Liberty",
    location: "New York City",
    emoji: "🗽",
    funFact: "A huge positive gift from France! Created by the same engineer who built the Eiffel Tower!",
    colorClass: "from-teal-400 to-emerald-600"
  },
  {
    id: "goldengate",
    nameFr: "The Golden Gate Bridge",
    nameEn: "The Golden Gate Bridge",
    location: "San Francisco",
    emoji: "🌉",
    funFact: "Painted bright orange-red so ships can see it through the thick ocean fog!",
    colorClass: "from-orange-500 to-red-600"
  },
  {
    id: "whitehouse",
    nameFr: "The White House",
    nameEn: "The White House",
    location: "Washington D.C.",
    emoji: "🏛️",
    funFact: "Where the US President lives and works. It has its own bowling alley inside!",
    colorClass: "from-blue-400 to-indigo-600"
  },
  {
    id: "grandcanyon",
    nameFr: "The Grand Canyon",
    nameEn: "The Grand Canyon",
    location: "Arizona",
    emoji: "⛰️",
    funFact: "A gigantic natural valley so deep it took millions of years for water to carve out!",
    colorClass: "from-amber-600 to-orange-850"
  }
];

export const NUMBERS_DATA = [
  { value: 1, word: "One", phonetic: "Wan", emoji: "🐶", countLabel: "1 Happy Dog" },
  { value: 2, word: "Two", phonetic: "Too", emoji: "🍎", countLabel: "2 Red Apples" },
  { value: 3, word: "Three", phonetic: "Three", emoji: "⭐", countLabel: "3 Gold Stars" },
  { value: 4, word: "Four", phonetic: "For", emoji: "🦋", countLabel: "4 Butterfly Buds" },
  { value: 5, word: "Five", phonetic: "Five", emoji: "🦕", countLabel: "5 Cute Dinosaurs" },
  { value: 6, word: "Six", phonetic: "Six", emoji: "🐝", countLabel: "6 Busy Bees" },
  { value: 7, word: "Seven", phonetic: "Sev-en", emoji: "🚗", countLabel: "7 Fast Cars" },
  { value: 8, word: "Eight", phonetic: "Ayt", emoji: "🎈", countLabel: "8 Party Balloons" },
  { value: 9, word: "Nine", phonetic: "Nine", emoji: "🍪", countLabel: "9 Round Cookies" },
  { value: 10, word: "Ten", phonetic: "Ten", emoji: "🇺🇸", countLabel: "10 Small Flags" }
];

export const WORDS_DATA = [
  { id: "hello", word: "Hello", translation: "Bonjour !", phonetic: "Heh-loh", description: "Say it with a wave to start the day!", emoji: "👋", animation: "wave" },
  { id: "goodbye", word: "Goodbye", translation: "Au revoir !", phonetic: "Gud-by", description: "Wave a peaceful goodbye to others!", emoji: "🏃‍♀️", animation: "run" },
  { id: "thankyou", word: "Thank you", translation: "Merci !", phonetic: "Sank-you", description: "The magic word of kindness!", emoji: "💖", animation: "heart" }
];

export const STORY_PAGES: StoryPage[] = [
  {
    pageNumber: 1,
    textEn: "In the light of the moon, a little egg lay on a leaf.",
    textFr: "Dans la lumière de la lune, un petit œuf repose sur une feuille.",
    emoji: "🍃",
    foodItems: [],
    caterpillarState: "egg",
    backgroundEmoji: "🌙"
  },
  {
    pageNumber: 2,
    textEn: "One Sunday morning the warm sun came up and - pop! - out of the egg came a tiny and very hungry caterpillar.",
    textFr: "Un beau dimanche matin, le soleil chaud se lève et - pop ! - une minuscule chenille sort de l'œuf. Elle a très faim.",
    emoji: "🐛",
    foodItems: [],
    caterpillarState: "tiny",
    backgroundEmoji: "☀️"
  },
  {
    pageNumber: 3,
    textEn: "On Monday he ate through one apple. But he was still hungry.",
    textFr: "Le lundi, elle croque dans une pomme. Elle y fait un trou. Mais elle a encore faim.",
    emoji: "🐛🍎",
    foodItems: [
      { nameEn: "Apple", nameFr: "Pomme", emoji: "🍎", count: 1, color: "bg-red-500" }
    ],
    caterpillarState: "hungry"
  },
  {
    pageNumber: 4,
    textEn: "On Tuesday he ate through two pears. But he was still hungry.",
    textFr: "Le mardi, elle croque dans deux poires. Elle y fait deux trous. Mais elle a encore faim.",
    emoji: "🐛🍐🍐",
    foodItems: [
      { nameEn: "Pears", nameFr: "Poires", emoji: "🍐", count: 2, color: "bg-emerald-400" }
    ],
    caterpillarState: "hungry"
  },
  {
    pageNumber: 5,
    textEn: "On Wednesday he ate through three plums. But he was still hungry.",
    textFr: "Le mercredi, elle croque dans trois prunes. Elle y fait trois trous. Mais elle a encore faim.",
    emoji: "🐛🟣🟣🟣",
    foodItems: [
      { nameEn: "Plums", nameFr: "Prunes", emoji: "🟣", count: 3, color: "bg-purple-600" }
    ],
    caterpillarState: "hungry"
  },
  {
    pageNumber: 6,
    textEn: "On Thursday he ate through four strawberries. But he was still hungry.",
    textFr: "Le jeudi, elle croque dans quatre fraises. Elle y fait quatre trous. Mais elle a encore faim.",
    emoji: "🐛🍓🍓🍓🍓",
    foodItems: [
      { nameEn: "Strawberries", nameFr: "Fraises", emoji: "🍓", count: 4, color: "bg-rose-500" }
    ],
    caterpillarState: "hungry"
  },
  {
    pageNumber: 7,
    textEn: "On Friday he ate through five oranges. But he was still hungry.",
    textFr: "Le vendredi, elle croque dans cinq oranges. Elle y fait cinq trous. Mais elle a encore faim.",
    emoji: "🐛🍊🍊🍊🍊🍊",
    foodItems: [
      { nameEn: "Oranges", nameFr: "Oranges", emoji: "🍊", count: 5, color: "bg-orange-500" }
    ],
    caterpillarState: "hungry"
  },
  {
    pageNumber: 8,
    textEn: "On Saturday he ate through one piece of chocolate cake, one ice-cream cone, one pickle, one slice of Swiss cheese, one slice of salami, one lollipop, one piece of cherry pie, one sausage, one cupcake, and one slice of watermelon. That night he had a stomachache!",
    textFr: "Le samedi, elle croque dans un morceau de gâteau au chocolat, un cornet de glace, un cornichon, un morceau de gruyère, un bout de saucisson, une sucette, un quartier de tarte aux cerises, une saucisse, une brioche et une tranche de pastèque. Cette nuit-là, elle a mal au ventre !",
    emoji: "🐛🤢",
    foodItems: [
      { nameEn: "Chocolate cake", nameFr: "Gâteau au chocolat", emoji: "🍰", count: 1, color: "bg-amber-800" },
      { nameEn: "Ice cream", nameFr: "Cornet de glace", emoji: "🍦", count: 1, color: "bg-pink-300" },
      { nameEn: "Pickle", nameFr: "Cornichon", emoji: "🥒", count: 1, color: "bg-green-700" },
      { nameEn: "Cheese", nameFr: "Tranche de gruyère", emoji: "🧀", count: 1, color: "bg-yellow-400" },
      { nameEn: "Salami", nameFr: "Mince de saucisson", emoji: "🍖", count: 1, color: "bg-red-400" },
      { nameEn: "Lollipop", nameFr: "Sucette", emoji: "🍭", count: 1, color: "bg-pink-500" },
      { nameEn: "Cherry pie", nameFr: "Tarte aux cerises", emoji: "🥧", count: 1, color: "bg-red-700" },
      { nameEn: "Sausage", nameFr: "Saucisse", emoji: "🌭", count: 1, color: "bg-amber-600" },
      { nameEn: "Cupcake", nameFr: "Cupcake", emoji: "🧁", count: 1, color: "bg-purple-400" },
      { nameEn: "Watermelon", nameFr: "Tranche de pastèque", emoji: "🍉", count: 1, color: "bg-rose-400" }
    ],
    caterpillarState: "hungry"
  },
  {
    pageNumber: 9,
    textEn: "The next day was Sunday again. The caterpillar ate through one nice green leaf, and after that he felt much better.",
    textFr: "Le lendemain, c'est à nouveau dimanche. La chenille croque dans une belle feuille verte et se sent beaucoup mieux.",
    emoji: "🐛🍃",
    foodItems: [
      { nameEn: "Green leaf", nameFr: "Feuille verte", emoji: "🍃", count: 1, color: "bg-emerald-500" }
    ],
    caterpillarState: "fat"
  },
  {
    pageNumber: 10,
    textEn: "Now he wasn't hungry anymore - and he wasn't a tiny caterpillar anymore. He was a big, fat caterpillar.",
    textFr: "Maintenant, elle n'a plus faim du tout, mais elle n'est plus une petite chenille. Elle est devenue grosse et grasse.",
    emoji: "🐛✨",
    foodItems: [],
    caterpillarState: "fat",
    backgroundEmoji: "✨"
  },
  {
    pageNumber: 11,
    textEn: "He built a small house, called a cocoon, around himself. He stayed inside for more than two weeks. Then he nibbled a hole in the cocoon, pushed his way out and... he was a beautiful butterfly!",
    textFr: "Elle se construit une petite maison - un cocon - dans laquelle elle s'enveloppe. Deux semaines plus tard, elle y fait un trou, pousse de toutes ses forces pour sortir... Et elle est devenue un magnifique papillon !",
    emoji: "🦋🎉",
    foodItems: [],
    caterpillarState: "butterfly",
    backgroundEmoji: "🌸"
  }
];

export const PRESENTER_NOTES: PresenterNote[] = [
  {
    slideId: "location",
    tip: "Show France on the right and the USA on the left. Tell the children we cross the gigantic Atlantic Ocean. It takes 8 hours by plane!",
    suggestedQuestion: "How long is an 8-hour flight? What movie would you watch on the plane?"
  },
  {
    slideId: "school",
    tip: "Compare the yellow buses and pledge. Explain how the yellow buses have active stop signals to protect kids crosswalks.",
    suggestedQuestion: "Would you like to ride to school in a giant yellow school bus?"
  },
  {
    slideId: "snacks",
    tip: "Ask who likes sweet cookies vs who wants to try a peanut butter sandwich!",
    suggestedQuestion: "Would you put salty peanuts and sweet jelly together?"
  },
  {
    slideId: "monuments",
    tip: "Explain that the Statue of Liberty was copper brown at the start but turned green due to weather! Built by Gustave Eiffel.",
    suggestedQuestion: "Do you know who made the Eiffel Tower in Paris? He built this Statue too!"
  },
  {
    slideId: "numbers",
    tip: "Have children chant the numbers 1-10 together in full voice! Celebrate them.",
    suggestedQuestion: "Can we count from one to ten together?"
  },
  {
    slideId: "greetings",
    tip: "Practice 'Thank you' with tongue placement between teeth.",
    suggestedQuestion: "How do we say Bonjour, Au revoir, and Merci in English?"
  },
  {
    slideId: "caterpillar",
    tip: "Perform the voices of the caterpillar and have kids help count and click on each delicious food to feed it!",
    suggestedQuestion: "How many strawberries did the caterpillar eat on Thursday?"
  }
];
