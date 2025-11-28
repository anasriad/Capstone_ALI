import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen w-full bg-linear-to-b from-red-600/80 to-red-900/90 p-4 sm:p-6 text-white flex flex-col">
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-full font-semibold ${language === "fr" ? "bg-white/20" : ""}`}
            onClick={() => setLanguage("fr")}
          >
            FR
          </button>
          <button
            className={`px-3 py-1 rounded-full font-semibold ${language === "en" ? "bg-white/20" : ""}`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            className={`px-3 py-1 rounded-full font-semibold ${language === "ar" ? "bg-white/20" : ""}`}
            onClick={() => setLanguage("ar")}
          >
            AR
          </button>
        </div>
        <a
          href="/"
          className="px-4 py-2 bg-white/20 rounded-xl font-semibold shadow-md"
        >
          {t.home}
        </a>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4"
      >
        {t.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center text-sm opacity-80 mb-4 sm:mb-6"
      >
        {t.subtitle}
      </motion.p>

      <div className="flex flex-col gap-4 flex-1">
        {restaurants.map((resto) => (
          <motion.div
            key={resto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md px-4 py-4 rounded-xl border border-white/20 shadow-md"
          >
            <div className="flex justify-between items-center flex-wrap">
              <div>
                <h2 className="text-lg font-semibold">{resto.name}</h2>
                <p className="text-sm opacity-80">{resto.location}</p>
                <p className="text-sm opacity-80">{resto.distance}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleMenu(resto.id)}
                className="px-4 py-2 mt-2 sm:mt-0 bg-red-500 text-white rounded-xl font-semibold shadow-md"
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
                      alert(`Order sent for ${resto.name}! (frontend only)`);
                    }}
                    className="flex flex-col gap-3 bg-white/10 p-3 rounded-lg border border-white/20"
                  >
                    <input
                      name="customerName"
                      placeholder={t.namePlaceholder}
                      required
                      className="p-2 rounded-md text-black outline-none"
                    />
                    <select
                      name="menuItem"
                      required
                      className="p-2 rounded-md text-black outline-none"
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
                      className="p-2 rounded-md text-black outline-none"
                    ></textarea>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="py-2 bg-red-500 text-white font-semibold rounded-lg"
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

      <p className="mt-6 text-center text-xs opacity-70">
        © 2025 ALI — CTM Inspired
      </p>
    </div>
  );
}
