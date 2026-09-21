import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  X, 
  Sparkles, 
  Star, 
  Medal, 
  Flame, 
  MapPin, 
  School, 
  Users, 
  Search, 
  CheckCircle2, 
  Heart,
  Globe2,
  TrendingUp,
  Award
} from 'lucide-react';
import { sfx } from '../utils/audio';
import { triggerStarMilestoneConfetti } from '../utils/confetti';

export interface LeaderboardEntry {
  id: string;
  rank?: number;
  name: string;
  nameGujarati?: string;
  city: string;
  cityGujarati: string;
  school: string;
  schoolGujarati: string;
  stars: number;
  completedStepsCount: number;
  badge: string;
  badgeGujarati: string;
  streakDays: number;
  isUser?: boolean;
  avatarBg: string;
}

interface GlobalLearningRankModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStars: number;
  userCompletedStepsCount: number;
  studentName: string;
  showGujarati: boolean;
}

// Rich mock data representing Grade 8 students from various Gujarat districts & Indian schools
const BASE_LEADERBOARD: Omit<LeaderboardEntry, 'rank'>[] = [
  {
    id: 's1',
    name: 'Priya Patel',
    nameGujarati: 'પ્રિયા પટેલ',
    city: 'Ahmedabad',
    cityGujarati: 'અમદાવાદ',
    school: 'Shree Swaminarayan Gurukul',
    schoolGujarati: 'શ્રી સ્વામિનારાયણ ગુરુકુળ',
    stars: 52,
    completedStepsCount: 10,
    badge: 'Unit 1 Grandmaster 🏆',
    badgeGujarati: 'પાઠ ૧ ગ્રાન્ડમાસ્ટર 🏆',
    streakDays: 14,
    avatarBg: 'bg-amber-500'
  },
  {
    id: 's2',
    name: 'Aarav Shah',
    nameGujarati: 'આરવ શાહ',
    city: 'Surat',
    cityGujarati: 'સુરત',
    school: 'Kendriya Vidyalaya No. 1',
    schoolGujarati: 'કેન્દ્રીય વિદ્યાલય નં. ૧',
    stars: 46,
    completedStepsCount: 10,
    badge: 'Metamorphosis Ace 🦋',
    badgeGujarati: 'પતંગિયા ચક્ર નિષ્ણાત 🦋',
    streakDays: 11,
    avatarBg: 'bg-emerald-500'
  },
  {
    id: 's3',
    name: 'Diya Joshi',
    nameGujarati: 'દીયા જોશી',
    city: 'Rajkot',
    cityGujarati: 'રાજકોટ',
    school: 'Sardar Patel High School',
    schoolGujarati: 'સરદાર પટેલ હાઇસ્કૂલ',
    stars: 41,
    completedStepsCount: 10,
    badge: 'Poetry Laureate 💧',
    badgeGujarati: 'જળ કવિતા રત્ન 💧',
    streakDays: 9,
    avatarBg: 'bg-sky-500'
  },
  {
    id: 's4',
    name: 'Kabir Mehta',
    nameGujarati: 'કબીર મહેતા',
    city: 'Vadodara',
    cityGujarati: 'વડોદરા',
    school: 'Baroda High School (Alkapuri)',
    schoolGujarati: 'બરોડા હાઇસ્કૂલ (અલકાપુરી)',
    stars: 38,
    completedStepsCount: 10,
    badge: 'Grammar Wizard 📚',
    badgeGujarati: 'વ્યાકરણ વિઝાર્ડ 📚',
    streakDays: 8,
    avatarBg: 'bg-indigo-500'
  },
  {
    id: 's5',
    name: 'Ananya Dave',
    nameGujarati: 'અનન્યા દવે',
    city: 'Bhavnagar',
    cityGujarati: 'ભાવનગર',
    school: 'Fatima Convent High School',
    schoolGujarati: 'ફાતિમા કોન્વેન્ટ સ્કૂલ',
    stars: 34,
    completedStepsCount: 10,
    badge: 'Aqua Scientist 🌊',
    badgeGujarati: 'જળ વિજ્ઞાની 🌊',
    streakDays: 7,
    avatarBg: 'bg-teal-500'
  },
  {
    id: 's6',
    name: 'Devansh Parmar',
    nameGujarati: 'દેવાંશ પરમાર',
    city: 'Gandhinagar',
    cityGujarati: 'ગાંધીનગર',
    school: 'Adani Vidya Mandir',
    schoolGujarati: 'અદાણી વિદ્યા મંદિર',
    stars: 31,
    completedStepsCount: 9,
    badge: 'Pronunciation Pro 🎙️',
    badgeGujarati: 'શુદ્ધ ઉચ્ચાર માસ્ટર 🎙️',
    streakDays: 6,
    avatarBg: 'bg-purple-500'
  },
  {
    id: 's7',
    name: 'Tanvi Solanki',
    nameGujarati: 'તન્વી સોલંકી',
    city: 'Jamnagar',
    cityGujarati: 'જામનગર',
    school: "St. Xavier's High School",
    schoolGujarati: "સેન્ટ ઝેવિયર્સ હાઈસ્કૂલ",
    stars: 28,
    completedStepsCount: 9,
    badge: 'Vocabulary Star ⭐',
    badgeGujarati: 'શબ્દભંડોળ સ્ટાર ⭐',
    streakDays: 5,
    avatarBg: 'bg-rose-500'
  },
  {
    id: 's8',
    name: 'Harshil Vora',
    nameGujarati: 'હર્ષિલ વોરા',
    city: 'Junagadh',
    cityGujarati: 'જૂનાગઢ',
    school: 'Swami Vivekananda Vidyalaya',
    schoolGujarati: 'સ્વામી વિવેકાનંદ વિદ્યાલય',
    stars: 25,
    completedStepsCount: 8,
    badge: 'Preposition Explorer 🧭',
    badgeGujarati: 'પ્રેપોઝિશન સાહસી 🧭',
    streakDays: 5,
    avatarBg: 'bg-cyan-500'
  },
  {
    id: 's9',
    name: 'Meera Rathod',
    nameGujarati: 'મીરા રાઠોડ',
    city: 'Mehsana',
    cityGujarati: 'મહેસાણા',
    school: 'The Modern English School',
    schoolGujarati: 'ધ મોડર્ન ઇંગ્લિશ સ્કૂલ',
    stars: 22,
    completedStepsCount: 8,
    badge: 'Water Saver Hero 🌿',
    badgeGujarati: 'જળ સંરક્ષક નાયક 🌿',
    streakDays: 4,
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 's10',
    name: 'Kavya Bhatt',
    nameGujarati: 'કાવ્યા ભટ્ટ',
    city: 'Anand',
    cityGujarati: 'આણંદ',
    school: 'Anand Niketan Vidyalaya',
    schoolGujarati: 'આણંદ નિકેતન વિદ્યાલય',
    stars: 19,
    completedStepsCount: 7,
    badge: 'Reading Champion 📖',
    badgeGujarati: 'વાચન ચેમ્પિયન 📖',
    streakDays: 3,
    avatarBg: 'bg-amber-600'
  },
  {
    id: 's11',
    name: 'Rohan Trivedi',
    nameGujarati: 'રોહન ત્રિવેદી',
    city: 'Bharuch',
    cityGujarati: 'ભરૂચ',
    school: 'Delhi Public School',
    schoolGujarati: 'દિલ્હી પબ્લિક સ્કૂલ',
    stars: 16,
    completedStepsCount: 6,
    badge: 'Curious Learner 💡',
    badgeGujarati: 'જિજ્ઞાસુ વિદ્યાર્થી 💡',
    streakDays: 3,
    avatarBg: 'bg-sky-600'
  },
  {
    id: 's12',
    name: 'Jia Vaghela',
    nameGujarati: 'જીયા વાઘેલા',
    city: 'Bhuj (Kutch)',
    cityGujarati: 'ભુજ (કચ્છ)',
    school: 'Army Public School',
    schoolGujarati: 'આર્મી પબ્લિક સ્કૂલ',
    stars: 13,
    completedStepsCount: 5,
    badge: 'Active Explorer 🚀',
    badgeGujarati: 'ઉત્સાહી શોધક 🚀',
    streakDays: 2,
    avatarBg: 'bg-violet-500'
  }
];

const COMMUNITY_PULSE = [
  'Priya (Ahmedabad) scored 10/10 in Prepositions Quiz!',
  'Aarav (Surat) generated a custom 4-line water poem!',
  'Devansh (Gandhinagar) practiced pure Gujarati pronunciation!',
  'Diya (Rajkot) reached 40 stars milestone!'
];

export const GlobalLearningRankModal: React.FC<GlobalLearningRankModalProps> = ({
  isOpen,
  onClose,
  userStars,
  userCompletedStepsCount,
  studentName,
  showGujarati
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'weekly' | 'gujarat'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasCheered, setHasCheered] = useState(false);
  const [cheerCount, setCheerCount] = useState(148);

  const displayName = studentName.trim() || 'You (Curious Learner)';
  const displayNameGujarati = studentName.trim() || 'તમે (વિદ્યાર્થી)';

  // Determine user tier based on stars
  const userTier = useMemo(() => {
    if (userStars >= 40) {
      return {
        title: 'Diamond Aqua Scholar',
        titleGujarati: 'હીરક જળ રત્ન સ્કોલર',
        color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
        badge: '💎 Tier 1'
      };
    } else if (userStars >= 25) {
      return {
        title: 'Master Hydrologist',
        titleGujarati: 'નિષ્ણાત જળ અભ્યાસુ',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        badge: '🌟 Tier 2'
      };
    } else if (userStars >= 12) {
      return {
        title: 'River Guardian',
        titleGujarati: 'નદી સંરક્ષક',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        badge: '🌿 Tier 3'
      };
    } else {
      return {
        title: 'Aqua Explorer',
        titleGujarati: 'જળ સંશોધક',
        color: 'text-sky-600 bg-sky-50 border-sky-200',
        badge: '💧 Tier 4'
      };
    }
  }, [userStars]);

  // Combine user into leaderboard and calculate ranks dynamically
  const { rankedList, userRank } = useMemo(() => {
    const userEntry: Omit<LeaderboardEntry, 'rank'> = {
      id: 'current-user',
      name: displayName,
      nameGujarati: displayNameGujarati,
      city: 'Gujarat, India',
      cityGujarati: 'ગુજરાત, ભારત',
      school: 'Your Class 8 School',
      schoolGujarati: 'તમારી ધોરણ ૮ શાળા',
      stars: userStars,
      completedStepsCount: userCompletedStepsCount,
      badge: userCompletedStepsCount >= 10 ? 'Unit 1 Certified 🎓' : `${userTier.title} 🌊`,
      badgeGujarati: userCompletedStepsCount >= 10 ? 'પાઠ ૧ પ્રમાણિત 🎓' : `${userTier.titleGujarati} 🌊`,
      streakDays: Math.max(1, Math.min(10, Math.floor(userStars / 3) + 1)),
      isUser: true,
      avatarBg: 'bg-gradient-to-tr from-sky-500 to-indigo-600'
    };

    // Filter by tab if applicable
    let items = [...BASE_LEADERBOARD, userEntry];

    if (activeTab === 'gujarat') {
      items = items.filter(item => item.city !== 'Delhi' && item.city !== 'Mumbai');
    }

    // Sort primarily by stars (descending), then by completed steps
    items.sort((a, b) => {
      if (b.stars !== a.stars) return b.stars - a.stars;
      return b.completedStepsCount - a.completedStepsCount;
    });

    // Assign sequential 1-based ranks
    let myRank = 1;
    const ranked = items.map((item, idx) => {
      const r = idx + 1;
      if (item.isUser) myRank = r;
      return { ...item, rank: r };
    });

    return { rankedList: ranked, userRank: myRank };
  }, [displayName, displayNameGujarati, userStars, userCompletedStepsCount, userTier, activeTab]);

  // Filtered by search query
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return rankedList;
    const q = searchQuery.toLowerCase();
    return rankedList.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.school.toLowerCase().includes(q) ||
      (item.nameGujarati && item.nameGujarati.includes(q)) ||
      (item.cityGujarati && item.cityGujarati.includes(q))
    );
  }, [rankedList, searchQuery]);

  if (!isOpen) return null;

  const handleSendCheer = () => {
    if (!hasCheered) {
      sfx.cheer();
      triggerStarMilestoneConfetti({ isMilestone: false });
      setCheerCount(prev => prev + 1);
      setHasCheered(true);
    }
  };

  return (
    <div 
      id="global-learning-rank-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white border border-slate-200 w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-700 via-indigo-800 to-sky-900 text-white p-5 sm:p-6 shrink-0 relative overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute left-1/3 -top-10 w-24 h-24 bg-amber-400/15 rounded-full blur-lg pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/40 text-amber-300 flex items-center justify-center shadow-inner">
                <Trophy className="w-6 h-6 fill-amber-400 text-amber-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                    Class 8 English
                  </span>
                  <span className="text-[11px] text-sky-200 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    1,428 Students Live
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                  Global Learning Rank
                </h2>
                <p className="text-xs text-sky-200 font-medium">
                  {showGujarati 
                    ? 'સમગ્ર ગુજરાત અને ભારતના ધોરણ ૮ ના વિદ્યાર્થીઓનું લીડરબોર્ડ' 
                    : 'Leaderboard of Grade 8 students mastering Unit 1: Water'}
                </p>
              </div>
            </div>

            <button
              id="close-rank-modal-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close Leaderboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User's Standout Rank Banner */}
          <div className="mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center shadow-md shadow-amber-500/30">
                #{userRank}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{displayName}</span>
                  <span className="text-[10px] font-extrabold bg-sky-400/30 border border-sky-300/40 text-sky-200 px-1.5 py-0.5 rounded">
                    YOU
                  </span>
                </div>
                <span className="text-xs text-amber-200 font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {showGujarati ? userTier.titleGujarati : userTier.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>{userStars} Stars</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{userCompletedStepsCount}/10 Steps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Community Ticker / Cheer bar */}
        <div className="bg-sky-50 border-b border-sky-100 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-sky-900 truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="font-semibold text-slate-700 truncate">
              {COMMUNITY_PULSE[Math.floor(Math.random() * COMMUNITY_PULSE.length)]}
            </span>
          </div>
          <button
            id="cheer-community-btn"
            onClick={handleSendCheer}
            disabled={hasCheered}
            className={`shrink-0 flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
              hasCheered
                ? 'bg-rose-100 border-rose-200 text-rose-700 cursor-default'
                : 'bg-white hover:bg-rose-50 border-rose-200 text-rose-600 cursor-pointer shadow-2xs active:scale-95'
            }`}
            title="Send encouragement cheers to all learners"
          >
            <Heart className={`w-3 h-3 ${hasCheered ? 'fill-rose-500 text-rose-500' : 'text-rose-500'}`} />
            <span>{hasCheered ? 'Cheered!' : 'Cheer peers'}</span>
            <span className="text-[10px] opacity-75 font-normal">({cheerCount})</span>
          </button>
        </div>

        {/* Filter Tabs & Search */}
        <div className="p-4 sm:px-6 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => { setActiveTab('all'); sfx.click(); }}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-white text-slate-800 shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {showGujarati ? 'સમગ્ર લીડરબોર્ડ' : 'Overall Top'}
            </button>
            <button
              onClick={() => { setActiveTab('gujarat'); sfx.click(); }}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'gujarat' 
                  ? 'bg-white text-slate-800 shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {showGujarati ? 'ગુજરાત સ્કૂલ્સ 🏛️' : 'Gujarat Schools 🏛️'}
            </button>
            <button
              onClick={() => { setActiveTab('weekly'); sfx.click(); }}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'weekly' 
                  ? 'bg-white text-slate-800 shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {showGujarati ? 'આ સપ્તાહ 🔥' : 'This Week 🔥'}
            </button>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={showGujarati ? 'વિદ્યાર્થી કે શહેર શોધો...' : 'Search student or city...'}
              className="w-full sm:w-48 pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-400 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Leaderboard Scrollable Table / List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5 divide-y divide-slate-100">
          {filteredList.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              {showGujarati ? 'કોઈ વિદ્યાર્થી મળ્યા નથી.' : 'No students found matching your search.'}
            </div>
          ) : (
            filteredList.map((entry) => {
              const isTop3 = entry.rank !== undefined && entry.rank <= 3;
              const isUser = entry.isUser;

              return (
                <div
                  key={entry.id}
                  className={`pt-2.5 first:pt-0 flex items-center justify-between gap-3 p-3 rounded-2xl transition-all ${
                    isUser
                      ? 'bg-amber-50/90 border-2 border-amber-400 shadow-sm'
                      : isTop3
                      ? 'bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/70'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  {/* Left: Rank & Avatar & Details */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div className="w-8 shrink-0 flex items-center justify-center font-black text-sm">
                      {entry.rank === 1 && (
                        <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs shadow-xs font-black">
                          🥇
                        </span>
                      )}
                      {entry.rank === 2 && (
                        <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-900 flex items-center justify-center text-xs shadow-xs font-black">
                          🥈
                        </span>
                      )}
                      {entry.rank === 3 && (
                        <span className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs shadow-xs font-black">
                          🥉
                        </span>
                      )}
                      {entry.rank !== undefined && entry.rank > 3 && (
                        <span className={`text-xs font-bold ${isUser ? 'text-amber-800' : 'text-slate-400'}`}>
                          #{entry.rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar initial */}
                    <div className={`w-9 h-9 rounded-xl ${entry.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                      {entry.name.charAt(0)}
                    </div>

                    {/* Name and School Info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`font-bold text-xs sm:text-sm truncate ${isUser ? 'text-amber-950 font-extrabold' : 'text-slate-800'}`}>
                          {showGujarati && entry.nameGujarati ? entry.nameGujarati : entry.name}
                        </span>
                        {isUser && (
                          <span className="text-[10px] font-black uppercase bg-amber-500 text-slate-950 px-1.5 rounded">
                            YOU
                          </span>
                        )}
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md truncate max-w-[140px] sm:max-w-none">
                          {showGujarati ? entry.badgeGujarati : entry.badge}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 truncate">
                        <span className="flex items-center gap-0.5 truncate">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{showGujarati ? entry.cityGujarati : entry.city}</span>
                        </span>
                        <span>•</span>
                        <span className="truncate text-slate-400">
                          {showGujarati ? entry.schoolGujarati : entry.school}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Stars, Completed Steps, and Streak */}
                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-lg" title="Daily study streak">
                      <Flame className="w-3 h-3 fill-amber-500 text-amber-600" />
                      <span className="font-bold">{entry.streakDays}d</span>
                    </div>

                    <div>
                      <div className="flex items-center justify-end gap-1 text-xs sm:text-sm font-black text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{entry.stars}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-600 block">
                        {entry.completedStepsCount}/10 Steps
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              {showGujarati 
                ? 'દરેક પાઠના પ્રશ્નો અને પ્રવૃત્તિઓ પૂર્ણ કરીને સિતારા કમાઓ અને રેન્કમાં આગળ વધો!' 
                : 'Complete exercises & quizzes in each step to climb the global leaderboard!'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-all shadow-xs"
          >
            {showGujarati ? 'બંધ કરો' : 'Close Leaderboard'}
          </button>
        </div>
      </div>
    </div>
  );
};
