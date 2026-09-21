import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Check, 
  ArrowRight,
  HelpCircle,
  Volume2
} from 'lucide-react';
import { 
  WATER_BODIES_ORDER, 
  PICTURE_VOCAB_ITEMS, 
  ANIMALS_LIST 
} from '../data/lessonData';
import { sound, speakText, speakGujarati } from '../utils/audio';
import { AnimalItem } from '../types';

interface Step7VocabularyProps {
  onComplete: () => void;
  isCompleted: boolean;
  onAddStar: (count?: number) => void;
  showGujarati: boolean;
}

export const Step7Vocabulary: React.FC<Step7VocabularyProps> = ({
  onComplete,
  isCompleted,
  onAddStar,
  showGujarati
}) => {
  const [activeTab, setActiveTab] = useState<'bodies' | 'pictures' | 'animals'>('bodies');

  // Water Bodies Arrange State
  const [currentBodiesOrder, setCurrentBodiesOrder] = useState<string[]>([
    'ocean', 'lake', 'stream', 'pond', 'river', 'fall'
  ]);
  const [bodiesEvaluated, setBodiesEvaluated] = useState<boolean | null>(null);

  // Picture Vocab Matcher State (glacier, drought, flood, wet, dry)
  const [pictureAnswers, setPictureAnswers] = useState<Record<string, string>>({});
  const [pictureEvaluated, setPictureEvaluated] = useState<boolean>(false);

  // Animals 3-Column Classification State (Domestic, Wild, Water)
  const [classifiedAnimals, setClassifiedAnimals] = useState<Record<string, 'Domestic' | 'Wild' | 'Water' | null>>({});
  const [activeAnimal, setActiveAnimal] = useState<AnimalItem | null>(null);
  const [animalsEvaluated, setAnimalsEvaluated] = useState<boolean>(false);

  // Water bodies reorder logic
  const handleMoveBody = (idx: number, dir: -1 | 1) => {
    if ((idx === 0 && dir === -1) || (idx === currentBodiesOrder.length - 1 && dir === 1)) return;
    const next = [...currentBodiesOrder];
    const temp = next[idx];
    next[idx] = next[idx + dir];
    next[idx + dir] = temp;
    setCurrentBodiesOrder(next);
    sound.playWaterDrop();
    setBodiesEvaluated(null);
  };

  const handleVerifyBodies = () => {
    // Expected order: stream (1) -> fall (2) -> pond (3) -> lake (4) -> river (5) -> ocean (6)
    const expected = ['stream', 'fall', 'pond', 'lake', 'river', 'ocean'];
    const isCorrect = currentBodiesOrder.every((id, i) => id === expected[i]);
    setBodiesEvaluated(isCorrect);
    if (isCorrect) {
      sound.playSuccess();
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  // Picture vocab selection
  const handleSelectPictureWord = (itemId: string, word: string) => {
    setPictureAnswers((prev) => ({ ...prev, [itemId]: word }));
  };

  const handleVerifyPictures = () => {
    let correct = 0;
    PICTURE_VOCAB_ITEMS.forEach((it) => {
      if (pictureAnswers[it.id] === it.word) {
        correct += 1;
      }
    });
    setPictureEvaluated(true);
    if (correct === PICTURE_VOCAB_ITEMS.length) {
      sound.playSuccess();
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  // Animal category assignment
  const handleAssignAnimal = (cat: 'Domestic' | 'Wild' | 'Water') => {
    if (!activeAnimal) return;
    setClassifiedAnimals((prev) => ({ ...prev, [activeAnimal.id]: cat }));
    sound.playWaterDrop();
    setActiveAnimal(null);
  };

  const handleVerifyAnimals = () => {
    let count = 0;
    ANIMALS_LIST.forEach((a) => {
      if (classifiedAnimals[a.id] === a.category) {
        count += 1;
      }
    });
    setAnimalsEvaluated(true);
    if (count === ANIMALS_LIST.length) {
      sound.playSuccess();
      onAddStar(3);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-sky-500/10 border border-teal-200 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
              <span>Textbook Page 9 & 10 • Vocabulary & Science</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Water Bodies, Pictures & Animal Classification
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Arrange water sources from smallest to largest, identify drought and flood phenomena, and classify 20 animals into Domestic, Wild, and Water habitats!
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mt-5 border-t border-teal-200/60 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bodies')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'bodies'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🌊 1. Water Bodies (Smaller to Bigger)
          </button>
          <button
            onClick={() => setActiveTab('pictures')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'pictures'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🖼️ 2. Picture Match (Glacier, Drought...)
          </button>
          <button
            onClick={() => setActiveTab('animals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'animals'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🐾 3. Classify the Animals (Page 10)
          </button>
        </div>
      </div>

      {/* TAB 1: WATER BODIES ORDER */}
      {activeTab === 'bodies' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                <span>Textbook Page 9 • Vocabulary A</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Arrange the water bodies in order of smaller to bigger
              </h3>
              <p className="text-xs text-slate-500">
                Words: <strong className="text-slate-800">ocean, river, pond, lake, stream, fall</strong>. Use arrows to order!
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentBodiesOrder(['ocean', 'lake', 'stream', 'pond', 'river', 'fall']);
                setBodiesEvaluated(null);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div className="space-y-2">
            {currentBodiesOrder.map((id, idx) => {
              const body = WATER_BODIES_ORDER.find((b) => b.id === id)!;
              return (
                <div 
                  key={id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-2xs hover:bg-slate-100/70 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{body.name}</span>
                        <button
                          type="button"
                          onClick={() => speakText(`${body.name}. ${body.sizeDescription}`)}
                          className="p-1 rounded-md text-teal-600 hover:bg-teal-50 hover:scale-110 transition-transform cursor-pointer"
                          title="Listen with Indian Voice (0.8x)"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        {showGujarati && (
                          <button
                            type="button"
                            onClick={() => speakGujarati(body.gujarati)}
                            className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
                            title="સાંભળો - શુદ્ધ ભારતીય મહિલા અવાજ (0.8x)"
                          >
                            <span>({body.gujarati})</span>
                            <Volume2 className="w-3 h-3 text-teal-600" />
                          </button>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{body.sizeDescription}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveBody(idx, -1)}
                      disabled={idx === 0}
                      className={`p-1.5 rounded-lg border text-xs font-bold ${
                        idx === 0 ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      ↑ Up
                    </button>
                    <button
                      onClick={() => handleMoveBody(idx, 1)}
                      disabled={idx === currentBodiesOrder.length - 1}
                      className={`p-1.5 rounded-lg border text-xs font-bold ${
                        idx === currentBodiesOrder.length - 1 ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      ↓ Down
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleVerifyBodies}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              Verify Scale Order
            </button>

            {bodiesEvaluated !== null && (
              <div className="text-xs sm:text-sm font-bold">
                {bodiesEvaluated ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Correct: Stream → Fall → Pond → Lake → River → Ocean!
                  </span>
                ) : (
                  <span className="text-rose-600">
                    Not quite! Remember: Stream is smallest, and Ocean is the largest!
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PICTURE VOCAB MATCH */}
      {activeTab === 'pictures' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              <span>Textbook Page 9 • Vocabulary B</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Select the appropriate word for each picture
            </h3>
            <p className="text-xs text-slate-500">
              Options: <span className="font-semibold text-teal-700">(glacier, drought, flood, wet, dry)</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PICTURE_VOCAB_ITEMS.map((item) => {
              const selected = pictureAnswers[item.id];
              const isCorrect = selected === item.word;

              return (
                <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3">
                  <div className="text-center py-4 bg-white rounded-xl border border-slate-200">
                    <span className="text-5xl">{item.imageUrl}</span>
                  </div>

                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <p className="text-xs text-slate-600 font-medium">
                        {item.description}
                      </p>
                      {showGujarati && (
                        <button
                          type="button"
                          onClick={() => speakGujarati(item.titleGujarati)}
                          className="text-[11px] text-teal-700 hover:text-teal-950 font-semibold mt-1 flex items-center gap-1 hover:underline cursor-pointer"
                          title="સાંભળો - શુદ્ધ ભારતીય મહિલા અવાજ (0.8x)"
                        >
                          <span>{item.titleGujarati}</span>
                          <Volume2 className="w-3 h-3 text-teal-600" />
                        </button>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => speakText(item.description)}
                      className="p-1 rounded-md text-teal-600 hover:bg-teal-50 hover:scale-110 transition-transform cursor-pointer shrink-0"
                      title="Listen description (0.8x)"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Identify word:
                    </label>
                    <select
                      value={selected || ''}
                      onChange={(e) => handleSelectPictureWord(item.id, e.target.value)}
                      className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="">-- Choose Word --</option>
                      {['glacier', 'drought', 'flood', 'wet', 'dry'].map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>

                    {pictureEvaluated && (
                      <div className="mt-2 text-xs font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Correct: {item.word}
                          </span>
                        ) : (
                          <span className="text-rose-600">
                            Answer: {item.word}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              onClick={handleVerifyPictures}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              Verify Picture Answers
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: ANIMAL CLASSIFICATION (PAGE 10) */}
      {activeTab === 'animals' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                <span>Textbook Page 10 • Classify the Animals</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Classify the 20 Animals: Domestic, Wild, Water
              </h3>
              <p className="text-xs text-slate-500">
                Click an animal in the pool, then assign it to Domestic, Wild, or Water Animals!
              </p>
            </div>
            <button
              onClick={() => {
                setClassifiedAnimals({});
                setActiveAnimal(null);
                setAnimalsEvaluated(false);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Animals
            </button>
          </div>

          {/* Animal Selector Pool */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Animal Pool (Click an animal to classify):
            </span>
            <div className="flex flex-wrap gap-2">
              {ANIMALS_LIST.map((animal) => {
                const assigned = classifiedAnimals[animal.id];
                const isSelected = activeAnimal?.id === animal.id;
                return (
                  <button
                    key={animal.id}
                    onClick={() => {
                      setActiveAnimal(animal);
                      speakText(animal.name);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs ring-2 ring-teal-300'
                        : assigned
                        ? 'bg-white text-slate-400 border-slate-200 opacity-60'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-teal-400'
                    }`}
                  >
                    <span>{animal.icon}</span>
                    <span>{animal.name}</span>
                    {showGujarati && (
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveAnimal(animal);
                          speakGujarati(animal.gujarati);
                        }}
                        className="text-[10px] text-teal-800 bg-teal-50/80 px-1 py-0.5 rounded hover:bg-teal-100 transition-colors cursor-pointer"
                        title="ગુજરાતી અવાજ સાંભળો (0.8x)"
                      >
                        {animal.gujarati}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {activeAnimal && (
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2 animate-fadeIn">
                <span className="text-xs font-bold text-teal-900">
                  Where does "{activeAnimal.name}" belong?
                </span>
                <button
                  onClick={() => handleAssignAnimal('Domestic')}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  🏡 Domestic Animals (પાલતુ)
                </button>
                <button
                  onClick={() => handleAssignAnimal('Wild')}
                  className="bg-rose-100 hover:bg-rose-200 text-rose-900 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  🌲 Wild Animals (જંગલી)
                </button>
                <button
                  onClick={() => handleAssignAnimal('Water')}
                  className="bg-sky-100 hover:bg-sky-200 text-sky-900 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  🌊 Water Animals (જળચર)
                </button>
              </div>
            )}
          </div>

          {/* 3 Categories Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Domestic */}
            <div className="bg-amber-50/40 border border-amber-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                  <span>🏡</span> Domestic Animals
                </h4>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  {Object.values(classifiedAnimals).filter((c) => c === 'Domestic').length}
                </span>
              </div>
              <div className="space-y-1.5 min-h-[140px]">
                {ANIMALS_LIST.filter((a) => classifiedAnimals[a.id] === 'Domestic').map((a) => (
                  <div key={a.id} className="p-2 bg-white rounded-lg border border-amber-100 text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>{a.icon}</span>
                      <span>{a.name}</span>
                    </span>
                    {animalsEvaluated && (
                      a.category === 'Domestic' ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="text-[10px] text-rose-600">Should be {a.category}</span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Wild */}
            <div className="bg-rose-50/40 border border-rose-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                <h4 className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
                  <span>🌲</span> Wild Animals
                </h4>
                <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  {Object.values(classifiedAnimals).filter((c) => c === 'Wild').length}
                </span>
              </div>
              <div className="space-y-1.5 min-h-[140px]">
                {ANIMALS_LIST.filter((a) => classifiedAnimals[a.id] === 'Wild').map((a) => (
                  <div key={a.id} className="p-2 bg-white rounded-lg border border-rose-100 text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>{a.icon}</span>
                      <span>{a.name}</span>
                    </span>
                    {animalsEvaluated && (
                      a.category === 'Wild' ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="text-[10px] text-rose-600">Should be {a.category}</span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Water */}
            <div className="bg-sky-50/40 border border-sky-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-200 pb-2">
                <h4 className="font-bold text-sky-900 text-sm flex items-center gap-1.5">
                  <span>🌊</span> Water Animals
                </h4>
                <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                  {Object.values(classifiedAnimals).filter((c) => c === 'Water').length}
                </span>
              </div>
              <div className="space-y-1.5 min-h-[140px]">
                {ANIMALS_LIST.filter((a) => classifiedAnimals[a.id] === 'Water').map((a) => (
                  <div key={a.id} className="p-2 bg-white rounded-lg border border-sky-100 text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>{a.icon}</span>
                      <span>{a.name}</span>
                    </span>
                    {animalsEvaluated && (
                      a.category === 'Water' ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="text-[10px] text-rose-600">Should be {a.category}</span>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              onClick={handleVerifyAnimals}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              Verify Animal Classification
            </button>
          </div>
        </div>
      )}

      {/* Completion Banner */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Step 7 Completed?
          </h4>
          <p className="text-xs text-slate-500">
            Next: Play "Pass the Ball" and challenge yourself with rapid Tongue Twisters on Page 10, 11 & 12!
          </p>
        </div>
        <button
          id="complete-step-7-btn"
          onClick={() => {
            sound.playSuccess();
            onAddStar(2);
            onComplete();
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            isCompleted
              ? 'bg-emerald-600 text-white'
              : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{isCompleted ? 'Completed (Step 7)' : 'Complete Step 7 & Continue'}</span>
        </button>
      </div>
    </div>
  );
};
