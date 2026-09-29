import { Play } from 'lucide-react';
import type { HeritageVideo } from '../../data/heritage';

interface VideoCardProps {
  video: HeritageVideo;
  onClick: (video: HeritageVideo) => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const thumbnailUrl = video.youtubeId 
    ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    : '/ajanta_slider.jpg'; // Fallback heritage image

  return (
    <div 
      className="glass-panel-dark rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-heritage-orange/50 transition-all flex flex-col h-full shadow-lg hover:shadow-heritage-orange/10"
      onClick={() => onClick(video)}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video overflow-hidden bg-[#0a1526]">
        <img 
          src={thumbnailUrl} 
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          onError={(e) => {
            // Fallback if youtube thumbnail fails
            (e.target as HTMLImageElement).src = '/ajanta_slider.jpg';
          }}
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/20 to-transparent opacity-80" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-heritage-orange/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(217,92,20,0.4)] group-hover:scale-110 group-hover:bg-heritage-orange transition-all duration-300">
            <Play className="w-8 h-8 text-white ml-1 fill-white" />
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded text-xs font-bold uppercase tracking-wider text-white">
            {video.type}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs font-bold tracking-widest text-heritage-orange uppercase mb-2">
          WATCH THE STORY
        </p>
        <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-heritage-orange transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-sm text-cream/70 mt-auto">
          Source: {video.source}
        </p>
      </div>
    </div>
  );
}
