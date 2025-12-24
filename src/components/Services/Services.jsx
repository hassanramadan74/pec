import { useTranslation } from "react-i18next";
import { useState } from "react";
import servicesBg from "../../assets/services.webp";
import { servicesData } from "../../data/services";

function Services() {
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-primary";
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <section>
      <div
        className={`relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[500px] flex items-center justify-center ${fontClass}`}
        dir={direction}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${servicesBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="lg:container ">
          {/* Title */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
            {t("services.title")}
          </h1>

          {/* Description */}
          <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed max-w-7xl">
            {t("services.description")}
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className={`container py-16 md:py-24 ${fontClass}`} dir={direction}>
        <div className="space-y-8">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className={`grid grid-cols-1 ${
                expandedService === service.id
                  ? "lg:grid-cols-3"
                  : "lg:grid-cols-2"
              } gap-6 md:gap-8 items-center bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl`}
            >
              {/* Image - Changes order on odd/even for variety */}
              <div
                className={`${
                  expandedService === service.id
                    ? "lg:col-span-1"
                    : index % 2 === 0
                    ? "order-1"
                    : "order-1 lg:order-2"
                } relative h-[300px] md:h-[400px] overflow-hidden group`}
              >
                <img
                  src={service.image}
                  alt={t(service.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div
                className={`${
                  expandedService === service.id
                    ? "lg:col-span-2"
                    : index % 2 === 0
                    ? "order-2"
                    : "order-2 lg:order-1"
                } p-6 md:p-8`}
              >
                {/* Service Title */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#076380] mb-4">
                  {t(service.titleKey)}
                </h2>

                {/* Service Description */}
                <p
                  className={`text-gray-700 text-sm md:text-base leading-relaxed ${
                    expandedService === service.id ? "" : "line-clamp-3"
                  } transition-all duration-300`}
                >
                  {t(service.descriptionKey)}
                </p>

                {/* Read More Button */}
                <button
                  onClick={() => toggleService(service.id)}
                  className="mt-4 inline-flex items-center gap-2 text-[#076380] hover:text-[#065470] font-semibold transition-colors duration-300"
                >
                  {expandedService === service.id
                    ? direction === "rtl"
                      ? "عرض أقل"
                      : "Show Less"
                    : direction === "rtl"
                    ? "اقرأ المزيد"
                    : "Read More"}
                  <i
                    className={`fa-solid fa-chevron-${
                      expandedService === service.id ? "up" : "down"
                    } text-sm transition-transform duration-300`}
                  ></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
