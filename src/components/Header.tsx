import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Languages, RotateCcw, Droplet, Mic, Trophy } from 'lucide-react';
import { LessonStep } from '../types';
import { sfx, testIndianFemaleVoice } from '../utils/audio';
import { GujaratiPronunciationModal } from './GujaratiPronunciationModal';

interface HeaderProps {
  currentStep: LessonStep;
  totalSteps: number;
  stars: number;
  isMuted: boolean;
  onToggleMute: () => void;
  showGujarati: boolean;
  onToggleGujarati: () => void;
  onReset: () => void;
  onOpenRankModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  totalSteps,
  stars,
  isMuted,
  onToggleMute,
  showGujarati,
  onToggleGujarati,
  onReset,
  onOpenRankModal
}) => {
  const [showPronunciationModal, setShowPronunciationModal] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-sm shadow-sky-200">
            <Droplet className="w-6 h-6 fill-current animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-700 px-2 py-0.5 rounded-md">
                Unit 1
              </span>
              <h1 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
                WATER • <span className="text-sky-600">Interactive Lesson</span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {showGujarati ? 'આના આધારે ઇન્ટરેક્ટિવ સ્ટેપ બાય સ્ટેપ પાઠ શીખો' : 'Interactive Step-by-Step English Learning'}
            </p>
          </div>
        </div>

        {/* Center: Current Step Status */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Step {currentStep.number} of {totalSteps}:</span>
          <span className="font-semibold text-slate-800">{currentStep.title}</span>
        </div>

        {/* Right: Controls & Score */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star Counter */}
          <button 
            id="stars-badge"
            onClick={() => sfx.earnStar(1)}
            className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100/80 active:scale-95 transition-all border border-amber-200/80 px-2.5 py-1 rounded-lg text-amber-800 font-bold text-sm shadow-2xs cursor-pointer"
            title="Earned Stars (Click to hear chime)"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
            <span>{stars}</span>
            <span className="text-xs font-normal text-amber-600 hidden sm:inline">Stars</span>
          </button>

          {/* Global Learning Rank Leaderboard Button */}
          <button
            id="global-rank-header-btn"
            type="button"
            onClick={() => {
              sfx.click();
              onOpenRankModal();
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded-lg border border-amber-400 shadow-2xs active:scale-95 transition-all cursor-pointer"
            title="Open Global Learning Rank Leaderboard (Community)"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-950 fill-amber-700" />
            <span className="hidden sm:inline">Global Rank</span>
            <span className="text-[10px] bg-amber-950/15 text-amber-950 px-1 py-0.2 rounded font-black">
              🏆
            </span>
          </button>

          {/* Pure Indian Female Voice 0.8x dual indicators & testers (EN & GU) */}
          <div 
            id="indian-voice-pill" 
            className="flex items-center rounded-lg border border-indigo-200/90 bg-indigo-50/80 p-0.5 shadow-2xs"
            title="Pure Indian Female Voice: English & Gujarati (Speed 0.8x)"
          >
            <div className="flex items-center gap-1 px-1.5 py-1 text-xs font-bold text-indigo-950">
              <span className="text-xs">🇮🇳</span>
              <span className="hidden md:inline text-[11px] text-indigo-900">Female</span>
            </div>
            <button
              id="voice-test-en-btn"
              type="button"
              onClick={() => testIndianFemaleVoice('en')}
              className="px-2 py-1 rounded-md text-xs font-bold text-indigo-800 hover:text-indigo-950 hover:bg-white active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              title="Test Pure Indian Female English Voice (0.8x)"
            >
              <span>EN</span>
              <span className="text-[10px] bg-indigo-200/70 text-indigo-900 px-1 rounded font-bold">0.8x</span>
              <Volume2 className="w-3 h-3 text-indigo-600" />
            </button>
            <div className="w-px h-3.5 bg-indigo-200 mx-0.5" />
            <button
              id="voice-test-gu-btn"
              type="button"
              onClick={() => testIndianFemaleVoice('gu')}
              className="px-2 py-1 rounded-md text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:bg-white active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              title="Test Pure Indian Female Gujarati Voice (0.8x) - શુદ્ધ ભારતીય મહિલા અવાજ"
            >
              <span>ગુજ</span>
              <span className="text-[10px] bg-emerald-200/70 text-emerald-950 px-1 rounded font-bold">0.8x</span>
              <Volume2 className="w-3 h-3 text-emerald-600" />
            </button>
            <div className="w-px h-3.5 bg-indigo-200 mx-0.5" />
            <button
              id="gujarati-pronunciation-btn"
              type="button"
              onClick={() => setShowPronunciationModal(true)}
              className="px-2 py-1 rounded-md text-xs font-bold text-teal-800 hover:text-teal-950 hover:bg-white active:scale-95 transition-all cursor-pointer flex items-center gap-1"
              title="ગુજરાતી ભાષા ઉચ્ચાર શુદ્ધિ કેન્દ્ર અને સેટિંગ્સ (Pronunciation Lab)"
            >
              <span>શુદ્ધ ઉચ્ચાર</span>
              <span className="text-[11px]">🎙️</span>
            </button>
          </div>

          {/* Gujarati toggle */}
          <button
            id="toggle-gujarati-btn"
            onClick={onToggleGujarati}
            className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-medium border transition-colors ${
              showGujarati 
                ? 'bg-sky-50 border-sky-300 text-sky-700 font-semibold' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Toggle Gujarati translations & hints"
          >
            <Languages className="w-3.5 h-3.5 text-sky-600" />
            <span>{showGujarati ? 'ગુજરાતી ON' : 'ગુજરાતી OFF'}</span>
          </button>

          {/* Audio toggle */}
          <button
            id="toggle-audio-btn"
            onClick={onToggleMute}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              isMuted
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Reset progress button */}
          <button
            id="reset-lesson-btn"
            onClick={onReset}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Reset Lesson Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gujarati Pronunciation Purification Modal */}
      <GujaratiPronunciationModal
        isOpen={showPronunciationModal}
        onClose={() => setShowPronunciationModal(false)}
      />
    </header>
  );
};
