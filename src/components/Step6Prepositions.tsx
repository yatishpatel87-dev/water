import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Check, 
  Search, 
  Compass,
  AlertCircle
} from 'lucide-react';
import { PREPOSITION_CLASSROOM_ITEMS, PREPOSITION_CORRECTIONS } from '../data/lessonData';
import { sound, speakText } from '../utils/audio';

interface Step6PrepositionsProps {
  onComplete: () => void;
  isCompleted: boolean;
  onAddStar: (count?: number) => void;
  showGujarati: boolean;
}

export const Step6Prepositions: React.FC<Step6PrepositionsProps> = ({
  onComplete,
  isCompleted,
  onAddStar,
  showGujarati
}) => {
  const [activeTab, setActiveTab] = useState<'classroom' | 'corrections'>('classroom');

  // Classroom Quiz State
  const [activeItemIdx, setActiveItemIdx] = useState<number>(0);
  const [selectedPreposition, setSelectedPreposition] = useState<string | null>(null);
  const [classroomFeedback, setClassroomFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Silly Sentences Corrections State (Page 9 Exercise F)
  const [userCorrections, setUserCorrections] = useState<Record<number, string>>({});
  const [correctionsChecked, setCorrectionsChecked] = useState<boolean>(false);

  const currentItem = PREPOSITION_CLASSROOM_ITEMS[activeItemIdx];

  const handleSelectPreposition = (prep: string) => {
    setSelectedPreposition(prep);
    const isCorrect = prep.toLowerCase() === currentItem.preposition.toLowerCase();

    if (isCorrect) {
      sound.playSuccess();
      setClassroomFeedback({
        isCorrect: true,
        message: `Spot on! ${currentItem.description}`
      });
      speakText(currentItem.description);
      onAddStar(1);
    } else {
      sound.playWrong();
      setClassroomFeedback({
        isCorrect: false,
        message: `Look closely! The ${currentItem.name} is ${currentItem.position}. Try selecting "${currentItem.preposition}".`
      });
    }
  };

  const handleNextItem = () => {
    setSelectedPreposition(null);
    setClassroomFeedback(null);
    setActiveItemIdx((prev) => (prev + 1) % PREPOSITION_CLASSROOM_ITEMS.length);
  };

  const handleSelectSentencePreposition = (id: number, prep: string) => {
    setUserCorrections((prev) => ({ ...prev, [id]: prep }));
  };

  const handleVerifyCorrections = () => {
    let count = 0;
    PREPOSITION_CORRECTIONS.forEach((c) => {
      if (userCorrections[c.id] === c.preposition) {
        count += 1;
      }
    });
    setCorrectionsChecked(true);
    if (count >= 4) {
      sound.playSuccess();
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-indigo-500/10 border border-sky-200 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
              <span>Textbook Page 8 & 9 • Prepositions of Place</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Prepositions of Place (નામયોગી અવ્યય)
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Learn how to describe spatial positions using words like <code className="bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">in</code>, <code className="bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">on</code>, <code className="bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">under</code>, <code className="bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">between</code>, and <code className="bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">beside</code>.
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mt-5 border-t border-sky-200/60 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('classroom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'classroom'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🏫 1. Classroom Item Locator (Page 8)
          </button>
          <button
            onClick={() => setActiveTab('corrections')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'corrections'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            😂 2. Fix Silly Sentences (Page 9)
          </button>
        </div>
      </div>

      {/* TAB 1: CLASSROOM LOCATOR */}
      {activeTab === 'classroom' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Illustrated Classroom Scene Frame */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Classroom Scene (Page 8)
              </span>
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded">
                Item {activeItemIdx + 1} of {PREPOSITION_CLASSROOM_ITEMS.length}
              </span>
            </div>

            {/* Stylized Classroom Interior Box */}
            <div className="relative bg-gradient-to-b from-sky-100 via-sky-50 to-amber-100/50 rounded-2xl border-2 border-sky-200 p-6 min-h-[300px] flex flex-col justify-between overflow-hidden shadow-inner">
              {/* Back wall: Clock, Window & Blackboard */}
              <div className="flex items-center justify-between relative z-10">
                {/* Chalkboard */}
                <div className="bg-emerald-900 border-4 border-amber-900 rounded-lg p-2 text-white text-[11px] font-mono shadow-md w-36">
                  <div className="text-center font-bold border-b border-emerald-700 pb-1">Prepositions</div>
                  <div className="text-[9px] text-emerald-200 pt-1">in • on • under • between</div>
                </div>

                {/* Wall Clock */}
                <div className={`p-2 rounded-full border-2 border-amber-600 bg-white shadow-md text-center cursor-pointer transition-transform ${currentItem.id === 'clock' ? 'scale-115 ring-4 ring-sky-400' : ''}`}>
                  <span className="text-lg">🕒</span>
                </div>
              </div>

              {/* Middle: Teacher Desk with Hat, Duck, Pencil in box */}
              <div className="relative z-10 my-4 flex items-center justify-around">
                {/* Bookshelf with Rubber Duck */}
                <div className={`bg-amber-850 p-2 rounded-lg border border-amber-900 text-center ${currentItem.id === 'duck' ? 'ring-4 ring-sky-400' : ''}`}>
                  <span className="text-xl">🦆</span>
                  <span className="text-[9px] block text-amber-200 font-bold">Duck</span>
                </div>

                {/* Desk with Hat & Pencil Box */}
                <div className="bg-amber-700 border-2 border-amber-800 rounded-xl p-3 w-44 shadow-lg text-center relative">
                  <div className="flex items-center justify-around mb-1">
                    <span className={`text-xl transition-transform ${currentItem.id === 'hat' ? 'scale-125' : ''}`}>🎩</span>
                    <span className={`text-lg transition-transform ${currentItem.id === 'pencil' ? 'scale-125' : ''}`}>✏️📦</span>
                  </div>
                  <div className="text-[10px] text-amber-100 font-bold border-t border-amber-600 pt-1">
                    Teacher's Desk
                  </div>

                  {/* Under the desk: Football */}
                  <div className={`absolute -bottom-7 left-8 transition-transform ${currentItem.id === 'ball' ? 'scale-125 ring-2 ring-sky-400 rounded-full' : ''}`}>
                    <span className="text-2xl">⚽</span>
                  </div>
                </div>

                {/* School Bag with Notebook */}
                <div className={`bg-indigo-600 p-2 rounded-xl text-white shadow-md text-center ${currentItem.id === 'notebook' ? 'ring-4 ring-sky-400' : ''}`}>
                  <span className="text-xl">🎒📓</span>
                  <span className="text-[9px] block text-indigo-100 font-bold">School Bag</span>
                </div>
              </div>

              <div className="text-center text-xs font-semibold text-slate-500 bg-white/70 py-1 rounded-lg">
                Where is the <strong className="text-sky-700 font-bold">{currentItem.name}</strong> located?
              </div>
            </div>
          </div>

          {/* Right: Question & Preposition Buttons */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                Dialogue Practice (Student 1 & Student 2)
              </span>
              <h3 className="text-lg font-bold text-slate-800 mt-1">
                Student 1: “Where is the {currentItem.name}?”
              </h3>
              <p className="text-xs text-slate-500">
                Choose the correct preposition to complete Student 2's answer:
              </p>
            </div>

            {/* Answer builder preview */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base font-semibold text-slate-800">
              Student 2: “The {currentItem.name} is{' '}
              <span className="text-sky-700 font-extrabold underline decoration-2 decoration-sky-400">
                {selectedPreposition || '_______'}
              </span>{' '}
              {currentItem.position.replace(/^(in|on|under|behind|beside)\s+/i, '')}.”
            </div>

            {/* Preposition choices */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Preposition:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['in', 'on', 'under', 'between', 'behind', 'beside'].map((prep) => (
                  <button
                    key={prep}
                    onClick={() => handleSelectPreposition(prep)}
                    className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                      selectedPreposition === prep
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50'
                    }`}
                  >
                    {prep}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback alert */}
            {classroomFeedback && (
              <div className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 ${
                classroomFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
              }`}>
                {classroomFeedback.isCorrect ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                <span>{classroomFeedback.message}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleNextItem}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all active:scale-95"
              >
                Next Item in Classroom →
              </button>

              <span className="text-xs text-slate-400">
                {activeItemIdx + 1} / {PREPOSITION_CLASSROOM_ITEMS.length} Objects
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FIX SILLY SENTENCES (PAGE 9) */}
      {activeTab === 'corrections' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              <span>Textbook Page 9 • Exercise F</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Correct the Silly Sentences!
            </h3>
            <p className="text-xs text-slate-500">
              Read each logically incorrect sentence and pick the true preposition that makes physical sense!
            </p>
          </div>

          <div className="space-y-4">
            {PREPOSITION_CORRECTIONS.map((c) => {
              const selected = userCorrections[c.id];
              const isCorrect = selected === c.preposition;

              return (
                <div key={c.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-rose-600 line-through block">
                        ❌ {c.wrong}
                      </span>
                      <p className="font-bold text-slate-800 text-sm sm:text-base pt-0.5">
                        {c.correct.replace(c.preposition, '____')}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400">Correct preposition:</span>
                      {['between', 'in', 'under', 'beside', 'on'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectSentencePreposition(c.id, opt)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                            selected === opt
                              ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {correctionsChecked && (
                    <div className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                    }`}>
                      {isCorrect ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                      <span>{c.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              onClick={handleVerifyCorrections}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              Verify My Corrections
            </button>
          </div>
        </div>
      )}

      {/* Completion Banner */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Step 6 Completed?
          </h4>
          <p className="text-xs text-slate-500">
            Next: Water Bodies scale order & 3-way animal classification on Page 9 & 10!
          </p>
        </div>
        <button
          id="complete-step-6-btn"
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
          <span>{isCompleted ? 'Completed (Step 6)' : 'Complete Step 6 & Continue'}</span>
        </button>
      </div>
    </div>
  );
};
