import { Link } from "react-router-dom";
import pecLogo from "../../assets/pec.png";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-primary";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  useEffect(() => {
    const currentLanguage = i18n.language;
    setIsArabic(currentLanguage === "ar");
    if (currentLanguage === "ar") {
      console.log("Arabic selected");
      document.body.dir = "rtl";
    } else {
      console.log("English selected");
      document.body.dir = "ltr";
    }
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={` fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${fontClass} ${
          isScrolled ? "bg-[#065368] shadow-lg" : "bg-transparent"
        }`}
      >
        <section className="lg:container py-[5px] lg:px-0 px-6">
          <div className="text-white flex justify-between items-center">
            <div
              className={`flex  items-center text-xl ${
                isArabic ? "pr-[108]" : "ml-[108px]"
              }`}
            >
              <Link
                to="https://www.linkedin.com/company/pec-professionals-engineering-consultant/about/?viewAsMember=true"
                target="_blank"
                className="hover:text-[#00b4d8] transition-all duration-300"
              >
                <i className="fa-brands fa-linkedin"></i>
              </Link>
            </div>

            <div className="relative inline-block text-left space-x-3 lg:pr-12">
              <button
                onClick={toggleDropdown}
                className="inline-block text-lg font-semibold focus:outline-none hover:text-[#00b4d8] transition-all duration-300"
              >
                {t("language")}
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage("en")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("english")}
                    </button>
                    <button
                      onClick={() => changeLanguage("ar")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("arabic")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section>
          <hr className="h-[2px] dark-bg-black bg-white" />
        </section>
        <section>
          <div className="lg:container lg:px-0 px-6 text-[16px] flex justify-between text-white items-center lg:space-x-4 py-[8px]">
            <div className={`${isArabic ? "pr-4" : "pr-0"}`}>
              <Link to="/" className="block">
                <img
                  src={pecLogo}
                  alt="PEC Professionals Engineering Consultancy"
                  className="lg:w-56 w-40 hover:scale-110 drop-shadow-[0px_0px_20px_rgba(0,180,220)] transition-all duration-500 ease-in-out filter brightness-200"
                />
              </Link>
            </div>
            {/* MOBILE HAMBURGER */}
            <div className="lg:hidden pr-4">
              <button onClick={() => setDrawerOpen(true)}>
                <i className="fa-solid fa-bars text-3xl"></i>
              </button>
            </div>
            {/* MOBILE DRAWER */}
            <div
              className={`fixed top-0 ${
                isArabic ? "right-0" : "left-0"
              } h-full w-[280px] bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 lg:hidden
  ${
    drawerOpen
      ? "translate-x-0"
      : isArabic
      ? "translate-x-full"
      : "-translate-x-full"
  }`}
            >
              {/* Close Button */}
              <div className="flex justify-between">
                <div>
                  <Link to="/">
                    <img
                      src={pecLogo}
                      alt="PEC Professionals Engineering Consultancy"
                      className="w-48"
                    />
                  </Link>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-3xl absolute top-4"
                  style={{ [isArabic ? "left" : "right"]: "20px" }}
                >
                  <i className="fa-solid fa-xmark text-black"></i>
                </button>
              </div>

              {/* Drawer Menu Items */}
              <ul className="mt-16 space-y-2 text-xl">
                <li className="hover:bg-black hover:text-yellow-100 py-4 px-2 rounded-md transition-all duration-300 text-black">
                  <Link onClick={() => setDrawerOpen(false)} to="/">
                    {t("About")}
                  </Link>
                </li>
                <li className="hover:bg-black hover:text-yellow-100 py-4 px-2 rounded-md transition-all duration-300  text-black">
                  <Link onClick={() => setDrawerOpen(false)} to="/services">
                    {t("Services")}
                  </Link>
                </li>
                <li className="hover:bg-black hover:text-yellow-100 py-4 px-2 rounded-md transition-all duration-300  text-black">
                  <Link onClick={() => setDrawerOpen(false)} to="/projects">
                    {t("Projects")}
                  </Link>
                </li>
                <li className="hover:bg-black hover:text-yellow-100 py-4 px-2 rounded-md transition-all duration-300  text-black">
                  <Link onClick={() => setDrawerOpen(false)} to="/vacancies">
                    {t("Vacancies")}
                  </Link>
                </li>
                <li className="hover:bg-black hover:text-yellow-100 py-4 px-2 rounded-md transition-all duration-300  text-black ">
                  <Link onClick={() => setDrawerOpen(false)} to="/contact">
                    {t("Contact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden lg:block pr-10">
              <ul className="flex justify-center space-x-10">
                <li
                  className={`text-[22px] font-bold hover:text-[#00b4d8] transition-all duration-300 ${
                    isArabic ? "ml-[24px]" : "ml-[0px]"
                  }`}
                >
                  <Link to="/">{t("About")}</Link>
                </li>
                <li className="text-[22px] font-bold hover:text-[#00b4d8] transition-all duration-300">
                  <Link to="/services">{t("Services")}</Link>
                </li>
                <li className="text-[22px] font-bold hover:text-[#00b4d8] transition-all duration-300">
                  <Link to="/projects">{t("Projects")}</Link>
                </li>
                <li className="text-[22px] font-bold hover:text-[#00b4d8] transition-all duration-300">
                  <Link to="/vacancies">{t("Vacancies")}</Link>
                </li>
                <li className="text-[22px] font-bold hover:text-[#00b4d8] transition-all duration-300">
                  <Link to="/contact">{t("Contact")}</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
