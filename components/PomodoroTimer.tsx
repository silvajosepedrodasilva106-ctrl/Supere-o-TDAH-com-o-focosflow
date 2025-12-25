
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react';

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            handleSwitchMode();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleSwitchMode = () => {
    if (mode === 'focus') {
      setMode('break');
      setMinutes(5);
    } else {
      setMode('focus');
      setMinutes(25);
    }
    setSeconds(0);
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'focus' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <div className={`p-8 rounded-[2.5rem] transition-all duration-700 shadow-sm border ${mode === 'focus' ? 'bg-brand-50 border-brand-100' : 'bg-calm-50 border-calm-100'}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-extrabold text-zinc-900 flex items-center gap-3 text-lg tracking-tight">
          {mode === 'focus' ? <Target size={20} className="text-brand-600" /> : <Coffee size={20} className="text-calm-600" />}
          {mode === 'focus' ? 'Foco Total' : 'Pausa Curta'}
        </h3>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Timer</span>
      </div>
      
      <div className="text-6xl font-black text-center my-8 text-zinc-900 tracking-tighter">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={toggleTimer}
          className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-300 active:scale-90 ${
            isActive 
              ? 'bg-zinc-200 text-zinc-600' 
              : (mode === 'focus' ? 'bg-brand-600 text-white shadow-lg shadow-brand-200' : 'bg-calm-500 text-white shadow-lg shadow-calm-200')
          }`}
        >
          {isActive ? <Pause size={28} strokeWidth={2.5} /> : <Play size={28} strokeWidth={2.5} className="ml-1" />}
        </button>
        <button 
          onClick={resetTimer}
          className="w-16 h-16 rounded-3xl bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:border-zinc-300 transition-all active:scale-90 shadow-sm"
        >
          <RotateCcw size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
