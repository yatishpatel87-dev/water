import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Check, 
  ArrowRight,
  Lightbulb,
  FileText,
  Volume2
} from 'lucide-react';
import { CONJUNCTION_QUESTIONS, PUNCTUATION_CHALLENGES } from '../data/lessonData';
import { sound, speakText, speakGujarati } from '../utils/audio';

interface Step5GrammarProps {
  onComplete: () => void;
  isCompleted: boolean;
  onAddStar: (count?: number) => void;
  showGujarati: boolean;
}

export const Step5Grammar: React.FC<Step5GrammarProps> = ({
  onComplete,
  isCompleted,
  onAddStar,
  showGujarati
}) => {
  const [activeTab, setActiveTab] = useState<'conjunctions' | 'sentences' | 'punctuation'>('conjunctions');

  // Conjunction fill-in-the-blank state
  const [userConjunctions, setUserConjunctions] = useState<Record<number, string>>({});
  const [isConjunctionChecked, setIsConjunctionChecked] = useState<boolean>(false);

  // Make sentence interactive completion state
  const [sentenceCompletions, setSentenceCompletions] = useState<Record<number, string>>({
    1: 'she went to the hospital to rest.',
    2: 'we can watch a cricket match at home.',
    3: 'they are not ripe yet.',
    4: 'she lost her favourite pencil.',
    5: 'he lives a very simple life.'
  });

  // Punctuation interactive state
  const [revealedPunctuation, setRevealedPunctuation] = useState<Record<number, boolean>>({});

  const handleSelectConjunction = (id: number, option: string) => {
    setUserConjunctions((prev) => ({ ...prev, [id]: option }));
  };

  const handleVerifyConjunctions = () => {
    let correctCount = 0;
    CONJUNCTION_QUESTIONS.forEach((q) => {
      if (userConjunctions[q.id] === q.correct) {
        correctCount += 1;
      }
    });
    setIsConjunctionChecked(true);
    if (correctCount === CONJUNCTION_QUESTIONS.length) {
      sound.playSuccess();
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  const toggleRevealPunctuation = (id: number) => {
    setRevealedPunctuation((prev) => {
      const next = !prev[id];
      if (next) sound.playWaterDrop();
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-sky-500/10 border border-purple-200 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
              <span>Textbook Page 7 & 8 • Language Function</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Conjunctions & Punctuation Workshop
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Master the art of joining sentences using: <code className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">and</code>, <code className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">but</code>, <code className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">or</code>, <code className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">because</code>, <code className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">so</code>, and <code className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">yet</code>.
            </p>
            {showGujarati && (
              <p className="text-xs text-purple-700 font-medium mt-1">
                બે વાક્યોને યોગ્ય રીતે જોડતા સંયોજકો (Conjunctions) અને વિરામચિહ્નો (Punctuation) શીખો.
              </p>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-5 border-t border-purple-200/60 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('conjunctions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'conjunctions'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🧩 1. Conjunction Fill-in-Blanks
          </button>
          <button
            onClick={() => setActiveTab('sentences')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'sentences'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            ✍️ 2. Make Sentences (Page 8)
          </button>
          <button
            onClick={() => setActiveTab('punctuation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'punctuation'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🔤 3. Correct Punctuation & Caps
          </button>
        </div>
      </div>

      {/* TAB 1: CONJUNCTIONS EXERCISE */}
      {activeTab === 'conjunctions' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-800">
              Fill in the blanks using the correct options:
            </h3>
            <p className="text-xs text-slate-500">
              Options pool: <span className="font-semibold text-purple-700">(and, but, or, because, otherwise, so)</span>
            </p>
          </div>

          <div className="space-y-4">
            {CONJUNCTION_QUESTIONS.map((q) => {
              const selected = userConjunctions[q.id];
              const isCorrect = selected === q.correct;

              return (
                <div 
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isConjunctionChecked
                      ? isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-rose-50/60 border-rose-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">
                          {q.id}
                        </span>
                        <p className="font-bold text-slate-800 text-sm sm:text-base">
                          {q.sentence.split('________')[0]}
                          <span className={`inline-block px-2.5 py-0.5 mx-1.5 rounded-lg border font-mono text-sm ${
                            selected
                              ? 'bg-white border-purple-400 text-purple-800 font-bold'
                              : 'bg-slate-200 border-dashed border-slate-300 text-slate-400'
                          }`}>
                            {selected || '________'}
                          </span>
                          {q.sentence.split('________')[1]}
                        </p>
                        <button
                          type="button"
                          onClick={() => speakText(q.sentence.replace('________', selected || q.correct))}
                          className="p-1 rounded-md text-purple-600 hover:bg-purple-100 hover:scale-110 transition-transform cursor-pointer"
                          title="Listen with Indian Voice (0.8x)"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {showGujarati && (
                        <div className="flex items-center gap-1.5 pl-7">
                          <p className="text-xs text-slate-500">
                            {q.gujarati}
                          </p>
                          <button
                            type="button"
                            onClick={() => speakGujarati(q.gujarati)}
                            className="p-0.5 text-purple-600 hover:text-purple-900 rounded cursor-pointer"
                            title="સાંભળો - શુદ્ધ ભારતીય મહિલા અવાજ (0.8x)"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Option buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 shrink-0 pl-7 sm:pl-0">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectConjunction(q.id, opt)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                            selected === opt
                              ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {isConjunctionChecked && (
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs">
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                      <span className={isCorrect ? 'text-emerald-800 font-bold' : 'text-rose-800 font-bold'}>
                        {isCorrect ? `Correct choice!` : `Correct answer is "${q.correct}".`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              onClick={handleVerifyConjunctions}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              Verify My Conjunctions
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: MAKE SENTENCES (PAGE 8) */}
      {activeTab === 'sentences' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              <span>Textbook Page 8 • Exercise C</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Make Sentences Using Connectors
            </h3>
            <p className="text-xs text-slate-500">
              Complete each sentence logically using the provided conjunction!
            </p>
          </div>

          <div className="space-y-4">
            {[
              { id: 1, starter: 'Neha was ill so', connector: 'so' },
              { id: 2, starter: 'You can go to cinema or', connector: 'or' },
              { id: 3, starter: 'Pratham likes the mangoes but', connector: 'but' },
              { id: 4, starter: 'Heer is crying because', connector: 'because' },
              { id: 5, starter: 'He has a lot of money yet', connector: 'yet' }
            ].map((item) => (
              <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">
                    {item.id}
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    {item.starter}
                  </span>
                  <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                    [{item.connector}]
                  </span>
                </div>

                <div className="pl-7">
                  <input
                    type="text"
                    value={sentenceCompletions[item.id] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSentenceCompletions((prev) => ({ ...prev, [item.id]: val }));
                    }}
                    placeholder="Type a meaningful clause to complete..."
                    className="w-full text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Full sentence: <em>{item.starter} {sentenceCompletions[item.id]}</em></span>
                    <button
                      onClick={() => speakText(`${item.starter} ${sentenceCompletions[item.id]}`)}
                      className="text-purple-600 hover:text-purple-800 font-bold hover:underline"
                    >
                      🔊 Listen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PUNCTUATION & CAPITALISATION */}
      {activeTab === 'punctuation' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              <span>Textbook Page 7 • Practice C</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Correct Punctuation and Capitalisation
            </h3>
            <p className="text-xs text-slate-500">
              Inspect the raw faulty sentences, observe missing capitals and periods/commas, then click "Reveal Correction".
            </p>
          </div>

          <div className="space-y-4">
            {PUNCTUATION_CHALLENGES.map((item) => {
              const isRevealed = revealedPunctuation[item.id];
              return (
                <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded uppercase tracking-wider">
                        Uncorrected Text
                      </span>
                      <p className="font-mono text-xs sm:text-sm text-slate-800 pt-1">
                        "{item.faulty}"
                      </p>
                    </div>

                    <button
                      onClick={() => toggleRevealPunctuation(item.id)}
                      className="text-xs font-bold text-purple-600 hover:text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-lg shrink-0 transition-colors"
                    >
                      {isRevealed ? 'Hide Solution' : 'Reveal Solution 👁️'}
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="bg-white border border-emerald-200 rounded-xl p-3.5 space-y-1.5 animate-fadeIn">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Properly Punctuated:</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pl-5">
                        <p className="font-semibold text-sm text-slate-900">
                          "{item.corrected}"
                        </p>
                        <button
                          type="button"
                          onClick={() => speakText(item.corrected)}
                          className="text-xs font-bold text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded flex items-center gap-1 shrink-0 transition-colors"
                          title="Listen with Indian Voice (0.8x)"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Listen
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 pl-5 pt-1 border-t border-slate-100">
                        <span className="font-bold">Rules applied: </span>
                        {item.rules}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Completion Banner */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Step 5 Completed?
          </h4>
          <p className="text-xs text-slate-500">
            Next: Explore the interactive classroom and Prepositions of Place on Page 8 & 9!
          </p>
        </div>
        <button
          id="complete-step-5-btn"
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
          <span>{isCompleted ? 'Completed (Step 5)' : 'Complete Step 5 & Continue'}</span>
        </button>
      </div>
    </div>
  );
};
