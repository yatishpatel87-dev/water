import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Search, 
  FlaskConical, 
  BookOpen, 
  Check, 
  HelpCircle, 
  ArrowRight,
  Layers,
  RotateCcw
} from 'lucide-react';
import { GLOSSARY_ITEMS, DIY_EXPERIMENTS } from '../data/lessonData';
import { sound, speakText, speakEnglish, speakGujarati } from '../utils/audio';

interface Step9GlossaryLabProps {
  onComplete: () => void;
  isCompleted: boolean;
  onAddStar: (count?: number) => void;
  showGujarati: boolean;
}

export const Step9GlossaryLab: React.FC<Step9GlossaryLabProps> = ({
  onComplete,
  isCompleted,
  onAddStar,
  showGujarati
}) => {
  const [activeTab, setActiveTab] = useState<'glossary' | 'flashcards' | 'diy'>('glossary');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Flashcard mode state
  const [flashcardIdx, setFlashcardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Filtered glossary list
  const filteredGlossary = GLOSSARY_ITEMS.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.word.toLowerCase().includes(term) ||
      item.gujarati.toLowerCase().includes(term) ||
      item.definition.toLowerCase().includes(term)
    );
  });

  const currentFlashcard = GLOSSARY_ITEMS[flashcardIdx];

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIdx((prev) => (prev + 1) % GLOSSARY_ITEMS.length);
    sound.playWaterDrop();
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIdx((prev) => (prev - 1 + GLOSSARY_ITEMS.length) % GLOSSARY_ITEMS.length);
    sound.playWaterDrop();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10 border border-blue-200 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
              <span>Textbook Page 12 • Glossary & Do It Yourself</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Bilingual English-Gujarati Glossary & Science Lab
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Master all 26+ key textbook words with authentic pronunciation, Gujarati translations, flashcards, and hands-on science experiments!
            </p>
          </div>
        </div>

        {/* Sub tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-blue-200/60 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'glossary'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            📚 1. Complete Dictionary (26 Words)
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'flashcards'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🎴 2. Memory Flashcards
          </button>
          <button
            onClick={() => setActiveTab('diy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'diy'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🔬 3. DIY Science Lab (TDS, Salt, Filter)
          </button>
        </div>
      </div>

      {/* TAB 1: GLOSSARY SEARCH & TABLE */}
      {activeTab === 'glossary' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search English word or Gujarati meaning..."
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredGlossary.length} of {GLOSSARY_ITEMS.length} Words
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[550px] overflow-y-auto pr-1">
            {filteredGlossary.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 space-y-2 hover:border-blue-300 hover:bg-white transition-all shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-base text-blue-900 block capitalize">
                      {item.word}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 block">
                      {item.gujarati}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => speakEnglish(item.word)}
                      className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                      title="Pronounce English (Pure Indian Female Voice 0.8x)"
                    >
                      <span>EN</span>
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => speakGujarati(item.gujarati)}
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                      title="શુદ્ધ ભારતીય મહિલા અવાજમાં ગુજરાતી ઉચ્ચાર સાંભળો (0.8x)"
                    >
                      <span>ગુજ</span>
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-600">
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded mr-1">
                    {item.partOfSpeech}
                  </span>
                  <span>{item.definition}</span>
                </div>

                <div className="pt-1.5 border-t border-slate-200/60 text-xs text-slate-500 italic">
                  Example: "{item.exampleSentence}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-slate-800">
              Vocabulary Flashcards
            </h3>
            <p className="text-xs text-slate-500">
              Click the card to flip and reveal the Gujarati translation and sample sentence!
            </p>
          </div>

          {/* Flashcard container */}
          <div className="max-w-md mx-auto">
            <div 
              onClick={() => {
                setIsFlipped(!isFlipped);
                sound.playWaterDrop();
              }}
              className="relative min-h-[220px] bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer shadow-md hover:shadow-lg transition-all transform select-none"
            >
              {!isFlipped ? (
                /* Front side: English Word */
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    English Word
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-800 capitalize">
                    {currentFlashcard.word}
                  </h4>
                  <span className="text-xs text-slate-400 block">
                    Part of speech: {currentFlashcard.partOfSpeech}
                  </span>
                  <span className="text-xs font-bold text-blue-700 block pt-2">
                    (Click to Reveal Gujarati Meaning 🔄)
                  </span>
                </div>
              ) : (
                /* Back side: Gujarati & Meaning */
                <div className="space-y-3 animate-fadeIn">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    ગુજરાતી અર્થ
                  </span>
                  <h4 className="text-2xl font-bold text-emerald-900">
                    {currentFlashcard.gujarati}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium max-w-xs">
                    {currentFlashcard.definition}
                  </p>
                  <p className="text-xs text-slate-500 italic border-t border-blue-200 pt-2">
                    "{currentFlashcard.exampleSentence}"
                  </p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handlePrevFlashcard}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                ← Previous
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => speakEnglish(currentFlashcard.word)}
                  className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Listen English (Pure Indian Female Voice 0.8x)"
                >
                  <Volume2 className="w-3.5 h-3.5" /> EN
                </button>
                <button
                  type="button"
                  onClick={() => speakGujarati(currentFlashcard.gujarati)}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="ગુજરાતી અર્થ સાંભળો (0.8x)"
                >
                  <Volume2 className="w-3.5 h-3.5" /> ગુજ
                </button>
                <span className="text-xs font-bold text-slate-400 ml-1">
                  {flashcardIdx + 1} / {GLOSSARY_ITEMS.length}
                </span>
              </div>
              <button
                onClick={handleNextFlashcard}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
              >
                Next Card →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DO IT YOURSELF SCIENCE LAB */}
      {activeTab === 'diy' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              <span>Textbook Page 12 • Do It Yourself Activities</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Hands-on Science & Water Conservation Experiments
            </h3>
            <p className="text-xs text-slate-500">
              Complete these real-world science tasks at home or in your school laboratory!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DIY_EXPERIMENTS.map((exp) => (
              <div 
                key={exp.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    0{exp.id}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">
                      {exp.title}
                    </h4>
                    {showGujarati && (
                      <p className="text-xs text-blue-700 font-semibold mt-0.5">
                        {exp.titleGujarati}
                      </p>
                    )}
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
                    <span className="font-bold text-slate-600 block mb-1">Materials Needed:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-500 text-[11px]">
                      {exp.materials.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600">
                    <span className="font-bold text-slate-700 block">Procedure Steps:</span>
                    {exp.steps.map((st, i) => (
                      <p key={i} className="text-[11px] leading-relaxed">
                        <strong className="text-slate-800">{i + 1}.</strong> {st}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Banner */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Step 9 Completed?
          </h4>
          <p className="text-xs text-slate-500">
            Proceed to the final Step 10: Claim your Unit 1: Water Completion Certificate!
          </p>
        </div>
        <button
          id="complete-step-9-btn"
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
          <span>{isCompleted ? 'Completed (Step 9)' : 'Complete Step 9 & Finish'}</span>
        </button>
      </div>
    </div>
  );
};
