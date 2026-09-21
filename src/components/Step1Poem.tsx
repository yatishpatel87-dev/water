import React, { useState } from 'react';
import { 
  Volume2, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Plus, 
  Play, 
  RotateCcw,
  Check
} from 'lucide-react';
import { POEM_STANZAS, CUSTOM_STANZA_OPTIONS } from '../data/lessonData';
import { sound, speakText, speakGujarati, stopSpeaking } from '../utils/audio';

interface Step1PoemProps {
  onComplete: () => void;
  isCompleted: boolean;
  onAddStar: (count?: number) => void;
  showGujarati: boolean;
}

export const Step1Poem: React.FC<Step1PoemProps> = ({
  onComplete,
  isCompleted,
  onAddStar,
  showGujarati
}) => {
  const [activeStanzaIdx, setActiveStanzaIdx] = useState<number>(0);
  const [isKnocking, setIsKnocking] = useState<boolean>(false);
  const [doorOpen, setDoorOpen] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Custom Stanza Builder State (Page 2 practice: plastic bag, junk food, fresh fruit)
  const [selectedWord, setSelectedWord] = useState<string>('plastic bag');
  const [userDecision, setUserDecision] = useState<'welcome' | 'not_allowed' | null>(null);
  const [customResponse, setCustomResponse] = useState<string>('');
  const [customFeedback, setCustomFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [createdStanzas, setCreatedStanzas] = useState<Array<{
    visitor: string;
    decision: 'welcome' | 'not_allowed';
    response: string;
  }>>([]);

  const currentStanza = POEM_STANZAS[activeStanzaIdx];

  const handleKnock = () => {
    setIsKnocking(true);
    sound.playKnock();
    setTimeout(() => {
      setIsKnocking(false);
      setDoorOpen(true);
      if (currentStanza.isAllowed) {
        sound.playWaterDrop();
      }
    }, 450);
  };

  const handleRecite = (stanza = currentStanza) => {
    setIsPlayingAudio(true);
    sound.playKnock();
    setTimeout(() => {
      speakText(stanza.audioText, {
        rate: 0.8,
        onEnd: () => setIsPlayingAudio(false)
      });
    }, 300);
  };

  const handleSelectStanza = (idx: number) => {
    stopSpeaking();
    setIsPlayingAudio(false);
    setActiveStanzaIdx(idx);
    setDoorOpen(false);
  };

  const handleValidateCustomStanza = () => {
    const option = CUSTOM_STANZA_OPTIONS.find((o) => o.name === selectedWord);
    if (!option || !userDecision) return;

    const shouldAllow = option.correctAllowed;
    const isCorrect = (userDecision === 'welcome') === shouldAllow;

    if (isCorrect) {
      sound.playSuccess();
      setCustomFeedback({
        isCorrect: true,
        text: `Excellent! ${selectedWord === 'fresh fruit' ? 'Fresh fruit is healthy, so it is welcomed!' : `${selectedWord} is harmful, so it is NOT allowed!`}`
      });

      const newStanza = {
        visitor: selectedWord,
        decision: userDecision,
        response: customResponse.trim() || option.correctResponse
      };

      setCreatedStanzas((prev) => [...prev, newStanza]);
      onAddStar(1);

      // Recite newly created stanza
      const textToSpeak = `Knock knock! Who is there? I am ${selectedWord}. ${newStanza.response}`;
      speakText(textToSpeak);
    } else {
      sound.playWrong();
      setCustomFeedback({
        isCorrect: false,
        text: `Think carefully! Should "${selectedWord}" be allowed into our clean world or turned away?`
      });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-blue-500/10 border border-sky-200 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
              <span>Textbook Page 1 • Listening & Recitation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Recite & Enjoy: “Knock Knock”
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Listen to the visitors knocking at the door. Welcome clean, healthy things and reject smoke and pollution!
            </p>
            {showGujarati && (
              <p className="text-xs text-sky-700 font-medium mt-1">
                દરવાજે કોણ આવે છે તે સાંભળો અને કવિતા ગાઓ. સ્વચ્છ વસ્તુઓનું સ્વાગત કરો અને પ્રદૂષણને રોકો.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="recite-all-btn"
              onClick={() => handleRecite()}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs active:scale-95 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingAudio ? 'Reciting...' : 'Read Aloud'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: The Door & The Stanzas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Wooden Door Simulator */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col items-center text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Click to Knock
          </span>

          {/* Realistic Wooden Door Frame */}
          <div className="relative w-52 h-72 sm:w-60 sm:h-80 bg-amber-950 rounded-t-3xl rounded-b-lg p-3 shadow-inner border-4 border-amber-900 flex flex-col justify-between overflow-hidden">
            {/* Inside Reveal Area */}
            <div className="absolute inset-3 bg-gradient-to-b from-sky-100 to-amber-50 rounded-t-2xl rounded-b flex flex-col items-center justify-center p-4">
              <span className="text-6xl mb-2 animate-bounce">{currentStanza.imageIcon}</span>
              <p className="font-bold text-sm text-slate-800 capitalize">
                {currentStanza.visitor}
              </p>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full mt-2 ${
                currentStanza.isAllowed
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {currentStanza.isAllowed ? (
                  <><CheckCircle className="w-3 h-3" /> Welcome, Dear!</>
                ) : (
                  <><XCircle className="w-3 h-3" /> Not Allowed!</>
                )}
              </span>
            </div>

            {/* Swinging Door Panel */}
            <div 
              onClick={handleKnock}
              className={`absolute inset-3 bg-amber-800 rounded-t-2xl rounded-b border-2 border-amber-700 shadow-md flex flex-col items-center justify-center cursor-pointer transition-transform duration-700 origin-left select-none ${
                doorOpen ? '-rotate-y-80 opacity-20' : 'rotate-y-0 opacity-100'
              } ${isKnocking ? 'scale-95 ring-4 ring-amber-400' : 'hover:brightness-105'}`}
            >
              {/* Door panels design */}
              <div className="w-full h-full p-3 flex flex-col justify-around">
                <div className="w-full h-20 border border-amber-900/60 rounded bg-amber-850/50 shadow-inner" />
                <div className="w-full h-20 border border-amber-900/60 rounded bg-amber-850/50 shadow-inner flex items-center justify-end pr-3">
                  {/* Brass Door Knob */}
                  <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-600 shadow-sm" />
                </div>
                <div className="w-full h-20 border border-amber-900/60 rounded bg-amber-850/50 shadow-inner" />
              </div>
            </div>
          </div>

          {/* Knock Action Controls */}
          <div className="mt-5 flex flex-wrap gap-2 justify-center w-full">
            <button
              id="knock-door-button"
              onClick={handleKnock}
              disabled={isKnocking}
              className="flex-1 min-w-[130px] bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-1.5"
            >
              <span>✊ Knock Knock!</span>
            </button>
            <button
              id="close-door-button"
              onClick={() => setDoorOpen(!doorOpen)}
              className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold"
            >
              {doorOpen ? 'Close Door' : 'Peek Inside'}
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mt-2">
            Click the door or button to knock and hear who is outside!
          </p>
        </div>

        {/* Right: The Rhyme Display & Navigation */}
        <div className="lg:col-span-7 space-y-4">
          {/* Stanza selector pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {POEM_STANZAS.map((stanza, idx) => (
              <button
                key={stanza.id}
                onClick={() => handleSelectStanza(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  activeStanzaIdx === idx
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{stanza.imageIcon}</span>
                <span className="capitalize">{stanza.visitor.replace('a ', '')}</span>
              </button>
            ))}
          </div>

          {/* Active Stanza Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                Stanza {activeStanzaIdx + 1} of 5
              </span>
              <button
                onClick={() => handleRecite(currentStanza)}
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1 hover:underline"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Listen to this stanza
              </button>
            </div>

            {/* Formatted Poem Text */}
            <div className="space-y-2 text-slate-800 text-base sm:text-lg font-medium leading-relaxed bg-slate-50/70 p-5 rounded-xl border border-slate-100">
              <p className="text-slate-500 italic">Knock knock (2)</p>
              <p className="text-slate-700 font-semibold">Who is there?</p>
              <p className="text-sky-700 font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>{currentStanza.imageIcon}</span>
                <span>I am {currentStanza.visitor}.</span>
              </p>
              <p className={`font-semibold ${currentStanza.isAllowed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {currentStanza.response}
              </p>
            </div>

            {/* Gujarati explanation */}
            {showGujarati && (
              <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-3 text-xs text-sky-900 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">ગુજરાતી અર્થ: </span>
                    <span>{currentStanza.gujaratiMeaning}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => speakGujarati(currentStanza.gujaratiMeaning)}
                  className="p-1 rounded-md text-sky-700 hover:bg-sky-100 hover:scale-110 transition-transform cursor-pointer shrink-0"
                  title="શુદ્ધ ભારતીય મહિલા અવાજમાં ગુજરાતી અર્થ સાંભળો (0.8x)"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRACTICE: Page 2 - Write and Recite New Stanzas */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
            <span>Textbook Page 2 • Practice</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            Compose New Stanzas
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Use the words: <strong className="text-slate-900">‘plastic bag’</strong>, <strong className="text-slate-900">‘junk food’</strong>, and <strong className="text-slate-900">‘fresh fruit’</strong> to create new stanzas!
          </p>
          {showGujarati && (
            <p className="text-xs text-slate-500 mt-0.5">
              ‘plastic bag’, ‘junk food’ અને ‘fresh fruit’ શબ્દોનો ઉપયોગ કરીને નવી કડી બનાવો અને બોલો.
            </p>
          )}
        </div>

        {/* Builder Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CUSTOM_STANZA_OPTIONS.map((opt) => (
            <button
              key={opt.name}
              onClick={() => {
                setSelectedWord(opt.name);
                setUserDecision(null);
                setCustomFeedback(null);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedWord === opt.name
                  ? 'border-sky-500 bg-sky-50/80 ring-2 ring-sky-300'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="text-2xl mb-1">{opt.icon}</div>
              <div className="font-bold text-sm text-slate-800 capitalize">{opt.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{opt.gujarati}</div>
            </button>
          ))}
        </div>

        {/* Live Stanza Form */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
          <div className="space-y-1.5 text-sm font-medium text-slate-700">
            <p className="text-slate-400 italic">Knock knock (2)</p>
            <p className="font-bold">Who is there?</p>
            <p className="text-sky-700 font-bold text-base">
              I am <span className="underline capitalize">{selectedWord}</span>.
            </p>
          </div>

          {/* Decision Buttons */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Will you welcome or reject this visitor?
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setUserDecision('welcome')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  userDecision === 'welcome'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>You are welcome, dear!</span>
              </button>
              <button
                onClick={() => setUserDecision('not_allowed')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                  userDecision === 'not_allowed'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50'
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>Sorry... you are not allowed!</span>
              </button>
            </div>
          </div>

          {/* Optional reason / customized sentence */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Add custom reason / words (Optional):
            </label>
            <input
              type="text"
              value={customResponse}
              onChange={(e) => setCustomResponse(e.target.value)}
              placeholder="e.g., You harm our planet / You give us strong energy..."
              className="w-full text-xs sm:text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Submit / Check Button */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleValidateCustomStanza}
              disabled={!userDecision}
              className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                userDecision
                  ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Recite & Save My Stanza</span>
            </button>
          </div>

          {/* Feedback */}
          {customFeedback && (
            <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              customFeedback.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {customFeedback.isCorrect ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
              <span>{customFeedback.text}</span>
            </div>
          )}
        </div>

        {/* List of Student-Created Stanzas */}
        {createdStanzas.length > 0 && (
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Created Stanzas ({createdStanzas.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {createdStanzas.map((st, i) => (
                <div key={i} className="bg-sky-50/70 border border-sky-100 rounded-xl p-3 text-xs space-y-1">
                  <p className="font-semibold text-slate-700">Knock knock! Who is there?</p>
                  <p className="text-sky-800 font-bold">I am {st.visitor}.</p>
                  <p className={st.decision === 'welcome' ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                    {st.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step Completion Banner */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Ready for the story?
          </h4>
          <p className="text-xs text-slate-500">
            Mark this step complete and continue to Page 2: "The Water Family".
          </p>
        </div>
        <button
          id="complete-step-1-btn"
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
          <span>{isCompleted ? 'Completed (Step 1)' : 'Complete Step 1 & Proceed'}</span>
        </button>
      </div>
    </div>
  );
};
