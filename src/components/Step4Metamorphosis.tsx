import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  CheckCircle, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  HelpCircle,
  Bug
} from 'lucide-react';
import { METAMORPHOSIS_STAGES } from '../data/lessonData';
import { sound, speakText, speakEnglish, speakGujarati } from '../utils/audio';

interface Step4MetamorphosisProps {
  onComplete: () => void;
  isCompleted: boolean;
  onAddStar: (count?: number) => void;
  showGujarati: boolean;
}

export const Step4Metamorphosis: React.FC<Step4MetamorphosisProps> = ({
  onComplete,
  isCompleted,
  onAddStar,
  showGujarati
}) => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [orderedList, setOrderedList] = useState<number[]>([3, 1, 4, 2]); // shuffled initial
  const [isOrderedCorrectly, setIsOrderedCorrectly] = useState<boolean | null>(null);

  const currentStage = METAMORPHOSIS_STAGES[activeStageIdx];

  const handleReadStage = (text: string) => {
    speakText(text, { rate: 0.8 });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const next = [...orderedList];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    setOrderedList(next);
    sound.playWaterDrop();
    setIsOrderedCorrectly(null);
  };

  const handleMoveDown = (index: number) => {
    if (index === orderedList.length - 1) return;
    const next = [...orderedList];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    setOrderedList(next);
    sound.playWaterDrop();
    setIsOrderedCorrectly(null);
  };

  const handleCheckOrder = () => {
    const isCorrect = orderedList.every((val, idx) => val === idx + 1);
    setIsOrderedCorrectly(isCorrect);
    if (isCorrect) {
      sound.playSuccess();
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  const handleResetOrder = () => {
    setOrderedList([3, 1, 4, 2]);
    setIsOrderedCorrectly(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-200 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
              <span>Textbook Page 6 & 7 • Writing & Science</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Metamorphosis: The Butterfly Life Cycle
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Metamorphosis is the miraculous change in the body of an animal during its life cycle (seen in butterflies and frogs).
            </p>
            {showGujarati && (
              <p className="text-xs text-emerald-800 font-medium mt-1">
                રૂપાંતરણ: ઈંડામાંથી ઈયળ, કોશેટો અને સુંદર પતંગિયું બનવાની પ્રક્રિયા.
              </p>
            )}
          </div>

          <button
            onClick={() => handleReadStage(
              "Metamorphosis is the change in the body of an animal during its life cycle. A butterfly starts its life as an egg. The egg becomes a caterpillar, which eats leaves. Then the caterpillar becomes a pupa inside a cocoon. After some time, a pupa changes into a butterfly. This process is called metamorphosis."
            )}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen to Story of Metamorphosis</span>
          </button>
        </div>
      </div>

      {/* 4 Interactive Stages Visual Explorer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Bug className="w-5 h-5 text-emerald-600" />
            <span>The Four Stages of Metamorphosis</span>
          </h3>
          <span className="text-xs text-slate-500">Click any stage below</span>
        </div>

        {/* Stage Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {METAMORPHOSIS_STAGES.map((st, idx) => {
            const isSelected = activeStageIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveStageIdx(idx);
                  sound.playWaterDrop();
                }}
                className={`p-4 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 shadow-xs ring-2 ring-emerald-300'
                    : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-emerald-300'
                }`}
              >
                <div className="text-3xl mb-1">{st.icon}</div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Stage {st.stepNumber}
                </span>
                <span className="font-bold text-xs sm:text-sm text-slate-800 block leading-tight mt-0.5">
                  {st.title}
                </span>
                {showGujarati && (
                  <span className="text-[11px] text-emerald-700 block mt-0.5">
                    {st.gujarati}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-6xl p-4 bg-white rounded-2xl shadow-xs border border-emerald-100 shrink-0 animate-pulse">
            {currentStage.icon}
          </div>
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-200/80 text-emerald-900 px-2.5 py-0.5 rounded-full">
                Step {currentStage.stepNumber} of 4
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => speakEnglish(currentStage.sentence)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                  title="Listen in Indian English (0.8x)"
                >
                  <Volume2 className="w-3.5 h-3.5" /> English
                </button>
                {showGujarati && (
                  <button
                    onClick={() => speakGujarati(currentStage.gujarati)}
                    className="text-xs font-bold text-teal-800 hover:text-teal-950 bg-teal-100 hover:bg-teal-200 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                    title="શુદ્ધ ગુજરાતી ઉચ્ચાર સાંભળો"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-teal-700" /> શુદ્ધ ઉચ્ચાર
                  </button>
                )}
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-800">
              {currentStage.title} ({currentStage.gujarati})
            </h4>
            <p className="text-sm sm:text-base text-slate-700 font-medium">
              {currentStage.sentence}
            </p>
            <p className="text-xs text-slate-500 italic">
              Note: {currentStage.note}
            </p>
          </div>
        </div>
      </div>

      {/* Sequence Ordering Challenge */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              Interactive Challenge
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mt-1">
              Arrange the Stages in Chronological Order (1 to 4)
            </h3>
            <p className="text-xs text-slate-500">
              Use the Up (↑) and Down (↓) buttons to arrange from Egg to Butterfly.
            </p>
          </div>

          <button
            onClick={handleResetOrder}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Order
          </button>
        </div>

        <div className="space-y-2">
          {orderedList.map((stageNum, idx) => {
            const stageInfo = METAMORPHOSIS_STAGES.find((s) => s.stepNumber === stageNum)!;
            return (
              <div 
                key={stageNum}
                className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-2xs hover:bg-slate-100/70 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-2xl">{stageInfo.icon}</span>
                  <div>
                    <span className="font-bold text-sm text-slate-800">
                      {stageInfo.title}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {stageInfo.sentence}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className={`p-1.5 rounded-lg border text-xs font-bold ${
                      idx === 0 ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                    title="Move up"
                  >
                    ↑ Up
                  </button>
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === orderedList.length - 1}
                    className={`p-1.5 rounded-lg border text-xs font-bold ${
                      idx === orderedList.length - 1 ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                    title="Move down"
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
            onClick={handleCheckOrder}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
          >
            Check Sequence Order
          </button>

          {isOrderedCorrectly !== null && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold">
              {isOrderedCorrectly ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Perfectly Ordered! Egg → Caterpillar → Pupa → Butterfly
                </span>
              ) : (
                <span className="text-rose-600">
                  Not quite right yet! Remember: Egg hatches into caterpillar first!
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Step 4 Completed?
          </h4>
          <p className="text-xs text-slate-500">
            Move ahead to Step 5: Conjunctions (and, but, or, because, so) on Page 7 & 8!
          </p>
        </div>
        <button
          id="complete-step-4-btn"
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
          <span>{isCompleted ? 'Completed (Step 4)' : 'Complete Step 4 & Continue'}</span>
        </button>
      </div>
    </div>
  );
};
