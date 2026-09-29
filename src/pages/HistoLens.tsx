import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, ScanLine, CheckCircle2, ChevronRight, X, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { demoHeritageSites } from '../data/heritage';
import HeritageImage from '../components/ui/HeritageImage';
import PastVsPresentSlider from '../components/ui/PastVsPresentSlider';
import { mlEngine } from '../utils/mlEngine';

export default function HistoLens() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { t } = useTranslation();
  
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [timelineYear, setTimelineYear] = useState(2026);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Initialize AI engine on mount
    mlEngine.initialize().then(() => setIsInitializing(false));
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setIsCameraActive(true);
      // Wait for React to render the video element, then attach stream
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(e => console.error("Video play error:", e));
        }
      }, 100);
    } catch (err) {
      console.error("Camera access failed", err);
      alert("Camera access denied or unavailable. Please try uploading an image instead.");
    }
  };

  const captureAndScan = async () => {
    if (videoRef.current && canvasRef.current && !isInitializing) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUrl);
        stopCamera();
        
        await startRealScan(canvas);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !isInitializing) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = reader.result as string;
        setImagePreview(result);
        
        // Create an image element to pass to mlEngine
        const img = new Image();
        img.onload = () => startRealScan(img);
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  const startRealScan = async (imageSource: HTMLImageElement | HTMLCanvasElement) => {
    setIsScanning(true);
    setScanStep(1); // Analyzing architecture
    
    setTimeout(() => setScanStep(2), 800); // Extracting visual features
    
    try {
      const result = await mlEngine.analyzeImage(imageSource as any);
      
      setScanStep(3); // Matching heritage database
      setTimeout(() => setScanStep(4), 800); // Checking verified records
      
      setTimeout(() => {
        setIsScanning(false);
        if (result && result.confidence >= 0.7) {
          const site = demoHeritageSites.find(s => s.id === result.id);
          if (site) {
            setScanResult({
              ...site,
              confidence: Math.round(result.confidence * 100),
            });
            // Auto-set the timeline to the oldest historical image to show AR effect immediately
            if (site.historicalImages && site.historicalImages.length > 0) {
              const oldestYear = Math.min(...site.historicalImages.map((img: any) => img.year));
              setTimelineYear(oldestYear);
            }
          } else {
            setScanResult({ invalid: true });
          }
        } else {
          setScanResult({ invalid: true });
        }
      }, 1500);

    } catch (err) {
      console.error("Scan failed:", err);
      setIsScanning(false);
      setScanResult({ invalid: true });
    }
  };

  const resetScanner = () => {
    setImagePreview(null);
    setScanResult(null);
    setIsScanning(false);
    setScanStep(0);
    setTimelineYear(2026);
    stopCamera();
  };

  const scanSteps = [
    'Initializing AI Scanner...',
    'Analyzing architectural features...',
    'Extracting visual patterns...',
    'Matching with heritage database...',
    'Checking verified records...'
  ];

  // Determine which historical image to show
  let currentOverlayImage = null;

  if (scanResult?.historicalImages && timelineYear < 2026) {
    const sortedImages = [...scanResult.historicalImages].sort((a, b) => a.year - b.year);
    let closest = sortedImages[0];
    let minDiff = Math.abs(timelineYear - closest.year);
    for (const item of sortedImages) {
      const diff = Math.abs(timelineYear - item.year);
      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    }
    
    currentOverlayImage = closest.image;
  }

  return (
    <div className="flex-grow bg-[#051121] flex flex-col relative min-h-screen">
      
      {/* Hidden canvas for capturing video frames */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Scanner UI */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        
        {/* Initial Selection State */}
        {!imagePreview && !scanResult && !isCameraActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold text-white mb-2">HistoLens</h1>
              <p className="text-warm-gold font-medium">Your lens into history</p>
            </div>

            <div className="glass-panel-dark rounded-3xl p-8 flex flex-col items-center gap-6 border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-heritage-orange rounded-tl-xl m-4" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-heritage-orange rounded-tr-xl m-4" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-heritage-orange rounded-bl-xl m-4" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-heritage-orange rounded-br-xl m-4" />

              <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center mb-4 relative">
                <motion.div 
                  className="absolute inset-0 border border-heritage-orange rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute inset-2 border border-warm-gold rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <Camera className="w-16 h-16 text-heritage-orange relative z-10" />
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isInitializing}
              />
              
              <div className="flex flex-col w-full gap-4">
                <button 
                  onClick={startCamera}
                  disabled={isInitializing}
                  className="w-full py-4 bg-heritage-orange hover:bg-orange-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Camera className="w-5 h-5" />
                  {t('common.openCamera')}
                </button>

                <div className="flex items-center w-full gap-4">
                  <div className="h-px bg-white/10 flex-grow" />
                  <span className="text-cream/50 text-sm">OR</span>
                  <div className="h-px bg-white/10 flex-grow" />
                </div>

                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isInitializing}
                  className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-5 h-5" />
                  {t('common.uploadImage')}
                </button>
              </div>
              
              {isInitializing && (
                <div className="mt-2 flex items-center justify-center gap-3 text-heritage-orange font-medium text-sm">
                  <div className="w-4 h-4 border-2 border-heritage-orange/30 border-t-heritage-orange rounded-full animate-spin" />
                  {t('common.warmingUp')}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Live Camera Feed State */}
        {isCameraActive && !imagePreview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            <button 
              onClick={resetScanner}
              className="absolute top-6 right-6 z-50 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative flex-grow flex items-center justify-center overflow-hidden w-full h-full">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Target Brackets UI over video */}
              <div className="absolute inset-8 border-2 border-heritage-orange/50 border-dashed rounded-lg opacity-80" />
              <div className="absolute bottom-12 left-0 right-0 flex justify-center">
                <button 
                  onClick={captureAndScan}
                  className="w-20 h-20 rounded-full bg-white/20 border-4 border-white flex items-center justify-center backdrop-blur-sm active:scale-95 transition-transform"
                >
                  <motion.div 
                    animate={{ scale: [1, 0.9, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-white opacity-80" 
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scanning State */}
        <AnimatePresence>
          {isScanning && imagePreview && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#051121] flex flex-col items-center justify-center p-4"
            >
              <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border-2 border-heritage-orange/50">
                <img src={imagePreview} alt="Scanning" className="w-full h-[60vh] object-cover opacity-60" />
                
                {/* Scan Line Animation */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-heritage-orange shadow-[0_0_15px_#D96B27] z-10"
                />
                
                {/* Target Brackets */}
                <div className="absolute inset-8 border border-white/20 border-dashed rounded-lg" />
              </div>

              <div className="mt-8 text-center h-24">
                <motion.div 
                  key={scanStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-3 text-warm-gold font-medium"
                >
                  <ScanLine className="w-5 h-5 animate-pulse" />
                  {scanSteps[scanStep]}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result State */}
        <AnimatePresence>
          {scanResult && imagePreview && !isScanning && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md relative z-10 mt-12"
            >
              <button 
                onClick={resetScanner}
                className="absolute -top-12 right-0 p-2 text-cream/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="glass-panel-dark rounded-3xl overflow-hidden border border-white/10">
                {scanResult.invalid ? (
                  <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-[#0a1526] rounded-2xl border border-white/10">
                    <X className="w-20 h-20 text-red-500 mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">{t('common.unknownHeritage')}</h2>
                    <p className="text-cream/70 mb-8 max-w-md">
                      {t('common.unknownHeritageDesc')}
                    </p>
                    <div className="flex flex-col gap-3 w-full">
                      <button 
                        onClick={resetScanner}
                        className="w-full px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all"
                      >
                        {t('common.scanAnother')}
                      </button>
                      <button 
                        onClick={() => { resetScanner(); startCamera(); }}
                        className="w-full px-8 py-3 bg-heritage-orange hover:bg-orange-600 text-white rounded-full font-bold transition-all"
                      >
                        {t('common.openCamera')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Image & Timeline Overlap Container */}
                    <div className="h-64 relative bg-black rounded-t-3xl overflow-hidden">
                      {/* Current Image (Base) */}
                      <img src={imagePreview} alt="Result Current" className="absolute inset-0 w-full h-full object-cover" />
                      
                      {/* Old Images (Overlays) - Render all and crossfade for smooth transition */}
                      {scanResult.historicalImages && scanResult.historicalImages.map((histImg: {year: number, image: string}) => (
                        <img 
                          key={histImg.year}
                          src={histImg.image} 
                          alt={`Historical ${histImg.year}`} 
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                            currentOverlayImage === histImg.image && timelineYear < 2026 ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))}

                      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 flex flex-col gap-1 z-10">
                        <span className="px-3 py-1 bg-deep-navy/80 backdrop-blur-md rounded-full text-xs font-semibold text-warm-gold border border-warm-gold/30 inline-block w-max">
                          {t('common.histoScanResult')}
                        </span>
                        <span className="text-white font-serif font-bold drop-shadow-md">
                          {t('common.year')}: {timelineYear}
                        </span>
                      </div>
                    </div>

                    {/* Timeline Slider Section */}
                    <div className="px-6 pt-6 pb-2 bg-white/5 border-b border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-warm-gold" />
                        <span className="text-sm text-cream font-medium">Time Travel Timeline</span>
                      </div>
                      <input 
                        type="range" 
                        min="1916" 
                        max="2026" 
                        value={timelineYear}
                        onChange={(e) => setTimelineYear(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-heritage-orange focus:outline-none"
                      />
                      <div className="flex justify-between text-xs text-cream/50 mt-2 font-mono">
                        <span>1916</span>
                        <span>2026</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-3xl font-serif font-bold text-white mb-1">{scanResult.name}</h2>
                      <div className="flex items-center gap-1 text-cream/70 text-sm mb-6">
                        {scanResult.location}
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <span className="text-cream/50">Category</span>
                          <span className="text-white font-medium">{scanResult.category}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <span className="text-cream/50">Historical Period</span>
                          <span className="text-white font-medium text-right max-w-[60%]">{scanResult.period}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <span className="text-cream/50">AI Confidence</span>
                          <span className="text-success-green font-bold flex items-center gap-1">
                            {scanResult.confidence}%
                          </span>
                        </div>
                        {scanResult.verified && (
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-cream/50">Status</span>
                            <span className="text-success-green flex items-center gap-1 font-medium bg-success-green/10 px-3 py-1 rounded-full">
                              <CheckCircle2 className="w-4 h-4" /> Verified Heritage Record
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {scanResult.gallery && scanResult.gallery.length > 0 && (
                        <div className="mb-6">
                          <span className="text-cream/50 text-sm block mb-3">Related Images</span>
                          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                            {scanResult.gallery.map((img: string, idx: number) => (
                              <div key={idx} className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-white/10">
                                <HeritageImage src={img} alt="Related" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <Link 
                          to={`/heritage/${scanResult.id}`}
                          className="col-span-2 w-full py-4 bg-heritage-orange hover:bg-orange-600 rounded-xl font-bold text-white transition-colors flex items-center justify-center gap-2"
                        >
                          Read Full Story
                        </Link>
                        <Link to={`/heritage/${scanResult.id}`} state={{ activeModal: '3d' }} className="py-3 glass-panel border border-white/10 text-center rounded-xl text-white text-sm font-medium">Explore 3D</Link>
                        <Link to={`/heritage/${scanResult.id}`} state={{ activeModal: 'timeline' }} className="py-3 glass-panel border border-white/10 text-center rounded-xl text-white text-sm font-medium">View Timeline</Link>
                        <Link to={`/heritage/${scanResult.id}`} state={{ activeModal: 'compare' }} className="py-3 glass-panel border border-white/10 text-center rounded-xl text-white text-sm font-medium">Then vs Now</Link>
                        <Link to="/map" className="py-3 glass-panel border border-white/10 text-center rounded-xl text-white text-sm font-medium">View on Map</Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {scanResult && !scanResult.invalid && (
                <div className="mt-8 bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                  <PastVsPresentSlider site={scanResult} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
