import { ThemeSwitcher } from "../theme-switcher";

export default function Header() {
  return (
          <div className="md:hidden fixed top-0 left-0 right-0 bg-base-100 z-10 border-b">
            <div className="navbar">
              <div className="navbar-start">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a className="active">Dashboard</a>
                    </li>
                    <li>
                      <a>Mis Mazos</a>
                    </li>
                    <li>
                      <a>Progreso</a>
                    </li>
                    <li>
                      <a>Ayuda</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="navbar-center">
                <a className="btn btn-ghost text-xl text-primary">SpeaklyAI</a>
              </div>
              <div className="navbar-end">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
  );
}