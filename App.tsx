
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { AppSection, Achievement, Habit, Product } from './types';
import { ACHIEVEMENTS, PREMIUM_PRODUCTS, QUOTES } from './constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Heart, Sparkles, Trophy, CheckCircle2, ArrowRight, Brain, Clock, Plus, Zap, Star, X, Play, ShoppingBag, Wind, RotateCcw } from 'lucide-react';
import PomodoroTimer from './components/PomodoroTimer';
import { getDailyInsight } from './services/gemini';

const productivityData = [
  { name: 'Seg', valor: 65 },
  { name: 'Ter', valor: 80 },
  { name: 'Qua', valor: 45 },
  { name: 'Qui', valor: 90 },
  { name: 'Sex', valor: 70 },
  { name: 'Sáb', valor: 30 },
  { name: 'Dom', valor: 55 },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [habits, setHabits] = useState<Habit[]>([
    { id: 'h1', name: 'Beber 2L de água', completed: true, category: 'saude' },
    { id: 'h2', name: 'Meditação 5min', completed: false, category: 'rotina' },
    { id: 'h3', name: 'Planejar o dia', completed: true, category: 'foco' },
  ]);
  
  const [isAddingHabit, setIsAddingHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<{ id: number, title: string } | null>(null);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    if (activeSection === AppSection.DASHBOARD) {
      loadInsight();
    }
  }, [activeSection]);

  const loadInsight = async () => {
    setLoadingInsight(true);
    const insight = await getDailyInsight('um pouco distraído', 'procrastinação em tarefas administrativas');
    setAiInsight(insight);
    setLoadingInsight(false);
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const addHabit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: `h-${Date.now()}`,
        name: newHabitName,
        completed: false,
        category: 'rotina'
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setIsAddingHabit(false);
    }
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-brand-200/20 blur-[100px] -z-10 rounded-full"></div>
      
      <div className="space-y-6 max-w-3xl">
        <span className="px-4 py-1.5 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest rounded-full inline-block">
          Seu Cérebro, Seu Superpoder
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 leading-[1.1] tracking-tight">
          Clareza mental <br />
          <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">para o seu dia.</span>
        </h1>
        <p className="text-xl text-zinc-500 px-4 leading-relaxed max-w-xl mx-auto">
          Um ecossistema desenhado para a neurodivergência. Transforme o caos em fluxo criativo com suporte especializado para TDAH.
        </p>
      </div>

      <div className="w-full max-w-4xl px-4 flex justify-center">
        <div className="relative group">
          <img 
            src="https://images.unsplash.com/photo-1544717297-fa95b3ee51f3?q=80&w=2070&auto=format&fit=crop" 
            alt="Foco e Clareza" 
            className="w-full max-w-2xl rounded-[3rem] shadow-2xl shadow-brand-200/50 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent rounded-[3rem]"></div>
          <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white p-6 rounded-[2.5rem] shadow-xl border border-zinc-100 hidden md:flex items-center gap-4 animate-bounce">
            <div className="w-12 h-12 bg-calm-50 rounded-2xl flex items-center justify-center text-calm-500">
               <Zap size={24} />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-zinc-400 uppercase">Status</span>
              <span className="text-sm font-bold text-zinc-900">Modo Foco Ativado</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        <button 
          onClick={() => setActiveSection(AppSection.DASHBOARD)}
          className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-zinc-100 hover:shadow-xl hover:border-brand-200 transition-all duration-300 text-center group"
        >
          <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 mx-auto group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
            <Sparkles size={28} />
          </div>
          <h3 className="font-bold text-zinc-800 mb-3 text-lg">Motivação Diária</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">Pílulas de foco personalizadas pela nossa IA para seu perfil único.</p>
        </button>

        <button 
          onClick={() => setActiveSection(AppSection.TECHNIQUES)}
          className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-zinc-100 hover:shadow-xl hover:border-calm-200 transition-all duration-300 text-center group"
        >
          <div className="w-14 h-14 bg-calm-50 rounded-2xl flex items-center justify-center text-calm-500 mb-6 mx-auto group-hover:scale-110 group-hover:bg-calm-500 group-hover:text-white transition-all duration-500">
            <Zap size={28} />
          </div>
          <h3 className="font-bold text-zinc-800 mb-3 text-lg">Produtividade Calma</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">Hacks de rotina sem a pressão do esgotamento, no seu ritmo.</p>
        </button>

        <button 
          onClick={() => setActiveSection(AppSection.TECHNIQUES)}
          className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-zinc-100 hover:shadow-xl hover:border-support-200 transition-all duration-300 text-center group"
        >
          <div className="w-14 h-14 bg-support-50 rounded-2xl flex items-center justify-center text-support-500 mb-6 mx-auto group-hover:scale-110 group-hover:bg-support-500 group-hover:text-white transition-all duration-500">
            <Heart size={28} />
          </div>
          <h3 className="font-bold text-zinc-800 mb-3 text-lg">Suporte Emocional</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">Técnicas de regulação para mentes inquietas e hiperativas.</p>
        </button>
      </div>

      <button 
        onClick={() => setActiveSection(AppSection.DASHBOARD)}
        className="px-10 py-5 bg-brand-600 text-white font-bold rounded-[1.5rem] hover:bg-brand-700 hover:shadow-2xl hover:shadow-brand-200 transition-all flex items-center gap-3 group active:scale-95 z-10"
      >
        Entrar no Flow
        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Bem-vindo de volta</h2>
          <p className="text-zinc-500 font-medium mt-1">Sua jornada de hoje começa com um respiro.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md p-3 pr-5 rounded-2xl border border-zinc-100 shadow-sm">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <img key={i} src={`https://picsum.photos/seed/user${i}/80/80`} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" alt="User" />
            ))}
          </div>
          <div>
            <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Comunidade</span>
            <span className="text-sm font-bold text-brand-600">1.4k focados agora</span>
          </div>
        </div>
      </header>

      <div className="bg-modern-gradient p-10 rounded-[2.5rem] text-white shadow-2xl shadow-brand-200 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={24} className="text-brand-200" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-100">Insight FocusFlow AI</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold leading-tight mb-8 max-w-2xl">
            {loadingInsight ? 'Sintonizando com seu ritmo...' : `"${aiInsight || 'Sua mente é um oceano de possibilidades, aprenda a navegar nas ondas.'}"`}
          </p>
          <button onClick={loadInsight} className="flex items-center gap-2 text-sm font-bold text-brand-100 hover:text-white transition-colors group/btn">
            <RotateCcw size={16} className="group-hover/btn:rotate-180 transition-transform duration-500" />
            Gerar novo insight
          </button>
        </div>
        <div className="absolute right-[-10%] top-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000"></div>
        <img 
          src="https://images.unsplash.com/photo-1516302752625-fbbad0eb293f?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
          alt="Overlay pattern"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-extrabold text-zinc-900 text-xl tracking-tight">Atividade de Foco</h3>
              <p className="text-sm text-zinc-400 font-medium">Sua consistência na última semana</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-brand-50 text-brand-600 rounded-lg text-xs font-bold">+12%</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityData}>
                <defs>
                  <linearGradient id="colorBrand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#F4F4F5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#A1A1AA', fontSize: 12, fontWeight: 600}} dy={15} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
                  cursor={{ stroke: '#7C3AED', strokeWidth: 2, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="valor" stroke="#7C3AED" strokeWidth={4} fillOpacity={1} fill="url(#colorBrand)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col">
          <h3 className="font-extrabold text-zinc-900 text-xl tracking-tight mb-8 flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-calm-50 flex items-center justify-center text-calm-500">
                <CheckCircle2 size={18} strokeWidth={3} />
             </div>
             Hábitos de Hoje
          </h3>
          <div className="space-y-4 overflow-y-auto max-h-80 pr-1 flex-1 custom-scrollbar">
            {habits.map(habit => (
              <button 
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 border ${
                  habit.completed ? 'bg-zinc-50 border-transparent opacity-60' : 'bg-white border-zinc-100 hover:border-brand-200 hover:shadow-md'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  habit.completed ? 'bg-brand-600 border-brand-600 text-white' : 'border-zinc-200 bg-white'
                }`}>
                  {habit.completed && <CheckCircle2 size={14} strokeWidth={4} />}
                </div>
                <span className={`flex-1 text-left font-bold text-sm truncate ${habit.completed ? 'text-zinc-400 line-through' : 'text-zinc-700'}`}>
                  {habit.name}
                </span>
              </button>
            ))}
          </div>
          
          <div className="mt-8">
            {isAddingHabit ? (
              <form onSubmit={addHabit} className="flex flex-col gap-3 animate-in slide-in-from-bottom-2">
                <input
                  autoFocus
                  type="text"
                  placeholder="Nome do hábito..."
                  className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-5 py-4 text-sm text-zinc-900 font-bold focus:outline-none focus:border-brand-500 transition-all"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-brand-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-brand-700 transition-all">Salvar</button>
                  <button type="button" onClick={() => setIsAddingHabit(false)} className="bg-zinc-100 text-zinc-500 px-4 py-3 rounded-xl font-bold text-sm">X</button>
                </div>
              </form>
            ) : (
              <button 
                onClick={() => setIsAddingHabit(true)}
                className="w-full py-5 bg-gradient-to-r from-brand-50 to-brand-100/50 border border-brand-100 rounded-3xl text-brand-700 flex items-center justify-center gap-3 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-300 font-extrabold text-sm group shadow-sm shadow-brand-100"
              >
                <div className="w-6 h-6 bg-white text-brand-600 rounded-lg flex items-center justify-center group-hover:rotate-90 transition-transform duration-500 shadow-sm">
                  <Plus size={16} strokeWidth={4} />
                </div>
                Adicionar Tarefa
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PomodoroTimer />
        <div className="bg-support-50 p-8 rounded-[2.5rem] border border-support-100 flex flex-col justify-between group overflow-hidden relative">
          <div className="relative z-10">
            <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-support-500 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Heart size={24} strokeWidth={2.5} />
            </div>
            <h3 className="font-extrabold text-zinc-900 text-xl mb-3 tracking-tight">Apoio Emocional</h3>
            <p className="text-zinc-500 font-medium text-sm leading-relaxed">Pausas guiadas e técnicas para silenciar o barulho mental agora mesmo.</p>
          </div>
          <button 
            onClick={() => setActiveSection(AppSection.TECHNIQUES)}
            className="mt-8 w-full py-4 bg-white text-support-600 font-extrabold rounded-2xl hover:bg-support-600 hover:text-white transition-all duration-300 shadow-sm border border-support-200"
          >
            Acessar Agora
          </button>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform text-support-300">
             <Heart size={120} />
          </div>
        </div>
        <div className="bg-zinc-900 p-8 rounded-[2.5rem] flex flex-col justify-between group relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center text-brand-400 mb-6 group-hover:scale-110 transition-transform duration-500">
              <Star size={24} fill="currentColor" strokeWidth={0} />
            </div>
            <h3 className="font-extrabold text-white text-xl mb-3 tracking-tight">Suas Conquistas</h3>
            <p className="text-zinc-400 font-medium text-sm leading-relaxed">Você está a 3 hábitos de desbloquear o próximo emblema de ouro.</p>
          </div>
          <button 
            onClick={() => setActiveSection(AppSection.STORE)}
            className="mt-8 w-full py-4 bg-brand-600 text-white font-extrabold rounded-2xl hover:bg-brand-500 transition-all duration-300 shadow-lg shadow-brand-900"
          >
            Ver Badges
          </button>
          <div className="absolute -right-4 -bottom-4 bg-brand-600/20 w-32 h-32 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );

  const renderTechniques = () => (
    <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out space-y-10">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-2">
           <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Técnicas Práticas</h2>
           <p className="text-zinc-500 font-medium text-lg">Hacks mentais baseados em ciência para o seu dia.</p>
         </div>
         <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-[1.5rem] border border-zinc-100 shadow-sm flex items-center gap-4">
           <div className="w-3 h-3 rounded-full bg-calm-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
           <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Estado de Flow</span>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: <Clock />, title: 'Pomodoro Adaptado', color: 'bg-brand-50 text-brand-600', hover: 'hover:border-brand-200', desc: 'Blocos flexíveis de 25-45 minutos. O cérebro com TDAH precisa de janelas de urgência artificiais.' },
            { icon: <Zap />, title: 'Visualização Ativa', color: 'bg-calm-50 text-calm-500', hover: 'hover:border-calm-200', desc: 'Materialize suas metas. Ver o resultado final reduz a ansiedade da procrastinação inicial.' },
            { icon: <Wind />, title: 'Respiração 4-7-8', color: 'bg-support-50 text-support-500', hover: 'hover:border-support-200', desc: 'Regule seu sistema nervoso em 90 segundos. Essencial para momentos de sobrecarga sensorial.' },
            { icon: <Brain />, title: 'Esvaziamento Mental', color: 'bg-orange-50 text-orange-600', hover: 'hover:border-orange-200', desc: 'Não guarde nada na memória de trabalho. Transfira tudo para o papel e libere seu processamento.' }
          ].map((tech, i) => (
            <div key={i} className={`bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm transition-all duration-500 group animate-in slide-in-from-bottom-6 ${tech.hover} hover:shadow-2xl hover:-translate-y-2`}>
              <div className={`w-16 h-16 ${tech.color} rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                {React.cloneElement(tech.icon as React.ReactElement<any>, { size: 32, strokeWidth: 2.5 })}
              </div>
              <h3 className="text-2xl font-extrabold mb-4 text-zinc-900 tracking-tight">{tech.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-medium">{tech.desc}</p>
            </div>
          ))}
       </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Academy</h2>
          <p className="text-zinc-500 font-medium mt-1">Conhecimento especializado que liberta o seu potencial.</p>
        </div>
        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-4 py-2 rounded-full uppercase tracking-wider">6 Módulos</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white/90 backdrop-blur-md rounded-[2rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col hover:-translate-y-2">
            <div className="h-56 bg-zinc-100 relative cursor-pointer overflow-hidden" onClick={() => setSelectedLesson({ id: i, title: `Módulo ${i}: Foco e Atenção` })}>
              <img src={`https://images.unsplash.com/photo-1513258496099-48168024adb0?q=80&w=800&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Lesson" />
              <div className="absolute inset-0 bg-brand-900/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white p-5 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                   <Play size={28} className="text-brand-600 fill-brand-600 ml-1" />
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h4 className="font-extrabold text-zinc-900 text-xl mb-3 tracking-tight">Dominando o TDAH: Módulo {i}</h4>
              <p className="text-sm text-zinc-500 mb-8 leading-relaxed font-medium">Estratégias avançadas para hackear seu foco e transformar sua produtividade sem sofrimento.</p>
              <button 
                onClick={() => setSelectedLesson({ id: i, title: `Dominando o TDAH: Módulo ${i}` })}
                className="mt-auto flex items-center justify-center gap-2 bg-zinc-50 py-4 rounded-2xl text-brand-600 font-bold text-sm hover:bg-brand-600 hover:text-white transition-all duration-300"
              >
                Assistir agora
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStore = () => (
    <div className="space-y-12 animate-in zoom-in-95 duration-700">
      <div className="bg-zinc-900 rounded-[3rem] p-12 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">FocusFlow Premium</h2>
          <p className="text-zinc-400 max-w-xl mx-auto font-medium text-lg leading-relaxed">Leve seu autoconhecimento para o próximo nível com nossos recursos exclusivos desenhados por neuropsicólogos.</p>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-brand-600/20 rounded-full blur-[120px]"></div>
        <img 
          src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
          alt="Premium background"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PREMIUM_PRODUCTS.map(product => (
          <div key={product.id} className="bg-white/90 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-sm flex flex-col hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
            <div className="h-64 overflow-hidden">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
            </div>
            <div className="p-10 flex flex-col flex-1">
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-4 tracking-tight group-hover:text-brand-600 transition-colors">{product.name}</h3>
              <p className="text-zinc-500 font-medium mb-10 leading-relaxed">{product.description}</p>
              <div className="mt-auto pt-8 border-t border-zinc-50">
                <div className="flex items-center justify-between mb-8">
                   <span className="text-3xl font-black text-zinc-900">{product.price}</span>
                   <span className="bg-calm-50 text-calm-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider">Acesso Vitalício</span>
                </div>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-5 bg-brand-600 text-white font-extrabold rounded-2xl hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-100 transition-all active:scale-95">
                  Comprar Agora
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout activeSection={activeSection} onNavigate={setActiveSection}>
      {activeSection === AppSection.HOME && renderHome()}
      {activeSection === AppSection.DASHBOARD && renderDashboard()}
      {activeSection === AppSection.TECHNIQUES && renderTechniques()}
      {activeSection === AppSection.EDUCATION && renderEducation()}
      {activeSection === AppSection.STORE && renderStore()}

      {selectedLesson && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setSelectedLesson(null)}></div>
          <div className="bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-500 flex flex-col lg:flex-row max-h-[90vh]">
            <div className="bg-black lg:flex-1 relative group aspect-video lg:aspect-auto">
              <video 
                className="w-full h-full object-contain"
                controls
                autoPlay
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              >
                Player não suportado.
              </video>
              <button 
                onClick={() => setSelectedLesson(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/30 text-white p-3 rounded-2xl transition-all z-20 backdrop-blur-md"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="w-full lg:w-[400px] p-12 overflow-y-auto bg-zinc-50/50">
              <div className="flex items-center gap-3 mb-4">
                 <span className="bg-brand-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">Aulas Premium</span>
                 <span className="text-zinc-400 text-xs font-bold">• 15 min</span>
              </div>
              <h3 className="text-3xl font-extrabold text-zinc-900 mb-6 tracking-tight leading-tight">{selectedLesson.title}</h3>
              <div className="space-y-6 text-zinc-600 font-medium leading-relaxed">
                <p>Nesta masterclass, exploramos como o cérebro neurodivergente gerencia a dopamina e como você pode usar isso a seu favor.</p>
                <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
                   <h5 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                     <Brain size={18} className="text-brand-600" /> Resumo da Aula
                   </h5>
                   <ul className="space-y-2 text-sm">
                     <li className="flex gap-2"><span>•</span> Identifique o "pico de foco" matinal.</li>
                     <li className="flex gap-2"><span>•</span> Use recompensas imediatas pós-tarefa.</li>
                     <li className="flex gap-2"><span>•</span> O silêncio é uma ferramenta, não um vazio.</li>
                   </ul>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLesson(null)}
                className="mt-10 w-full py-5 bg-brand-600 text-white font-extrabold rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-100"
              >
                Concluir Aula
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
