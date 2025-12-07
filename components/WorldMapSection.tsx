import React, { useState, useMemo, useEffect } from 'react';
import { Icons } from './Icon';
import SectionTitle from './SectionTitle';

// ============================================================================
// DATA & CONSTANTS
// ============================================================================

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  year: string;
  description?: string;
}

// Career Trajectory Data
const LOCATIONS: Location[] = [
  { 
    id: 'suzhou', 
    name: '苏州 Suzhou', 
    lat: 31.2989, 
    lng: 120.5853, 
    year: '2015-2017',
    description: 'Undergraduate Studies'
  },
  { 
    id: 'liverpool', 
    name: '利物浦 Liverpool', 
    lat: 53.4084, 
    lng: -2.9916, 
    year: '2017-2019',
    description: 'Undergraduate Completion' 
  },
  { 
    id: 'delft', 
    name: '代尔夫特 Delft', 
    lat: 52.0116, 
    lng: 4.3571, 
    year: '2019-2021',
    description: 'Master\'s Degree'
  },
  { 
    id: 'chongqing', 
    name: '重庆 Chongqing', 
    lat: 29.5630, 
    lng: 106.5516, 
    year: '2021-2023',
    description: 'Structural Engineer' 
  },
  { 
    id: 'changzhou', 
    name: '常州 Changzhou', 
    lat: 31.8112, 
    lng: 119.9741, 
    year: '2023',
    description: 'Project Lead (Base)' 
  },
  { 
    id: 'madrid', 
    name: '马德里 Madrid', 
    lat: 40.4168, 
    lng: -3.7038, 
    year: '2024.10',
    description: 'Overseas Technical Support' 
  },
  { 
    id: 'changzhou-now', 
    name: '常州 Changzhou', 
    lat: 31.8112, 
    lng: 119.9741, 
    year: 'Present',
    description: 'Current Location' 
  },
];

// GeoJSON Type Definitions
interface GeoJSONGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: any[];
}

interface GeoJSONFeature {
  type: 'Feature';
  geometry: GeoJSONGeometry;
  properties?: any;
}

interface GeoJSON {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

// ============================================================================
// COMPONENT
// ============================================================================

const WorldMapSection: React.FC = () => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<GeoJSON | null>(null);
  const [loading, setLoading] = useState(true);

  // Sorted locations for Timeline (Reverse Chronological: Newest First)
  const timelineLocations = useMemo(() => [...LOCATIONS].reverse(), []);

  // Fetch GeoJSON Data on Mount
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(response => response.json())
      .then(data => {
        setGeoData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching world map data:', error);
        setLoading(false);
      });
  }, []);

  // --- Projection Logic ---
  // Equirectangular / Plate Carrée projection mapping
  const project = (lat: number, lng: number) => {
    // Map bounds: -180 to 180 longitude, -90 to 90 latitude
    // SVG bounds: 0 to 1000 width, 0 to 500 height
    const x = (lng + 180) * (1000 / 360);
    const y = (90 - lat) * (500 / 180);
    return { x, y };
  };

  // --- GeoJSON to SVG Path ---
  const createPath = (geometry: GeoJSONGeometry): string => {
    const pathFn = (points: number[][]) => {
      if (points.length === 0) return '';
      // GeoJSON is [lng, lat], Projection expects (lat, lng)
      const start = project(points[0][1], points[0][0]);
      let d = `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`;
      
      for (let i = 1; i < points.length; i++) {
        const p = project(points[i][1], points[i][0]);
        d += ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      }
      return d + ' Z';
    };

    if (geometry.type === 'Polygon') {
      return geometry.coordinates.map(ring => pathFn(ring)).join(' ');
    } else if (geometry.type === 'MultiPolygon') {
      return geometry.coordinates.map(polygon => 
        polygon.map((ring: number[][]) => pathFn(ring)).join(' ')
      ).join(' ');
    }
    return '';
  };

  // Memoize map paths
  const mapPaths = useMemo(() => {
    if (!geoData) return [];
    return geoData.features.map((feature, i) => ({
      d: createPath(feature.geometry),
      key: i
    }));
  }, [geoData]);

  // --- Trajectory Generation ---
  const paths = useMemo(() => {
    return LOCATIONS.slice(0, -1).map((loc, i) => {
      const start = project(loc.lat, loc.lng);
      const end = project(LOCATIONS[i + 1].lat, LOCATIONS[i + 1].lng);
      
      // Calculate a curve control point (Quadratic Bezier)
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      
      // Dynamic arc height based on distance to make curves look natural
      const dist = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      const arcHeight = Math.min(dist * 0.2, 50);
      
      const controlX = midX;
      const controlY = midY - arcHeight;

      return {
        id: `path-${i}`,
        d: `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`,
        start,
        end
      };
    });
  }, []);

  // --- ViewBox Configuration for Zoom ---
  // Adjusted for taller aspect ratio (~45%) to fit ~4 timeline items
  // X: 450 (Atlantic) to 900 (Pacific) -> Width 450
  // Y: 25 (High North) to 225 (Equator) -> Height 200
  const VIEWBOX = "450 25 450 200";

  // --- Tooltip Rendering Helper ---
  const renderTooltip = (loc: Location, isHovered: boolean) => {
    const pos = project(loc.lat, loc.lng);
    
    // Increased sizes for visibility
    const boxWidth = 50; 
    const boxHeight = 20;
    const yOffset = -14;

    return (
      <g 
        key={`tooltip-${loc.id}`}
        className="pointer-events-none transition-opacity duration-300"
        transform={`translate(${pos.x}, ${pos.y + yOffset})`}
      >
          {/* Background Box & Arrow */}
          <path 
            d={`M -${boxWidth} -${boxHeight} L ${boxWidth} -${boxHeight} L ${boxWidth} 0 L 4 0 L 0 4 L -4 0 L -${boxWidth} 0 Z`} 
            fill="var(--c-surface)" 
            fillOpacity="0.95"
            stroke="var(--c-border)" 
            strokeWidth="0.5"
            className="shadow-sm"
          />
          
          {/* Text Labels */}
          <text 
            x="0" 
            y="-11" 
            textAnchor="middle" 
            className="fill-primary font-bold" 
            fontSize="7" 
            fontWeight="bold"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {loc.name}
          </text>
          <text 
            x="0" 
            y="-4" 
            textAnchor="middle" 
            className="fill-accent font-medium" 
            fontSize="5.5" 
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {loc.year}
          </text>
      </g>
    );
  };

  return (
    // Hidden in Print Mode
    <section className="print:hidden">
      <SectionTitle title="我的足迹" icon={Icons.MapPin} />
      
      <div className="relative bg-surface rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-glow transition-all duration-300 group/map">
        
        {/* Layout Container: Flex col on mobile, Block on desktop for absolute positioning */}
        {/* Using block on desktop allows the absolute positioned list to fit the map height exactly */}
        <div className="flex flex-col md:block relative">

          {/* Left Side: Locations List */}
          {/* On Desktop: Absolute positioned to left, height matches parent (Map) */}
          <div className="
            order-2 
            w-full 
            
            md:absolute md:top-0 md:bottom-0 md:left-0 md:w-1/4 md:border-r md:border-t-0
            
            border-t border-border 
            bg-surface-hover/30 
            
            md:overflow-y-auto scrollbar-thin
          ">
             <div className="p-4 md:min-h-full flex flex-col md:justify-center">
                <div className="hidden md:flex items-center gap-2 mb-3 text-secondary/60 px-2">
                    <Icons.MapPin className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Timeline</span>
                </div>
                
                <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 items-start md:items-stretch scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                    {/* Render Timeline in Reverse Order (Newest First) */}
                    {timelineLocations.map((loc, i) => (
                        <div 
                            key={loc.id} 
                            onMouseEnter={() => setHoveredLocation(loc.id)}
                            onMouseLeave={() => setHoveredLocation(null)}
                            className={`
                                flex-shrink-0 flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer border border-transparent
                                ${hoveredLocation === loc.id 
                                    ? 'bg-surface border-border shadow-sm scale-[1.02]' 
                                    : 'hover:bg-surface/60 hover:border-border/50'}
                            `}
                        >
                            {/* Dot */}
                            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${hoveredLocation === loc.id ? 'bg-accent scale-125' : 'bg-secondary/40'}`} />
                            
                            {/* Text */}
                            <div className="flex flex-col min-w-0">
                                 <span className={`text-sm font-bold truncate transition-colors ${hoveredLocation === loc.id ? 'text-primary' : 'text-secondary'}`}>
                                    {loc.name}
                                 </span>
                                 <span className="text-xs text-secondary/60 font-medium truncate">
                                    {loc.year}
                                 </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Right Side: Map Container */}
          {/* On Desktop: Margin left to leave space for list, Height determines parent height */}
          <div className="
             order-1 
             w-full 
             
             md:ml-[25%] md:w-[75%]
             
             bg-[#0f172a]/5 dark:bg-[#0f172a]/40 
             flex flex-col justify-center
          ">
             {/* Aspect Ratio Box: Adjusted to ~45% to accommodate ~4 list items in height */}
             <div className="w-full relative" style={{ paddingBottom: '45%' }}>
               <div className="absolute inset-0">
                 {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                 ) : (
                    <svg 
                      viewBox={VIEWBOX}
                      className="w-full h-full"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <defs>
                        <linearGradient id="line-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
                          <stop offset="0%" stopColor="var(--c-accent)" stopOpacity="0.3" />
                          <stop offset="50%" stopColor="var(--c-accent)" stopOpacity="1" />
                          <stop offset="100%" stopColor="var(--c-accent)" stopOpacity="0.3" />
                        </linearGradient>

                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>

                      {/* 1. World Map Layer */}
                      <g className="map-layer">
                        {mapPaths.map((path) => (
                          <path
                            key={path.key}
                            d={path.d}
                            fill="var(--c-secondary)"
                            fillOpacity="0.15"
                            stroke="var(--c-border)"
                            strokeWidth="0.3"
                            className="transition-opacity duration-300"
                          />
                        ))}
                      </g>

                      {/* 2. Trajectory Lines */}
                      <g className="trajectory-lines">
                        {paths.map((path, i) => (
                          <path
                            key={path.id}
                            d={path.d}
                            fill="none"
                            stroke="url(#line-gradient)"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            className="animate-draw-line"
                            style={{
                              strokeDasharray: 2000, 
                              strokeDashoffset: 2000,
                              animation: `dash 3s ease-out forwards ${i * 0.5 + 0.5}s`
                            }}
                          />
                        ))}
                      </g>

                      {/* 3. Location Dots (Markers) */}
                      {LOCATIONS.map((loc, i) => {
                        const pos = project(loc.lat, loc.lng);
                        const isHovered = hoveredLocation === loc.id;
                        const isLast = i === LOCATIONS.length - 1;

                        return (
                          <g 
                            key={`marker-${loc.id}`} 
                            onMouseEnter={() => setHoveredLocation(loc.id)}
                            onMouseLeave={() => setHoveredLocation(null)}
                            onClick={() => setHoveredLocation(loc.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <circle cx={pos.x} cy={pos.y} r="8" fill="transparent" />
                            {isLast && (
                              <circle 
                                cx={pos.x} 
                                cy={pos.y} 
                                r={isHovered ? 7 : 7} 
                                className="fill-accent/20 animate-pulse pointer-events-none"
                              />
                            )}
                            <circle 
                              cx={pos.x} 
                              cy={pos.y} 
                              r={isHovered ? 3.5 : 2} 
                              className={`transition-all duration-300 pointer-events-none ${isHovered ? 'fill-accent' : 'fill-primary'}`} 
                              stroke="var(--c-surface)"
                              strokeWidth="0.6" 
                              filter="url(#glow)"
                            />
                          </g>
                        );
                      })}

                      {/* 4. Tooltips (Labels) */}
                      {(() => {
                          const lastLoc = LOCATIONS[LOCATIONS.length - 1];
                          if (hoveredLocation !== lastLoc.id) {
                              return renderTooltip(lastLoc, false);
                          }
                          return null;
                      })()}

                      {(() => {
                          if (!hoveredLocation) return null;
                          const loc = LOCATIONS.find(l => l.id === hoveredLocation);
                          if (loc) {
                              return renderTooltip(loc, true);
                          }
                          return null;
                      })()}

                    </svg>
                 )}
               </div>
             </div>
          </div>

        </div>
        
        <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default WorldMapSection;