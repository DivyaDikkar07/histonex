import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MapPin, Share2, BookmarkPlus, ArrowLeft, Trophy, Calendar, CheckCircle2 } from 'lucide-react';
import { demoSubmissions, previousWinners } from '../data/photoChallengeData';
import HeritageImage from '../components/ui/HeritageImage';

export default function PhotoDetail() {
  const { id } = useParams<{ id: string }>();
  
  // Find photo in demo data or previous winners
  const photo = demoSubmissions.find(p => p.id === id) || previousWinners.find(p => p.id === id);
  
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(photo?.votes || 0);

  if (!photo) {
    return (
      <div className="flex-grow bg-[#051121] flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Photo not found</h2>
          <Link to="/photo-challenge" className="text-heritage-orange hover:underline">Return to Photo Challenge</Link>
        </div>
      </div>
    );
  }

  const handleVote = () => {
    if (!hasVoted) {
      setVotes(prev => prev + 1);
      setHasVoted(true);
    }
  };

  // Find related photos (same location, excluding current)
  const relatedPhotos = demoSubmissions
    .filter(p => p.locationId === photo.locationId && p.id !== photo.id)
    .slice(0, 3);

  return (
    <div className="flex-grow bg-[#051121] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation */}
        <Link to="/photo-challenge" className="inline-flex items-center gap-2 text-cream/70 hover:text-white transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Photo Challenge
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Photo Area (Left) */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl overflow-hidden bg-black/50 border border-white/10 mb-6">
              <HeritageImage 
                src={photo.photoUrl} 
                alt={photo.title} 
                className="w-full h-auto max-h-[80vh] object-contain" 
              />
              
              {photo.isWinner && (
                <div className="absolute top-6 left-6 bg-warm-gold text-deep-navy px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-xl flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> Winner
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between py-4 border-b border-white/10 mb-8">
              <button 
                onClick={handleVote}
                disabled={hasVoted}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                  hasVoted 
                    ? 'bg-heritage-orange/20 text-heritage-orange border border-heritage-orange/50 cursor-default'
                    : 'bg-heritage-orange hover:bg-orange-600 text-white shadow-lg shadow-heritage-orange/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${hasVoted ? 'fill-current' : ''}`} /> 
                {hasVoted ? 'Voted' : 'Vote for this photo'}
                <span className="ml-2 pl-2 border-l border-current/30">{votes.toLocaleString()}</span>
              </button>

              <div className="flex gap-3">
                <button className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/10">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/10">
                  <BookmarkPlus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo Story */}
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-serif font-bold text-white mb-4">The Story</h2>
              <p className="text-cream/80 text-lg leading-relaxed whitespace-pre-wrap">
                {photo.story}
              </p>
            </div>
          </div>

          {/* Details Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Header Details */}
            <div>
              <h1 className="text-3xl font-serif font-bold text-white mb-4 leading-tight">{photo.title}</h1>
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white font-bold text-xl">
                  {photo.photographer.charAt(0)}
                </div>
                <div>
                  <span className="text-sm text-cream/60 block mb-1">Photographer</span>
                  <span className="text-white font-bold block text-lg">{photo.photographer}</span>
                </div>
              </div>
            </div>

            {/* Metadata Cards */}
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-heritage-orange/20 flex items-center justify-center text-heritage-orange flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-cream/50 uppercase tracking-wider block mb-1">Location</span>
                    <Link to={`/heritage/${photo.locationId}`} className="text-white font-bold hover:text-heritage-orange transition-colors">
                      {photo.locationName}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-cream flex-shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-cream/50 uppercase tracking-wider block mb-1">Competition</span>
                    <span className="text-white font-bold">{photo.isWinner ? 'Past Challenge Winner' : 'Heritage Through Your Lens'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-cream flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-cream/50 uppercase tracking-wider block mb-1">Submission Date</span>
                    <span className="text-white font-bold">
                      {new Date(photo.dateSubmitted).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Verified Badge (Demo) */}
            <div className="bg-deep-navy border border-success-green/30 rounded-2xl p-4 flex gap-3 shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-success-green mb-1">AI Verified Submission</h4>
                <p className="text-xs text-cream/70">Image quality and heritage location have been automatically verified by HISTONEX AI.</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Related Photos */}
        {relatedPhotos.length > 0 && (
          <div className="mt-24 pt-12 border-t border-white/10">
            <h3 className="text-2xl font-serif font-bold text-white mb-8">More from {photo.locationName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPhotos.map(related => (
                <Link key={related.id} to={`/photo-challenge/photo/${related.id}`} className="block group">
                  <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10">
                    <HeritageImage src={related.photoUrl} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-bold line-clamp-1">{related.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-cream/70">by {related.photographer}</span>
                        <span className="text-xs font-bold text-heritage-orange flex items-center gap-1"><Heart className="w-3 h-3 fill-current" /> {related.votes}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
