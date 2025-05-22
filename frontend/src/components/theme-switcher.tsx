"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  const allThemes = ["light", "dark", "dracula", "cupcake", "aqua", "garden", "retro", "nord"];

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", stored);
    setCurrentTheme(stored);
    setMounted(true);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <button className="btn btn-circle btn-ghost" aria-label="Cargando temas...">
        <Palette className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button className="btn btn-circle btn-ghost" onClick={toggleDropdown} aria-label="Cambiar tema">
        <Palette className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-base-100 ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1 divide-y divide-base-300">
              <div className="px-3 py-2 text-sm font-medium text-base-content/70">Elige un tema</div>
              <div className="max-h-60 overflow-y-auto">
                {allThemes.map((t) => (
                  <button
                    key={t}
                    onClick={() => changeTheme(t)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-base-200 flex items-center ${
                      currentTheme === t ? "text-primary" : "text-base-content"
                    }`}
                  >
                    <span className="capitalize">{t}</span>
                    {currentTheme === t && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ml-auto"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
