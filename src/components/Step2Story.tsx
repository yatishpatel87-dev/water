import React, { useState } from 'react';
import { 
  Volume2, 
  Play, 
  CheckCircle, 
  XCircle, 
  Music, 
  HelpCircle, 
  CloudRain, 
  Home, 
  ArrowDown, 
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import { STORY_DATA } from '../data/lessonData';
import { sound, speakText, speakGujarati, stopSpeaking } from '../utils/audio';

interface Step2StoryProps {
  onComplete: () => void;
  isCompleted: boolean;
  onAddStar: (count?: number) => void;
  showGujarati: boolean;
}

export const Step2Story: React.FC<Step2StoryProps> = ({
  onComplete,
  isCompleted,
  onAddStar,
  showGujarati
}) => {
  const [activeTab, setActiveTab] = useState<'story' | 'harvesting' | 'quiz' | 'song'>('story');
  const [isRaining, setIsRaining] = useState<boolean>(false);
  const [selectedHarvestingStep, setSelectedHarvestingStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isSinging, setIsSinging] = useState<boolean>(false);

  // Read aloud helper for paragraphs
  const handleReadText = (text: string) => {
    speakText(text, { rate: 0.8 });
  };

  // Zarana's Song Sing-Along
  const handleSingSong = () => {
    setIsSinging(true);
    sound.playWaterDrop();
    const songFull = STORY_DATA.song.lyrics.join(' ');
    speakText(songFull, {
      rate: 0.8,
      pitch: 1.15,
      onEnd: () => setIsSinging(false)
    });
  };

  // Trigger Monsoon Rain in the Rainwater Harvesting Simulation
  const handleStartRain = () => {
    setIsRaining(true);
    sound.playWaterDrop();
    setTimeout(() => {
      sound.playWaterDrop();
    }, 400);
    setTimeout(() => {
      sound.playSuccess();
      setIsRaining(false);
    }, 3200);
  };

  // Handle True / False quiz submission
  const handleAnswerTF = (questionId: number, val: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: val }));
    const question = STORY_DATA.trueFalseQuestions.find((q) => q.id === questionId);
    if (question && question.correctAnswer === val) {
      sound.playSuccess();
    } else {
      sound.playWrong();
    }
  };

  const handleEvaluateQuiz = () => {
    let score = 0;
    STORY_DATA.trueFalseQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    setQuizScore(score);
    if (score >= 3) {
      sound.playSuccess();
      onAddStar(2);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-500/10 via-teal-500/10 to-blue-500/10 border border-sky-200 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
              <span>Textbook Pages 2, 3 & 4 • Story & Science</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              The Water Family <span className="text-sky-600 font-normal">| ધ વોટર ફેમિલી</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Learn how Parvatbhai’s family valued water like gold, saved their village from drought, and taught everyone rainwater harvesting!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSingSong}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              <Music className="w-4 h-4" />
              <span>{isSinging ? 'Singing...' : 'Sing Zarana’s Song!'}</span>
            </button>
          </div>
        </div>

        {/* Section sub-tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-sky-200/60 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('story')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'story'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            📖 The Story Chapters
          </button>
          <button
            onClick={() => setActiveTab('harvesting')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'harvesting'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🌧️ Rainwater Harvesting Model
          </button>
          <button
            onClick={() => setActiveTab('song')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'song'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            🎵 Zarana’s Song
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            ✍️ True or False Quiz (Page 3)
          </button>
        </div>
      </div>

      {/* TAB 1: THE STORY CHAPTERS */}
      {activeTab === 'story' && (
        <div className="space-y-6">
          {/* Character Cards */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Meet The Water Family Members:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {STORY_DATA.characters.map((char, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-sky-300 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm mb-2">
                    {char.name[0]}
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{char.name}</h4>
                  <span className="text-[11px] font-semibold text-sky-700 block mb-1">{char.role}</span>
                  <p className="text-xs text-slate-600 leading-snug">{char.description}</p>
                  {showGujarati && (
                    <div className="flex items-center justify-between mt-2 border-t border-slate-100 pt-1.5">
                      <p className="text-[11px] text-slate-500 font-medium">
                        {char.gujarati}
                      </p>
                      <button
                        type="button"
                        onClick={() => speakGujarati(char.gujarati)}
                        className="p-1 text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded shrink-0 cursor-pointer"
                        title="ગુજરાતી અવાજ સાંભળો (0.8x)"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Illustrated Narrative Sections */}
          <div className="space-y-4">
            {/* Chapter 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                  Part 1 • The Valued Gold
                </span>
                <button
                  onClick={() => handleReadText(
                    "In a small village lived a wise farmer, Parvatbhai, and his wife Saritaben. Everyone called them the Water Family because they valued water like gold. Parvatbhai had built a Khet Talavdi in his field and a large underground tank at home to store rainwater. Their three daughters also loved saving water: Varsha was a mechanic who fixed every leaking tap, Vaari gave speeches on conservation, and young Zarana sang inspiring songs."
                  )}
                  className="text-xs text-sky-600 hover:text-sky-800 flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                In a small village lived a wise farmer, <strong>Parvatbhai</strong>, and his wife <strong>Saritaben</strong>. Everyone called them the <strong>“Water Family”</strong> because they valued water like gold. Parvatbhai had built a <em>‘Khet Talavdi’</em> (farm pond) in his field and a large underground tank at home to store rainwater.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Their three daughters also loved saving water. <strong>Varsha</strong> was the eldest; she was a mechanic who fixed any leaking tap she saw. <strong>Vaari</strong>, the second, often gave speeches in school and the Panchayat on water conservation. The youngest, <strong>Zarana</strong>, reminded everyone by singing songs.
              </p>
            </div>

            {/* Chapter 2: Careless Raju & The Drought */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                  Part 2 • Raju’s Mistake & The Drought
                </span>
                <button
                  onClick={() => handleReadText(
                    "But the other villagers were careless. One morning, their neighbour Raju was washing his bike with a pipe. Water was flowing everywhere. Saritaben gently advised him to use a bucket instead. But Raju laughed and said, We have plenty of water! Look at the river and wells! Even when little Zarana warned him, he ignored her. Two years later, the village faced a terrible drought. The river dried up, wells became empty, and Raju sat sadly with an empty pot."
                  )}
                  className="text-xs text-sky-600 hover:text-sky-800 flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                But the other villagers were careless. One morning, their neighbour <strong>Raju</strong> was washing his bike with a pipe. Water was flowing everywhere. Saritaben gently advised him to use a bucket instead. But Raju laughed and said, <em>“We have plenty of water! Look at the river and wells!”</em> Even when little Zarana warned him, he ignored her. Many villagers behaved the same way.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-xl text-xs sm:text-sm text-amber-900">
                <strong>After two years, the village faced a terrible drought.</strong> The river dried up, wells became empty, and people had no water even to drink. Raju sat sadly with an empty pot and admitted he had been foolish.
              </div>
            </div>

            {/* Chapter 3: Redemption & Government Support */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Part 3 • The District Collector & Village Harvest
                </span>
                <button
                  onClick={() => handleReadText(
                    "Ashamed, they went to Parvatbhai’s house. Raju said, We wasted water. Please help us. Kind-hearted Parvatbhai welcomed them and shared water from his underground tank, which still had plenty of stored rainwater. Just then, the District Collector arrived. He noticed the dry village but also saw Parvatbhai's green farm. The Collector agreed to provide government support to build underground tanks for all, on one condition: they must promise to harvest rainwater. The following year also brought less rain, but this time the village was prepared! Their tanks were full, and no one suffered."
                  )}
                  className="text-xs text-sky-600 hover:text-sky-800 flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Ashamed, they went to his house. Raju said, <em>“We wasted water. Please, help us.”</em> Kind-hearted Parvatbhai welcomed them and shared water from his underground tank.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Just then, the <strong>District Collector</strong> arrived to inspect the crisis. He noticed the dry village but also saw Parvatbhai’s lush green farm. <em>“This family is safe because they respected water,”</em> he told the villagers. The Collector agreed to provide government support to build underground tanks for all, on one condition—they must promise to harvest rainwater!
              </p>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3.5 rounded-r-xl text-xs sm:text-sm text-emerald-900 font-medium">
                The villagers worked hard with Parvatbhai’s help. Soon, every house had a tank. The following year also brought less rain, but this time the village was prepared. Their tanks were full, and no one suffered!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RAINWATER HARVESTING MODEL */}
      {activeTab === 'harvesting' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Interactive Rainwater Harvesting System
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Based on the textbook diagram on Page 2. See how rainwater moves from the roof to storage!
              </p>
            </div>
            <button
              id="simulate-rain-btn"
              onClick={handleStartRain}
              disabled={isRaining}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                isRaining
                  ? 'bg-sky-400 text-white animate-pulse'
                  : 'bg-sky-600 hover:bg-sky-700 text-white active:scale-95'
              }`}
            >
              <CloudRain className="w-4 h-4" />
              <span>{isRaining ? 'Monsoon Raining...' : 'Simulate Monsoon Rain 🌧️'}</span>
            </button>
          </div>

          {/* Interactive Visual Schematic */}
          <div className="relative bg-gradient-to-b from-sky-100 via-sky-50 to-amber-100/40 border border-sky-200 rounded-2xl p-6 min-h-[340px] flex flex-col justify-between overflow-hidden">
            {/* Animated raindrops overlay */}
            {isRaining && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-6 bg-sky-500 rounded-full animate-bounce opacity-80"
                    style={{
                      left: `${(i * 4.2) + Math.random() * 2}%`,
                      top: `${Math.random() * 30}%`,
                      animationDuration: `${0.6 + (i % 5) * 0.1}s`,
                      animationDelay: `${(i % 4) * 0.15}s`
                    }}
                  />
                ))}
              </div>
            )}

            {/* Top: The House & Roof Catchment */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-0">
              {STORY_DATA.harvestingDiagram.map((step) => {
                const isSelected = selectedHarvestingStep === step.step;
                return (
                  <div
                    key={step.step}
                    onClick={() => {
                      setSelectedHarvestingStep(step.step);
                      sound.playWaterDrop();
                    }}
                    className={`cursor-pointer rounded-xl p-4 transition-all border ${
                      isSelected
                        ? 'bg-white border-sky-500 shadow-md ring-2 ring-sky-300/60 -translate-y-1'
                        : 'bg-white/80 border-slate-200 hover:bg-white hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">
                        {step.step}
                      </span>
                      {isSelected && <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded">Active</span>}
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 leading-tight mb-1">
                      {step.name}
                    </h4>
                    {showGujarati && (
                      <p className="text-xs text-sky-700 font-semibold mb-1">
                        {step.gujarati}
                      </p>
                    )}
                    <p className="text-xs text-slate-600">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Flow Graphic / Animated Pipe */}
            <div className="mt-6 bg-white/90 backdrop-blur rounded-xl p-4 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isRaining ? 'bg-sky-500 animate-ping' : 'bg-emerald-500'}`} />
                <span className="text-xs font-bold text-slate-700">
                  {isRaining ? 'Status: Water is flowing through filtration into underground storage tank!' : 'System Status: Ready to capture seasonal rainwater.'}
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-sky-600" />
                <span>Click each of the 4 steps above to understand its function.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ZARANA'S SONG */}
      {activeTab === 'song' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
              <Music className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              Zarana’s Water Conservation Song
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              The little daughter sang this poem across the village to awaken everyone’s hearts to water preservation!
            </p>
          </div>

          <div className="max-w-md mx-auto bg-gradient-to-b from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3 shadow-xs">
            {STORY_DATA.song.lyrics.map((line, i) => (
              <p 
                key={i} 
                className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${
                  isSinging ? 'text-amber-700 scale-105' : 'text-slate-800'
                }`}
              >
                {line}
              </p>
            ))}

            {showGujarati && (
              <div className="pt-4 border-t border-amber-200 text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
                {STORY_DATA.song.lyricsGujarati}
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleSingSong}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isSinging ? 'Singing Along...' : 'Sing Along with Zarana'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TRUE OR FALSE QUIZ (PAGE 3) */}
      {activeTab === 'quiz' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
              <span>Textbook Page 3 • Practice A</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Read the sentences and write ‘True’ or ‘False’
            </h3>
            {showGujarati && (
              <p className="text-xs text-slate-500 mt-0.5">
                વાક્યો વાંચો અને સાચા માટે 'True' અથવા ખોટા માટે 'False' પસંદ કરો.
              </p>
            )}
          </div>

          <div className="space-y-4">
            {STORY_DATA.trueFalseQuestions.map((q) => {
              const selected = answers[q.id];
              const isAnswered = selected !== undefined && selected !== null;
              const isCorrect = selected === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isAnswered
                      ? isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-rose-50/60 border-rose-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-slate-500 text-xs sm:text-sm mt-0.5">{q.id}.</span>
                        <div>
                          <p className="font-bold text-slate-800 text-sm sm:text-base">
                            {q.question}
                          </p>
                          {showGujarati && (
                            <p className="text-xs text-slate-500 font-medium">
                              {q.questionGujarati}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleAnswerTF(q.id, true)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selected === true
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        True
                      </button>
                      <button
                        onClick={() => handleAnswerTF(q.id, false)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selected === false
                            ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        False
                      </button>
                    </div>
                  </div>

                  {/* Feedback explanation if answered */}
                  {isAnswered && (
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs">
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span className={isCorrect ? 'text-emerald-800 font-medium' : 'text-rose-800 font-medium'}>
                        {q.explanation}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleEvaluateQuiz}
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-xs active:scale-95"
            >
              Check My Answers
            </button>

            {quizScore !== null && (
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                Score: <span className="text-sky-600 font-extrabold">{quizScore}</span> / 4 correct
              </span>
            )}
          </div>
        </div>
      )}

      {/* Completion Banner */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Step 2 Completed?
          </h4>
          <p className="text-xs text-slate-500">
            Proceed to Step 3 to read the core passage "Water is Life" and organize the Mind Map.
          </p>
        </div>
        <button
          id="complete-step-2-btn"
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
          <span>{isCompleted ? 'Completed (Step 2)' : 'Complete Step 2 & Continue'}</span>
        </button>
      </div>
    </div>
  );
};
