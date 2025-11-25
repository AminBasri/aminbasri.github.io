import React, { useState } from 'react';
import { Image as ImageIcon, Wand2, Download } from 'lucide-react';
import Button from '../ui/Button';
import { generateImage } from '../../services/geminiService';

const ImagineModule: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const { imageUrl, text } = await generateImage(prompt);
      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else if (text) {
          // Fallback if model refuses or returns text
          setError(`The model returned text instead of an image: ${text}`);
      } else {
        setError("No image generated. Please try a different prompt.");
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500 mb-2">Imagine</h2>
        <p className="text-slate-400">Feel. Connect. Transform visuals.</p>
      </div>

      <div className="w-full flex gap-4 mb-8">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Describe a scene, e.g., 'A glowing neon sphere floating in a cybernetic forest'"
          className="flex-1 bg-slate-800/50 border border-slate-700 rounded-full px-6 text-slate-200 focus:border-pink-500 focus:outline-none h-14"
        />
        <Button onClick={handleGenerate} isLoading={isLoading} className="from-pink-600 to-rose-600 h-14 w-14 rounded-full !p-0 flex items-center justify-center shrink-0">
          <Wand2 size={24} />
        </Button>
      </div>

      <div className="w-full aspect-square max-w-lg bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center overflow-hidden relative shadow-2xl">
        {isLoading && (
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mb-4"></div>
                <p className="text-pink-400 animate-pulse">Dreaming...</p>
            </div>
        )}
        
        {!isLoading && !generatedImage && !error && (
            <div className="text-slate-600 flex flex-col items-center">
                <ImageIcon size={64} className="mb-4 opacity-50" />
                <p>Your imagination awaits.</p>
            </div>
        )}

        {!isLoading && error && (
            <div className="p-8 text-center text-rose-400">
                <p>{error}</p>
            </div>
        )}

        {generatedImage && (
            <>
                <img src={generatedImage} alt="Generated" className="w-full h-full object-cover animate-fade-in" />
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <a href={generatedImage} download="sensory-sphere-generated.png" className="p-3 bg-black/60 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors">
                        <Download size={20} />
                    </a>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default ImagineModule;