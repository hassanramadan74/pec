import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/pec.png";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-cairo" : "font-primary";
  const direction = isArabic ? "rtl" : "ltr";

  return (
    <footer
      className={`bg-[#076380] text-white pt-12  ${fontClass}`}
      dir={direction}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Logo & Description */}
          <div className="lg:col-span-2">
            <img
              src={logo}
              alt="Madar Al-Jazeera"
              className="lg:w-56 w-40 hover:scale-110 drop-shadow-[0px_0px_20px_rgba(0,180,220)] transition-all duration-500 ease-in-out filter brightness-150"
            />
            <p className="text-sm leading-relaxed opacity-90">
              {t("footer.description")}
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <Link
                to="https://www.linkedin.com/company/pec-professionals-engineering-consultant/about/?viewAsMember=true"
                target="_blank"
                className="hover:text-[#00b4d8] transition-all duration-300 text-xl"
              >
                <i className="fa-brands fa-linkedin"></i>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#00b4d8] transition-all duration-300"
                >
                  {t("About")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-[#00b4d8] transition-all duration-300"
                >
                  {t("Services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-[#00b4d8] transition-all duration-300"
                >
                  {t("Projects")}
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#00b4d8] transition-all duration-300"
                >
                  {t("footer.contactUs")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.contactUs")}</h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:Main@professinals-design.com"
                className="block hover:text-[#00b4d8] transition-all duration-300"
              >
                Main@professinals-design.com
              </a>
              <a
                href="tel:002-02-27295787"
                className="block hover:text-[#00b4d8] transition-all duration-300"
              >
                002-02-27295787
              </a>

              <a
                href="tel:+01159606060"
                className="block hover:text-[#00b4d8] transition-all duration-300 font-bold"
              >
                +01159606060
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#E39784] mt-12 py-4">
        <div className="container text-center text-sm">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
