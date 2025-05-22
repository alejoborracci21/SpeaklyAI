"use client";
import { Palette } from "lucide-react";
import { useEffect } from "react";

export function ThemeSelector() {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  const themes = ["light", "dracula", "cupcake", "aqua", "garden", "retro", "nord"];

  const changeTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <Palette/>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {themes.map((t) => (
          <li key={t}>
            <button onClick={() => changeTheme(t)}>{t}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}