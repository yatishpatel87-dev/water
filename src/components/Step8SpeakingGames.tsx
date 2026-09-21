import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Check, 
  HelpCircle, 
  Mic,
  Smile,
  Users
} from 'lucide-react';
import { PASS_THE_BALL_PROMPTS, TONGUE_TWISTERS } from '../data/lessonData';
import { sound, speakText, speakEnglish, speakGujarati, stopSpeaking } from '../utils/audio';

interface Step8SpeakingGamesProps {
  onComplete: () => void;
  isCompleted: boolean;
  onAddStar: (count?: number) => void;
  showGujarati: boolean;
}

const CLASSROOM_STUDENTS = [
  'Aarav', 'Diya', 'Rohan', 'Pooja', 'Meet', 'Ananya', 'Harsh', 'Kavya'
];

export const Step8SpeakingGames: React.FC<Step8SpeakingGamesProps> = ({
  onComplete,
  isCompleted,
  onAddStar,
  showGujarati
}) => {
  const [activeTab, setActiveTab] = useState<'pass_ball' | 'twisters'>('pass_ball');

  // Pass the Ball Game State
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [currentStudentIdx, setCurrentStudentIdx] = useState<number>(0);
  const [activePrompt, setActivePrompt] = useState<{ question: string; gujarati: string } | null>(null);

  // Tongue Twister State
  const [activeTwisterIdx, setActiveTwisterIdx] = useState<number>(0);
  const [twisterSpeed, setTwisterSpeed] = useState<number>(0.8);
  const [twisterAnswers, setTwisterAnswers] = useState<Record<number, string>>({});
  const [twistersEvaluated, setTwistersEvaluated] = useState<boolean>(false);

  const currentTwister = TONGUE_TWISTERS[activeTwisterIdx];

  // Music ball rotation effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isMusicPlaying) {
      interval = setInterval(() => {
        setCurrentStudentIdx((prev) => (prev + 1) % CLASSROOM_STUDENTS.length);
        sound.playWaterDrop();
      }, 220);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMusicPlaying]);

  const handleStartMusic = () => {
    setIsMusicPlaying(true);
    setActivePrompt(null);
  };

  const handleStopMusic = () => {
    setIsMusicPlaying(false);
    sound.playSuccess();
    // Pick a random prompt from Page 11 board
    const randomPrompt = PASS_THE_BALL_PROMPTS[Math.floor(Math.random() * PASS_THE_BALL_PROMPTS.length)];
    setActivePrompt(randomPrompt);
    speakText(`The ball stopped on ${CLASSROOM_STUDENTS[currentStudentIdx]}! Here is your question: ${randomPrompt.question}`);
    onAddStar(1);
  };

  const handleReciteTwister = () => {
    speakText(currentTwister.sentence, { rate: twisterSpeed });
  };

  const handleVerifyTwisters = () => {
    let correct = 0;
    TONGUE_TWISTERS.forEach((tw) => {
      if (twisterAnswers[tw.id]?.toLowerCase().trim() === tw.missingWord.toLowerCase().trim()) {
        correct += 1;
      }
    });
    setTwistersEvaluated(true);
    if (correct >= 4) {
      sound.playSuccess();
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-amber-200 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
              <span>Textbook Page 10, 11 & 12 • Speaking & Fluency</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Classroom Games & Rapid Tongue Twisters
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Simulate the textbook musical "Pass the Ball" speaking game, then train your English tongue with rapid tongue twisters!
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mt-5 border-t border-amber-200/60 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pass_ball')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'pass_ball'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🏐 1. Pass the Ball Game (Page 11)
          </button>
          <button
            onClick={() => setActiveTab('twisters')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'twisters'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🗣️ 2. Rapid Tongue Twisters (Page 11 & 12)
          </button>
        </div>
      </div>

      {/* TAB 1: PASS THE BALL GAME */}
      {activeTab === 'pass_ball' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Classroom Musical Ball Circle
              </h3>
              <p className="text-xs text-slate-500">
                Start the music to pass the ball around the circle. Stop the music to challenge the holding student with a question!
              </p>
              {showGujarati && (
                <p className="text-xs text-slate-400 mt-0.5">
                  સંગીત ચાલુ કરો અને બોલ ફેરવો. સંગીત બંધ થતાં જે વિદ્યાર્થી પાસે બોલ હશે તેણે બોર્ડ પરના પ્રશ્નનો જવાબ આપવો પડશે!
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isMusicPlaying ? (
                <button
                  onClick={handleStartMusic}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Music & Pass Ball 🎵</span>
                </button>
              ) : (
                <button
                  onClick={handleStopMusic}
                  className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 animate-pulse"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Stop Music! (Whistle 🛑)</span>
                </button>
              )}
            </div>
          </div>

          {/* Circle of Students Visual Stage */}
          <div className="relative bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-yellow-50/60 border border-amber-200 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center">
            {/* Center: The Dancing Ball or Trophy */}
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full bg-white shadow-md border-2 border-amber-300 flex items-center justify-center mx-auto text-3xl transition-transform duration-200 ${
                isMusicPlaying ? 'animate-bounce scale-110' : ''
              }`}>
                ⚽
              </div>
              <span className="text-xs font-bold text-amber-900 mt-2 block">
                {isMusicPlaying ? 'Music Playing... Passing the ball!' : `The ball is with ${CLASSROOM_STUDENTS[currentStudentIdx]}!`}
              </span>
            </div>

            {/* Students Grid in a ring */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
              {CLASSROOM_STUDENTS.map((name, idx) => {
                const hasBall = currentStudentIdx === idx;
                return (
                  <div
                    key={name}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      hasBall
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-4 ring-amber-300/80 scale-105'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="text-xl mb-1">{hasBall ? '🙋' : '🧑‍🎓'}</div>
                    <span className="font-bold text-xs sm:text-sm block">{name}</span>
                    <span className={`text-[10px] block ${hasBall ? 'text-amber-100 font-bold' : 'text-slate-400'}`}>
                      {hasBall ? 'Has the Ball!' : 'Waiting...'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Prompt Card when music stops */}
          {activePrompt && (
            <div className="bg-sky-50 border-2 border-sky-300 rounded-2xl p-5 shadow-xs space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-1 rounded-md">
                  Speaking Prompt from the Board (Page 11)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speakEnglish(activePrompt.question)}
                    className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-100 hover:bg-sky-200 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                    title="Listen in Indian English (0.8x)"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> English
                  </button>
                  {showGujarati && (
                    <button
                      onClick={() => speakGujarati(activePrompt.gujarati)}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                      title="શુદ્ધ ગુજરાતી ઉચ્ચાર સાંભળો"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" /> ગુજરાતી અર્થ
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-slate-800">
                  “{activePrompt.question}”
                </h4>
                {showGujarati && (
                  <p className="text-xs text-sky-700 font-medium">
                    {activePrompt.gujarati}
                  </p>
                )}
              </div>

              <p className="text-xs text-slate-500 pt-1 border-t border-sky-200/60">
                Encourage students to answer in complete English sentences in front of the class!
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TONGUE TWISTERS */}
      {activeTab === 'twisters' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              <span>Textbook Page 11 & 12 • Practice C</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Complete & Speak the Tongue Twisters Repeatedly!
            </h3>
            <p className="text-xs text-slate-500">
              Practice saying each twister aloud 5 times as fast as possible without stumbling!
            </p>
          </div>

          {/* Twister cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TONGUE_TWISTERS.map((tw) => (
              <div 
                key={tw.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-amber-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                      {tw.id}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {tw.difficulty}
                    </span>
                  </div>

                  <p className="font-bold text-sm sm:text-base text-slate-800 leading-snug">
                    “{tw.sentence}”
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    💡 Tip: {tw.tip}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
                  <button
                    onClick={() => speakText(tw.sentence, { rate: 0.8 })}
                    className="text-xs text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Speak Normal (0.8x)
                  </button>
                  <button
                    onClick={() => speakText(tw.sentence, { rate: 1.25 })}
                    className="text-xs text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1"
                  >
                    ⚡ Speak Super Fast!
                  </button>
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
            Step 8 Completed?
          </h4>
          <p className="text-xs text-slate-500">
            Next: Explore the complete 26+ words English-Gujarati Glossary & DIY Science Lab on Page 12!
          </p>
        </div>
        <button
          id="complete-step-8-btn"
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
          <span>{isCompleted ? 'Completed (Step 8)' : 'Complete Step 8 & Continue'}</span>
        </button>
      </div>
    </div>
  );
};
