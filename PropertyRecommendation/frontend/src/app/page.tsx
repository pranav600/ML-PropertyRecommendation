"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Building, Home as HomeIcon, Maximize, ArrowRight, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Options {
  cities: string[];
  property_types: string[];
  bhks: number[];
}

interface Property {
  Property_Name: string;
  City_name: string;
  Property_type: string;
  No_of_BHK: number;
  Price_per_sqft: number;
  Size: number;
  Price: string;
  Future_Price: string;
  Locality_Name: string;
  Property_status: string;
  Latitude: number;
  Longitude: number;
}

export default function Home() {
  const [options, setOptions] = useState<Options>({ cities: [], property_types: [], bhks: [] });
  const [loadingOptions, setLoadingOptions] = useState(true);
  
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bhk, setBhk] = useState("");
  const [size, setSize] = useState("1000");
  
  const [results, setResults] = useState<Property[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchId, setSearchId] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 4 columns * 3 rows

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/options`)
      .then(res => res.json())
      .then(data => {
        setOptions(data);
        if (data.cities?.length > 0) setCity(data.cities[0]);
        if (data.property_types?.length > 0) setPropertyType(data.property_types[0]);
        if (data.bhks?.length > 0) setBhk(data.bhks[0].toString());
        setLoadingOptions(false);
      })
      .catch(err => {
        console.error("Failed to load options:", err);
        setLoadingOptions(false);
      });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSearch(true);
    setSearched(true);
    setSearchId(Date.now());
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          property_type: propertyType,
          bhk: parseInt(bhk),
          size: parseInt(size),
        })
      });
      const data = await res.json();
      setResults(data);
      setCurrentPage(1); // Reset to first page on new search
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoadingSearch(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex items-center justify-center min-h-[60vh]" style={{ perspective: "1000px" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/20 to-[var(--color-primary)]/10 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-10 dark:opacity-20 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center" style={{ transformStyle: "preserve-3d" }}>
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-2xl">
              Find Your <span className="text-[var(--color-primary)]">Dream Home</span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
              AI-powered property recommendations. We predict future value so you can make the smartest investment today.
            </p>
          </motion.div>
          
          {/* Search Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: -15, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            // whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5, boxShadow: "0 25px 50px -12px rgba(212, 175, 55, 0.25)" }}
            id="search" 
            className="max-w-4xl mx-auto bg-[var(--color-card)]/80 dark:bg-[var(--color-card)]/90 backdrop-blur-xl border border-[var(--color-border)] p-6 rounded-2xl shadow-2xl relative z-20"
          >
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
              
              <div className="flex flex-col text-left col-span-1">
                <label className="text-xs font-semibold text-foreground/60 mb-1.5 flex items-center gap-1">
                  <MapPin size={14} className="text-[var(--color-primary)]" /> City
                </label>
                <select 
                  value={city} onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent border border-[var(--color-border)] rounded-lg p-3 text-sm outline-none focus:border-[var(--color-primary)] transition-colors appearance-none cursor-pointer"
                  disabled={loadingOptions}
                >
                  {options.cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col text-left col-span-1">
                <label className="text-xs font-semibold text-foreground/60 mb-1.5 flex items-center gap-1">
                  <Building size={14} className="text-[var(--color-primary)]" /> Property Type
                </label>
                <select 
                  value={propertyType} onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent border border-[var(--color-border)] rounded-lg p-3 text-sm outline-none focus:border-[var(--color-primary)] transition-colors appearance-none cursor-pointer"
                  disabled={loadingOptions}
                >
                  {options.property_types.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                </select>
              </div>

              <div className="flex flex-col text-left col-span-1">
                <label className="text-xs font-semibold text-foreground/60 mb-1.5 flex items-center gap-1">
                  <HomeIcon size={14} className="text-[var(--color-primary)]" /> BHK
                </label>
                <select 
                  value={bhk} onChange={(e) => setBhk(e.target.value)}
                  className="w-full bg-transparent border border-[var(--color-border)] rounded-lg p-3 text-sm outline-none focus:border-[var(--color-primary)] transition-colors appearance-none cursor-pointer"
                  disabled={loadingOptions}
                >
                  {options.bhks.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="flex flex-col text-left col-span-1">
                <label className="text-xs font-semibold text-foreground/60 mb-1.5 flex items-center gap-1">
                  <Maximize size={14} className="text-[var(--color-primary)]" /> Size (sqft)
                </label>
                <input 
                  type="number" min="300" max="10000" step="100"
                  value={size} onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-transparent border border-[var(--color-border)] rounded-lg p-3 text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
                  placeholder="1000"
                />
              </div>

              <div className="flex flex-col col-span-1 justify-end">
                <button 
                  type="submit" 
                  disabled={loadingSearch || loadingOptions}
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white font-semibold rounded-lg p-3 transition-colors flex items-center justify-center gap-2 h-[46px] cursor-pointer"
                >
                  {loadingSearch ? <Loader2 size={18} className="animate-spin" /> : <><Search size={18} /> Search</>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      {searched && (
        <section id="results" className="container mx-auto px-4 py-16 scroll-mt-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Recommended <span className="text-[var(--color-primary)]">Properties</span></h2>
            <span className="text-sm font-medium px-4 py-1.5 bg-[var(--color-secondary)]/20 text-[var(--color-accent)] rounded-full">
              {results.length} properties found
            </span>
          </div>

          {loadingSearch ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl h-[400px]"></div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((property, idx) => (
                <div key={idx} className="group bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:shadow-2xl hover:border-[var(--color-primary)]/50 transition-all duration-300 flex flex-col">
                  
                  <div className="relative h-48 bg-[var(--color-secondary)]/20 overflow-hidden">
                    <img 
                      src={`https://loremflickr.com/800/600/house,mansion?random=${searchId + (currentPage - 1) * itemsPerPage + idx}`} 
                      alt="Property" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                         e.currentTarget.style.display = 'none';
                         e.currentTarget.parentElement!.classList.add('bg-gradient-to-tr', 'from-[var(--color-primary)]', 'to-[var(--color-secondary)]');
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                      {property.Property_status}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1" title={property.Property_Name}>{property.Property_Name}</h3>
                    <p className="text-sm text-foreground/60 mb-4 flex items-center gap-1.5">
                      <MapPin size={14} /> {property.Locality_Name}, {property.City_name}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="bg-[var(--color-lightbg)]/50 dark:bg-black/30 p-2 rounded-lg text-center">
                        <span className="block text-xs text-foreground/50 mb-1">BHK</span>
                        <span className="font-semibold">{property.No_of_BHK}</span>
                      </div>
                      <div className="bg-[var(--color-lightbg)]/50 dark:bg-black/30 p-2 rounded-lg text-center">
                        <span className="block text-xs text-foreground/50 mb-1">Type</span>
                        <span className="font-semibold text-xs truncate" title={property.Property_type}>{property.Property_type}</span>
                      </div>
                      <div className="bg-[var(--color-lightbg)]/50 dark:bg-black/30 p-2 rounded-lg text-center">
                        <span className="block text-xs text-foreground/50 mb-1">Size</span>
                        <span className="font-semibold text-sm">{property.Size} sqft</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-xs text-foreground/50">Current Price</p>
                          <p className="text-2xl font-bold text-[var(--color-primary)]">{property.Price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-foreground/50 text-[var(--color-accent)] font-semibold">Est. in 5 yrs</p>
                          <p className="text-lg font-bold">{property.Future_Price}</p>
                        </div>
                      </div>
                      
                      <a 
                        href={`https://www.google.com/maps?q=${property.Latitude},${property.Longitude}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-medium py-2.5 rounded-lg transition-colors"
                      >
                        <MapPin size={16} /> View on Map
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl">
              <Search size={48} className="mx-auto text-foreground/20 mb-4" />
              <h3 className="text-xl font-bold mb-2">No Properties Found</h3>
              <p className="text-foreground/60 max-w-md mx-auto">Try adjusting your search criteria. You might be looking for a price range or property type that isn't currently available.</p>
            </div>
          )}

          {results.length > itemsPerPage && (
            <div className="flex justify-center items-center mt-12 gap-4">
              <button 
                onClick={() => {
                  setCurrentPage(prev => prev === 1 ? Math.ceil(results.length / itemsPerPage) : prev - 1);
                  setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 50);
                }}
                className="p-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors cursor-pointer"
                aria-label="Previous Page"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-sm font-medium text-foreground/80">
                Page {currentPage} of {Math.ceil(results.length / itemsPerPage)}
              </span>
              <button 
                onClick={() => {
                  setCurrentPage(prev => prev === Math.ceil(results.length / itemsPerPage) ? 1 : prev + 1);
                  setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 50);
                }}
                className="p-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors cursor-pointer"
                aria-label="Next Page"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
