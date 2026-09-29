export default function Footer() {
  return (
    <footer className="bg-deep-navy border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-warm-gold to-heritage-orange flex items-center justify-center font-serif font-bold text-deep-navy">
                H
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-white">HISTONEX</span>
            </div>
            <p className="text-cream/70 text-sm max-w-sm">
              Discover India's cultural heritage through AI-powered recognition, immersive 3D experiences, historical storytelling, and community preservation.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider text-sm uppercase">Features</h3>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="/HistoLens" className="hover:text-heritage-orange transition-colors">HistoLens AI</a></li>
              <li><a href="/explore" className="hover:text-heritage-orange transition-colors">3D Heritage View</a></li>
              <li><a href="/map" className="hover:text-heritage-orange transition-colors">Heritage Map</a></li>
              <li><a href="/community" className="hover:text-heritage-orange transition-colors">Community Stories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider text-sm uppercase">Legal</h3>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#" className="hover:text-heritage-orange transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-heritage-orange transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-heritage-orange transition-colors">Content Guidelines</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>&copy; {new Date().getFullYear()} HISTONEX. An SIH Prototype. "See. Discover. Preserve."</p>
          <a href="/admin" className="hover:text-heritage-orange transition-colors">Admin Portal</a>
        </div>
      </div>
    </footer>
  );
}
