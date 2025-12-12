import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import projectsBg from "../../assets/projects.webp";
import { projectsData } from "../../data/projects";

function Projects() {
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-primary";
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <section>
      <div
        className={`relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[500px] flex items-center justify-center ${fontClass}`}
        dir={direction}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${projectsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="lg:container ">
          {/* Title */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
            {t("projects.title")}
          </h1>

          {/* Description */}
          <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed max-w-7xl">
            {t("projects.description")}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={`container py-16 md:py-24 ${fontClass}`} dir={direction}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projectsData.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer h-[300px] md:h-[400px] block"
            >
              <img
                src={project.mainImage}
                alt={t(project.projectOwner)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <h2 className="text-white uppercase text-2xl md:text-3xl lg:text-4xl font-bold px-6 text-center">
                  {t(project.projectOwner)}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
