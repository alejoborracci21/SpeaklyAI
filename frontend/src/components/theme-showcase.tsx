"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Palette } from "lucide-react"

const themes = [
  { name: "light", label: "Light", color: "#ffffff", textColor: "#1f2937" },
  { name: "dark", label: "Dark", color: "#1f2937", textColor: "#ffffff" },
  { name: "cupcake", label: "Cupcake", color: "#faf7f5", textColor: "#291334" },
  { name: "lemonade", label: "Lemonade", color: "#0f2e2a", textColor: "#6ee7b7" },
]

export default function ThemeShowcase() {
  const [currentTheme, setCurrentTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }

  return (
    <section id="themes" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Personaliza tu experiencia
          </motion.h2>
          <motion.p
            className="text-lg text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            SpeaklyAI se adapta a tu estilo. Cambia entre temas visuales como claro, oscuro, cupcake y más, con un solo clic.
          </motion.p>
        </div>

        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 bg-base-200 rounded-lg p-4 shadow-md">
              <Palette className="w-5 h-5 text-primary" />
              <span className="font-medium">Probar ahora:</span>
              <select
                className="select select-bordered w-[180px]"
                value={currentTheme}
                onChange={(e) => handleThemeChange(e.target.value)}
              >
                {themes.map((theme) => (
                  <option key={theme.name} value={theme.name}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.name}
              className="cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => handleThemeChange(theme.name)}
            >
              <div className="relative rounded-xl overflow-hidden border shadow-md h-64">
                <div className="absolute inset-0" style={{ backgroundColor: theme.color }}>
                  <div className="p-4 h-full flex flex-col">
                    <div
                      className="rounded-lg p-2 mb-3 text-sm font-medium"
                      style={{
                        backgroundColor:
                          theme.name === "light"
                            ? "#f3f4f6"
                            : theme.name === "dark"
                            ? "#374151"
                            : theme.name === "cupcake"
                            ? "#efe8e4"
                            : "#1a3b36",
                        color: theme.textColor,
                      }}
                    >
                      {theme.label} Theme
                    </div>

                    <div
                      className="rounded-lg p-3 mb-3 flex-1 border"
                      style={{
                        backgroundColor:
                          theme.name === "light"
                            ? "#ffffff"
                            : theme.name === "dark"
                            ? "#1f2937"
                            : theme.name === "cupcake"
                            ? "#faf7f5"
                            : "#0f2e2a",
                        color: theme.textColor,
                        borderColor:
                          theme.name === "light"
                            ? "#e5e7eb"
                            : theme.name === "dark"
                            ? "#374151"
                            : theme.name === "cupcake"
                            ? "#efe8e4"
                            : "#1a3b36",
                      }}
                    >
                      <div className="mb-2 font-medium">{theme.label} Mode</div>
                      <div
                        className="h-2 rounded mb-2"
                        style={{
                          backgroundColor:
                            theme.name === "light"
                              ? "#3b82f6"
                              : theme.name === "dark"
                              ? "#60a5fa"
                              : theme.name === "cupcake"
                              ? "#ef9fbc"
                              : "#10b981",
                        }}
                      ></div>
                      <div
                        className="h-2 rounded w-2/3 mb-2"
                        style={{
                          backgroundColor:
                            theme.name === "light"
                              ? "#3b82f6"
                              : theme.name === "dark"
                              ? "#60a5fa"
                              : theme.name === "cupcake"
                              ? "#ef9fbc"
                              : "#10b981",
                        }}
                      ></div>
                    </div>

                    <div
                      className="rounded-lg p-2 text-center text-sm"
                      style={{
                        backgroundColor:
                          theme.name === "light"
                            ? "#3b82f6"
                            : theme.name === "dark"
                            ? "#60a5fa"
                            : theme.name === "cupcake"
                            ? "#ef9fbc"
                            : "#10b981",
                        color:
                          theme.name === "light"
                            ? "#ffffff"
                            : theme.name === "dark"
                            ? "#1f2937"
                            : theme.name === "cupcake"
                            ? "#291334"
                            : "#ffffff",
                      }}
                    >
                      Try {theme.label}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center font-medium">{theme.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
