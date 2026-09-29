import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { HeritageVideo } from '../../data/heritage';

interface VideoModalProps {
  video: HeritageVideo;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const watchUrl = video.youtubeId 
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : video.searchUrl || '#';

  const embedUrl = video.youtubeId 
    ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`
    : '';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-deep-navy/95 backdrop-blur-xl"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl mx-auto bg-[#0a1526] rounded-2xl md:rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-white/5">
          <div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white line-clamp-1">{video.title}</h3>
            <p className="text-sm text-cream/70 flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-white/10 rounded text-xs uppercase tracking-wider">{video.type}</span>
              {video.source}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-cream/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Container (16:9) */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={video.title}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-8">
              <p className="text-white text-lg mb-4">This video cannot be embedded.</p>
              <a 
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-heritage-orange hover:bg-orange-600 text-white rounded-full font-bold transition-colors"
              >
                Watch on YouTube <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 bg-white/5 border-t border-white/10 flex justify-between items-center">
          <p className="text-sm text-cream/50 max-w-md hidden md:block">
            Video content is embedded directly from YouTube and remains the property of the original creator ({video.source}).
          </p>
          <a 
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-sm font-bold transition-all"
          >
            Watch on YouTube ↗
          </a>
        </div>
      </motion.div>
    </div>
  );
}
