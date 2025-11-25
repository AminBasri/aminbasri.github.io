import React, { useState } from 'react';
import { Volume2, PlayCircle } from 'lucide-react';
import Button from '../ui/Button';
import { playGeneratedSpeech } from '../../services/geminiService';

const SoundModule: React.FC = () => {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = async () => {
    if (!text.trim()) return;
    setIsPlaying(true);
    try {
      await playGeneratedSpeech(text);
    } catch (error) {
      alert("Failed to generate speech. Please try again.");
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col items-center animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-2">Sound</h2>
        <p className="text-slate-400">Transform written thoughts into immersive audio.</p>
      </div>

      <div className="w-full bg-slate-800/50 rounded-3xl p-6 border border-slate-700 backdrop-blur-sm shadow-xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to hear it spoken... (e.g., 'The quick brown fox jumps over the lazy dog.')"
          className="w-full bg-transparent text-lg text-slate-200 placeholder-slate-500 focus:outline-none resize-none h-40"
        />
        
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-700/50">
           <div className="text-slate-500 text-sm flex items-center gap-2">
             <Volume2 size={16} />
             <span>Voice: <strong>Kore</strong> (Balanced)</span>
           </div>
           <Button onClick={handleSpeak} isLoading={isPlaying} disabled={!text.trim()} variant="secondary">
             <PlayCircle size={20} />
             Generate Speech
           </Button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
         <div 
            onClick={() => setText("Welcome to SensorySphere. Immerse the Senses. Empower the Experience.")}
            className="p-4 rounded-xl border border-slate-700 bg-slate-900/50 hover:border-purple-500 cursor-pointer transition-colors"
         >
           <p className="text-purple-400 font-medium mb-1">Intro</p>
           <p className="text-slate-500 text-sm truncate">Welcome to SensorySphere...</p>
         </div>
         <div 
            onClick={() => setText("The gentle hum of the universe resonates within us all, connecting every atom in a cosmic dance.")}
            className="p-4 rounded-xl border border-slate-700 bg-slate-900/50 hover:border-purple-500 cursor-pointer transition-colors"
         >
           <p className="text-purple-400 font-medium mb-1">Poetic</p>
           <p className="text-slate-500 text-sm truncate">The gentle hum of the universe...</p>
         </div>
         <div 
            onClick={() => setText("System initialized. All sensors operational. Waiting for user input.")}
            className="p-4 rounded-xl border border-slate-700 bg-slate-900/50 hover:border-purple-500 cursor-pointer transition-colors"
         >
           <p className="text-purple-400 font-medium mb-1">Robotic</p>
           <p className="text-slate-500 text-sm truncate">System initialized...</p>
         </div>
      </div>
    </div>
  );
};

export default SoundModule;