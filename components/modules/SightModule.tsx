import React, { useState, useRef } from 'react';
import { Camera, Upload, Eye, X } from 'lucide-react';
import Button from '../ui/Button';
import { analyzeImage } from '../../services/geminiService';

const SightModule: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult('');
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setResult('');
    try {
      const analysis = await analyzeImage(image, "Analyze this image in detail. Describe the colors, emotions, and sensory details present.");
      setResult(analysis);
    } catch (err) {
      setResult("Failed to analyze image.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    setResult('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 mb-2">Sight</h2>
        <p className="text-slate-400">Let SensorySphere perceive and describe the visual world.</p>
      </div>

      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full max-w-md h-64 border-2 border-dashed border-slate-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:bg-slate-800/50 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-teal-400" />
          </div>
          <p className="text-slate-300 font-medium">Click to upload an image</p>
          <p className="text-slate-500 text-sm mt-2">Supports JPG, PNG</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Preview */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
            <button 
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Controls & Result */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <Button onClick={handleAnalyze} isLoading={isAnalyzing} className="flex-1">
                <Eye size={20} />
                Analyze Image
              </Button>
            </div>

            {result && (
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm h-full overflow-y-auto max-h-[400px]">
                <h3 className="text-teal-400 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                  Analysis Result
                </h3>
                <p className="text-slate-200 leading-relaxed whitespace-pre-line">{result}</p>
              </div>
            )}
            
            {!result && !isAnalyzing && (
               <div className="flex-1 flex items-center justify-center border border-slate-800 rounded-2xl bg-slate-900/30 text-slate-500 p-8 text-center italic">
                 "Upload an image to reveal its hidden sensory details."
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SightModule;