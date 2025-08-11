import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import API from "../api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TourMap = ({ packageId }) => {
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [highlight, setHighlight] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await API.get(`/packages/${packageId}/itineraries`);
        setItineraries(res.data);
      } catch (err) {
        console.error("Failed to load itineraries", err);
      }
    };
    fetchItineraries();
  }, [packageId]);

  useEffect(() => {
    if (!mapRef.current || mapInstance || itineraries.length === 0) return;

    if (mapRef.current._leaflet_id !== undefined) {
      mapRef.current._leaflet_id = null;
    }

    const map = L.map(mapRef.current).setView([6.9271, 79.8612], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data © OpenStreetMap contributors",
    }).addTo(map);

    const startIcon = L.divIcon({
      html: '<div style="background:#2ecc70;width:24px;height:24px;border-radius:50%;border:3px solid white;"></div>',
    });
    const endIcon = L.divIcon({
      html: '<div style="background:#e74c3c;width:24px;height:24px;border-radius:50%;border:3px solid white;"></div>',
    });
    const stopIcon = L.divIcon({
      html: '<div style="background:#3498db;width:20px;height:20px;border-radius:50%;border:2px solid white;"></div>',
    });

    const coords = [];
    const markers = [];

    itineraries.forEach((stop, i) => {
      const icon =
        i === 0 ? startIcon : i === itineraries.length - 1 ? endIcon : stopIcon;
      const marker = L.marker([stop.latitude, stop.longitude], { icon }).addTo(
        map
      );
      const popup = `
        <div>
          <h3>${stop.title}</h3>
          <p>${stop.description}</p>

          ${
            i < itineraries.length - 1
              ? `<button onclick="window.flyToStop(${
                  i + 1
                })" style="margin-top:8px;padding:6px 12px;background:#3498db;color:white;border:none;border-radius:4px;">Next Stop →</button>`
              : ""
          }
        </div>`;
      marker.bindPopup(popup);
      markers.push(marker);
      coords.push([stop.latitude, stop.longitude]);
    });

    // If Want Image to map Add This Below the  <p>
    // <img src="${stop.image_url}" alt="${stop.title}" style="width:100%;height:150px;object-fit:cover;" />

    const route = L.polyline(coords, { color: "#3498db", weight: 4 }).addTo(
      map
    );
    map.fitBounds(route.getBounds(), { padding: [50, 50] });

    setMapInstance(map);
    window.flyToStop = (i) => handleFlyToStop(i, map, markers);
  }, [itineraries]);

  useEffect(() => {
    window.flyToCoords = (lat, lng, zoom = 13) => {
      if (!mapInstance) return;

      const coords = [lat, lng];
      mapInstance.flyTo(coords, zoom, { duration: 1.5 });

      const highlightIcon = L.divIcon({
        className: "highlight",
        html: `<div style="background:#e74c3c;width:30px;height:30px;border-radius:50%;border:3px solid white;display:flex;align-items:center;justify-content:center;"><div style="background:white;width:10px;height:10px;border-radius:50%;"></div></div>`,
        iconSize: [30, 30],
      });

      if (highlight) {
        mapInstance.removeLayer(highlight);
      }

      const newHighlight = L.marker(coords, { icon: highlightIcon }).addTo(
        mapInstance
      );
      setHighlight(newHighlight);
    };
  }, [mapInstance, highlight]);

  const handleFlyToStop = (index, map, markerSet = []) => {
    const stop = itineraries[index];
    if (!map || !stop) return;

    if (highlight) map.removeLayer(highlight);

    const highlightIcon = L.divIcon({
      html: `<div style="background:#e74c3c;width:30px;height:30px;border-radius:50%;border:3px solid white;display:flex;align-items:center;justify-content:center;"><div style="background:white;width:10px;height:10px;border-radius:50%;"></div></div>`,
    });

    const newHighlight = L.marker([stop.latitude, stop.longitude], {
      icon: highlightIcon,
    }).addTo(map);
    setHighlight(newHighlight);

    map.flyTo([stop.latitude, stop.longitude], stop.zoom_level || 13, {
      duration: 1.5,
    });

    setTimeout(() => {
      if (markerSet[index]) markerSet[index].openPopup();
      setProgress(((index + 1) / itineraries.length) * 100);

      if (index === itineraries.length - 1) {
        toast.success("🎉 You've reached the end of the tour!");
      }
    }, 1500);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <ToastContainer />
      <div id="map" ref={mapRef} style={{ flex: 1 }} />
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* <button onClick={() => mapInstance?.zoomIn()} style={btnStyle}>+</button>
        <button onClick={() => mapInstance?.zoomOut()} style={btnStyle}>-</button> */}
        {/* <button
          onClick={() =>
            mapInstance?.fitBounds(
              L.polyline(itineraries.map((s) => [s.latitude, s.longitude])).getBounds(),
              { padding: [50, 50] }
            )
          }
          style={btnStyle}
        >
          [+]
        </button> */}
        {/* <button onClick={() => handleFlyToStop(0, mapInstance)} style={btnStyle}>▶</button>
        <button
          onClick={() => handleFlyToStop(itineraries.length - 1, mapInstance)}
          style={btnStyle}
          title="End Tour"
        >
          🏁
        </button> */}
      </div>
    </div>
  );
};

const btnStyle = {
  background: "#fff",
  border: "none",
  width: 40,
  height: 40,
  borderRadius: "50%",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default TourMap;
