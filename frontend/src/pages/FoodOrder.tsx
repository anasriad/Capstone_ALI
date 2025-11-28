import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Restaurant {
  id: number;
  name: string;
  location: string;
  distance: string;
  menu: string[];
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Chez Lalla Zahra",
    location: "Marrakech, Bab Doukkala",
    distance: "2.5 km",
    menu: ["Tajine b l7out", "Harira", "Batbout b lkhodra"],
  },
  {
    id: 2,
    name: "Snack Moul Lkaskrout",
    location: "Marrakech, Gueliz",
    distance: "3.2 km",
    menu: ["Tacos", "Sandwich", "Fries"],
  },
  {
    id: 3,
    name: "Dar Tanjia",
    location: "Marrakech, Medina",
    distance: "1.8 km",
    menu: ["Couscous", "Tajine d l7out", "Rfissa"],
  },
  {
    id: 4,
    name: "Café Safar",
    location: "Marrakech, Hivernage",
    distance: "4.1 km",
    menu: ["Qahwa", "Msemen", "Croissant"],
  },
];

const translations = {
  fr: {
    title: "Restaurants Près de Chez Vous",
    subtitle: "Choisis un restaurant ou consulte le menu et passe ta commande.",
    checkMenu: "Voir le menu",
    hideMenu: "Cacher le menu",
    namePlaceholder: "Votre nom…",
    notesPlaceholder: "Ajouter des remarques / modifications…",
    sendOrder: "Envoyer la commande",
    home: "Accueil",
  },
  en: {
    title: "Restaurants Near You",
    subtitle: "Choose a restaurant or check the menu and place your order.",
    checkMenu: "Check Menu",
    hideMenu: "Hide Menu",
    namePlaceholder: "Your Name…",
    notesPlaceholder: "Add notes / changes…",
    sendOrder: "Send Order",
    home: "Home",
  },
  ar: {
    title: "المطاعم القريبة منك",
    subtitle: "اختر مطعم أو شاهد قائمة الطعام واطلب طلبك.",
    checkMenu: "عرض القائمة",
    hideMenu: "إخفاء القائمة",
    namePlaceholder: "اسمك…",
    notesPlaceholder: "أضف ملاحظات / تغييرات…",
    sendOrder: "إرسال الطلب",
    home: "الرئيسية",
  },
};

export default function RestaurantPage() {
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [language, setLanguage] = useState<"fr" | "en" | "ar">("en");

  const toggleMenu = (id: number) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const t = translations[language];

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-black via-blue-900 to-black p-4 sm:p-6 text-white flex flex-col relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-white/20 animate-[shimmer_2s_infinite]"></div>
        <div className="absolute top-20 left-0 w-full h-0.5 bg-white/15 animate-[shimmer_3s_infinite]"></div>
        <div className="absolute top-40 left-0 w-full h-0.5 bg-white/10 animate-[shimmer_4s_infinite]"></div>
      </div>

      <div className="flex justify-between items-center mb-4 z-20">
        <div className="flex gap-2">
          {["fr", "en", "ar"].map((lang) => (
            <button
              key={lang}
              className={`px-3 py-1 rounded-full font-semibold transition-colors duration-300 ${
                language === lang
                  ? "bg-blue-600/50 text-white shadow-lg"
                  : "bg-black/30 text-white hover:bg-blue-700/50"
              }`}
              onClick={() => setLanguage(lang as "fr" | "en" | "ar")}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
        <a
          href="/"
          className="px-4 py-2 bg-black/30 rounded-xl font-semibold shadow-md hover:bg-blue-700/50 transition-colors duration-300"
        >
          {t.home}
        </a>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4 drop-shadow-md"
      >
        {t.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center text-sm opacity-80 mb-4 sm:mb-6 drop-shadow-sm"
      >
        {t.subtitle}
      </motion.p>

      <div className="flex flex-col gap-4 flex-1 z-20">
        {restaurants.map((resto) => (
          <motion.div
            key={resto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black/50 backdrop-blur-md px-4 py-4 rounded-xl border border-blue-500 shadow-md"
          >
            <div className="flex justify-between items-center flex-wrap">
              <div>
                <h2 className="text-lg font-semibold drop-shadow-sm">{resto.name}</h2>
                <p className="text-sm opacity-80">{resto.location}</p>
                <p className="text-sm opacity-80">{resto.distance}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleMenu(resto.id)}
                className="px-4 py-2 mt-2 sm:mt-0 bg-linear-to-r from-blue-600 to-blue-400 text-white rounded-xl font-semibold shadow-lg border border-blue-500 hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
              >
                {activeMenuId === resto.id ? t.hideMenu : t.checkMenu}
              </motion.button>
            </div>

            <AnimatePresence>
              {activeMenuId === resto.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 overflow-hidden"
                >
                  <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                    {resto.menu.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const data = Object.fromEntries(formData.entries());
                      console.log("ORDER FOR", resto.name, data);
                      toast.success(`Order sent for ${resto.name}!`);
                    }}
                    className="flex flex-col gap-3 bg-black/40 p-3 rounded-lg border border-blue-500"
                  >
                    <input
                      name="customerName"
                      placeholder={t.namePlaceholder}
                      required
                      className="p-2 rounded-md text-white outline"
                    />
                    <select
                      name="menuItem"
                      required
                      className="p-2 rounded-md text-white outline"
                    >
                      {resto.menu.map((item, idx) => (
                        <option key={idx} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <textarea
                      name="notes"
                      placeholder={t.notesPlaceholder}
                      className="p-2 rounded-md text-white outline"
                    ></textarea>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="py-2 bg-linear-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-300"
                    >
                      {t.sendOrder}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs opacity-70 drop-shadow-sm z-20">
        © 2025 ALI — CTM Inspired
      </p>
    </div>
  );
}
