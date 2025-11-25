import React, { useState } from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';
import { generateCreativeText } from '../../services/geminiService';

const CreateModule: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const result = await generateCreativeText(prompt);
      setResponse(result);
    } catch (e) {
      setResponse("Failed to generate content.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col h-full animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500 mb-2">Create</h2>
        <p className="text-slate-400">Where Senses Shape the Sphere of Innovation.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6">
        {/* Input Section */}
        <div className="flex-1 flex flex-col gap-4">
           <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-lg">
             <label className="block text-slate-300 font-medium mb-4">What do you want to create?</label>
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-slate-200 focus:border-amber-400 focus:outline-none transition-colors h-40 resize-none"
               placeholder="E.g., Write a short story about a sound that has color..."
             />
             <div className="mt-4 flex justify-end">
               <Button onClick={handleCreate} isLoading={isLoading} disabled={!prompt.trim()} className="from-amber-500 to-orange-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                 <Sparkles size={18} />
                 Spark Innovation
               </Button>
             </div>
           </div>
           
           <div className="bg-slate-900/30 p-4 rounded-2xl border border-slate-800">
             <h4 className="text-slate-400 text-sm font-semibold mb-2 uppercase tracking-wider">Inspiration</h4>
             <div className="flex flex-wrap gap-2">
                {['Describe the smell of rain', 'A poem about silence', 'Concept for a tactile app'].map((idea, i) => (
                  <button key={i} onClick={() => setPrompt(idea)} className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                    {idea}
                  </button>
                ))}
             </div>
           </div>
        </div>

        {/* Output Section */}
        <div className="flex-1 bg-slate-950 rounded-3xl p-6 border border-slate-800 relative min-h-[400px]">
          {response ? (
            <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="text-amber-400 font-medium mb-4 flex items-center gap-2">
                <MessageSquare size={16} />
                Generated Concept
              </h3>
              <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 max-w-none">
                <p className="whitespace-pre-line leading-relaxed">{response}</p>
              </div>
            </div>
          ) : (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 opacity-50">
                <Sparkles size={48} className="mb-4" />
                <p>Creative output will appear here</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateModule;