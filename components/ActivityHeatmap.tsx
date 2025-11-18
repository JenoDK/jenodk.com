'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import type { ActivityPolyline, SportType } from '@/lib/strava';
import L from 'leaflet';
// @ts-ignore - @mapbox/polyline doesn't have type definitions
import polyline from '@mapbox/polyline';

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

interface PolylineLayerProps {
  polylines: ActivityPolyline[];
  selectedSport: SportType;
  isDark: boolean;
}

// Component to set initial map view to Belgium
function SetMapView({ isDark, selectedSport }: { isDark: boolean, selectedSport: SportType }) {
  const map = useMap();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      map.setView([50.5, 4.5], 7);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [map, isDark, selectedSport]); // Reset when theme changes

  return null;
}

function PolylineLayer({ polylines, selectedSport, isDark }: PolylineLayerProps) {
  const map = useMap();
  const polylineRefs = useRef<L.Polyline[]>([]);

  useEffect(() => {
    // Remove existing polylines
    polylineRefs.current.forEach(poly => {
      map.removeLayer(poly);
    });
    polylineRefs.current = [];

    // Filter polylines by selected sport
    const filteredPolylines = polylines.filter(p => p.sportType === selectedSport);

    if (filteredPolylines.length === 0) {
      // If no polylines, ensure map shows Belgium
      map.setView([50.5, 4.5], 7);
      return;
    }

    // Decode and add polylines to map
    filteredPolylines.forEach(activityPolyline => {
      try {
        const decoded = polyline.decode(activityPolyline.summaryPolyline) as [number, number][];
        if (decoded.length > 0) {
          const latlngs = decoded.map((point: [number, number]) => [point[0], point[1]] as [number, number]);
          
          // Use teal color: teal-500 for light mode, teal-400 for dark mode
          const color = isDark ? '#2dd4bf' : '#14b8a6'; // teal-400 and teal-500
          
          const poly = L.polyline(latlngs, {
            color: color,
            weight: 3,
            opacity: 0.6,
          });
          
          poly.addTo(map);
          polylineRefs.current.push(poly);
        }
      } catch (error) {
        console.warn('Failed to decode polyline:', error);
      }
    });

    // Fit map to show all polylines
    if (polylineRefs.current.length > 0) {
      const group = new L.FeatureGroup(polylineRefs.current);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    return () => {
      polylineRefs.current.forEach(poly => {
        map.removeLayer(poly);
      });
      polylineRefs.current = [];
    };
  }, [map, polylines, selectedSport, isDark]);

  return null;
}

interface ActivityHeatmapProps {
  polylines?: ActivityPolyline[];
  selectedSport: SportType;
  isDark: boolean;
}

export default function ActivityHeatmap({ polylines, selectedSport, isDark }: ActivityHeatmapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden ring-1 ring-zinc-100 dark:ring-zinc-300/20">
      <MapContainer
        key={`map-${isDark ? 'dark' : 'light'}`}
        center={[50.5, 4.5]}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        className="zinc-map"
      >
        <SetMapView isDark={isDark} selectedSport={selectedSport} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={isDark 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          }
        />
        {polylines && polylines.length > 0 && (
          <PolylineLayer 
            polylines={polylines} 
            selectedSport={selectedSport}
            isDark={isDark}
          />
        )}
      </MapContainer>
    </div>
  );
}

