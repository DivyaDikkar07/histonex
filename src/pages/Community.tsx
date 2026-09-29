import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, CheckCircle2, Clock, Image as ImageIcon } from 'lucide-react';

export default function Community() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    story: '',
    category: 'Local Folktales'
  });
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'pending'>('idle');

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiSuggestions({
        title: `The Legend of ${formData.location || 'the Heritage Site'}`,
        summary: `A fascinating local story about the historical significance of ${formData.location}.`,
        structuredStory: formData.story 
          ? `Introduction:\n${formData.story}\n\nHistorical Context:\n(AI generated context about the era)`
          : 'Please write a story first so I can help structure it.',
        keywords: ['Local folklore', 'Oral history', 'Preservation']
      });
      setIsAnalyzing(false);
      setStep(2);
    }, 2000);
  };

  const handleSubmit = (useAiVersion: boolean) => {
    setSubmitStatus('pending');
    setStep(3);
  };

  return (
    <div className="flex-grow bg-[#051121] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Community Stories</h1>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            Preserve your family's history and local folklore. Contribute to the digital archive of India's cultural heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-panel-dark p-6 rounded-2xl border border-white/10 text-center">
            <div className="text-3xl font-bold text-warm-gold mb-2">150+</div>
            <div className="text-cream/70 text-sm">Verified Stories</div>
          </div>
          <div className="glass-panel-dark p-6 rounded-2xl border border-white/10 text-center">
            <div className="text-3xl font-bold text-success-green mb-2">32</div>
            <div className="text-cream/70 text-sm">Languages Supported</div>
          </div>
          <div className="glass-panel-dark p-6 rounded-2xl border border-white/10 text-center">
            <div className="text-3xl font-bold text-heritage-orange mb-2">840</div>
            <div className="text-cream/70 text-sm">Heritage Explorers</div>
          </div>
        </div>

        <div className="glass-panel-dark rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warm-gold via-heritage-orange to-warm-gold" />
          
          <h2 className="text-2xl font-serif font-bold text-white mb-8">Share Your Story</h2>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-cream/80 mb-2">Heritage Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Raigad Fort, Maharashtra"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-heritage-orange transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-cream/80 mb-2">Your Story</label>
                  <textarea 
                    rows={6}
                    placeholder="Write your family's story, local legend, or historical knowledge..."
                    value={formData.story}
                    onChange={e => setFormData({...formData, story: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-heritage-orange transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button className="flex-1 py-4 glass-panel border border-white/10 hover:bg-white/10 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-colors">
                    <ImageIcon className="w-5 h-5" />
                    Upload Image/Audio
                  </button>
                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !formData.story}
                    className="flex-1 py-4 bg-heritage-orange hover:bg-orange-600 disabled:opacity-50 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        AI Story Assistant
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && aiSuggestions && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="p-4 bg-heritage-orange/10 border border-heritage-orange/30 rounded-xl">
                  <h3 className="text-heritage-orange font-bold flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" /> AI-Generated Assistance
                  </h3>
                  <p className="text-sm text-cream/80">I have reviewed your story and suggested some improvements for the digital archive.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-xs text-warm-gold font-semibold uppercase tracking-wider block mb-1">Suggested Title</span>
                    <p className="text-white font-medium">{aiSuggestions.title}</p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-xs text-warm-gold font-semibold uppercase tracking-wider block mb-1">Suggested Structure</span>
                    <p className="text-cream whitespace-pre-wrap text-sm">{aiSuggestions.structuredStory}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {aiSuggestions.keywords.map((kw: string) => (
                      <span key={kw} className="px-3 py-1 bg-white/10 rounded-full text-xs text-cream/70">{kw}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => handleSubmit(false)}
                    className="flex-1 py-3 glass-panel border border-white/10 hover:bg-white/10 rounded-xl text-white font-medium transition-colors"
                  >
                    Submit My Original Draft
                  </button>
                  <button 
                    onClick={() => handleSubmit(true)}
                    className="flex-1 py-3 bg-heritage-orange hover:bg-orange-600 rounded-xl text-white font-bold transition-colors"
                  >
                    Submit AI Enhanced Version
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-warm-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-warm-gold" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Pending Verification</h3>
                <p className="text-cream/70 max-w-md mx-auto mb-8">
                  Thank you for your contribution! Your story has been sent to our heritage experts and admin queue for verification.
                </p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 mb-8">
                  <span className="w-2 h-2 rounded-full bg-warm-gold animate-pulse" />
                  <span className="text-sm font-medium text-cream">Status: In Review Queue</span>
                </div>

                <div>
                  <button 
                    onClick={() => { setStep(1); setFormData({title: '', location: '', story: '', category: 'Local Folktales'}); }}
                    className="text-heritage-orange hover:text-white text-sm font-medium transition-colors"
                  >
                    Submit Another Story
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
