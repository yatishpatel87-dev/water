import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Sparkles, 
  Printer, 
  RotateCcw, 
  Droplet, 
  CheckCircle2, 
  Star,
  Share2,
  BarChart3,
  Clock,
  TrendingUp,
  CheckCircle,
  Trophy
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
  LabelList
} from 'recharts';
import { sound, sfx } from '../utils/audio';
import { triggerGrandConfettiExplosion, triggerStarMilestoneConfetti } from '../utils/confetti';
import { LessonStepId } from '../types';
import { LESSON_STEPS } from '../data/lessonData';

interface Step10CertificateProps {
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  stars: number;
  completedSteps: LessonStepId[];
  onResetProgress: () => void;
  showGujarati: boolean;
  onOpenRankModal?: () => void;
}

export const Step10Certificate: React.FC<Step10CertificateProps> = ({
  studentName,
  onUpdateStudentName,
  stars,
  completedSteps,
  onResetProgress,
  showGujarati,
  onOpenRankModal
}) => {
  const [localName, setLocalName] = useState<string>(studentName || 'Curious Learner');

  useEffect(() => {
    // Fire canvas-based grand confetti explosion, cheer, and fanfare on mount
    sfx.fanfare();
    setTimeout(() => sfx.cheer(), 400);
    triggerGrandConfettiExplosion();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleTriggerConfetti = () => {
    sfx.celebrate();
    setTimeout(() => sfx.cheer(), 300);
    triggerGrandConfettiExplosion();
  };

  const totalSteps = LESSON_STEPS.length;
  const completedSet = new Set(completedSteps);
  const completedCount = completedSet.size;
  const remainingCount = Math.max(0, totalSteps - completedCount);
  const completionPercentage = Math.round((completedCount / totalSteps) * 100);

  const chartData = [
    {
      name: showGujarati ? 'પૂર્ણ સ્ટેપ્સ (Completed)' : 'Completed Steps',
      shortLabel: 'Completed',
      count: completedCount,
      total: totalSteps,
      percentage: `${completionPercentage}%`,
      fill: '#10b981', // emerald-500
      statusText: showGujarati 
        ? `${completedCount} માંથી ${totalSteps} સ્ટેપ સફળતાપૂર્વક પૂર્ણ થયા` 
        : `${completedCount} of ${totalSteps} steps completed`
    },
    {
      name: showGujarati ? 'બાકી સ્ટેપ્સ (Remaining)' : 'Remaining Steps',
      shortLabel: 'Remaining',
      count: remainingCount,
      total: totalSteps,
      percentage: `${100 - completionPercentage}%`,
      fill: remainingCount === 0 ? '#94a3b8' : '#f59e0b', // amber-500 or slate-400
      statusText: remainingCount === 0 
        ? (showGujarati ? 'અભિનંદન! તમામ ૧૦ સ્ટેપ પૂર્ણ થઈ ગયા છે!' : 'All 10 steps completed!') 
        : (showGujarati ? `${remainingCount} સ્ટેપ હજી પૂર્ણ કરવાના બાકી છે` : `${remainingCount} steps remaining to complete`)
    }
  ];

  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-700">
          <p className="font-bold text-slate-200">{data.name}</p>
          <p className="text-base font-extrabold text-white mt-1 flex items-baseline gap-1.5">
            <span>{data.count}</span>
            <span className="text-xs font-semibold text-slate-400">/ {data.total} Steps</span>
            <span className="text-xs font-bold text-amber-400 ml-1">({data.percentage})</span>
          </p>
          <p className="text-slate-300 text-[11px] mt-1">{data.statusText}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-emerald-500/10 border border-amber-200 rounded-2xl p-5 sm:p-6 text-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          <span>Congratulations! યુનિટ ૧ સંપૂર્ણ થયું</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          You Mastered Unit 1: WATER!
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
          You have completed the entire 12-page curriculum including recitation, the Water Family story, grammar, vocabulary, and science experiments.
        </p>
      </div>

      {/* Name Customizer Input */}
      <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center gap-3">
        <label className="text-xs font-bold text-slate-600 shrink-0">
          Enter Your Name:
        </label>
        <input
          type="text"
          value={localName}
          onChange={(e) => {
            setLocalName(e.target.value);
            onUpdateStudentName(e.target.value);
          }}
          placeholder="Your full name..."
          className="w-full text-sm font-semibold border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-800"
        />
        <button
          onClick={handleTriggerConfetti}
          className="p-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200 shrink-0 transition-colors"
          title="Celebration"
        >
          🎉
        </button>
      </div>

      {/* Progress Dashboard with Recharts Bar Chart */}
      <div 
        id="progress-dashboard"
        className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6"
      >
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shadow-2xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-800">
                  {showGujarati ? 'અભ્યાસ પ્રગતિ ડેશબોર્ડ' : 'Learning Progress Dashboard'}
                </h3>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Unit 1
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {showGujarati 
                  ? 'પૂર્ણ થયેલા સ્ટેપ્સ અને બાકી રહેલા સ્ટેપ્સનું તુલનાત્મક આલેખ વિશ્લેષણ' 
                  : 'Visual analysis of completed steps versus total remaining in the curriculum'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {onOpenRankModal && (
              <button
                id="view-global-rank-dash-btn"
                onClick={() => {
                  sfx.click();
                  onOpenRankModal();
                }}
                className="flex items-center gap-1.5 text-xs font-extrabold bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 border border-amber-400 px-3 py-1.5 rounded-xl cursor-pointer transition-all active:scale-95 shadow-2xs"
                title="View Global Learning Rank Leaderboard"
              >
                <Trophy className="w-3.5 h-3.5 text-slate-950 fill-amber-700" />
                <span>{showGujarati ? 'ગ્લોબલ રેન્ક 🏆' : 'Global Rank 🏆'}</span>
              </button>
            )}

            <button
              onClick={handleTriggerConfetti}
              className="flex items-center gap-1.5 text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-xl cursor-pointer transition-all active:scale-95 shadow-2xs"
              title="Trigger Canvas Confetti Explosion"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{showGujarati ? 'કન્ફેટી વિસ્ફોટ 🎉' : 'Confetti Explosion 🎉'}</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-xs text-slate-600 font-semibold">
                {showGujarati ? 'કુલ પ્રગતિ:' : 'Progress:'}{' '}
                <strong className="text-emerald-700 font-bold">{completionPercentage}%</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-emerald-800 font-bold block">
                {showGujarati ? 'પૂર્ણ કરેલા સ્ટેપ્સ' : 'Completed Steps'}
              </span>
              <span className="text-xl font-extrabold text-emerald-700">
                {completedCount} <span className="text-xs font-medium text-emerald-800/80">/ {totalSteps}</span>
              </span>
            </div>
          </div>

          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-amber-800 font-bold block">
                {showGujarati ? 'બાકી રહેલા સ્ટેપ્સ' : 'Remaining Steps'}
              </span>
              <span className="text-xl font-extrabold text-amber-700">
                {remainingCount} <span className="text-xs font-medium text-amber-800/80">/ {totalSteps}</span>
              </span>
            </div>
          </div>

          <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-sky-600" />
            </div>
            <div>
              <span className="text-xs text-sky-800 font-bold block">
                {showGujarati ? 'પ્રગતિ ટકાવારી' : 'Completion Rate'}
              </span>
              <span className="text-xl font-extrabold text-sky-700">
                {completionPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Recharts Bar Chart Visualizer */}
        <div id="progress-chart-container" className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-sky-600" />
              <span>{showGujarati ? 'સ્ટેપ્સ તુલના બાર ચાર્ટ (Recharts)' : 'Completed vs Remaining Steps (Bar Chart)'}</span>
            </span>
            <span className="text-slate-400 font-normal">
              {showGujarati ? 'માપદંડ: ૦ થી ૧૦ સ્ટેપ્સ' : 'Scale: 0 to 10 steps'}
            </span>
          </div>

          <div className="w-full h-64 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 25, right: 30, left: -10, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis 
                  allowDecimals={false}
                  domain={[0, 10]}
                  ticks={[0, 2, 4, 6, 8, 10]}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <Tooltip content={<CustomChartTooltip />} />
                <Bar 
                  dataKey="count" 
                  radius={[8, 8, 0, 0]} 
                  maxBarSize={80}
                  animationDuration={900}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList 
                    dataKey="count" 
                    position="top" 
                    fill="#1e293b" 
                    fontWeight={800} 
                    fontSize={14}
                    formatter={(val: any) => `${val} Steps`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Step-by-Step Curriculum Checklist */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="font-bold text-slate-700">
              {showGujarati ? 'તમામ ૧૦ પ્રવૃત્તિઓની સ્થિતિ (Step Checklist):' : 'All 10 Steps Status Checklist:'}
            </span>
            <span className="text-emerald-700 font-semibold">
              {completedCount} of {totalSteps} {showGujarati ? 'સંપૂર્ણ' : 'Done'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {LESSON_STEPS.map((step) => {
              const isDone = completedSet.has(step.id);
              return (
                <div
                  key={step.id}
                  className={`p-2.5 rounded-xl border text-xs flex flex-col justify-between gap-1 transition-all ${
                    isDone
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[11px] text-slate-700">Step {step.number}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                  </div>
                  <span className="truncate font-semibold text-[11px] text-slate-800" title={step.title}>
                    {step.title}
                  </span>
                  <span className={`text-[10px] font-bold ${isDone ? 'text-emerald-700' : 'text-amber-600'}`}>
                    {isDone ? '✓ Completed' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* The Official Certificate Card (Printable) */}
      <div className="max-w-3xl mx-auto bg-white border-8 border-double border-amber-500/60 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center space-y-6">
        {/* Subtle Watermark Droplet */}
        <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
          <Droplet className="w-80 h-80 fill-current text-sky-600" />
        </div>

        {/* Certificate Header */}
        <div className="space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-xs border border-amber-200">
            <Award className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block pt-2">
            Certificate of English Language Mastery
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight font-display">
            Certificate of Achievement
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Gujarat Board • Standard English Curriculum • Unit 1: Water
          </p>
        </div>

        {/* Recipient */}
        <div className="py-4 border-y border-amber-200/80 max-w-lg mx-auto space-y-1">
          <span className="text-xs uppercase font-semibold text-slate-400">
            This certifies that
          </span>
          <h4 className="text-2xl sm:text-3xl font-bold text-sky-800 underline decoration-amber-400 decoration-2 underline-offset-8">
            {localName || 'Curious Learner'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 pt-2 leading-relaxed">
            has successfully completed all 10 interactive modules of <strong>Unit 1: Water</strong>, demonstrating excellence in reading, recitation, grammar, vocabulary, and water conservation principles.
          </p>
        </div>

        {/* Key Achievement Badges */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-3">
            <span className="text-xs font-bold text-sky-800 block">Stars Earned</span>
            <span className="text-xl font-extrabold text-sky-600 flex items-center justify-center gap-1 mt-0.5">
              <Star className="w-4 h-4 fill-current text-amber-500" />
              {stars}
            </span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
            <span className="text-xs font-bold text-emerald-800 block">Modules</span>
            <span className="text-xl font-extrabold text-emerald-600 mt-0.5 block">
              {completedSteps.length} / 10
            </span>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <span className="text-xs font-bold text-amber-800 block">Grade</span>
            <span className="text-xl font-extrabold text-amber-600 mt-0.5 block">
              A+ Star
            </span>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="pt-6 flex items-center justify-between text-xs text-slate-500 max-w-lg mx-auto">
          <div className="text-center">
            <div className="font-serif italic font-bold text-slate-800 text-sm">Parvatbhai & Zarana</div>
            <div className="border-t border-slate-300 pt-1 mt-1">Water Family Mentors</div>
          </div>

          <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-500 flex items-center justify-center text-amber-600 text-[10px] font-bold uppercase rotate-12">
            Verified Seal
          </div>

          <div className="text-center">
            <div className="font-mono text-slate-800 font-bold text-xs">{new Date().toLocaleDateString()}</div>
            <div className="border-t border-slate-300 pt-1 mt-1">Date of Completion</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Certificate</span>
        </button>

        <button
          onClick={handleTriggerConfetti}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Celebrate Again 🎉</span>
        </button>

        <button
          onClick={onResetProgress}
          className="flex items-center gap-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Lesson Again</span>
        </button>
      </div>
    </div>
  );
};
