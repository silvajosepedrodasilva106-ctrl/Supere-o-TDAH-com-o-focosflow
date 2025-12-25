
import React from 'react';
import { Home, LayoutDashboard, Brain, BookOpen, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: AppSection.HOME, label: 'Início', icon: Home },
    { id: AppSection.DASHBOARD, label: 'Painel', icon: LayoutDashboard },
    { id: AppSection.TECHNIQUES, label: 'Técnicas', icon: Brain },
    { id: AppSection.EDUCATION, label: 'Aprender', icon: BookOpen },
    { id: AppSection.STORE, label: 'Premium', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-72 bg-white border-r border-zinc-100 p-8 sticky top-0 h-screen">
        <div className="mb-12">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
            FocusFlow
          </h1>
        </div>
        <div className="space-y-1.5 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-brand-50 text-brand-600 font-bold shadow-sm shadow-brand-100/50' 
                  : 'text-zinc-500 hover:bg-zinc-50 font-medium'
              }`}
            >
              <item.icon size={20} strokeWidth={activeSection === item.id ? 2.5 : 2} />
              {item.label}
            </button>
          ))}
        </div>
        <div className="pt-8 border-t border-zinc-50">
          <div className="bg-brand-50/50 p-5 rounded-3xl border border-brand-100/50">
            <p className="text-[10px] text-brand-600 font-bold uppercase tracking-wider mb-2">Insight de hoje</p>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">Pequenas tarefas geram grandes impulsos. Comece agora.</p>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
          FocusFlow
        </h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col p-8 space-y-4 pt-24 animate-in fade-in duration-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-3xl text-xl transition-all ${
                activeSection === item.id 
                  ? 'bg-brand-50 text-brand-600 font-bold shadow-sm' 
                  : 'text-zinc-500 font-medium'
              }`}
            >
              <item.icon size={26} />
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full mb-24 md:mb-0">
        {children}
      </main>

      {/* Mobile Bottom Bar (Fixed) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[2.5rem] flex justify-around py-4 px-2 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1.5 transition-all ${
              activeSection === item.id ? 'text-brand-600 scale-110' : 'text-zinc-400'
            }`}
          >
            <item.icon size={22} strokeWidth={activeSection === item.id ? 2.5 : 2} />
            <span className={`text-[10px] font-bold ${activeSection === item.id ? 'opacity-100' : 'opacity-0'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Layout;
