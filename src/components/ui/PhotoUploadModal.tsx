import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Camera, MapPin, CheckCircle2, AlertCircle, Bot, Loader2, Image as ImageIcon } from 'lucide-react';
import { demoHeritageSites } from '../../data/heritage';
import { useSubmissions } from '../../hooks/useSubmissions';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoUploadModal({ isOpen, onClose }: PhotoUploadModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Form State
  const [locationId, setLocationId] = useState('');
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  
  // AI State
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{ title: string; story: string } | null>(null);
  const [isAiCheckComplete, setIsAiCheckComplete] = useState(false);

  const { addSubmission } = useSubmissions();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Compress image to fit in localStorage
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Export as highly compressed JPEG
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
          setPreviewUrl(compressedDataUrl);
          setStep(2);
          
          // Simulate AI Image Check
          setIsAiCheckComplete(false);
          setTimeout(() => {
            setIsAiCheckComplete(true);
          }, 2000);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiAnalysis = () => {
    setIsAiAnalyzing(true);
    setTimeout(() => {
      setAiSuggestions({
        title: "Ancient Stone, Timeless Story",
        story: "An architectural glimpse into India's ancient heritage, capturing the intricate details of centuries-old craftsmanship."
      });
      setIsAiAnalyzing(false);
    }, 2500);
  };

  const applyAiSuggestions = () => {
    if (aiSuggestions) {
      setTitle(aiSuggestions.title);
      setStory(aiSuggestions.story);
      setAiSuggestions(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) return;

    // Get location name
    const loc = demoHeritageSites.find(s => s.id === locationId);
    
    addSubmission({
      photographer: 'guest_user',
      title,
      story,
      locationName: loc ? `${loc.name}, ${loc.location}` : 'Unknown Location',
      photoUrl: previewUrl
    });

    setStep(4); // Success step
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedFile(null);
    setPreviewUrl(null);
    setLocationId('');
    setTitle('');
    setStory('');
    setAiSuggestions(null);
    setIsAiCheckComplete(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={resetAndClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-deep-navy border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-heritage-orange" />
            Submit Heritage Photo
          </h2>
          <button 
            onClick={resetAndClose}
            className="p-2 text-cream/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
          
          {/* STEP 1: Upload */}
          {step === 1 && (
            <div className="text-center py-12">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden" 
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-md mx-auto border-2 border-dashed border-white/20 rounded-2xl p-12 hover:bg-white/5 hover:border-heritage-orange/50 transition-all cursor-pointer group"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-10 h-10 text-cream/50 group-hover:text-heritage-orange" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Upload Your Photo</h3>
                <p className="text-cream/50 text-sm mb-6">Drag and drop or click to browse</p>
                <p className="text-[10px] text-cream/40 uppercase tracking-widest">High quality JPG or PNG</p>
              </div>
            </div>
          )}

          {/* STEP 2 & 3: Details & Preview */}
          {(step === 2 || step === 3) && (
            <div className="space-y-6">
              {/* Image Preview & AI Check */}
              <div className="relative rounded-2xl overflow-hidden bg-black/50 aspect-video flex items-center justify-center border border-white/10">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-white/20" />
                )}
                
                {/* AI Check Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                  {!isAiCheckComplete ? (
                    <div className="bg-black/60 backdrop-blur-md rounded-lg p-3 flex items-center gap-3 border border-white/10 w-fit">
                      <Loader2 className="w-4 h-4 text-heritage-orange animate-spin" />
                      <span className="text-xs text-white font-medium">AI Photo Check in progress...</span>
                    </div>
                  ) : (
                    <div className="bg-success-green/20 backdrop-blur-md rounded-lg p-3 border border-success-green/30 w-fit">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-success-green" />
                        <span className="text-xs font-bold text-white">AI Photo Check Passed</span>
                      </div>
                      <div className="text-[10px] text-cream/70 space-y-1 ml-6">
                         <div>✓ Image quality acceptable</div>
                         <div className="flex items-center gap-1 text-warm-gold"><AlertCircle className="w-3 h-3" /> Location verification pending review</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-cream/80 mb-1">Heritage Location</label>
                  <select 
                    required
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-heritage-orange/50 transition-colors"
                  >
                    <option value="" disabled className="bg-deep-navy text-cream/50">Select a location</option>
                    {demoHeritageSites.map(site => (
                      <option key={site.id} value={site.id} className="bg-deep-navy text-white">{site.name}, {site.location}</option>
                    ))}
                  </select>
                </div>

                {/* AI Assistant Call to Action */}
                {!aiSuggestions && !title && locationId && (
                  <div className="bg-heritage-orange/10 border border-heritage-orange/30 rounded-xl p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-heritage-orange/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-heritage-orange" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Writer's block?</h4>
                      <p className="text-xs text-cream/70 mb-3">Let our AI analyze your photo and suggest a beautiful title and story.</p>
                      <button 
                        type="button"
                        onClick={handleAiAnalysis}
                        disabled={isAiAnalyzing}
                        className="text-xs font-bold bg-heritage-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        {isAiAnalyzing ? <><Loader2 className="w-3 h-3 animate-spin" /> Analyzing photo...</> : 'Generate Suggestions'}
                      </button>
                    </div>
                  </div>
                )}

                {/* AI Suggestions Display */}
                {aiSuggestions && (
                  <div className="bg-white/5 border border-warm-gold/30 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-warm-gold uppercase tracking-wider flex items-center gap-1"><Bot className="w-3 h-3" /> AI Suggestions</span>
                       <button type="button" onClick={() => setAiSuggestions(null)} className="text-xs text-cream/50 hover:text-white">Dismiss</button>
                    </div>
                    <div>
                      <span className="text-xs text-cream/50 block mb-1">Suggested Title</span>
                      <p className="text-sm text-white font-medium">"{aiSuggestions.title}"</p>
                    </div>
                    <div>
                      <span className="text-xs text-cream/50 block mb-1">Suggested Story</span>
                      <p className="text-sm text-cream">"{aiSuggestions.story}"</p>
                    </div>
                    <div className="pt-2 flex gap-3">
                      <button 
                        type="button"
                        onClick={applyAiSuggestions}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-lg transition-colors border border-white/10"
                      >
                        Use Suggestions
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-cream/80 mb-1">Photo Title</label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., Ancient Light at Dawn"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-cream/30 focus:outline-none focus:border-heritage-orange/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cream/80 mb-1">The Story Behind the Photo</label>
                  <textarea 
                    required
                    rows={4}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Share what inspired you to take this photo..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-cream/30 focus:outline-none focus:border-heritage-orange/50 transition-colors resize-none"
                  />
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-success-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-success-green" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Photo Submitted!</h3>
              <p className="text-cream/70 mb-8 max-w-sm mx-auto">
                Thank you for contributing to the HISTONEX community. Your photo is now <span className="text-warm-gold font-bold">Pending Review</span> by our moderation team.
              </p>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 max-w-sm mx-auto mb-8">
                <div className="text-sm font-bold text-white mb-1">Gamification Reward</div>
                <div className="text-heritage-orange font-bold text-xl">+20 Points</div>
                <div className="text-xs text-cream/50">For submitting a photo</div>
              </div>

              <button 
                onClick={resetAndClose}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all border border-white/20"
              >
                Back to Challenge
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {(step === 2 || step === 3) && (
          <div className="p-6 border-t border-white/10 bg-black/20 flex justify-between items-center">
            <button 
              onClick={() => setStep(1)}
              className="px-6 py-2.5 text-cream/70 hover:text-white text-sm font-bold transition-colors"
            >
              Back
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!locationId || !title || !story || !isAiCheckComplete}
              className="px-8 py-2.5 bg-heritage-orange hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-heritage-orange text-white rounded-full font-bold transition-all shadow-lg"
            >
              Submit Entry
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
