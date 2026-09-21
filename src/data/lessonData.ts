import { 
  LessonStep, 
  StanzaItem, 
  TrueFalseQuestion, 
  CategorizeItem, 
  MatchPair, 
  AnimalItem, 
  GlossaryWord 
} from '../types';

export const LESSON_STEPS: LessonStep[] = [
  {
    id: 'poem',
    number: 1,
    title: 'Knock Knock Poem',
    titleGujarati: 'કવિતા: નોક નોક (સાંભળો અને ગાઓ)',
    category: 'Listening',
    icon: 'DoorClosed',
    description: 'Listen, recite, and create your own rhyming stanzas on clean and polluted elements.'
  },
  {
    id: 'story',
    number: 2,
    title: 'The Water Family',
    titleGujarati: 'વાર્તા: ધ વોટર ફેમિલી (જળ પરિવાર)',
    category: 'Story',
    icon: 'Droplets',
    description: 'Explore Parvatbhai’s water-saving family, interactive rainwater harvesting, and Zarana’s song.'
  },
  {
    id: 'reading',
    number: 3,
    title: 'Water is Life',
    titleGujarati: 'વાંચન: જળ એ જ જીવન છે',
    category: 'Reading',
    icon: 'BookOpen',
    description: 'Read the passage, categorize water uses, match key facts, and build the Water Mind Map.'
  },
  {
    id: 'metamorphosis',
    number: 4,
    title: 'Metamorphosis Cycle',
    titleGujarati: 'રૂપાંતરણ (પતંગિયાનું જીવનચક્ર)',
    category: 'Writing',
    icon: 'Sparkles',
    description: 'Understand how insects and frogs transform from egg to butterfly through metamorphosis.'
  },
  {
    id: 'grammar',
    number: 5,
    title: 'Conjunctions & Punctuation',
    titleGujarati: 'વ્યાકરણ: સંયોજકો (and, but, or, because, so...)',
    category: 'Grammar',
    icon: 'Puzzle',
    description: 'Master connecting words (and, but, or, because, otherwise, so) and correct punctuation.'
  },
  {
    id: 'prepositions',
    number: 6,
    title: 'Prepositions of Place',
    titleGujarati: 'નામયોગી અવ્યય (in, on, under, between...)',
    category: 'Grammar',
    icon: 'Compass',
    description: 'Explore positions inside an interactive classroom and fix humorous grammar mistakes.'
  },
  {
    id: 'vocabulary',
    number: 7,
    title: 'Water Bodies & Animals',
    titleGujarati: 'શબ્દભંડોળ: જળસ્ત્રોતો અને પ્રાણીઓનું વર્ગીકરણ',
    category: 'Vocabulary',
    icon: 'Layers',
    description: 'Arrange water bodies from small to large, classify animals, and identify water phenomena.'
  },
  {
    id: 'speaking',
    number: 8,
    title: 'Speaking & Tongue Twisters',
    titleGujarati: 'વાર્તાલાપ અને ટંગ ટ્વિસ્ટર્સ',
    category: 'Speaking',
    icon: 'Mic',
    description: 'Play the classroom "Pass the Ball" game and challenge your tongue with fast twisters!'
  },
  {
    id: 'glossary',
    number: 9,
    title: 'Glossary & DIY Lab',
    titleGujarati: 'શબ્દકોશ (અંગ્રેજી-ગુજરાતી) અને પ્રયોગશાળા',
    category: 'Glossary & Lab',
    icon: 'FlaskConical',
    description: 'Bilingual English-Gujarati dictionary flashcards and hands-on science experiments.'
  },
  {
    id: 'certificate',
    number: 10,
    title: 'Unit Completion & Award',
    titleGujarati: 'સફળતા પ્રમાણપત્ર અને રિવ્યુ',
    category: 'Completion',
    icon: 'Award',
    description: 'Celebrate your completion of Unit 1: Water with your personalized badge and report card.'
  }
];

export const POEM_STANZAS: StanzaItem[] = [
  {
    id: 'river',
    visitor: 'a clean river',
    response: 'You are welcome, dear.',
    isAllowed: true,
    imageIcon: '🌊',
    audioText: 'Knock knock! Who is there? I am a clean river. You are welcome, dear.',
    gujaratiMeaning: 'હું સ્વચ્છ નદી છું - આપનું સ્વાગત છે!'
  },
  {
    id: 'smoke',
    visitor: 'dirty smoke',
    response: 'Sorry... you are not allowed.',
    isAllowed: false,
    imageIcon: '💨',
    audioText: 'Knock knock! Who is there? I am dirty smoke. Sorry, you are not allowed.',
    gujaratiMeaning: 'હું ગંદો ધુમાડો છું - માફ કરશો, તમને આવવાની પરવાનગી નથી.'
  },
  {
    id: 'air',
    visitor: 'fresh air',
    response: 'You are welcome, dear.',
    isAllowed: true,
    imageIcon: '🍃',
    audioText: 'Knock knock! Who is there? I am fresh air. You are welcome, dear.',
    gujaratiMeaning: 'હું શુદ્ધ હવા છું - આપનું હાર્દિક સ્વાગત છે!'
  },
  {
    id: 'polluted_air',
    visitor: 'polluted air',
    response: 'Sorry... you are not allowed.',
    isAllowed: false,
    imageIcon: '🏭',
    audioText: 'Knock knock! Who is there? I am polluted air. Sorry, you are not allowed.',
    gujaratiMeaning: 'હું પ્રદૂષિત હવા છું - માફ કરશો, તમને પ્રવેશ નથી.'
  },
  {
    id: 'dustbin',
    visitor: 'a dustbin',
    response: 'You are very useful. You are welcome, dear.',
    isAllowed: true,
    imageIcon: '🗑️',
    audioText: 'Knock knock! Who is there? I am a dustbin. You are very useful. You are welcome, dear.',
    gujaratiMeaning: 'હું કચરાપેટી છું - તમે ખૂબ ઉપયોગી છો, આપનું સ્વાગત છે!'
  }
];

export const CUSTOM_STANZA_OPTIONS = [
  {
    name: 'plastic bag',
    icon: '🛍️',
    correctAllowed: false,
    correctResponse: 'Sorry... you are not allowed. You harm our environment!',
    gujarati: 'પ્લાસ્ટિકની થેલી (પ્રદૂષણ ફેલાવે છે)'
  },
  {
    name: 'junk food',
    icon: '🍔',
    correctAllowed: false,
    correctResponse: 'Sorry... you are not allowed. You make us unhealthy!',
    gujarati: 'જંક ફૂડ (અસ્વસ્થ ખોરાક)'
  },
  {
    name: 'fresh fruit',
    icon: '🍎',
    correctAllowed: true,
    correctResponse: 'You are healthy and sweet. You are welcome, dear!',
    gujarati: 'તાજા ફળો (સ્વાસ્થ્યવર્ધક)'
  }
];

export const STORY_DATA = {
  title: 'The Water Family',
  titleGujarati: 'ધ વોટર ફેમિલી (જળ પરિવાર)',
  song: {
    lyrics: [
      '“Water is a necessity!',
      'Water is life!',
      'Water is the soul.',
      'Saving it is our goal.”'
    ],
    lyricsGujarati: '“પાણી એક જરૂરિયાત છે! પાણી જીવન છે! પાણી આત્મા છે. પાણી બચાવવું એ અમારો સંકલ્પ છે.”'
  },
  characters: [
    {
      name: 'Parvatbhai',
      role: 'Father & Wise Farmer',
      description: 'Valued water like gold. Built a ‘Khet Talavdi’ (farm pond) and a large underground rainwater tank at home.',
      gujarati: 'પરબતભાઈ (શાણા ખેડૂત) - પાણીને સોના જેવું કિંમતી ગણતા. ખેતતલાવડી અને ભૂગર્ભ ટાંકો બનાવ્યો.'
    },
    {
      name: 'Saritaben',
      role: 'Mother & Water Guardian',
      description: 'Always taught neighbors gently to save water and avoid wasteful habits.',
      gujarati: 'સરિતાબેન - પાડોશીઓને નમ્રતાથી પાણીની બચત કરવાનું સમજાવતા.'
    },
    {
      name: 'Varsha',
      role: 'Eldest Daughter (The Mechanic)',
      description: 'A skilled mechanic. Fixed every leaking tap she saw in the house and village.',
      gujarati: 'વર્ષા (મોટી દીકરી) - કુશળ મિકેનિક, ટપકતા નળ તરત જ રિપેર કરી આપતી.'
    },
    {
      name: 'Vaari',
      role: 'Second Daughter (The Speaker)',
      description: 'Delivered speeches on water conservation at school and Panchayat gatherings.',
      gujarati: 'વારી (બીજી દીકરી) - શાળા અને પંચાયતમાં પાણી બચાવો વિષય પર પ્રવચન આપતી.'
    },
    {
      name: 'Zarana',
      role: 'Youngest Daughter (The Singer)',
      description: 'Reminded everyone by singing inspiring songs and slogans on saving water.',
      gujarati: 'ઝરણા (નાની દીકરી) - મધુર ગીતો અને સૂત્રો ગાઈને પાણી બચાવવાનો સંદેશ આપતી.'
    }
  ],
  harvestingDiagram: [
    {
      step: 1,
      name: 'Collection Area (Rooftop)',
      gujarati: 'સંગ્રહ ક્ષેત્ર (ધાબું / છત)',
      description: 'Clean sloped roof collects pure rainwater falling from the clouds during monsoon.',
      icon: 'Home'
    },
    {
      step: 2,
      name: 'Conveyance Pipe & Filter',
      gujarati: 'પાઇપ અને ફિલ્ટર સિસ્ટમ',
      description: 'Pipes channel the flowing rainwater down, passing through wire mesh to block leaves and dust.',
      icon: 'Activity'
    },
    {
      step: 3,
      name: 'Storage Tank (Underground)',
      gujarati: 'ભૂગર્ભ સંગ્રહ ટાંકો',
      description: 'A massive underground concrete cistern stores thousands of litres of water, safe from evaporation.',
      icon: 'Database'
    },
    {
      step: 4,
      name: 'Recharge Facility (Borewell / Well)',
      gujarati: 'રીચાર્જ સિસ્ટમ (ભૂગર્ભ જળ રિચાર્જ)',
      description: 'Surplus overflow water is directed deep into the groundwater table to replenish dried wells.',
      icon: 'ArrowDownCircle'
    }
  ],
  trueFalseQuestions: [
    {
      id: 1,
      question: 'Parvatbhai and Saritaben were uneducated.',
      questionGujarati: 'પરબતભાઈ અને સરિતાબેન અશિક્ષિત હતા.',
      correctAnswer: false,
      explanation: 'False! They were wise and educated about water conservation, building tanks and farm ponds.'
    },
    {
      id: 2,
      question: 'Zarana used to sing songs and slogans to stop water waste.',
      questionGujarati: 'ઝરણા પાણીનો બગાડ અટકાવવા ગીતો અને સૂત્રો ગાતી હતી.',
      correctAnswer: true,
      explanation: 'True! Zarana sang "Water is a necessity! Water is life! Saving it is our goal."'
    },
    {
      id: 3,
      question: 'The villagers later built underground tanks for rainwater.',
      questionGujarati: 'ગ્રામજનોએ પછીથી વરસાદી પાણી માટે ભૂગર્ભ ટાંકા બનાવ્યા.',
      correctAnswer: true,
      explanation: 'True! After the drought, with District Collector guidance and government support, every house built a tank.'
    },
    {
      id: 4,
      question: 'The village had enough water even during less rain the next year.',
      questionGujarati: 'બીજા વર્ષે ઓછો વરસાદ પડવા છતાં ગામમાં પૂરતું પાણી હતું.',
      correctAnswer: true,
      explanation: 'True! Because their rainwater storage tanks were full, no one suffered in the dry period.'
    }
  ]
};

export const READING_PASSAGE = {
  title: 'Water is Life',
  titleGujarati: 'જળ એ જ જીવન છે',
  text: `Water is one of the most important things on the Earth. All living beings - humans, animals, and plants need water to live. We use water every day for drinking, cooking, bathing, cleaning etc.

The primary sources of water are rainwater, surface water (rivers, ponds, lakes, glacier, oceans etc.) and groundwater. We get water from water tanks, dams and hand pumps. Also salty sea water is converted into drinking water at some places.

The farmers need water to grow crops. Industries use water to make goods and to keep machines cool. There are so many water activities like swimming, boating, rafting, pool games etc.

Many creatures like fish, frogs, and whales live in water. Water also helps keep the weather cool. Water is essential for trees and plants.

Unfortunately, some people make water dirty by throwing garbage and releasing factory chemicals into it. This is called water pollution. In some places, people don’t have enough water to drink.

The level of water on the earth is decreasing. Many people waste water. We must save water. We can do this by turning off taps, fixing leakages, and using water carefully. If we save water today, we will have enough for tomorrow.

“Water is life. We cannot produce water but we can save it.”`,
  categories: [
    { id: '1', name: 'Bathing', gujarati: 'સ્નાન કરવું', category: 'Home' },
    { id: '2', name: 'Growing rice', gujarati: 'ડાંગર પકવવી', category: 'Agriculture' },
    { id: '3', name: 'Cooling machines', gujarati: 'મશીનો ઠંડા રાખવા', category: 'Industry' },
    { id: '4', name: 'Cleaning clothes and utensils', gujarati: 'કપડાં અને વાસણ સાફ કરવા', category: 'Home' },
    { id: '5', name: 'Making products', gujarati: 'ઉત્પાદનો બનાવવા', category: 'Industry' },
    { id: '6', name: 'Producing electricity', gujarati: 'વીજળી ઉત્પન્ન કરવી (હાઇડ્રો પાવર)', category: 'Industry' },
    { id: '7', name: 'Watering plants', gujarati: 'છોડવાઓને પાણી પાવું', category: 'Agriculture' },
    { id: '8', name: 'Drinking & cooking', gujarati: 'પીવું અને રસોઈ કરવી', category: 'Home' }
  ] as CategorizeItem[],
  matchPairs: [
    { id: 1, itemA: 'Farmers', itemB: 'grow crops' },
    { id: 2, itemA: 'Swimming', itemB: 'water activity' },
    { id: 3, itemA: 'Fish', itemB: 'live in water' },
    { id: 4, itemA: 'Water pollution', itemB: 'dirty water' },
    { id: 5, itemA: 'Turning off the tap', itemB: 'saves water' }
  ] as MatchPair[],
  mindMapNodes: {
    root: 'Water (જળ)',
    branches: [
      {
        title: 'Uses of Water',
        titleGujarati: 'પાણીના ઉપયોગો',
        color: 'sky',
        items: ['Drinking', 'Cooking', 'Bathing', 'Irrigation (Farming)', 'Industrial Cooling']
      },
      {
        title: 'Sources of Water',
        titleGujarati: 'પાણીના સ્ત્રોતો',
        color: 'blue',
        items: ['Rainwater', 'Rivers & Lakes', 'Ponds', 'Groundwater (Wells)', 'Glaciers']
      },
      {
        title: 'Water Shortage',
        titleGujarati: 'પાણીની અછત',
        color: 'amber',
        items: ['Drought', 'Overuse', 'Dry wells', 'Lack of rain', 'Empty pots']
      },
      {
        title: 'Water Pollution',
        titleGujarati: 'જળ પ્રદૂષણ',
        color: 'rose',
        items: ['Throwing garbage', 'Factory chemicals', 'Plastic waste', 'Dirty sewage']
      },
      {
        title: 'Water Conservation',
        titleGujarati: 'જળ સંરક્ષણ',
        color: 'emerald',
        items: ['Rainwater harvesting', 'Turning off taps', 'Fixing leaks', 'Underground tanks', 'Using buckets']
      }
    ]
  }
};

export const METAMORPHOSIS_STAGES = [
  {
    stepNumber: 1,
    title: 'The Egg Stage',
    gujarati: 'ઈંડા અવસ્થા',
    sentence: 'A butterfly starts its life as an egg laid on a green leaf.',
    icon: '🥚',
    note: 'Tiny egg securely placed under leaves.'
  },
  {
    stepNumber: 2,
    title: 'The Caterpillar (Larva)',
    gujarati: 'ઈયળ (કેટરપિલર)',
    sentence: 'The egg hatches into a caterpillar, which eats fresh leaves eagerly.',
    icon: '🐛',
    note: 'Voracious eater preparing for growth.'
  },
  {
    stepNumber: 3,
    title: 'The Pupa / Cocoon',
    gujarati: 'પ્યુપા (કોશેટો)',
    sentence: 'Then the caterpillar becomes a pupa inside a protective cocoon.',
    icon: '🪵',
    note: 'Quiet transformation happening inside.'
  },
  {
    stepNumber: 4,
    title: 'The Beautiful Butterfly',
    gujarati: 'સુંદર પતંગિયું',
    sentence: 'After some time, a winged butterfly emerges! This process is called metamorphosis.',
    icon: '🦋',
    note: 'Wings dry up and it takes flight.'
  }
];

export const CONJUNCTION_QUESTIONS = [
  {
    id: 1,
    sentence: 'She is tired ________ she finished all her homework.',
    options: ['and', 'but', 'or', 'because', 'otherwise', 'so'],
    correct: 'but',
    gujarati: 'તે થાકેલી છે પરંતુ તેણે પોતાનું તમામ ગૃહકાર્ય પૂરું કર્યું.'
  },
  {
    id: 2,
    sentence: 'Would you like tea ________ coffee?',
    options: ['and', 'but', 'or', 'because', 'otherwise', 'so'],
    correct: 'or',
    gujarati: 'તમે ચા લેશો કે કોફી?'
  },
  {
    id: 3,
    sentence: 'He worked hard ________ he passed the exam.',
    options: ['and', 'but', 'or', 'because', 'otherwise', 'so'],
    correct: 'so',
    gujarati: 'તેણે સખત મહેનત કરી તેથી તે પરીક્ષામાં પાસ થયો.'
  },
  {
    id: 4,
    sentence: 'I didn’t go to school ________ I was sick.',
    options: ['and', 'but', 'or', 'because', 'otherwise', 'so'],
    correct: 'because',
    gujarati: 'હું શાળાએ ન ગયો કારણ કે હું બીમાર હતો.'
  },
  {
    id: 5,
    sentence: 'He took a stick ________ started walking.',
    options: ['and', 'but', 'or', 'because', 'otherwise', 'so'],
    correct: 'and',
    gujarati: 'તેણે લાકડી લીધી અને ચાલવાનું શરૂ કર્યું.'
  }
];

export const PUNCTUATION_CHALLENGES = [
  {
    id: 1,
    faulty: 'yesterday i went to the market i bought rice vegetables and milk',
    corrected: 'Yesterday, I went to the market. I bought rice, vegetables, and milk.',
    rules: 'Capitalize "Yesterday" and "I". Add commas for items in a list and a period between sentences.'
  },
  {
    id: 2,
    faulty: 'riya asked what are you doing',
    corrected: 'Riya asked, "What are you doing?"',
    rules: 'Capitalize proper noun "Riya", add quotation marks and question mark inside quotes.'
  },
  {
    id: 3,
    faulty: 'my brother lives in mumbai he works for a software company',
    corrected: 'My brother lives in Mumbai. He works for a software company.',
    rules: 'Capitalize "My", "Mumbai", "He", and add period between independent clauses.'
  },
  {
    id: 4,
    faulty: 'it is raining heavily please carry your umbrella',
    corrected: 'It is raining heavily. Please carry your umbrella.',
    rules: 'Capitalize "It" and "Please", add period.'
  },
  {
    id: 5,
    faulty: 'oh no i forgot to bring my notebook',
    corrected: 'Oh no! I forgot to bring my notebook.',
    rules: 'Capitalize "Oh" and "I", add exclamation mark after emotion.'
  }
];

export const PREPOSITION_CLASSROOM_ITEMS = [
  { id: 'pencil', name: 'Pencil', position: 'in the box', preposition: 'in', description: 'The pencil is in the box.' },
  { id: 'notebook', name: 'Notebook', position: 'in the bag', preposition: 'in', description: 'The notebook is in the bag.' },
  { id: 'hat', name: 'Hat', position: 'on the table', preposition: 'on', description: 'The hat is on the table.' },
  { id: 'ball', name: 'Football', position: 'under the table', preposition: 'under', description: 'The football is under the table.' },
  { id: 'duck', name: 'Rubber Duck', position: 'on the bookshelf', preposition: 'on', description: 'The duck is on the bookshelf.' },
  { id: 'clock', name: 'Wall Clock', position: 'on the wall above the desk', preposition: 'on', description: 'The clock is on the wall.' },
  { id: 'chair', name: 'Chair', position: 'behind the desk', preposition: 'behind', description: 'The chair is behind the desk.' }
];

export const PREPOSITION_CORRECTIONS = [
  {
    id: 1,
    wrong: 'My nose is in my eyes.',
    correct: 'My nose is between my eyes.',
    preposition: 'between',
    explanation: 'Your nose sits between your left eye and right eye!'
  },
  {
    id: 2,
    wrong: 'My teeth are on my mouth.',
    correct: 'My teeth are in my mouth.',
    preposition: 'in',
    explanation: 'Teeth are located inside the mouth.'
  },
  {
    id: 3,
    wrong: 'I am sitting on the fan.',
    correct: 'I am sitting under the fan.',
    preposition: 'under',
    explanation: 'The ceiling fan hangs above, so you sit under the fan!'
  },
  {
    id: 4,
    wrong: 'My friends are sitting in me.',
    correct: 'My friends are sitting beside me.',
    preposition: 'beside',
    explanation: 'Friends sit next to or beside you.'
  },
  {
    id: 5,
    wrong: 'The man is sleeping over the tree.',
    correct: 'The man is sleeping under the tree.',
    preposition: 'under',
    explanation: 'People sleep under the shade of a tree.'
  }
];

export const WATER_BODIES_ORDER = [
  { id: 'stream', name: 'Stream', gujarati: 'ઝરણું / નાનો પ્રવાહ', order: 1, sizeDescription: 'Small natural flow of water' },
  { id: 'fall', name: 'Waterfall', gujarati: 'ધોધ', order: 2, sizeDescription: 'Water falling from a height' },
  { id: 'pond', name: 'Pond', gujarati: 'તળાવડું', order: 3, sizeDescription: 'Small body of still water' },
  { id: 'lake', name: 'Lake', gujarati: 'મોટું સરોવર', order: 4, sizeDescription: 'Large inland body of water' },
  { id: 'river', name: 'River', gujarati: 'નદી', order: 5, sizeDescription: 'Large flowing freshwater current' },
  { id: 'ocean', name: 'Ocean', gujarati: 'મહાસાગર', order: 6, sizeDescription: 'Vast expanse of sea covering the globe' }
];

export const PICTURE_VOCAB_ITEMS = [
  {
    id: 'flood',
    word: 'flood',
    titleGujarati: 'પૂર (જળબંબાકાર)',
    definition: 'An overflow of a large amount of water beyond its normal limits.',
    imageUrl: '🌊🏠',
    description: 'Houses submerged in deep rainwater overflowing from rivers.'
  },
  {
    id: 'drought',
    word: 'drought',
    titleGujarati: 'દુષ્કાળ (અનાવૃષ્ટિ)',
    definition: 'A prolonged period of abnormally low rainfall, leading to dry cracked soil.',
    imageUrl: '☀️🏜️',
    description: 'Parched, cracked brown earth with zero water.'
  },
  {
    id: 'glacier',
    word: 'glacier',
    titleGujarati: 'હિમનદી (બરફનો પર્વત)',
    definition: 'A slowly moving mass or river of ice formed by the accumulation of snow.',
    imageUrl: '🏔️🧊',
    description: 'Towering icy blue glaciers in polar regions.'
  },
  {
    id: 'wet',
    word: 'wet',
    titleGujarati: 'ભીનું (પાણીવાળું)',
    definition: 'Covered or saturated with water or another liquid.',
    imageUrl: '🌧️👧',
    description: 'Girl smiling with raindrops and water splashing on face.'
  },
  {
    id: 'dry',
    word: 'dry',
    titleGujarati: 'સૂકું (પાણી વગરનું)',
    definition: 'Free from moisture or liquid; not wet.',
    imageUrl: '🏜️🍂',
    description: 'Arid desert sand and dried leaves.'
  }
];

export const ANIMALS_LIST: AnimalItem[] = [
  { id: '1', name: 'Cow', category: 'Domestic', icon: '🐄', gujarati: 'ગાય' },
  { id: '2', name: 'Dog', category: 'Domestic', icon: '🐕', gujarati: 'કૂતરો' },
  { id: '3', name: 'Cat', category: 'Domestic', icon: '🐈', gujarati: 'બિલાડી' },
  { id: '4', name: 'Goat', category: 'Domestic', icon: '🐐', gujarati: 'બકરી' },
  { id: '5', name: 'Buffalo', category: 'Domestic', icon: '🐃', gujarati: 'ભેંસ' },
  { id: '6', name: 'Horse', category: 'Domestic', icon: '🐎', gujarati: 'ઘોડો' },
  { id: '7', name: 'Sheep', category: 'Domestic', icon: '🐑', gujarati: 'ઘેટું' },
  
  { id: '8', name: 'Lion', category: 'Wild', icon: '🦁', gujarati: 'સિંહ' },
  { id: '9', name: 'Elephant', category: 'Wild', icon: '🐘', gujarati: 'હાથી' },
  { id: '10', name: 'Tiger', category: 'Wild', icon: '🐅', gujarati: 'વાઘ' },
  { id: '11', name: 'Deer', category: 'Wild', icon: '🦌', gujarati: 'હરણ' },
  { id: '12', name: 'Bear', category: 'Wild', icon: '🐻', gujarati: 'રીંછ' },
  { id: '13', name: 'Monkey', category: 'Wild', icon: '🐒', gujarati: 'વાંદરો' },

  { id: '14', name: 'Fish', category: 'Water', icon: '🐟', gujarati: 'માછલી' },
  { id: '15', name: 'Dolphin', category: 'Water', icon: '🐬', gujarati: 'ડોલ્ફિન' },
  { id: '16', name: 'Shark', category: 'Water', icon: '🦈', gujarati: 'શાર્ક' },
  { id: '17', name: 'Whale', category: 'Water', icon: '🐋', gujarati: 'વ્હેલ' },
  { id: '18', name: 'Turtle', category: 'Water', icon: '🐢', gujarati: 'કાચબો' },
  { id: '19', name: 'Octopus', category: 'Water', icon: '🐙', gujarati: 'ઓક્ટોપસ' },
  { id: '20', name: 'Crab', category: 'Water', icon: '🦀', gujarati: 'કરચલો' }
];

export const TONGUE_TWISTERS = [
  {
    id: 1,
    sentence: 'Red lorry, yellow lorry.',
    missingWord: 'yellow lorry',
    difficulty: 'Easy',
    tip: 'Say it 5 times as fast as possible!'
  },
  {
    id: 2,
    sentence: 'She sells seashells by the seashore.',
    missingWord: 'by the seashore',
    difficulty: 'Medium',
    tip: 'Distinguish the "sh" and "s" sounds cleanly!'
  },
  {
    id: 3,
    sentence: 'I scream, you scream, we all scream for ice cream!',
    missingWord: 'we all scream for ice cream',
    difficulty: 'Fun',
    tip: 'Keep the rhythm lively!'
  },
  {
    id: 4,
    sentence: 'Two tiny tigers take two taxis to town.',
    missingWord: 'two taxis to town',
    difficulty: 'Tricky',
    tip: 'Crisp "T" plosive sounds!'
  },
  {
    id: 5,
    sentence: 'Nina needs nine new notebooks.',
    missingWord: 'nine new notebooks',
    difficulty: 'Tricky',
    tip: 'Watch out for the repeated "N" sound!'
  },
  {
    id: 6,
    sentence: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
    missingWord: 'chuck if a woodchuck could chuck wood',
    difficulty: 'Master',
    tip: 'The classic English woodchuck riddle!'
  }
];

export const PASS_THE_BALL_PROMPTS = [
  { question: 'Name 3 places where we find water.', gujarati: 'પાણી મળતા હોય તેવા 3 સ્થળોના નામ આપો.' },
  { question: 'Name 3 rivers of India.', gujarati: 'ભારતની 3 મોટી નદીઓના નામ આપો.' },
  { question: 'Say 2 things water helps us do.', gujarati: 'પાણી આપણને કઈ 2 બાબતોમાં મદદ કરે છે?' },
  { question: 'Describe rain in two sentences.', gujarati: 'વરસાદનું બે વાક્યોમાં વર્ણન કરો.' },
  { question: 'Talk about your last time near water (beach, river, or rain).', gujarati: 'પાણી પાસે વિતાવેલ તમારા છેલ્લા અનુભવની વાત કરો.' },
  { question: 'Explain why water is important.', gujarati: 'પાણી શા માટે અત્યંત મહત્વનું છે તે સમજાવો.' },
  { question: 'Give one creative tip to save water every day.', gujarati: 'દરરોજ પાણી બચાવવા માટે એક સરસ ટીપ આપો.' },
  { question: 'Will you drink only juice or only water for a year?', gujarati: 'તમે એક વર્ષ સુધી ફક્ત જ્યુસ પીશો કે ફક્ત પાણી?' },
  { question: 'Can you live without water for one day or without electricity?', gujarati: 'તમે એક દિવસ પાણી વગર રહી શકો કે વીજળી વગર?' },
  { question: 'Do you prefer to drink warm water in winter or cold water in summer?', gujarati: 'શિયાળામાં ગરમ પાણી અને ઉનાળામાં ઠંડુ પાણી પીવું ગમે છે?' }
];

export const GLOSSARY_ITEMS: GlossaryWord[] = [
  {
    word: 'knock',
    gujarati: 'ખખડાવવાનો અવાજ / દરવાજો ઠોકવો',
    partOfSpeech: 'verb / noun',
    exampleSentence: 'Someone is knocking at the door.',
    definition: 'To strike a surface noisily to attract attention.'
  },
  {
    word: 'underground',
    gujarati: 'ભૂગર્ભ / જમીનની અંદર',
    partOfSpeech: 'adjective / adverb',
    exampleSentence: 'Parvatbhai built a large underground tank for rainwater.',
    definition: 'Situated beneath the surface of the ground.'
  },
  {
    word: 'conservation',
    gujarati: 'સંરક્ષણ / બચાવ અને જાળવણી',
    partOfSpeech: 'noun',
    exampleSentence: 'Vaari gave speeches on water conservation.',
    definition: 'Prevention of wasteful use of a resource.'
  },
  {
    word: 'necessity',
    gujarati: 'જરૂરિયાત / અનિવાર્યતા',
    partOfSpeech: 'noun',
    exampleSentence: 'Water is a necessity for all living beings.',
    definition: 'The fact of being required or indispensable.'
  },
  {
    word: 'gently',
    gujarati: 'નરમાશથી / ધીમેથી',
    partOfSpeech: 'adverb',
    exampleSentence: 'Saritaben gently advised Raju to save water.',
    definition: 'With a mild, kind, or tender manner.'
  },
  {
    word: 'plenty of',
    gujarati: 'પુષ્કળ / વિપુલ પ્રમાણમાં',
    partOfSpeech: 'phrase',
    exampleSentence: 'We have plenty of fresh water in the tank.',
    definition: 'A large or sufficient amount or quantity.'
  },
  {
    word: 'ignored',
    gujarati: 'અવગણના કરી / ધ્યાને ન લીધું',
    partOfSpeech: 'verb (past)',
    exampleSentence: 'Raju ignored little Zarana’s warning.',
    definition: 'Refused to take notice of or acknowledge.'
  },
  {
    word: 'terrible',
    gujarati: 'ભયંકર / વિકરાળ',
    partOfSpeech: 'adjective',
    exampleSentence: 'The village faced a terrible drought.',
    definition: 'Extremely bad or serious.'
  },
  {
    word: 'admitted',
    gujarati: 'સ્વીકાર્યું / કબૂલ કર્યું',
    partOfSpeech: 'verb (past)',
    exampleSentence: 'He admitted that he had been foolish.',
    definition: 'Confessed to be true or accepted blame.'
  },
  {
    word: 'drought',
    gujarati: 'દુષ્કાળ / અનાવૃષ્ટિ',
    partOfSpeech: 'noun',
    exampleSentence: 'Plants dried up during the long drought.',
    definition: 'A prolonged period of abnormally low rainfall.'
  },
  {
    word: 'approached',
    gujarati: 'સંપર્ક કર્યો / પાસે ગયા',
    partOfSpeech: 'verb (past)',
    exampleSentence: 'The villagers approached Parvatbhai for help.',
    definition: 'Came near or reached out to someone.'
  },
  {
    word: 'ashamed',
    gujarati: 'શરમાયેલા / પસ્તાવો થવો',
    partOfSpeech: 'adjective',
    exampleSentence: 'Ashamed, Raju confessed his mistake.',
    definition: 'Embarrassed or guilty because of one’s actions.'
  },
  {
    word: 'crisis',
    gujarati: 'કટોકટી / સંકટ',
    partOfSpeech: 'noun',
    exampleSentence: 'The District Collector came to inspect the water crisis.',
    definition: 'A time of intense difficulty, trouble, or danger.'
  },
  {
    word: 'guidance',
    gujarati: 'માર્ગદર્શન',
    partOfSpeech: 'noun',
    exampleSentence: 'Students asked the teacher for guidance.',
    definition: 'Advice or information aimed at resolving a problem.'
  },
  {
    word: 'to harvest rainwater',
    gujarati: 'વરસાદી પાણીનો સંગ્રહ કરવો',
    partOfSpeech: 'verb phrase',
    exampleSentence: 'Every family must harvest rainwater to prevent drought.',
    definition: 'Collecting and storing rainwater run-off for future use.'
  },
  {
    word: 'converted',
    gujarati: 'રૂપાંતર કર્યું / ફેરવ્યું',
    partOfSpeech: 'verb (past)',
    exampleSentence: 'Salty sea water is converted into fresh drinking water.',
    definition: 'Changed into a different form or character.'
  },
  {
    word: 'metamorphosis',
    gujarati: 'રૂપાંતરણ (શરીર રચનામાં ફેરફાર)',
    partOfSpeech: 'noun',
    exampleSentence: 'A caterpillar undergoes metamorphosis into a butterfly.',
    definition: 'The process of transformation from an immature form to an adult.'
  },
  {
    word: 'caterpillar',
    gujarati: 'ઈયળ',
    partOfSpeech: 'noun',
    exampleSentence: 'The caterpillar eats tender leaves.',
    definition: 'The larva of a butterfly or moth.'
  },
  {
    word: 'pupa',
    gujarati: 'પ્યુપા (પાંખ ફૂટતાં પહેલાંની સ્થિતિ)',
    partOfSpeech: 'noun',
    exampleSentence: 'The pupa remains still inside the cocoon.',
    definition: 'An insect in its inactive immature form between larva and adult.'
  },
  {
    word: 'cocoon',
    gujarati: 'કોશેટો',
    partOfSpeech: 'noun',
    exampleSentence: 'Silkworms spin a protective silk cocoon.',
    definition: 'A silky case spun by larvae for protection in the pupal stage.'
  },
  {
    word: 'glacier',
    gujarati: 'હિમનદી / બરફનો મોટો પર્વત',
    partOfSpeech: 'noun',
    exampleSentence: 'Glaciers melt slowly and feed fresh mountain rivers.',
    definition: 'A slowly moving mass or river of ice on mountains.'
  },
  {
    word: 'flood',
    gujarati: 'પૂર / રેલ',
    partOfSpeech: 'noun',
    exampleSentence: 'Heavy rains caused a flood in the town.',
    definition: 'An overflowing of a large amount of water beyond its normal confines.'
  },
  {
    word: 'gravel',
    gujarati: 'કાંકરી / કાંકરા',
    partOfSpeech: 'noun',
    exampleSentence: 'Layers of gravel and sand filter dirty water naturally.',
    definition: 'Small rounded stones used in water filtration and paths.'
  },
  {
    word: 'charcoal',
    gujarati: 'કોલસો',
    partOfSpeech: 'noun',
    exampleSentence: 'Activated charcoal absorbs impurities from water.',
    definition: 'A black porous carbon substance used for filtering.'
  },
  {
    word: 'RO (Reverse Osmosis)',
    gujarati: 'પાણીને શુદ્ધ કરવાની આધુનિક પ્રક્રિયા',
    partOfSpeech: 'abbreviation',
    exampleSentence: 'Many homes use an RO purifier for safe drinking water.',
    definition: 'A water purification process using a semi-permeable membrane.'
  },
  {
    word: 'pH (Potential of Hydrogen)',
    gujarati: 'એસિડિક કે આલ્કલાઇન હોવાનું માપ',
    partOfSpeech: 'noun',
    exampleSentence: 'Drinking water should have a neutral pH between 6.5 and 8.5.',
    definition: 'A scale specifying the acidity or basicity of an aqueous solution.'
  },
  {
    word: 'TDS (Total Dissolved Solids)',
    gujarati: 'પાણીમાં ઓગળેલા કુલ પદાર્થોનું માપ (TDS)',
    partOfSpeech: 'noun',
    exampleSentence: 'Ideal drinking water TDS ranges from 50 to 150 ppm.',
    definition: 'The total amount of mobile charged ions dissolved in water.'
  },
  {
    word: 'banned',
    gujarati: 'પ્રતિબંધિત / રોક લગાવેલી',
    partOfSpeech: 'adjective / verb',
    exampleSentence: 'Single-use plastic bags are banned to protect nature.',
    definition: 'Officially or legally prohibited.'
  }
];

export const DIY_EXPERIMENTS = [
  {
    id: 1,
    title: 'Testing TDS & pH of Drinking Water',
    titleGujarati: 'શાળા/ઘરના પાણીનું TDS અને pH માપવું',
    materials: ['TDS digital meter', 'pH paper strips from school lab', '3 water samples (tap, RO, borewell)'],
    steps: [
      'Collect 3 cups of water: from school tap, home RO, and a borewell or earthen pot.',
      'Dip the TDS meter probe into each cup. Note down the reading in ppm (parts per million). Ideal is 50-200 ppm.',
      'Dip a pH strip for 2 seconds. Compare the color with the indicator chart: Green/light blue means safe (6.5 - 8.0). Red/orange means acidic, deep purple means alkaline.',
      'Discuss your findings with your science teacher.'
    ]
  },
  {
    id: 2,
    title: 'Solar Salt Evaporation (How Sea Salt is Made)',
    titleGujarati: 'મીઠું બનાવવાનો પ્રયોગ (બાષ્પીભવન)',
    materials: ['Clear glass of water', '3-4 spoons of salt', 'Shallow plate or dish', 'Sunlight'],
    steps: [
      'Take a glass full of water and dissolve 3-4 full spoons of table salt until it disappears completely.',
      'Pour the salty water into a flat, shallow dish or plate.',
      'Keep the dish outside in direct bright sunlight for 2 to 3 sunny days.',
      'Observe what happens: The liquid water evaporates into the air as water vapor, leaving glistening white salt crystals behind! This is exactly how salt pans operate near coastal Gujarat.'
    ]
  },
  {
    id: 3,
    title: 'DIY 3-Layer Sand & Charcoal Water Filter',
    titleGujarati: 'રેતી, કાંકરી અને કોલસાથી પાણી ગાળવાનો પ્રયોગ',
    materials: ['Cut plastic bottle (inverted)', 'Cotton cloth', 'Fine sand', 'Crushed charcoal', 'Pebbles / Gravel', 'Muddy water'],
    steps: [
      'Cover the neck of an inverted plastic bottle with clean cotton cloth.',
      'Add a bottom layer of crushed charcoal (removes odors & toxins).',
      'Add a middle layer of clean fine sand (filters small dirt particles).',
      'Add a top layer of gravel or small stones (traps large floating debris).',
      'Pour muddy water through the top and watch noticeably clearer water drip into the bottom glass!'
    ]
  }
];
