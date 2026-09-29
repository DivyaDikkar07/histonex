import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimatedBackground from './components/ui/AnimatedBackground';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import HistoLens from './pages/HistoLens';
import HeritageSite from './pages/HeritageSite';
import Community from './pages/Community';
import HeritageVideos from './pages/HeritageVideos';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import PhotoChallenge from './pages/PhotoChallenge';
import PhotoDetail from './pages/PhotoDetail';
import Map from './pages/Map';
import HeritageChatbot from './components/ui/HeritageChatbot';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-deep-navy text-cream selection:bg-heritage-orange selection:text-white relative">
        <AnimatedBackground />
        <Navbar />
        <main className="flex-grow flex flex-col relative z-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/HistoLens" element={<HistoLens />} />
            <Route path="/heritage/:id" element={<HeritageSite />} />
            <Route path="/map" element={<Map />} />
            <Route path="/photo-challenge" element={<PhotoChallenge />} />
            <Route path="/photo-challenge/photo/:id" element={<PhotoDetail />} />
            <Route path="/stories" element={<HeritageVideos />} />
            <Route path="/community" element={<Community />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <HeritageChatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;
