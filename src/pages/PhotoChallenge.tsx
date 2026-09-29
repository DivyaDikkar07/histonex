import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon, Award, Heart, Upload, ChevronRight, Clock, Trophy, MapPin, Users, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { activeChallenge, previousWinners } from '../data/photoChallengeData';
import PhotoUploadModal from '../components/ui/PhotoUploadModal';
import HeritageImage from '../components/ui/HeritageImage';
import { useSubmissions } from '../hooks/useSubmissions';

export default function PhotoChallenge() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { approvedSubmissions } = useSubmissions();

  // Sort submissions by votes for leaderboard
  const leaderboard = [...approvedSubmissions].sort((a, b) => b.votes - a.votes).slice(0, 3);
  
  // Photo of the week (pick one outstanding photo, e.g. from demo)
  const photoOfTheWeek = approvedSubmissions.length > 0 ? approvedSubmissions[0] : null;

  return (
    <div className="flex-grow bg-[#051121] flex flex-col relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/ajanta_slider.jpg" 
            alt="Heritage Monument" 
            className="w-full h-full object-cover scale-105" // scale prevents weird borders if animated
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051121] via-[#051121]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Camera className="w-6 h-6 text-heritage-orange animate-pulse" />
              <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase">Heritage Photo Challenge</h2>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-xl">
              Your lens. Your story.<br />Your moment.
            </h1>
            <p className="text-xl text-cream/90 mb-10 font-light max-w-2xl mx-auto drop-shadow-lg">
              Turn your heritage visit into a memory worth sharing. Capture history. Share your perspective. Win the spotlight.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="px-8 py-4 bg-heritage-orange hover:bg-orange-600 text-white rounded-full font-bold transition-all text-lg flex items-center gap-2 shadow-[0_0_20px_rgba(217,107,39,0.3)] hover:shadow-[0_0_30px_rgba(217,107,39,0.5)] transform hover:-translate-y-1"
              >
                <Upload className="w-5 h-5" /> Submit Photo
              </button>
              <a 
                href="#winners"
                className="px-8 py-4 glass-panel hover:bg-white/10 text-white border border-white/20 rounded-full font-bold transition-all text-lg flex items-center gap-2 transform hover:-translate-y-1"
              >
                <Trophy className="w-5 h-5 text-warm-gold" /> View Winners
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ACTIVE COMPETITION CARD */}
      <section className="py-20 bg-deep-navy relative z-10 -mt-10 rounded-t-[3rem] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold tracking-widest text-heritage-orange uppercase mb-2">Current Challenge</h2>
            <h3 className="text-4xl font-serif font-bold text-white">Heritage Through Your Lens</h3>
          </div>

          <div className="glass-panel-dark rounded-3xl p-8 lg:p-12 border border-heritage-orange/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-heritage-orange/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-sm text-cream/60 uppercase tracking-wide mb-1">Theme</h4>
                  <p className="text-2xl font-bold text-white">{activeChallenge.theme}</p>
                </div>
                <div>
                  <h4 className="text-sm text-cream/60 uppercase tracking-wide mb-1">Eligible Locations</h4>
                  <p className="text-lg text-cream">All participating heritage sites in India</p>
                </div>
                <div>
                  <h4 className="text-sm text-cream/60 uppercase tracking-wide mb-1">Competition Period</h4>
                  <p className="text-lg text-cream flex items-center gap-2">
                    <Clock className="w-5 h-5 text-warm-gold" />
                    September 1 – September 30
                  </p>
                </div>
              </div>

              <div className="bg-black/20 rounded-2xl p-6 border border-white/5 flex flex-col justify-center">
                <h4 className="text-sm font-bold text-warm-gold uppercase tracking-wide mb-4 text-center">Top Prizes</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-white font-bold flex items-center gap-2"><span className="text-2xl">🥇</span> Best Photo</span>
                    <span className="text-heritage-orange font-bold text-xl">₹10,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-cream/80 font-medium flex items-center gap-2"><span className="text-xl">🥈</span> Runner Up</span>
                    <span className="text-white font-bold">₹5,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cream/80 font-medium flex items-center gap-2"><span className="text-xl">🥉</span> Third Place</span>
                    <span className="text-white font-bold">₹2,500</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-center">
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 text-center">
                  <span className="block text-3xl font-bold text-white mb-1">{activeChallenge.participantsCount.toLocaleString()}</span>
                  <span className="text-xs text-cream/60 uppercase tracking-wider">Participants</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-xl p-4 border border-white/5 text-center">
                    <span className="block text-xl font-bold text-white mb-1">{activeChallenge.submissionsCount.toLocaleString()}</span>
                    <span className="text-[10px] text-cream/60 uppercase tracking-wider">Photos</span>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4 border border-white/5 text-center">
                    <span className="block text-xl font-bold text-white mb-1">{activeChallenge.totalVotes.toLocaleString()}</span>
                    <span className="text-[10px] text-cream/60 uppercase tracking-wider">Votes</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full py-3 bg-heritage-orange hover:bg-orange-600 text-white rounded-xl font-bold transition-all text-sm mt-2"
                >
                  Join Challenge
                </button>
              </div>
            </div>
            
            {/* Countdown Banner */}
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl tracking-wider">
              ENDS IN: 05 DAYS 12 HRS
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-20 bg-[#051121] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Competition Rules</h2>
            <h3 className="text-3xl font-serif font-bold text-white">How It Works</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            <div className="hidden lg:block absolute top-8 left-16 right-16 h-0.5 bg-white/10 z-0" />
            
            {[
              { title: 'Visit', icon: MapPin, desc: 'Visit a participating heritage site.' },
              { title: 'Capture', icon: Camera, desc: 'Take your best photograph.' },
              { title: 'Upload', icon: Upload, desc: 'Submit it to HISTONEX.' },
              { title: 'Community', icon: Users, desc: 'Visitors view and vote.' },
              { title: 'Judging', icon: Award, desc: 'Top photos are reviewed.' },
              { title: 'Win', icon: Trophy, desc: 'Winners receive prizes.' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-deep-navy border-2 border-white/20 flex items-center justify-center mb-4 group-hover:border-heritage-orange group-hover:bg-heritage-orange/10 transition-colors">
                  <step.icon className="w-6 h-6 text-warm-gold group-hover:text-heritage-orange transition-colors" />
                </div>
                <span className="text-xs font-bold text-heritage-orange mb-1">Step {i + 1}</span>
                <h4 className="text-white font-bold mb-2">{step.title}</h4>
                <p className="text-xs text-cream/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LEADERBOARD & PHOTO OF THE WEEK */}
      <section className="py-24 bg-deep-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-heritage-orange/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Leaderboard */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Live Standings</h2>
                <h3 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
                  <Award className="w-8 h-8 text-heritage-orange" /> Photo Leaderboard
                </h3>
              </div>
              
              <div className="bg-[#0a1526] rounded-2xl border border-white/10 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-bold text-cream/50 uppercase tracking-wider">
                  <div className="col-span-2 text-center">Rank</div>
                  <div className="col-span-6">Photograph</div>
                  <div className="col-span-4 text-right">Votes</div>
                </div>
                
                <div className="divide-y divide-white/5">
                  {leaderboard.map((sub, idx) => (
                    <Link key={sub.id} to={`/photo-challenge/photo/${sub.id}`} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group">
                      <div className="col-span-2 flex justify-center">
                        {idx === 0 ? <span className="text-3xl">🥇</span> : 
                         idx === 1 ? <span className="text-3xl">🥈</span> : 
                         idx === 2 ? <span className="text-3xl">🥉</span> : 
                         <span className="text-xl font-bold text-cream/50">{idx + 1}</span>}
                      </div>
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                          <HeritageImage src={sub.photoUrl} alt={sub.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold group-hover:text-heritage-orange transition-colors line-clamp-1">{sub.title}</h4>
                          <p className="text-xs text-cream/60 flex items-center gap-1 mt-1">
                            <User className="w-3 h-3" /> {sub.photographer}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-4 text-right flex flex-col items-end justify-center">
                        <div className="flex items-center gap-1 text-heritage-orange font-bold text-lg">
                          <Heart className="w-4 h-4 fill-current" /> {sub.votes.toLocaleString()}
                        </div>
                        <span className="text-xs text-cream/50 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {sub.locationName}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Photo of the Week */}
            <div>
              <div className="mb-8">
                <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Featured</h2>
                <h3 className="text-3xl font-serif font-bold text-white">Photo of the Week</h3>
              </div>
              
              {photoOfTheWeek ? (
              <Link to={`/photo-challenge/photo/${photoOfTheWeek.id}`} className="block group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border-2 border-white/10 group-hover:border-heritage-orange/50 transition-colors">
                  <HeritageImage src={photoOfTheWeek.photoUrl} alt="Photo of the week" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/40 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Heart className="w-3 h-3 fill-white text-white" /> {photoOfTheWeek.votes.toLocaleString()}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-2xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-heritage-orange transition-colors">{photoOfTheWeek.title}</h4>
                    <p className="text-cream text-sm mb-4 line-clamp-2 drop-shadow-md">"{photoOfTheWeek.story}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-white text-xs font-bold">
                        {photoOfTheWeek.photographer.charAt(0)}
                      </div>
                      <div className="text-sm">
                        <span className="text-white font-medium block">{photoOfTheWeek.photographer}</span>
                        <span className="text-warm-gold text-xs flex items-center gap-1"><MapPin className="w-3 h-3" /> {photoOfTheWeek.locationName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              ) : (
                <div className="glass-panel-dark h-[400px] rounded-2xl flex items-center justify-center border border-white/10 text-cream/50">
                  No photos available.
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 5. COMMUNITY GALLERY */}
      <section className="py-24 bg-[#051121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Discover</h2>
              <h3 className="text-4xl font-serif font-bold text-white">Community Gallery</h3>
              <p className="text-cream/70 mt-2 max-w-xl">Explore stunning captures from visitors across the country. Vote for your favorites to help them win.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors border border-white/10">Recent</button>
              <button className="px-4 py-2 bg-heritage-orange text-white rounded-full text-sm font-medium transition-colors">Most Voted</button>
            </div>
          </div>

          {/* Masonry Grid Simulation */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {approvedSubmissions.map((photo) => (
              <Link key={photo.id} to={`/photo-challenge/photo/${photo.id}`} className="block group break-inside-avoid">
                <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg">
                  <div className="relative">
                    <HeritageImage src={photo.photoUrl} alt={photo.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-heritage-orange/90 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg backdrop-blur-sm">
                        <Heart className="w-4 h-4 fill-current" /> Vote
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-deep-navy relative z-10 border-t border-white/5">
                    <h4 className="text-white font-bold mb-1 truncate">{photo.title}</h4>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-cream text-[10px] font-bold">
                          {photo.photographer.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs text-cream/90">{photo.photographer}</span>
                           <span className="text-[10px] text-warm-gold truncate max-w-[100px]">{photo.locationName}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-cream/70 bg-white/5 px-2 py-1 rounded-md">
                        <Heart className="w-3 h-3 text-heritage-orange" /> {photo.votes}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <button className="px-8 py-3 glass-panel border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all">
                Load More Photographs
             </button>
          </div>
        </div>
      </section>

      {/* 6. PREVIOUS WINNERS */}
      <section id="winners" className="py-24 bg-deep-navy border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-warm-gold uppercase mb-2">Hall of Fame</h2>
            <h3 className="text-4xl font-serif font-bold text-white">Previous Winners</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {previousWinners.map((winner) => (
              <div key={winner.id} className="relative rounded-3xl overflow-hidden glass-panel-dark border border-warm-gold/30 shadow-2xl group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warm-gold via-heritage-orange to-warm-gold z-20" />
                
                <div className="h-64 relative overflow-hidden">
                  <HeritageImage src={winner.photoUrl} alt="Winner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/20 to-transparent" />
                  
                  {/* Winner Badge */}
                  <div className="absolute top-4 left-4 bg-warm-gold text-deep-navy px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> 1st Place Winner
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-white text-xs font-bold shadow-lg">
                    Prize: {winner.prize}
                  </div>
                </div>
                
                <div className="p-8">
                  <span className="text-xs text-cream/50 uppercase tracking-wider mb-2 block">{winner.competitionId.includes('prev') ? 'August Challenge' : 'Challenge Winner'}</span>
                  <h4 className="text-2xl font-serif font-bold text-white mb-4 line-clamp-1 group-hover:text-warm-gold transition-colors">{winner.title}</h4>
                  
                  <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border-2 border-warm-gold text-white font-bold text-lg">
                      {winner.photographer.charAt(0)}
                    </div>
                    <div>
                      <span className="text-white font-bold block">{winner.photographer}</span>
                      <span className="text-cream/60 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {winner.locationName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* CTA for winning next */}
            <div className="rounded-3xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center p-12 text-center hover:bg-white/10 hover:border-heritage-orange/50 transition-all group">
              <div className="w-20 h-20 rounded-full bg-heritage-orange/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-10 h-10 text-heritage-orange opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-white mb-4">Will you be next?</h4>
              <p className="text-cream/60 mb-8 max-w-sm mx-auto">Upload your best heritage photograph for a chance to win cash prizes and global recognition.</p>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="px-8 py-3 bg-heritage-orange hover:bg-orange-600 text-white rounded-full font-bold transition-all"
              >
                Submit Your Entry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Modal */}
      <PhotoUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />

    </div>
  );
}
