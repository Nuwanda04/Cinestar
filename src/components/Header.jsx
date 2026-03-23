import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Forside", path: "/" },
  { label: "Blog", path: "/blog" },
  { label: "FAQ", path: "/faq" },
  { label: "Kontakt", path: "/kontakt" },
];

const BurgerIcon = () => {
  return (
    <span
      className="relative block h-[16px] w-[28px] overflow-visible"
      aria-hidden="true"
    >
      <span className="absolute left-0 top-0 h-[4px] w-[21px] rounded-full bg-[#F07232]" />
      <span className="absolute left-[7px] top-[8px] h-[4px] w-[21px] rounded-full bg-[#F07232]" />
      <span className="absolute left-0 top-[16px] h-[4px] w-[21px] rounded-full bg-[#F07232]" />
    </span>
  );
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const getLinkClass = ({ isActive }) =>
    `tracking-[0.08em] uppercase transition-colors duration-200 ${
      isActive ? "text-[#F07232]" : "text-white hover:text-[#F07232]"
    }`;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-black">
        <div className="mx-auto flex h-[88px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:h-[96px] lg:px-12">
          <NavLink to="/" aria-label="Gå til forsiden" className="shrink-0">
            <img
              src="/images/logo.png"
              alt="Cinestar"
              className="h-[36px] w-auto sm:h-[40px]"
            />
          </NavLink>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={getLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center lg:hidden"
            aria-label={mobileOpen ? "Luk menu" : "Åbn menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? (
              <FiX className="text-[34px] text-[#F07232]" />
            ) : (
              <BurgerIcon />
            )}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[60] bg-black px-10 pt-6 sm:px-12"
        >
          <div className="flex items-center justify-between">
            <NavLink to="/" aria-label="Gå til forsiden" className="shrink-0">
              <img
                src="/images/logo.png"
                alt="Cinestar"
                className="h-[36px] w-auto"
              />
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center text-[42px] text-[#F07232]"
              aria-label="Luk menu"
            >
              <FiX />
            </button>
          </div>

          <nav className="mt-16">
            <ul className="space-y-7">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block text-[36px] font-semibold uppercase leading-none tracking-[0.08em] transition-colors duration-200 ${isActive ? "text-[#F07232]" : "text-white"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
