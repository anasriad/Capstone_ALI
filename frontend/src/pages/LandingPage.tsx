import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ALI from "../assets/ALI.png";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import { type LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

const translations = {
  en: {
    welcome: "Welcome to ALI",
    subtitle: "Your travel assistant for CTM – Scan, Chat, and Order.",
    talk: "Talk with Ali (CTM AI Assistant)",
    order: "Order Food",
    location: "Where am I now?",
    enterCity: "Enter Destination City",
    distance: "Distance Left",
    duration: "Estimated Time Left",
  },
  fr: {
    welcome: "Bienvenue sur ALI",
    subtitle: "Votre assistant de voyage pour CTM – Scannez, discutez et commandez.",
    talk: "Parlez avec Ali (Assistant IA CTM)",
    order: "Commander de la nourriture",
    location: "Localisation en direct",
    enterCity: "Entrez la ville de destination",
    distance: "Distance restante",
    duration: "Temps estimé",
  },
  ar: {
    welcome: "مرحبًا بك في ALI",
    subtitle: "مساعدك في السفر لـ CTM – مسح، محادثة، وطلب.",
    talk: "تحدث مع علي (مساعد الذكاء الاصطناعي CTM)",
    order: "اطلب الطعام",
    location: "موقعك الحالي",
    enterCity: "أدخل مدينة الوجهة",
    distance: "المسافة المتبقية",
    duration: "الوقت المقدر",
  },
};

function FitBounds({ coords1, coords2 }: { coords1: LatLngTuple; coords2: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([coords1, coords2], { padding: [50, 50] });
  }, [coords1, coords2, map]);
  return null;
}

function haversineDistance(coords1: LatLngTuple, coords2: LatLngTuple) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(coords2[0] - coords1[0]);
  const dLon = toRad(coords2[1] - coords1[1]);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(coords1[0])) *
      Math.cos(toRad(coords2[0])) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("en");

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [destCoords, setDestCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const t = translations[language];

  useEffect(() => {
    if (locationOpen) {
      navigator.geolocation.watchPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, [locationOpen]);

  const fetchDestCoords = async () => {
    if (!destination) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`
    );
    const data = await res.json();
    if (data.length > 0) {
      const dCoords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      setDestCoords(dCoords);

      if (coords) {
        const dist = haversineDistance([coords.lat, coords.lng], [dCoords.lat, dCoords.lng]);
        setDistanceKm(dist);

        const estTime = dist / 60;
        const hours = Math.floor(estTime);
        const minutes = Math.round((estTime - hours) * 60);
        setDuration(`${hours}h ${minutes}m`);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-black via-blue-900 to-black flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-white/20 animate-[shimmer_2s_infinite]"></div>
        <div className="absolute top-20 left-0 w-full h-0.5 bg-white/15 animate-[shimmer_3s_infinite]"></div>
        <div className="absolute top-40 left-0 w-full h-0.5 bg-white/10 animate-[shimmer_4s_infinite]"></div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2 z-20">
        {["en", "fr", "ar"].map((lang) => (
          <button
            key={lang}
            className={`px-3 py-1 rounded-full font-semibold transition-colors duration-300 ${
              language === lang
                ? "bg-blue-600/50 text-white shadow-lg"
                : "bg-black/30 text-white hover:bg-blue-700/50"
            }`}
            onClick={() => setLanguage(lang as "en" | "fr" | "ar")}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.img
        src={ALI}
        alt="ALI Logo"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-32 h-32 mb-8 drop-shadow-[0_0_20px_rgba(0,150,255,0.8)]"
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl font-bold tracking-wide text-center drop-shadow-md"
      >
        {t.welcome}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center text-sm mt-3 max-w-xs drop-shadow-sm"
      >
        {t.subtitle}
      </motion.p>

      <div className="mt-10 w-full max-w-xs flex flex-col gap-4 z-20">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-2xl bg-linear-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg border border-blue-500 hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
          onClick={() => setChatOpen(true)}
        >
          {t.talk}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-2xl bg-linear-to-r from-black/70 via-blue-900 to-black text-white font-semibold shadow-lg border border-blue-500 hover:from-black/80 hover:via-blue-800 hover:to-black transition-all duration-300"
          onClick={() => setLocationOpen(true)}
        >
          {t.location}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-2xl bg-linear-to-r from-blue-700 to-black text-white font-semibold shadow-lg border border-blue-500 hover:from-blue-800 hover:to-black transition-all duration-300"
          onClick={() => navigate("/food")}
        >
          {t.order}
        </motion.button>
      </div>

      <p className="mt-10 text-xs opacity-70 drop-shadow-sm z-20">© 2025 ALI — CTM Inspired</p>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md h-[600px] bg-black/90 rounded-xl shadow-2xl overflow-hidden border border-blue-500"
            >
              <button
                className="absolute top-2 right-2 text-blue-400 font-bold text-lg z-50 hover:text-blue-200"
                onClick={() => setChatOpen(false)}
              >
                ✕
              </button>
              <iframe
                src="https://cdn.botpress.cloud/webchat/v3.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/11/28/12/20251128123759-Z8MZR84U.json"
                className="w-full h-full border-0"
                title="ALI Chatbot"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {locationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md p-6 bg-linear-to-b from-black/80 via-blue-900/90 to-black/90 rounded-2xl shadow-2xl flex flex-col gap-4 border border-blue-500"
            >
              <button
                className="absolute top-3 right-3 text-blue-400 font-bold text-lg hover:text-blue-200 transition-colors"
                onClick={() => setLocationOpen(false)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-2 text-center text-blue-400">📍 {t.location}</h2>
              <p className="text-white text-center text-sm">
                Your current location is tracked live. Enter your destination to see distance and time.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={t.enterCity || "Enter destination"}
                  className="flex-1 border border-blue-500 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-black/70 text-white"
                />
                <button
                  onClick={fetchDestCoords}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>

              {distanceKm && duration && (
                <div className="bg-blue-900/70 p-3 rounded-lg border border-blue-500 text-blue-300 flex flex-col items-center justify-between">
                  <span>
                    {t.distance}: <span className="font-bold">{distanceKm.toFixed(1)} km</span>
                  </span>
                  <span>
                    {t.duration}: <span className="font-bold">{duration}</span>
                  </span>
                </div>
              )}

              {coords && (
                <MapContainer
                  center={[coords.lat, coords.lng] as LatLngTuple}
                  zoom={6}
                  className="h-64 w-full rounded-xl shadow-lg border border-blue-500"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[coords.lat, coords.lng] as LatLngTuple} />
                  {destCoords && (
                    <>
                      <Marker position={[destCoords.lat, destCoords.lng] as LatLngTuple} />
                      <Polyline
                        positions={[
                          [coords.lat, coords.lng],
                          [destCoords.lat, destCoords.lng],
                        ] as LatLngTuple[]}
                        pathOptions={{ color: "cyan", weight: 4, dashArray: "8,4" }}
                      />
                      <FitBounds
                        coords1={[coords.lat, coords.lng] as LatLngTuple}
                        coords2={[destCoords.lat, destCoords.lng] as LatLngTuple}
                      />
                    </>
                  )}
                </MapContainer>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
