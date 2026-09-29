import { useState, useRef, useEffect } from 'react';
import type { HeritageSite } from '../../data/heritage';
import { Clock, Navigation2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PastVsPresentSliderProps {
  site: HeritageSite;
}

export default function PastVsPresentSlider({ site }: PastVsPresentSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useTranslation();

  if (!site.pastVsPresent) {
    return null;
  }

  const {
    pastImage,
    pastImageYear,
    pastImageSource,
    presentImage,
    presentImageSource,
    comparisonText
  } = site.pastVsPresent;

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Clock className="w-8 h-8 text-heritage-orange" />
          {t('common.pastVsPresent')}
        </h3>
        <p className="text-cream/70 max-w-2xl mx-auto">
          Drag the slider to compare the historical archival view with the present-day reality.
        </p>
      </div>

      <div 
        className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border-2 border-white/10 shadow-2xl"
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        onTouchMove={handleTouchMove}
      >
        {/* Present Image (Background) */}
        <div className="absolute inset-0">
          <img 
            src={presentImage} 
            alt="Present" 
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
          <div className="absolute bottom-4 right-4 bg-deep-navy/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="text-xs font-bold text-white uppercase tracking-wider">{t('common.present')}</span>
            <span className="text-[10px] text-cream/70 block">{presentImageSource}</span>
          </div>
        </div>

        {/* Past Image (Foreground Clipped) */}
        <div 
          className="absolute inset-0" 
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={pastImage} 
            alt="Past" 
            className="w-full h-full object-cover pointer-events-none grayscale-[0.8] sepia-[0.2]"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 bg-deep-navy/80 backdrop-blur-md px-3 py-1 rounded-full border border-heritage-orange/30">
            <span className="text-xs font-bold text-heritage-orange uppercase tracking-wider">{t('common.past')} ({pastImageYear})</span>
            <span className="text-[10px] text-cream/70 block">{pastImageSource}</span>
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-heritage-orange shadow-[0_0_10px_#D96B27] cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-heritage-orange">
            <Navigation2 className="w-4 h-4 text-heritage-orange rotate-90" />
            <Navigation2 className="w-4 h-4 text-heritage-orange -rotate-90 absolute" />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-heritage-orange to-warm-gold" />
        <p className="text-cream text-lg leading-relaxed italic">
          "{comparisonText}"
        </p>
      </div>
    </div>
  );
}
