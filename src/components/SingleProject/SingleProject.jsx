import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { projectsData } from "../../data/projects";
// import projectsBg from "../../assets/projects.webp";

const SingleProject = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-primary";
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  // Find the project by id
  const project = projectsData.find((p) => p.id === parseInt(id));

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(project?.mainImage || "");

  if (!project) {
    return (
      <section className={`container py-20 ${fontClass}`} dir={direction}>
        <h1 className="text-3xl font-bold text-center">
          {t("project.notFound")}
        </h1>
      </section>
    );
  }

  const thumbnails = [
    project.mainImage,
    project.secondImage,
    project.thirdImage,
  ];

  return (
    <section>
      {/* Hero Section */}
      <div
        className={`relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center ${fontClass}`}
        dir={direction}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${thumbnails[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container px-4">
          {/* Title */}
          <h1 className="text-white uppercase text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t(project.titleKey)}
          </h1>

          {/* Info Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {/* Project Owner Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
              <p className="text-white text-sm opacity-80 mb-1">
                {t("project.owner")}
              </p>
              <p className="text-white uppercase text-xl md:text-2xl font-bold">
                {project.projectOwner}
              </p>
            </div>

            {/* Location Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
              <p className="text-white text-sm opacity-80 mb-1">
                {t("project.location")}
              </p>
              <p className="text-white uppercase text-xl md:text-2xl font-bold">
                {project.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className={`container py-16 md:py-24 ${fontClass}`} dir={direction}>
        {/* Main Large Image with Zoom Effect */}
        <div className="mb-8 group">
          <div className="relative overflow-hidden rounded-lg shadow-2xl">
            <img
              src={selectedImage}
              alt={t(project.titleKey)}
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Image Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Thumbnail Images with Better Styling */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-16">
          {thumbnails.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform ${
                selectedImage === image
                  ? "ring-4 ring-[#076380] scale-105 shadow-2xl"
                  : "hover:scale-105 hover:shadow-xl"
              }`}
            >
              <img
                src={image}
                alt={`${t(project.titleKey)} - ${index + 1}`}
                className="w-full h-[120px] md:h-[160px] lg:h-[200px] object-cover"
              />
              {/* Selected Indicator */}
              {selectedImage === image && (
                <div className="absolute top-2 right-2 bg-[#076380] text-white rounded-full p-3 w-10">
                  <i className="fa-solid fa-check text-sm"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Project Details with Card Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Overview Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#076380] text-white rounded-full p-3">
                <i className="fa-solid fa-clipboard-list text-xl"></i>
              </div>
              <h3 className="text-2xl md:text-3xl uppercase font-bold text-gray-800">
                {t("project.overview")}
              </h3>
            </div>
            <p className="text-gray-700 uppercase text-base md:text-lg leading-relaxed">
              {project.projectOverview}
            </p>
          </div>

          {/* PEC Scope Card */}
          <div className="bg-gradient-to-br from-[#076380] to-[#065470] rounded-lg p-6 md:p-8 shadow-lg text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white text-[#076380] rounded-full p-3">
                <i className="fa-solid fa-tasks text-xl"></i>
              </div>
              <h3 className="text-2xl uppercase md:text-3xl font-bold">
                {t("project.scope")}
              </h3>
            </div>
            <p className="text-white uppercase text-base md:text-lg leading-relaxed opacity-95">
              {project.pecScope}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProject;
