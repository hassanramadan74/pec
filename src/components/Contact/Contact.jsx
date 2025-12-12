import { useTranslation } from "react-i18next";
import contactbg from "../../assets/contactus.jpg";
import contacthero from "../../assets/contacthero.jpg";
import world from "../../assets/world-Photoroom.png";

function Contact() {
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-primary";
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  return (
    <section>
      <div
        className={`relative w-full min-h-[400px] md:min-h-[400px] lg:min-h-[400px] flex items-center justify-center ${fontClass}`}
        dir={direction}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${contactbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="lg:container ">
          {/* Title */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
            {t("Contact")}
          </h1>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className={`container py-16 md:py-24 ${fontClass}`} dir={direction}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Column */}
          <div>
            <form className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t("contact.firstName")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t("contact.lastName")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380]"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t("contact.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t("contact.phone")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010 01234567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380]"
                  />
                </div>
              </div>

              {/* Company & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t("contact.company")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t("contact.department")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t("contact.message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380] resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-[#076380] hover:bg-[#065470] text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300"
                >
                  {t("contact.send")}
                </button>
              </div>
            </form>
          </div>

          {/* Image Column */}
          <div>
            <img
              src={contacthero}
              alt={t("contact.imageAlt")}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#f3f3f3] w-full shadow-lg">
        <div className="container">
          <img src={world} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Company Locations Section */}
      <div
        className={`bg-[#076380] py-10  ${fontClass}`}
        dir={direction}
      >
        <div className="container">
          {/* Section Title */}
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-12">
            {t("contact.locations.title")}
          </h2>

          {/* Office Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Cairo Office */}
            <div className="bg-white  p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t("contact.locations.cairo.title")}
              </h3>
              <div className="space-y-3 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-location-dot text-orange-500 mt-1 text-lg"></i>
                  <div className="text-[#076380]">
                    <p className="font-semibold">
                      {t("contact.locations.cairo.company")}
                    </p>
                    <p>{t("contact.locations.cairo.address1")}</p>
                    <p>{t("contact.locations.cairo.address2")}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-phone text-orange-500 text-lg"></i>
                  <a
                    href="tel:+201159606060"
                    className="text-[#076380] hover:underline"
                  >
                    +201159606060
                  </a>
                </div>


                {/* Email */}
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-orange-500 text-lg"></i>
                  <a
                    href="mailto:Main@professinals-design.com"
                    className="text-[#076380] hover:underline"
                  >
                    Main@professinals-design.com
                  </a>
                </div>

                {/* Postal Code */}
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-solid fa-box-open text-orange-500 text-lg"></i>
                  <span className="text-[#076380]">4440001</span>
                </div>

                {/* View on Map */}
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-map text-orange-500 text-lg"></i>
                  <a
                    href="#"
                    className="text-[#076380] hover:underline font-semibold"
                  >
                    {t("contact.locations.viewMap")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
