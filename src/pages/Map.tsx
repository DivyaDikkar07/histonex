import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, Navigation, Map as MapIcon, ChevronRight, History, Play, Compass, ArrowLeft, Camera, PlayCircle } from 'lucide-react';
import { heritagePlaces } from '../data/mapData';
import type { MapPlace } from '../data/mapData';
import { demoHeritageSites } from '../data/heritage';
import VideoModal from '../components/ui/VideoModal';
import type { HeritageVideo } from '../data/heritage';
import { AnimatePresence } from 'framer-motion';

// Custom Map Marker using HISTONEX colors
const customMarkerIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `
    <div style="
      background-color: #051121;
      border: 3px solid #D96B27;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 15px rgba(217, 107, 39, 0.5);
      position: relative;
    ">
      <div style="
        background-color: #C99A45;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      "></div>
      <div style="
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid #D96B27;
      "></div>
    </div>
  `,
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  popupAnchor: [0, -32]
});

// Component to handle map flyTo and bounds
function MapController({ places, selectedPlace }: { places: MapPlace[], selectedPlace: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) {
      const place = places.find(p => p.id === selectedPlace);
      if (place) {
        map.flyTo([place.latitude, place.longitude], 10, {
          duration: 1.5,
          easeLinearity: 0.25
        });
      }
    } else if (places.length > 0) {
      // Fit all markers
      const bounds = L.latLngBounds(places.map(p => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
    }
  }, [selectedPlace, places, map]);

  return null;
}

// Distance calculation
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  const d = R * c; 
  return Math.round(d);
}

export default function HeritageMap() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState<string | null>(searchParams.get('place'));
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState('');
  const [activeVideo, setActiveVideo] = useState<HeritageVideo | null>(null);

  const categories = ['All', ...Array.from(new Set(heritagePlaces.map(p => p.category)))];

  const filteredPlaces = useMemo(() => {
    return heritagePlaces.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            place.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || place.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Scroll card into view
  const cardRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    if (selectedPlace && cardRefs.current[selectedPlace]) {
      cardRefs.current[selectedPlace]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedPlace]);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError('');
        },
        (error) => {
          setLocationError('Location permission was not provided.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  };

  const handleResetMap = () => {
    setSelectedPlace(null);
    setSearchQuery('');
    setActiveCategory('All');
  };

  const mapCenter: [number, number] = [20.5937, 78.9629]; // Center of India

  return (
    <div className="flex-grow flex flex-col bg-[#051121] min-h-[calc(100vh-64px)]">
      
      {/* Header */}
      <div className="bg-deep-navy border-b border-white/10 py-6 px-4 sm:px-6 lg:px-8 relative z-20 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-wide">Explore India's Heritage</h1>
            <p className="text-cream/70 text-sm mt-1">Discover six remarkable cultural landmarks across India.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50" />
              <input
                type="text"
                placeholder="Search heritage places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-heritage-orange transition-colors"
              />
            </div>

            {/* Category Filter */}
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-heritage-orange transition-colors appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-deep-navy">{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Sidebar (Cards) */}
        <div className="w-full lg:w-[450px] bg-[#0a1526] border-r border-white/10 flex flex-col h-[40vh] lg:h-auto z-10 shadow-2xl overflow-y-auto custom-scrollbar relative">
          
          <div className="p-4 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#0a1526]/90 backdrop-blur-md z-10">
            <span className="text-sm font-bold text-cream/70">Showing {filteredPlaces.length} places</span>
            <div className="flex gap-2">
              <button 
                onClick={handleResetMap}
                className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-md transition-colors"
              >
                View All 6 Places
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {filteredPlaces.map(place => (
              <div 
                key={place.id}
                ref={el => cardRefs.current[place.id] = el}
                onClick={() => setSelectedPlace(place.id)}
                className={`bg-white/5 rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 group ${
                  selectedPlace === place.id 
                    ? 'border-heritage-orange shadow-[0_0_20px_rgba(217,107,39,0.2)] bg-white/10' 
                    : 'border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="h-32 relative overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="px-2 py-0.5 bg-warm-gold/90 text-deep-navy text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {place.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-heritage-orange transition-colors">{place.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-cream/60 mb-3">
                    <MapPin className="w-3 h-3" /> {place.location}
                  </div>
                  
                  <p className="text-sm text-cream/80 mb-4 line-clamp-2">
                    {place.description}
                  </p>

                  {userLocation && (
                    <div className="flex items-center gap-1 text-xs text-warm-gold mb-3 font-medium bg-warm-gold/10 px-2 py-1 rounded inline-flex">
                      <Navigation className="w-3 h-3" />
                      {getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, place.latitude, place.longitude)} km away
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                    <Link 
                      to={place.route}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 text-center py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/photo-challenge?place=${place.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 text-center py-2 bg-heritage-orange hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <Camera className="w-3 h-3" /> Join Challenge
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {filteredPlaces.length === 0 && (
              <div className="text-center py-12">
                <MapIcon className="w-12 h-12 text-cream/20 mx-auto mb-4" />
                <p className="text-cream/50 font-medium">No places found matching your criteria.</p>
                <button onClick={handleResetMap} className="mt-4 text-heritage-orange text-sm font-bold hover:underline">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
          
          <div className="p-4 mt-auto border-t border-white/5 bg-[#0a1526]">
            <p className="text-center text-xs text-cream/40 italic">Explore a place to discover its story.</p>
          </div>
        </div>

        {/* Right Map Area */}
        <div className="flex-grow relative h-[60vh] lg:h-auto z-0 bg-[#051121]">
          
          {/* Top Controls Overlay */}
          <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2 pointer-events-none">
            <button 
              onClick={requestLocation}
              className="w-10 h-10 bg-white shadow-lg rounded-lg flex items-center justify-center text-deep-navy hover:bg-gray-100 transition-colors pointer-events-auto border-2 border-black/10"
              title="My Location"
            >
              <Navigation className="w-5 h-5" />
            </button>
          </div>

          {locationError && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-red-500/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm animate-fade-in-down">
              {locationError}
            </div>
          )}

          <MapContainer 
            center={mapCenter} 
            zoom={5} 
            scrollWheelZoom={true} 
            className="w-full h-full z-0"
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="map-tiles"
            />
            
            <MapController places={filteredPlaces} selectedPlace={selectedPlace} />

            {filteredPlaces.map(place => (
              <Marker 
                key={place.id}
                position={[place.latitude, place.longitude]}
                icon={customMarkerIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedPlace(place.id);
                  }
                }}
              >
                <Popup className="custom-popup" closeButton={false}>
                  <div className="w-64 -m-[13px] bg-deep-navy rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                    <div className="h-32 relative">
                      <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-90" />
                      <button 
                        className="absolute top-2 right-2 w-6 h-6 bg-black/50 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlace(null);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 -mt-8 relative z-10">
                      <div className="mb-2">
                        <span className="px-2 py-0.5 bg-heritage-orange text-white text-[9px] font-bold rounded-full uppercase tracking-widest shadow-md">
                          {place.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white font-serif leading-tight mb-1">{place.name}</h4>
                      <div className="flex items-center gap-1 text-[10px] text-cream/70 mb-2">
                        <MapPin className="w-3 h-3" /> {place.location}
                      </div>
                      {place.period && (
                        <div className="flex items-center gap-1 text-[10px] text-cream/50 mb-3">
                          <History className="w-3 h-3" /> {place.period}
                        </div>
                      )}
                      
                      <div className="flex flex-col gap-2">
                        <Link 
                          to={place.route}
                          className="block w-full text-center py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded transition-colors"
                        >
                          Explore Heritage
                        </Link>
                        
                        {(() => {
                          const siteData = demoHeritageSites.find(s => s.id === place.id);
                          if (siteData && siteData.videos && siteData.videos.length > 0) {
                            return (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveVideo(siteData.videos![0]);
                                }}
                                className="flex items-center justify-center gap-2 w-full text-center py-2 bg-red-600/20 hover:bg-red-600/40 text-red-100 text-xs font-bold rounded border border-red-500/30 transition-colors"
                              >
                                <PlayCircle className="w-4 h-4 text-red-500" /> Watch Video
                              </button>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {userLocation && (
              <Marker 
                position={[userLocation.lat, userLocation.lng]}
                icon={new L.DivIcon({
                  className: 'user-marker',
                  html: `<div style="background-color: #3b82f6; border: 3px solid white; border-radius: 50%; width: 16px; height: 16px; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
                  iconSize: [16, 16],
                  iconAnchor: [8, 8]
                })}
              >
                <Popup>You are here</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal 
            video={activeVideo} 
            onClose={() => setActiveVideo(null)} 
          />
        )}
      </AnimatePresence>
      
      {/* Global CSS for Leaflet Overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container {
          background-color: #051121;
          font-family: inherit;
        }
        /* Darken map tiles to match theme */
        .map-tiles {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
        }
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background: transparent;
          box-shadow: none;
        }
        .leaflet-popup-content {
          margin: 0;
          line-height: inherit;
        }
        .custom-popup .leaflet-popup-tip-container {
          display: none;
        }
        .leaflet-control-zoom a {
          background-color: #051121 !important;
          color: #fff !important;
          border-color: rgba(255,255,255,0.2) !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: #D96B27 !important;
        }
      `}} />
    </div>
  );
}
