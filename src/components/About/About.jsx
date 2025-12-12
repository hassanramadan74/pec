import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projectsData } from "../../data/projects";

const About = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counts, setCounts] = useState({
    employees: 0,
    countries: 0,
    projects: 0,
    offices: 0,
    awards: 0,
  });
  const countersRef = useRef(null);
  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-primary";
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  // Get first 5 projects
  const projects = projectsData.slice(0, 5);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const animateCounters = () => {
    const targets = {
      employees: 100,
      countries: 15,
      projects: 60,
      offices: 30,
      awards: 25,
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts({
        employees: Math.floor(targets.employees * progress),
        countries: Math.floor(targets.countries * progress),
        projects: Math.floor(targets.projects * progress),
        offices: Math.floor(targets.offices * progress),
        awards: Math.floor(targets.awards * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);
  };

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 8000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [projects.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  return (
    <>
      <section
        className={`relative w-full h-screen overflow-hidden ${fontClass}`}
      >
        {/* Slider Container */}
        <div className="relative w-full h-full">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background Image */}
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${project.mainImage})`,
                }}
              >
                {/* Content Overlay */}
                <div
                  className="container h-full flex items-center"
                  dir={direction}
                >
                  <div className="max-w-3xl">
                    {/* Project Title */}
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
                      {project.titleKey}
                    </h1>

                    {/* Project Location */}
                    <div className="flex items-center gap-3 mb-4 text-white text-lg md:text-xl">
                      <i className="fa-solid fa-location-dot text-[#E30613]"></i>
                      <p
                        className="animate-fadeInUp"
                        style={{ animationDelay: "0.2s" }}
                      >
                        {project.location}
                      </p>
                    </div>

                    {/* Project Owner */}
                    <div className="flex items-center gap-3 mb-8 text-white text-lg md:text-xl">
                      <i className="fa-solid fa-building text-[#E30613]"></i>
                      <p
                        className="animate-fadeInUp"
                        style={{ animationDelay: "0.3s" }}
                      >
                        {project.projectOwner}
                      </p>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-block bg-[#076380] hover:bg-[#065470] text-white font-semibold px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 animate-fadeInUp"
                      style={{ animationDelay: "0.4s" }}
                    >
                      {t("home.viewDetails")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className={`absolute ${
            direction === "rtl" ? "right-6" : "left-6"
          } top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-30 lg:block hidden hover:bg-opacity-50 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm`}
        >
          <i
            className={`fa-solid ${
              direction === "rtl" ? "fa-chevron-right" : "fa-chevron-left"
            } text-2xl`}
          ></i>
        </button>

        <button
          onClick={goToNext}
          className={`absolute ${
            direction === "rtl" ? "left-6" : "right-6"
          } top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-30  lg:block hidden hover:bg-opacity-50 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm`}
        >
          <i
            className={`fa-solid ${
              direction === "rtl" ? "fa-chevron-left" : "fa-chevron-right"
            } text-2xl`}
          ></i>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Who is PEC Section */}
      <section
        className={`py-16 md:py-24 bg-white ${fontClass}`}
        dir={direction}
      >
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#076380] mb-8">
              {t("about.whoPec.title")}
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {t("about.whoPec.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Counters Section */}
      <section
        ref={countersRef}
        className={`bg-[#F5F1E8] py-16 ${fontClass}`}
        dir={direction}
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {/* Employees */}
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D2817] mb-2">
                {counts.employees}+
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {t("about.stats.employees")}
              </p>
            </div>

            {/* Countries */}
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D2817] mb-2">
                {counts.countries}+
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {t("about.stats.countries")}
              </p>
            </div>

            {/* Projects */}
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D2817] mb-2">
                {counts.projects}+
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {t("about.stats.projects")}
              </p>
            </div>

            {/* Offices */}
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D2817] mb-2">
                {counts.offices}+
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {t("about.stats.offices")}
              </p>
            </div>

            {/* Awards */}
            <div className="text-center col-span-2 md:col-span-3 lg:col-span-1">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D2817] mb-2">
                {counts.awards}+
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                {t("about.stats.awards")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Journey Story Section */}
      <section
        className={`py-16 md:py-24 bg-white ${fontClass}`}
        dir={direction}
      >
        <div className="container">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-[#22c55e] text-sm md:text-base font-semibold mb-2">
              {t("about.journey.subtitle")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              {t("about.journey.title")}
            </h2>
            <p className="text-gray-600 mt-4 max-w-4xl mx-auto text-sm md:text-base leading-relaxed">
              {t("about.journey.description")}
            </p>
          </div>

          {/* Journey Items */}
          <div className="space-y-12">
            {/* Inception Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                  alt={t("about.journey.inception.title")}
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {t("about.journey.inception.title")}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {t("about.journey.inception.description")}
                </p>
              </div>
            </div>

            {/* Evolutionary Journey */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {t("about.journey.evolution.title")}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {t("about.journey.evolution.description")}
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                  alt={t("about.journey.evolution.title")}
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Commitment to Excellence */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
                  alt={t("about.journey.excellence.title")}
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {t("about.journey.inception.title")}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {t("about.journey.inception.description")}
                </p>
              </div>
            </div>

            {/* Client-Centric Approach */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {t("about.journey.clientCentric.title")}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {t("about.journey.clientCentric.description")}
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
                  alt={t("about.journey.clientCentric.title")}
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className={`py-16 md:py-24 bg-[#EFF6FF] ${fontClass}`}
        dir={direction}
      >
        <div className="container max-w-5xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-[#22c55e] text-sm md:text-base font-semibold mb-2">
              {t("about.faq.subtitle")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              {t("about.faq.title")}
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === item ? null : item)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-gray-800 font-medium text-sm md:text-base">
                    {t(`about.faq.q${item}.question`)}
                  </span>
                  <i
                    className={`fa-solid fa-chevron-down transition-transform duration-300 text-gray-600 ${
                      openFAQ === item ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>
                {openFAQ === item && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {t(`about.faq.q${item}.answer`)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
