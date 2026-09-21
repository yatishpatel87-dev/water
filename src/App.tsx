/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Star, CheckCircle2 } from 'lucide-react';
import { Header } from './components/Header';
import { StepNavigation } from './components/StepNavigation';
import { Step1Poem } from './components/Step1Poem';
import { Step2Story } from './components/Step2Story';
import { Step3Reading } from './components/Step3Reading';
import { Step4Metamorphosis } from './components/Step4Metamorphosis';
import { Step5Grammar } from './components/Step5Grammar';
import { Step6Prepositions } from './components/Step6Prepositions';
import { Step7Vocabulary } from './components/Step7Vocabulary';
import { Step8SpeakingGames } from './components/Step8SpeakingGames';
import { Step9GlossaryLab } from './components/Step9GlossaryLab';
import { Step10Certificate } from './components/Step10Certificate';
import { GlobalLearningRankModal } from './components/GlobalLearningRankModal';
import { LESSON_STEPS } from './data/lessonData';
import { LessonStepId } from './types';
import { sound, sfx, stopSpeaking } from './utils/audio';
import { 
  triggerGrandConfettiExplosion, 
  triggerStarMilestoneConfetti, 
  triggerStepCompleteConfetti 
} from './utils/confetti';

export default function App() {
  const [activeStepId, setActiveStepId] = useState<LessonStepId>('poem');
  const [completedSteps, setCompletedSteps] = useState<LessonStepId[]>(() => {
    try {
      const saved = localStorage.getItem('water_unit_completed_steps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('water_unit_stars');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [studentName, setStudentName] = useState<string>(() => {
    try {
      return localStorage.getItem('water_unit_student_name') || '';
    } catch {
      return '';
    }
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showGujarati, setShowGujarati] = useState<boolean>(true);
  const [isRankModalOpen, setIsRankModalOpen] = useState<boolean>(false);
  const [rewardToast, setRewardToast] = useState<{
    type: 'star' | 'step';
    message: string;
    subtext?: string;
    count?: number;
  } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('water_unit_completed_steps', JSON.stringify(completedSteps));
    } catch {
      // ignore
    }
  }, [completedSteps]);

  useEffect(() => {
    try {
      localStorage.setItem('water_unit_stars', stars.toString());
    } catch {
      // ignore
    }
  }, [stars]);

  useEffect(() => {
    try {
      localStorage.setItem('water_unit_student_name', studentName);
    } catch {
      // ignore
    }
  }, [studentName]);

  const currentStep = LESSON_STEPS.find((s) => s.id === activeStepId) || LESSON_STEPS[0];
  const currentIndex = LESSON_STEPS.findIndex((s) => s.id === activeStepId);

  const showRewardToast = (toast: {
    type: 'star' | 'step';
    message: string;
    subtext?: string;
    count?: number;
  }) => {
    setRewardToast(toast);
    setTimeout(() => {
      setRewardToast(null);
    }, 2400);
  };

  const handleSelectStep = (id: LessonStepId) => {
    stopSpeaking();
    setActiveStepId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    stopSpeaking();
    if (currentIndex < LESSON_STEPS.length - 1) {
      setActiveStepId(LESSON_STEPS[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    stopSpeaking();
    if (currentIndex > 0) {
      setActiveStepId(LESSON_STEPS[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteStep = (stepId: LessonStepId) => {
    const isNew = !completedSteps.includes(stepId);
    const updatedCount = isNew ? completedSteps.length + 1 : completedSteps.length;
    const isAllComplete = updatedCount >= LESSON_STEPS.length;

    if (isNew) {
      setCompletedSteps((prev) => [...prev, stepId]);
    }

    if (isAllComplete) {
      // Trigger canvas-based grand multi-stage confetti explosion
      triggerGrandConfettiExplosion();
      sfx.fanfare();
      setTimeout(() => sfx.cheer(), 450);

      showRewardToast({
        type: 'step',
        message: showGujarati ? 'તમામ ૧૦ સ્ટેપ્સ પૂર્ણ! 🎉' : 'All 10 Steps Completed! 🎓',
        subtext: showGujarati 
          ? 'અભિનંદન! તમે સંપૂર્ણ પાઠ પૂર્ણ કર્યો છે! સર્ટિફિકેટ જુઓ!' 
          : 'Outstanding achievement! You have mastered the entire Unit 1!'
      });
    } else {
      // Cheerful lesson step confetti burst
      triggerStepCompleteConfetti();
      sfx.taskComplete();

      showRewardToast({
        type: 'step',
        message: 'Step Completed!',
        subtext: showGujarati ? 'આ સ્ટેપ સફળતાપૂર્વક પૂર્ણ થયું! શાબાશ!' : 'Excellent progress! Moving forward...'
      });
    }

    // Auto advance after brief celebration delay
    if (currentIndex < LESSON_STEPS.length - 1) {
      setTimeout(() => {
        handleNext();
      }, isAllComplete ? 1200 : 700);
    }
  };

  const handleAddStar = (count = 1) => {
    const prevStars = stars;
    const nextStars = prevStars + count;
    setStars(nextStars);

    // Check if user earned a significant number of stars:
    // 1) Earning >= 2 stars in a single achievement
    // 2) Crossing a 5-star milestone threshold (5, 10, 15, 20, 25, 30 stars...)
    const isSignificantBatch = count >= 2;
    const crossedMilestone = Math.floor(nextStars / 5) > Math.floor(prevStars / 5) && nextStars >= 5;

    if (crossedMilestone) {
      // Canvas-based milestone star explosion
      triggerStarMilestoneConfetti({ isMilestone: true });
      sfx.celebrate();
      showRewardToast({
        type: 'star',
        count,
        message: showGujarati ? `🌟 ${nextStars} સિતારાઓનું લક્ષ્ય પૂર્ણ!` : `🌟 Star Milestone: ${nextStars} Stars!`,
        subtext: showGujarati ? 'વિશેષ સિદ્ધિ! શાનદાર પ્રગતિ!' : 'Remarkable dedication! Keep shining!'
      });
    } else if (isSignificantBatch) {
      // Canvas-based star confetti explosion for significant star awards
      triggerStarMilestoneConfetti({ isMilestone: false });
      sfx.earnStar(count);
      showRewardToast({
        type: 'star',
        count,
        message: `+${count} Stars Earned!`,
        subtext: showGujarati ? 'ખૂબ સરસ! શાનદાર પ્રદર્શન!' : 'Terrific work! Star explosion unlocked!'
      });
    } else {
      // Standard star chime & reward
      sfx.earnStar(count);
      showRewardToast({
        type: 'star',
        count,
        message: '+1 Star Earned!',
        subtext: showGujarati ? 'ખૂબ સરસ! સિતારો મળ્યો!' : 'Terrific work!'
      });
    }
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  const handleResetProgress = () => {
    if (window.confirm('Do you want to reset your lesson progress?')) {
      stopSpeaking();
      setCompletedSteps([]);
      setStars(0);
      setActiveStepId('poem');
      try {
        localStorage.removeItem('water_unit_completed_steps');
        localStorage.removeItem('water_unit_stars');
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 text-slate-800">
      {/* Top Main App Header */}
      <Header
        currentStep={currentStep}
        totalSteps={LESSON_STEPS.length}
        stars={stars}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        showGujarati={showGujarati}
        onToggleGujarati={() => setShowGujarati(!showGujarati)}
        onReset={handleResetProgress}
        onOpenRankModal={() => setIsRankModalOpen(true)}
      />

      {/* Step Stepper Navigation Bar */}
      <StepNavigation
        steps={LESSON_STEPS}
        activeStepId={activeStepId}
        completedSteps={completedSteps}
        onSelectStep={handleSelectStep}
        onNext={handleNext}
        onPrev={handlePrev}
        showGujarati={showGujarati}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeStepId === 'poem' && (
          <Step1Poem
            onComplete={() => handleCompleteStep('poem')}
            isCompleted={completedSteps.includes('poem')}
            onAddStar={handleAddStar}
            showGujarati={showGujarati}
          />
        )}

        {activeStepId === 'story' && (
          <Step2Story
            onComplete={() => handleCompleteStep('story')}
            isCompleted={completedSteps.includes('story')}
            onAddStar={handleAddStar}
            showGujarati={showGujarati}
          />
        )}

        {activeStepId === 'reading' && (
          <Step3Reading
            onComplete={() => handleCompleteStep('reading')}
            isCompleted={completedSteps.includes('reading')}
            onAddStar={handleAddStar}
            showGujarati={showGujarati}
          />
        )}

        {activeStepId === 'metamorphosis' && (
          <Step4Metamorphosis
            onComplete={() => handleCompleteStep('metamorphosis')}
            isCompleted={completedSteps.includes('metamorphosis')}
            onAddStar={handleAddStar}
            showGujarati={showGujarati}
          />
        )}

        {activeStepId === 'grammar' && (
          <Step5Grammar
            onComplete={() => handleCompleteStep('grammar')}
            isCompleted={completedSteps.includes('grammar')}
            onAddStar={handleAddStar}
            showGujarati={showGujarati}
          />
        )}

        {activeStepId === 'prepositions' && (
          <Step6Prepositions
            onComplete={() => handleCompleteStep('prepositions')}
            isCompleted={completedSteps.includes('prepositions')}
            onAddStar={handleAddStar}
            showGujarati={showGujarati}
          />
        )}

        {activeStepId === 'vocabulary' && (
          <Step7Vocabulary
            onComplete={() => handleCompleteStep('vocabulary')}
            isCompleted={completedSteps.includes('vocabulary')}
            onAddStar={handleAddStar}
            showGujarati={showGujarati}
          />
        )}

        {activeStepId === 'speaking' && (
          <Step8SpeakingGames
            onComplete={() => handleCompleteStep('speaking')}
            isCompleted={completedSteps.includes('speaking')}
            onAddStar={handleAddStar}
            showGujarati={showGujarati}
          />
        )}

        {activeStepId === 'glossary' && (
          <Step9GlossaryLab
            onComplete={() => handleCompleteStep('glossary')}
            isCompleted={completedSteps.includes('glossary')}
            onAddStar={handleAddStar}
            showGujarati={showGujarati}
          />
        )}

        {activeStepId === 'certificate' && (
          <Step10Certificate
            studentName={studentName}
            onUpdateStudentName={setStudentName}
            stars={stars}
            completedSteps={completedSteps}
            onResetProgress={handleResetProgress}
            showGujarati={showGujarati}
            onOpenRankModal={() => setIsRankModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>Unit 1: Water</strong> • Interactive Step-by-Step English Textbook Course
          </div>
          <div className="flex items-center gap-3">
            <button
              id="footer-open-rank-btn"
              type="button"
              onClick={() => setIsRankModalOpen(true)}
              className="text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1 rounded-md transition-colors"
            >
              <span>🏆</span>
              <span>{showGujarati ? 'વૈશ્વિક લર્નિંગ રેન્ક' : 'Global Learning Rank'}</span>
            </button>
            <span className="text-slate-400 hidden sm:inline">
              Based on Gujarat State Board English Curriculum (Pages 1–12)
            </span>
          </div>
        </div>
      </footer>

      {/* Global Learning Rank Modal */}
      <GlobalLearningRankModal
        isOpen={isRankModalOpen}
        onClose={() => setIsRankModalOpen(false)}
        userStars={stars}
        userCompletedStepsCount={completedSteps.length}
        studentName={studentName}
        showGujarati={showGujarati}
      />

      {/* Floating Positive Reinforcement Toast */}
      {rewardToast && (
        <div
          id="reward-toast"
          className="fixed bottom-6 right-6 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-3 bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-400/40 backdrop-blur-md animate-bounce">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              rewardToast.type === 'star'
                ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 shadow-sm shadow-amber-500/50'
                : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-sm shadow-emerald-500/50'
            }`}>
              {rewardToast.type === 'star' ? (
                <Star className="w-5 h-5 fill-current text-slate-900" />
              ) : (
                <Trophy className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <p className="text-sm font-extrabold text-amber-300 flex items-center gap-1.5">
                <span>{rewardToast.message}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-300" />
              </p>
              {rewardToast.subtext && (
                <p className="text-xs text-slate-300 font-medium">
                  {rewardToast.subtext}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
