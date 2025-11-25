import React, { useState } from 'react';
import { Eye, Mic, PenTool, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import SphereVisual from './components/SphereVisual';
import SightModule from './components/modules/SightModule';
import SoundModule from './components/modules/SoundModule';
import CreateModule from './components/modules/CreateModule';
import ImagineModule from './components/modules/ImagineModule';
import { ModuleType } from './types';

function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.HOME);

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.SIGHT:
        return <SightModule />;
      case ModuleType.SOUND:
        return <SoundModule />;
      case ModuleType.CREATE:
        return <CreateModule />;
      case ModuleType.IMAGINE:
        return <ImagineModule />;
      default:
        return null;
    }
  };

  const navItems = [
    { id: ModuleType.SIGHT, label: 'Sight', icon: Eye, color: 'text-teal-400', hoverBg: 'hover:bg-teal-500/10 hover:border-teal-500/50' },
    { id: ModuleType.SOUND, label: 'Sound', icon: Mic, color: 'text-purple-400', hoverBg: 'hover:bg-purple-500/10 hover:border-purple-500/50' },
    { id: ModuleType.CREATE, label: 'Create', icon: PenTool, color: 'text-amber-400', hoverBg: 'hover:bg-amber-500/10 hover:border-amber-500/50' },
    { id: ModuleType.IMAGINE, label: 'Imagine', icon: ImageIcon, color: 'text-pink-400', hoverBg: 'hover:bg-pink-500/10 hover:border-pink-500/50' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-teal-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-teal-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header / Nav */}
        <header className="px-6 py-6 flex items-center justify-between backdrop-blur-sm sticky top-0 z-50 border-b border-white/5 bg-slate-900/80">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveModule(ModuleType.HOME)}
          >
             <div className="transform group-hover:scale-110 transition-transform duration-500">
               <SphereVisual size="sm" className="w-10 h-10" />
             </div>
             <h1 className="text-xl font-bold tracking-tight">
               Sensory<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">Sphere</span>
             </h1>
          </div>
          
          {activeModule !== ModuleType.HOME && (
            <button 
              onClick={() => setActiveModule(ModuleType.HOME)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
          )}

          <nav className="hidden md:flex gap-2">
             {navItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveModule(item.id)}
                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all border border-transparent ${activeModule === item.id ? 'bg-white/10 text-white border-white/10' : 'text-slate-400 hover:text-white'} ${activeModule !== item.id && item.hoverBg}`}
               >
                 {item.label}
               </button>
             ))}
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          {activeModule === ModuleType.HOME ? (
            <div className="max-w-5xl w-full text-center flex flex-col items-center animate-fade-in">
              
              <div className="mb-12 relative animate-float">
                <SphereVisual size="xl" />
              </div>

              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                Immerse the Senses.
                <br />
                <span className="text-3xl md:text-5xl font-light text-slate-300">Empower the Experience.</span>
              </h2>

              <p className="text-lg text-slate-400 max-w-2xl mb-12 leading-relaxed">
                Step into a world where data feels alive. SensorySphere harnesses the power of Gemini to bridge the gap between digital signals and human perception.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    className={`group relative p-8 rounded-3xl border border-slate-800 bg-slate-800/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-600 overflow-hidden text-left`}
                  >
                    <div className={`absolute top-0 right-0 p-32 bg-gradient-to-br ${item.id === ModuleType.SIGHT ? 'from-teal-500/10' : item.id === ModuleType.SOUND ? 'from-purple-500/10' : item.id === ModuleType.CREATE ? 'from-amber-500/10' : 'from-pink-500/10'} to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                        <item.icon size={24} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-slate-100">{item.label}</h3>
                      <p className="text-sm text-slate-500">
                        {item.id === ModuleType.SIGHT && "Analyze visual data with precision."}
                        {item.id === ModuleType.SOUND && "Convert text to immersive audio."}
                        {item.id === ModuleType.CREATE && "Spark innovation with AI reasoning."}
                        {item.id === ModuleType.IMAGINE && "Visualize concepts instantly."}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          ) : (
            <div className="w-full">
              {renderModule()}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-slate-600 text-sm border-t border-white/5">
          <p>© 2025 SensorySphere. Powered by Google Gemini.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;