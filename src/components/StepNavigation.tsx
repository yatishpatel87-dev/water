import React from 'react';
import { 
  DoorClosed, 
  Droplets, 
  BookOpen, 
  Sparkles, 
  Puzzle, 
  Compass, 
  Layers, 
  Mic, 
  FlaskConical, 
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { LessonStep, LessonStepId } from '../types';

interface StepNavigationProps {
  steps: LessonStep[];
  activeStepId: LessonStepId;
  completedSteps: LessonStepId[];
  onSelectStep: (id: LessonStepId) => void;
  onNext: () => void;
  onPrev: () => void;
  showGujarati: boolean;
}

const ICONS_MAP: Record<string, React.ReactNode> = {
  DoorClosed: <DoorClosed className="w-4 h-4" />,
  Droplets: <Droplets className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Puzzle: <Puzzle className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Mic: <Mic className="w-4 h-4" />,
  FlaskConical: <FlaskConical className="w-4 h-4" />,
  Award: <Award className="w-4 h-4" />
};

export const StepNavigation: React.FC<StepNavigationProps> = ({
  steps,
  activeStepId,
  completedSteps,
  onSelectStep,
  onNext,
  onPrev,
  showGujarati
}) => {
  const currentIndex = steps.findIndex((s) => s.id === activeStepId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;

  return (
    <div className="bg-white border-b border-slate-200/80 sticky top-[57px] z-20 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Previous Step Button */}
          <button
            id="prev-step-btn"
            onClick={onPrev}
            disabled={isFirst}
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all shrink-0 ${
              isFirst
                ? 'opacity-40 cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Stepper track */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 no-scrollbar scroll-smooth">
            {steps.map((step, idx) => {
              const isActive = step.id === activeStepId;
              const isCompleted = completedSteps.includes(step.id);

              return (
                <button
                  key={step.id}
                  id={`step-nav-${step.id}`}
                  onClick={() => onSelectStep(step.id)}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm shadow-sky-300 ring-2 ring-sky-500/20'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 border border-transparent'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isCompleted
                      ? 'bg-emerald-200/70 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : idx + 1}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <span className={isActive ? 'text-white' : isCompleted ? 'text-emerald-700' : 'text-slate-500'}>
                      {ICONS_MAP[step.icon]}
                    </span>
                    <span className="font-semibold">{step.title}</span>
                  </span>

                  {showGujarati && (
                    <span className={`text-[10px] hidden md:inline ml-1 ${isActive ? 'text-sky-100' : 'text-slate-400'}`}>
                      ({step.titleGujarati.split(' ')[0]})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Step Button */}
          <button
            id="next-step-btn"
            onClick={onNext}
            disabled={isLast}
            className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shrink-0 ${
              isLast
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200'
                : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs active:scale-95'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
