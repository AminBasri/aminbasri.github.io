import React from 'react';

interface SphereVisualProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SphereVisual: React.FC<SphereVisualProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96',
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500 to-purple-600 blur-2xl opacity-40 animate-pulse"></div>
      
      {/* Orbiting Ring 1 */}
      <div className="absolute inset-0 border-2 border-teal-500/30 rounded-full animate-spin-slow" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
      
      {/* Orbiting Ring 2 */}
      <div className="absolute inset-2 border-2 border-purple-500/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s', borderRadius: '60% 40% 30% 70% / 50% 40% 50% 60%' }}></div>
      
      {/* Core Sphere */}
      <div className="relative w-3/5 h-3/5 rounded-full bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 shadow-[0_0_40px_rgba(45,212,191,0.5)] flex items-center justify-center overflow-hidden">
        {/* Inner Waves */}
        <svg className="absolute w-full h-full opacity-30" viewBox="0 0 100 100">
           <path d="M0 50 Q 25 30, 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.5" className="animate-pulse" />
           <path d="M0 50 Q 25 70, 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      {/* Orbiting Dots */}
      <div className="absolute w-full h-full animate-spin-slow">
         <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full blur-[1px] shadow-[0_0_10px_white] -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="absolute w-full h-full animate-spin-slow" style={{ animationDelay: '-5s', animationDirection: 'reverse' }}>
         <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-teal-200 rounded-full blur-[1px] shadow-[0_0_10px_teal] -translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default SphereVisual;