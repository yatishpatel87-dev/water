import React, { useState } from 'react';
import { 
  Volume2, 
  CheckCircle, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Check, 
  ArrowRight,
  Droplet
} from 'lucide-react';
import { READING_PASSAGE } from '../data/lessonData';
import { sound, speakText, speakEnglish, speakGujarati } from '../utils/audio';
import { CategorizeItem } from '../types';

interface Step3ReadingProps {
  onComplete: () => void;
  isCompleted: boolean;
  onAddStar: (count?: number) => void;
  showGujarati: boolean;
}

export const Step3Reading: React.FC<Step3ReadingProps> = ({
  onComplete,
  isCompleted,
  onAddStar,
  showGujarati
}) => {
  const [activeTab, setActiveTab] = useState<'passage' | 'sort' | 'match' | 'mindmap'>('passage');

  // Sorting state (Home, Agriculture, Industry)
  const [categorizedItems, setCategorizedItems] = useState<Record<string, 'Home' | 'Agriculture' | 'Industry' | null>>({});
  const [activeUnassignedItem, setActiveUnassignedItem] = useState<CategorizeItem | null>(null);
  const [sortEvaluated, setSortEvaluated] = useState<boolean>(false);

  // Match A with B state
  const [selectedMatches, setSelectedMatches] = useState<Record<number, string>>({});
  const [matchEvaluated, setMatchEvaluated] = useState<boolean>(false);

  // Mind map active branch
  const [activeBranchIdx, setActiveBranchIdx] = useState<number>(0);

  // Read aloud helper
  const handleRead = (text: string) => {
    speakText(text, { rate: 0.8 });
  };

  // Sorter assignment
  const handleAssignCategory = (cat: 'Home' | 'Agriculture' | 'Industry') => {
    if (!activeUnassignedItem) return;
    setCategorizedItems((prev) => ({
      ...prev,
      [activeUnassignedItem.id]: cat
    }));
    sound.playWaterDrop();
    setActiveUnassignedItem(null);
  };

  const handleEvaluateSorting = () => {
    let correctCount = 0;
    READING_PASSAGE.categories.forEach((item) => {
      if (categorizedItems[item.id] === item.category) {
        correctCount += 1;
      }
    });
    setSortEvaluated(true);
    if (correctCount === READING_PASSAGE.categories.length) {
      sound.playSuccess();
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  const handleResetSorting = () => {
    setCategorizedItems({});
    setActiveUnassignedItem(null);
    setSortEvaluated(false);
  };

  // Match A with B assignment
  const handleSelectMatch = (pairId: number, letterOption: string) => {
    setSelectedMatches((prev) => ({ ...prev, [pairId]: letterOption }));
  };

  const handleEvaluateMatches = () => {
    // Correct mappings: 1 -> 'grow crops', 2 -> 'water activity', 3 -> 'live in water', 4 -> 'dirty water', 5 -> 'saves water'
    let correct = 0;
    READING_PASSAGE.matchPairs.forEach((p) => {
      if (selectedMatches[p.id] === p.itemB) {
        correct += 1;
      }
    });
    setMatchEvaluated(true);
    if (correct === READING_PASSAGE.matchPairs.length) {
      sound.playSuccess();
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-teal-500/10 border border-sky-200 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
              <span>Textbook Pages 4, 5 & 6 • Reading Comprehension</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Passage: “Water is Life” <span className="text-sky-600 font-normal">| જળ એ જ જીવન</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Understand the sources, global uses, and vital importance of protecting water from pollution and wastage.
            </p>
          </div>

          <button
            onClick={() => handleRead(READING_PASSAGE.text)}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Read Full Passage</span>
          </button>
        </div>

        {/* Sub navigation tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-sky-200/60 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('passage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'passage'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            📖 Read Passage
          </button>
          <button
            onClick={() => setActiveTab('sort')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'sort'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🗂️ 3-Group Uses Sorter (Page 5)
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'match'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🔗 Match A with B
          </button>
          <button
            onClick={() => setActiveTab('mindmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'mindmap'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🌐 Interactive Water Mind Map (Page 6)
          </button>
        </div>
      </div>

      {/* TAB 1: PASSAGE READER */}
      {activeTab === 'passage' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-base">
              Textbook Reading Passage
            </h3>
            <span className="text-xs text-slate-500 font-medium">Click any paragraph to listen</span>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <div 
              onClick={() => handleRead("Water is one of the most important things on the Earth. All living beings - humans, animals, and plants need water to live. We use water every day for drinking, cooking, bathing, cleaning etc.")}
              className="p-4 rounded-xl hover:bg-sky-50/50 border border-transparent hover:border-sky-200 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <p>
                  Water is one of the most important things on the Earth. All living beings - humans, animals, and plants need water to live. We use water every day for drinking, cooking, bathing, cleaning etc.
                </p>
                <Volume2 className="w-4 h-4 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </div>
            </div>

            <div 
              onClick={() => handleRead("The primary sources of water are rainwater, surface water like rivers, ponds, lakes, glacier, oceans and groundwater. We get water from water tanks, dams and hand pumps. Also salty sea water is converted into drinking water at some places.")}
              className="p-4 rounded-xl hover:bg-sky-50/50 border border-transparent hover:border-sky-200 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <p>
                  The primary sources of water are <strong>rainwater, surface water (rivers, ponds, lakes, glacier, oceans etc.) and groundwater</strong>. We get water from water tanks, dams and hand pumps. Also salty sea water is converted into drinking water at some places.
                </p>
                <Volume2 className="w-4 h-4 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </div>
            </div>

            <div 
              onClick={() => handleRead("The farmers need water to grow crops. Industries use water to make goods and to keep machines cool. There are so many water activities like swimming, boating, rafting, pool games etc. Many creatures like fish, frogs, and whales live in water.")}
              className="p-4 rounded-xl hover:bg-sky-50/50 border border-transparent hover:border-sky-200 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <p>
                  The <strong>farmers</strong> need water to grow crops. <strong>Industries</strong> use water to make goods and to keep machines cool. There are so many water activities like <em>swimming, boating, rafting, pool games</em> etc. Many creatures like fish, frogs, and whales live in water. Water also helps keep the weather cool.
                </p>
                <Volume2 className="w-4 h-4 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </div>
            </div>

            <div 
              onClick={() => handleRead("Unfortunately, some people make water dirty by throwing garbage and releasing factory chemicals into it. This is called water pollution. The level of water on the earth is decreasing. We must save water by turning off taps, fixing leakages, and using water carefully. Water is life. We cannot produce water but we can save it.")}
              className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 rounded-xl cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-2">
                  <p className="text-amber-950 font-medium">
                    Unfortunately, some people make water dirty by throwing garbage and releasing factory chemicals into it. This is called <strong>water pollution</strong>.
                  </p>
                  <p className="text-amber-950 font-medium">
                    The level of water on the earth is decreasing. We must save water by turning off taps, fixing leakages, and using water carefully.
                  </p>
                  <p className="font-bold text-sky-900 italic text-base pt-1">
                    “Water is life. We cannot produce water but we can save it.”
                  </p>
                </div>
                <Volume2 className="w-4 h-4 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 3-GROUP USES SORTER (PAGE 5) */}
      {activeTab === 'sort' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                <span>Textbook Page 5 • Practice C</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Put these water uses into three groups
              </h3>
              <p className="text-xs text-slate-500">
                Click an item below, then choose whether it belongs to <strong>Home</strong>, <strong>Agriculture</strong>, or <strong>Industry</strong>.
              </p>
            </div>
            <button
              onClick={handleResetSorting}
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sorter</span>
            </button>
          </div>

          {/* Unassigned Items Pool */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Select an item to categorize:
            </span>
            <div className="flex flex-wrap gap-2">
              {READING_PASSAGE.categories.map((item) => {
                const currentCat = categorizedItems[item.id];
                const isSelected = activeUnassignedItem?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveUnassignedItem(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs ring-2 ring-sky-300'
                        : currentCat
                        ? 'bg-white text-slate-500 border-slate-200 opacity-60'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-sky-400 hover:shadow-2xs'
                    }`}
                  >
                    <span>{item.name}</span>
                    {showGujarati && <span className="text-[10px] text-slate-400 block">{item.gujarati}</span>}
                  </button>
                );
              })}
            </div>

            {/* If an item is active, show target bucket buttons */}
            {activeUnassignedItem && (
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-sky-800">
                  Assign "{activeUnassignedItem.name}" to:
                </span>
                <button
                  onClick={() => handleAssignCategory('Home')}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  🏠 Home (ઘર)
                </button>
                <button
                  onClick={() => handleAssignCategory('Agriculture')}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  🌾 Agriculture (ખેતી)
                </button>
                <button
                  onClick={() => handleAssignCategory('Industry')}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  🏭 Industry (ઉદ્યોગ)
                </button>
              </div>
            )}
          </div>

          {/* Three Categorized Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Home Column */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                  <span>🏠</span> Home (ઘરગથ્થુ)
                </h4>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {Object.values(categorizedItems).filter((c) => c === 'Home').length}
                </span>
              </div>
              <div className="space-y-1.5 min-h-[120px]">
                {READING_PASSAGE.categories.filter((it) => categorizedItems[it.id] === 'Home').map((it) => {
                  const isCorrect = it.category === 'Home';
                  return (
                    <div 
                      key={it.id} 
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-between border ${
                        sortEvaluated
                          ? isCorrect
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                          : 'bg-white text-slate-700 border-emerald-100'
                      }`}
                    >
                      <span>{it.name}</span>
                      {sortEvaluated && (isCorrect ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <span className="text-[10px] text-rose-600">Should be {it.category}</span>)}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Agriculture Column */}
            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                  <span>🌾</span> Agriculture (ખેતીવાડી)
                </h4>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  {Object.values(categorizedItems).filter((c) => c === 'Agriculture').length}
                </span>
              </div>
              <div className="space-y-1.5 min-h-[120px]">
                {READING_PASSAGE.categories.filter((it) => categorizedItems[it.id] === 'Agriculture').map((it) => {
                  const isCorrect = it.category === 'Agriculture';
                  return (
                    <div 
                      key={it.id} 
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-between border ${
                        sortEvaluated
                          ? isCorrect
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                          : 'bg-white text-slate-700 border-amber-100'
                      }`}
                    >
                      <span>{it.name}</span>
                      {sortEvaluated && (isCorrect ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <span className="text-[10px] text-rose-600">Should be {it.category}</span>)}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Industry Column */}
            <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                <h4 className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                  <span>🏭</span> Industry (ઉદ્યોગ)
                </h4>
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {Object.values(categorizedItems).filter((c) => c === 'Industry').length}
                </span>
              </div>
              <div className="space-y-1.5 min-h-[120px]">
                {READING_PASSAGE.categories.filter((it) => categorizedItems[it.id] === 'Industry').map((it) => {
                  const isCorrect = it.category === 'Industry';
                  return (
                    <div 
                      key={it.id} 
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-between border ${
                        sortEvaluated
                          ? isCorrect
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                          : 'bg-white text-slate-700 border-blue-100'
                      }`}
                    >
                      <span>{it.name}</span>
                      {sortEvaluated && (isCorrect ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <span className="text-[10px] text-rose-600">Should be {it.category}</span>)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              onClick={handleEvaluateSorting}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              Verify My Categories
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: MATCH A WITH B (PAGE 5) */}
      {activeTab === 'match' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              <span>Textbook Page 5 • Practice D</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Match Column ‘A’ with Column ‘B’
            </h3>
            <p className="text-xs text-slate-500">
              Connect each subject on the left with its matching action or definition on the right.
            </p>
          </div>

          <div className="space-y-3">
            {READING_PASSAGE.matchPairs.map((pair) => {
              const currentVal = selectedMatches[pair.id];
              const isCorrect = currentVal === pair.itemB;

              return (
                <div 
                  key={pair.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center">
                      {pair.id}
                    </span>
                    <span className="font-bold text-slate-800 text-sm">
                      {pair.itemA}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">matches with:</span>
                    <select
                      value={currentVal || ''}
                      onChange={(e) => handleSelectMatch(pair.id, e.target.value)}
                      className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      <option value="">-- Choose Match --</option>
                      {READING_PASSAGE.matchPairs.map((opt) => (
                        <option key={opt.itemB} value={opt.itemB}>
                          {opt.itemB}
                        </option>
                      ))}
                    </select>

                    {matchEvaluated && (
                      isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <span className="text-xs font-bold text-rose-600">({pair.itemB})</span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              onClick={handleEvaluateMatches}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              Verify Matches
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE WATER MIND MAP (PAGE 6) */}
      {activeTab === 'mindmap' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              <span>Textbook Page 6 • Activity F</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Interactive Water Mind Map
            </h3>
            <p className="text-xs text-slate-500">
              Click any of the 5 key branches radiating from "Water" to view and master its core concepts.
            </p>
          </div>

          {/* Mind map visual hub */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Hub Branches Selector */}
            <div className="lg:col-span-5 space-y-2">
              <div className="bg-sky-500 text-white font-bold p-3.5 rounded-xl text-center shadow-xs flex items-center justify-center gap-2">
                <Droplet className="w-5 h-5 fill-current animate-bounce" />
                <span className="text-base">Center: WATER (જળ)</span>
              </div>

              <div className="space-y-2 pt-2">
                {READING_PASSAGE.mindMapNodes.branches.map((b, idx) => {
                  const isSelected = activeBranchIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveBranchIdx(idx);
                        sound.playWaterDrop();
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 shadow-xs ring-2 ring-sky-300'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-slate-800 text-xs sm:text-sm block">
                          {b.title}
                        </span>
                        {showGujarati && (
                          <span className="text-[11px] text-slate-500">
                            {b.titleGujarati}
                          </span>
                        )}
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-sky-600 translate-x-1' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Branch Details Box */}
            <div className="lg:col-span-7 bg-gradient-to-br from-sky-50 to-blue-50/40 border border-sky-200 rounded-2xl p-6 shadow-xs min-h-[300px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-sky-200/80 pb-3 mb-4">
                  <h4 className="font-bold text-slate-800 text-base">
                    {READING_PASSAGE.mindMapNodes.branches[activeBranchIdx].title}
                  </h4>
                  <span className="text-xs font-semibold text-sky-700 bg-sky-100 px-2.5 py-1 rounded-md">
                    {READING_PASSAGE.mindMapNodes.branches[activeBranchIdx].items.length} Concepts
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {READING_PASSAGE.mindMapNodes.branches[activeBranchIdx].items.map((it, i) => (
                    <div 
                      key={i}
                      className="bg-white/95 border border-sky-100 p-3 rounded-xl shadow-2xs text-xs font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-sky-200/60 text-xs text-slate-500 flex items-center justify-between">
                <span>Part of Unit 1 Mind Mapping curriculum</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakEnglish(READING_PASSAGE.mindMapNodes.branches[activeBranchIdx].items.join(', '))}
                    className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 cursor-pointer"
                    title="Read in English (0.8x)"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Read Words
                  </button>
                  {showGujarati && (
                    <button
                      onClick={() => speakGujarati(READING_PASSAGE.mindMapNodes.branches[activeBranchIdx].titleGujarati)}
                      className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 cursor-pointer"
                      title="શુદ્ધ ગુજરાતી ઉચ્ચાર સાંભળો"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-teal-600" /> શુદ્ધ ઉચ્ચાર
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Banner */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Step 3 Completed?
          </h4>
          <p className="text-xs text-slate-500">
            Next: Explore Metamorphosis and the butterfly life cycle on Page 6 & 7!
          </p>
        </div>
        <button
          id="complete-step-3-btn"
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
          <span>{isCompleted ? 'Completed (Step 3)' : 'Complete Step 3 & Continue'}</span>
        </button>
      </div>
    </div>
  );
};
