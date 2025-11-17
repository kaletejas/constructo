import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapView() {
  const mapContainer = useRef(null);
  const map = useRef(null);
console.log("TOKEN:", import.meta.env.VITE_MAPBOX_TOKEN);

  // Dummy construction sites
  const constructionSites = [
    {
      id: 1,
      name: "Road Repair - King St",
      coordinates: [-79.3832, 43.6532], // Downtown Toronto
      details: "Lane closures expected. Duration: 2 weeks."
    },
    {
      id: 2,
      name: "Water Pipe Replacement - Bathurst",
      coordinates: [-79.4111, 43.6539],
      details: "Water service disruptions possible."
    }
  ];

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-79.3832, 43.6532],
      zoom: 12,
    });

    // Add markers
    constructionSites.forEach(site => {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <h4>${site.name}</h4>
          <p>${site.details}</p>
        `);

      new mapboxgl.Marker({ color: "red" })
        .setLngLat(site.coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });

  }, []);

  return (
    <div>
      <h2 className="title">Toronto Construction Prototype</h2>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
