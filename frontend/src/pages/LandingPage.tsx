import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ALI from "../assets/ALI.png";
import { useNavigate } from "react-router-dom";

const translations = {
  en: {
    welcome: "Welcome to ALI",
    subtitle: "Your travel assistant for CTM - Scan, Chat, and Order.",
    talk: "Talk with Ali (CTM AI Assistant)",
    order: "Order Food",
  },
  fr: {
    welcome: "Bienvenue sur ALI",
    subtitle: "Votre assistant de voyage pour CTM - Scannez, discutez et commandez.",
    talk: "Parlez avec Ali (Assistant IA CTM)",
    order: "Commander de la nourriture",
  },
  ar: {
    welcome: "مرحبًا بك في ALI",
    subtitle: "مساعدك في السفر لـ CTM - مسح، محادثة، وطلب.",
    talk: "تحدث مع علي (مساعد الذكاء الاصطناعي CTM)",
    order: "اطلب الطعام",
  },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("en");

  const t = translations[language];

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-red-600/80 to-red-900/90 flex flex-col items-center justify-center p-6 text-white">
      
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          className={`px-3 py-1 rounded-full font-semibold ${language === "en" ? "bg-white/20" : ""}`}
          onClick={() => setLanguage("en")}
        >
          EN
        </button>
        <button
          className={`px-3 py-1 rounded-full font-semibold ${language === "fr" ? "bg-white/20" : ""}`}
          onClick={() => setLanguage("fr")}
        >
          FR
        </button>
        <button
          className={`px-3 py-1 rounded-full font-semibold ${language === "ar" ? "bg-white/20" : ""}`}
          onClick={() => setLanguage("ar")}
        >
          AR
        </button>
      </div>

      <motion.img
        src={ALI}
        alt="ALI Logo"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-32 h-32 mb-8 drop-shadow-xl"
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl font-bold tracking-wide text-center"
      >
        {t.welcome}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center text-sm mt-3 max-w-xs"
      >
        {t.subtitle}
      </motion.p>

      <div className="mt-10 w-full max-w-xs flex flex-col gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-2xl bg-white text-red-700 font-semibold shadow-lg"
          onClick={() => setChatOpen(true)}
        >
          {t.talk}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-2xl bg-red-500 text-white font-semibold shadow-lg border border-white/20"
          onClick={() => navigate("/food")}
        >
          {t.order}
        </motion.button>
      </div>

      <p className="mt-10 text-xs opacity-70">© 2025 ALI — CTM Inspired</p>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md h-[600px] bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                className="absolute top-2 right-2 text-red-600 font-bold text-lg z-50"
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
    </div>
  );
}
