import React, { useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Settings2, 
  Languages, 
  Play, 
  RotateCcw,
  Sliders,
  Award
} from 'lucide-react';
import { 
  getVoiceEngineDiagnostics, 
  getGujaratiVoiceSpeed, 
  setGujaratiVoiceSpeed, 
  getGujaratiVoicePitch, 
  setGujaratiVoicePitch, 
  speakGujarati, 
  stopSpeaking,
  purifyGujaratiText,
  VoiceEngineDiagnostics 
} from '../utils/audio';

interface GujaratiPronunciationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_PHRASES = [
  {
    title: 'મુખ્ય સૂત્ર (Motto)',
    text: 'જળ એ જ જીવન છે. પાણી બચાવો, જીવન બચાવો.',
    category: 'General'
  },
  {
    title: 'કવિતા (Knock Knock Poem)',
    text: 'હું સ્વચ્છ નદી છું - આપનું હાર્દિક સ્વાગત છે!',
    category: 'Poem'
  },
  {
    title: 'જળ પરિવાર વાર્તા (Story)',
    text: 'પરબતભાઈ શાણા ખેડૂત હતા. તેમણે ખેતતલાવડી અને ભૂગર્ભ ટાંકો બનાવ્યો.',
    category: 'Story'
  },
  {
    title: 'જળસ્ત્રોતો અને જીવો (Vocabulary)',
    text: 'દેડકો, કાચબો, માછલી, તળાવ અને સરોવર જળચર જીવો છે.',
    category: 'Vocab'
  },
  {
    title: 'સંયોજકો (Conjunctions)',
    text: 'અમે પાણી બચાવીએ છીએ કારણ કે પાણી વગર જીવન શક્ય નથી.',
    category: 'Grammar'
  }
];

export const GujaratiPronunciationModal: React.FC<GujaratiPronunciationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [diagnostics, setDiagnostics] = useState<VoiceEngineDiagnostics | null>(null);
  const [speed, setSpeed] = useState<number>(getGujaratiVoiceSpeed());
  const [pitch, setPitch] = useState<number>(getGujaratiVoicePitch());
  const [customText, setCustomText] = useState<string>('નમસ્તે! ગુજરાતી ભાષાનો શુદ્ધ ઉચ્ચાર સાંભળો.');
  const [activePlayingIdx, setActivePlayingIdx] = useState<number | null>(null);
  const [isCustomPlaying, setIsCustomPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setDiagnostics(getVoiceEngineDiagnostics());
      setSpeed(getGujaratiVoiceSpeed());
      setPitch(getGujaratiVoicePitch());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    setGujaratiVoiceSpeed(newSpeed);
  };

  const handlePitchChange = (newPitch: number) => {
    setPitch(newPitch);
    setGujaratiVoicePitch(newPitch);
  };

  const handlePlaySample = (text: string, idx: number) => {
    setActivePlayingIdx(idx);
    setIsCustomPlaying(false);
    speakGujarati(text, {
      rate: speed,
      pitch: pitch,
      onEnd: () => setActivePlayingIdx(null)
    });
  };

  const handlePlayCustom = () => {
    if (!customText.trim()) return;
    setIsCustomPlaying(true);
    setActivePlayingIdx(null);
    speakGujarati(customText, {
      rate: speed,
      pitch: pitch,
      onEnd: () => setIsCustomPlaying(false)
    });
  };

  const handleResetDefaults = () => {
    handleSpeedChange(0.8);
    handlePitchChange(1.02);
  };

  return (
    <div 
      id="gujarati-pronunciation-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 text-xl shadow-xs">
              🎙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  ગુજરાતી ભાષા ઉચ્ચાર શુદ્ધિ
                </h3>
                <span className="bg-emerald-400 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Pure Voice
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 font-medium">
                Gujarati Pronunciation Purification & Indian Voice Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Active Voice Diagnosis Banner */}
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-emerald-900">
                  {diagnostics?.engineLabel || 'શુદ્ધ ગુજરાતી સ્પીચ એન્જિન'}
                </span>
              </div>
              <p className="text-xs text-emerald-800/80 pl-6">
                અવાજ: <span className="font-semibold text-emerald-950">{diagnostics?.voiceName || 'System Indian Voice'}</span> 
                {diagnostics?.isNativeGujarati 
                  ? ' (નેટિવ ગુજરાતી અવાજ સક્રિય)' 
                  : ' (ઇન્ડિક દેવનાગરી ફોનેટિક્સ દ્વારા શુદ્ધ ઉચ્ચાર)'}
              </p>
            </div>

            <button
              onClick={() => handlePlaySample('નમસ્તે વિદ્યાર્થી મિત્રો! ગુજરાતી ભાષાની ઉચ્ચાર શુદ્ધિ સક્રિય છે.', 999)}
              className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-2xs transition-all cursor-pointer shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>ટેસ્ટ અવાજ (Test Voice)</span>
            </button>
          </div>

          {/* Speed & Pitch Controls */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  અવાજ નિયંત્રણ (Voice Tuning)
                </span>
              </div>
              <button
                onClick={handleResetDefaults}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> ડિફોલ્ટ (0.8x)
              </button>
            </div>

            {/* Speed Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-700 font-bold">વાચન ઝડપ (Reading Speed):</span>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  {speed.toFixed(2)}x {speed === 0.8 ? '(પ્રમાણિત - Standard)' : ''}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: '0.70x શાંત', val: 0.7 },
                  { label: '0.80x પ્રમાણિત', val: 0.8 },
                  { label: '0.85x સ્પષ્ટ', val: 0.85 },
                  { label: '1.00x સામાન્ય', val: 1.0 }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    onClick={() => handleSpeedChange(preset.val)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      Math.abs(speed - preset.val) < 0.02
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pitch Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-700 font-bold">અવાજનો સૂર / પિચ (Voice Tone / Pitch):</span>
                <span className="text-teal-700 font-bold bg-teal-100 px-2 py-0.5 rounded">
                  {pitch.toFixed(2)}x
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'સ્વાભાવિક (1.00x)', val: 1.0 },
                  { label: 'મધુર (1.02x)', val: 1.02 },
                  { label: 'સ્પષ્ટ (1.08x)', val: 1.08 }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    onClick={() => handlePitchChange(preset.val)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      Math.abs(pitch - preset.val) < 0.02
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Phrases to Test Pronunciation Purity */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              શુદ્ધ ઉચ્ચારણ નમૂનાઓ (Textbook Sample Verification)
            </h4>
            <div className="space-y-2">
              {SAMPLE_PHRASES.map((sample, idx) => {
                const isPlaying = activePlayingIdx === idx;
                return (
                  <div
                    key={sample.title}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isPlaying 
                        ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                        {sample.title}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-slate-800">
                        {sample.text}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlaySample(sample.text, idx)}
                      className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shrink-0 ${
                        isPlaying
                          ? 'bg-emerald-600 text-white shadow-xs animate-pulse'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                      title="શુદ્ધ ઉચ્ચાર સાંભળો"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{isPlaying ? 'ચાલુ...' : 'સાંભળો'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Text Pronunciation Tester */}
          <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900">
                કસ્ટમ વાક્ય ચકાસણી (Test Any Custom Sentence)
              </h4>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="અહીં કોઈપણ ગુજરાતી વાક્ય લખો..."
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-sky-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
              />
              <button
                onClick={handlePlayCustom}
                disabled={!customText.trim()}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isCustomPlaying ? 'વાચન શરૂ...' : 'શુદ્ધ ઉચ્ચાર સાંભળો'}</span>
              </button>
            </div>
          </div>

          {/* Purification Rules Highlights */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2.5">
            <h5 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              ઉચ્ચાર શુદ્ધિમાં શામેલ સુધારાઓ (Pronunciation Enhancements):
            </h5>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-slate-800">સંકેત સફાઈ:</strong> કૌંસ <code className="bg-white px-1 py-0.5 rounded border border-slate-200">( )</code>, ડૅશ <code className="bg-white px-1 py-0.5 rounded border border-slate-200">-</code>, અને સ્લેશ <code className="bg-white px-1 py-0.5 rounded border border-slate-200">/</code> આપોઆપ સહજ વિરામચિહ્નમાં રૂપાંતરિત થાય છે.
              </li>
              <li>
                <strong className="text-slate-800">શુદ્ધ અંક ઉચ્ચારણ:</strong> <code className="bg-white px-1 py-0.5 rounded border border-slate-200">૦.૮</code> “શૂન્ય પોઇન્ટ આઠ” તરીકે અને ક્રમાંકો શુદ્ધ ગુજરાતી શબ્દોમાં બોલાય છે.
              </li>
              <li>
                <strong className="text-slate-800">શુદ્ધ મૌખિક ગતિ:</strong> <code className="bg-white px-1 py-0.5 rounded border border-slate-200">0.8x</code> ની ધીમી અને શાંત ગતિથી વિદ્યાર્થીઓ દરેક માત્રા અને જોડણી સ્પષ્ટ સમજી શકે છે.
              </li>
              <li>
                <strong className="text-slate-800">ફોનેટિક બ્રિજ:</strong> કોઈપણ બ્રાઉઝર કે ઉપકરણ પર ગુજરાતી અક્ષરો તૂટ્યા વિના અસ્ખલિત ભારતીય ઉચ્ચારમાં સંભળાય છે.
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 sm:p-4 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-medium">
            🇮🇳 Pure Indian Female Voice Engine • 0.8x instructional cadence
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            પૂર્ણ (Done)
          </button>
        </div>
      </div>
    </div>
  );
};
